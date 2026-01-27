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

  console.log("➡️ /api/device-track called");
  console.log("📥 Payload:", { device_id, platform, language });

  if (!device_id) {
    console.log("❌ Missing device_id");
    return res.status(400).json({ error: "Missing device_id" });
  }

  try {
    // 1️⃣ Proveri da li device postoji
    const { data: existing, error: selectError } = await supabase
      .from("devices")
      .select("*")
      .eq("device_id", device_id)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      console.error("❌ Supabase select error:", selectError);
    }

    let isNewDevice = false;

    if (!existing) {
      isNewDevice = true;
      console.log("🆕 New device detected");

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
      console.log("♻️ Existing device, updating last_seen");

      // 3️⃣ Update last_seen
      await supabase
        .from("devices")
        .update({ last_seen: new Date() })
        .eq("device_id", device_id);
    }

    // =========================
    // 📊 STATISTIKE
    // =========================
    let { count: totalDevices } = await supabase
      .from("devices")
      .select("*", { count: "exact", head: true });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    let { count: todayDevices } = await supabase
      .from("devices")
      .select("*", { count: "exact", head: true })
      .gte("first_seen", startOfToday);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    let { count: last7DaysDevices } = await supabase
      .from("devices")
      .select("*", { count: "exact", head: true })
      .gte("first_seen", sevenDaysAgo);

    // ✅ Korekcija statistike
    todayDevices = todayDevices || 0;
    last7DaysDevices = last7DaysDevices || 0;
    totalDevices = totalDevices || 0;

    if (todayDevices > totalDevices) totalDevices = todayDevices;
    if (last7DaysDevices > totalDevices) totalDevices = last7DaysDevices;

    // =========================
    // 📧 FORMSpree PLAIN TEXT MAIL
    // =========================
    if (isNewDevice) {
      console.log("📧 isNewDevice = TRUE → sending Formspree email");
      console.log("📧 ALERT_EMAIL:", ALERT_EMAIL);

      const formData = new URLSearchParams();
      formData.append("_subject", "📱 New device on BetaVersionWebsite");
      formData.append("_replyto", ALERT_EMAIL || "noreply@betaversion.com");

      // ⚠️ FORMSpree mora imati bar jedno polje (email)
      formData.append("email", ALERT_EMAIL || "test@betaversion.com");

      formData.append("message", `
🆕 New Device Detected

Device ID: ${device_id}
Platform: ${platform}
Language: ${language}
User Agent: ${user_agent}

Stats:
Today: ${todayDevices}
Last 7 days: ${last7DaysDevices}
Total: ${totalDevices}
      `);

      try {
        const response = await fetch("https://formspree.io/f/xqeqngke", {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        console.log("📨 Formspree status:", response.status);

        const text = await response.text();
        console.log("📨 Formspree response:", text);

      } catch (emailErr) {
        console.error("❌ Formspree fetch failed:", emailErr);
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
    console.error("🔥 Device tracking error:", err);
    res.status(500).json({ error: "Device tracking failed" });
  }
});

module.exports = router;
