const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const fetch = require("node-fetch"); // npm i node-fetch

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const ALERT_EMAIL = process.env.ALERT_EMAIL;

// POST /api/device-track
router.post("/", async (req, res) => {
  const { device_id, user_agent, platform, language } = req.body;

  if (!device_id) {
    return res.status(400).json({ error: "Missing device_id" });
  }

  try {
    // 1️⃣ Proveri da li device postoji
    const { data: existing } = await supabase
      .from("devices")
      .select("*")
      .eq("device_id", device_id)
      .single();

    let isNewDevice = false;

    if (!existing) {
      isNewDevice = true;

      // 2️⃣ Insert novog device-a
      await supabase.from("devices").insert([{
        device_id,
        user_agent,
        platform,
        language,
        first_seen: new Date(),
        last_seen: new Date()
      }]);
    } else {
      // 3️⃣ Update last_seen
      await supabase
        .from("devices")
        .update({ last_seen: new Date() })
        .eq("device_id", device_id);
    }

    // =========================
    // 📊 STATISTIKE
    // =========================
    const { count: totalDevices } = await supabase
      .from("devices")
      .select("*", { count: "exact", head: true });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const { count: todayDevices } = await supabase
      .from("devices")
      .select("*", { count: "exact", head: true })
      .gte("first_seen", startOfToday);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const { count: last7DaysDevices } = await supabase
      .from("devices")
      .select("*", { count: "exact", head: true })
      .gte("first_seen", sevenDaysAgo);

    // =========================
    // 📧 HTML MAIL – SAMO AKO JE NOV DEVICE
    // =========================
    if (isNewDevice) {
      const formData = new URLSearchParams();
      formData.append("_subject", "📱 New device on BetaVersionWebsite");
      formData.append("_replyto", ALERT_EMAIL || "noreply@betaversion.com");
      formData.append("_format", "html");

      formData.append("message", `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #2c3e50;">🆕 New Device Detected</h2>
          <p><b>Device ID:</b> ${device_id}</p>
          <p><b>Platform:</b> ${platform}</p>
          <p><b>Language:</b> ${language}</p>
          <p><b>User Agent:</b><br/>${user_agent}</p>

          <hr style="border:none; border-top:1px solid #ccc;" />

          <h3 style="color: #2c3e50;">📊 Stats</h3>
          <ul>
            <li><b>Unique devices today:</b> ${todayDevices}</li>
            <li><b>Last 7 days:</b> ${last7DaysDevices}</li>
            <li><b>Total devices:</b> ${totalDevices}</li>
          </ul>
        </div>
      `);

      // ⚠️ Catch error da deploy ne puca ako Formspree ne odgovori
      try {
        await fetch("https://formspree.io/f/mpwvryrz", {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });
      } catch (emailErr) {
        console.error("Formspree email failed:", emailErr);
      }
    }

    // =========================
    // ✅ RESPONSE
    // =========================
    res.json({
      isNewDevice,
      totalDevices,
      todayDevices,
      last7DaysDevices
    });

  } catch (err) {
    console.error("Device tracking error:", err);
    res.status(500).json({ error: "Device tracking failed" });
  }
});

module.exports = router;
