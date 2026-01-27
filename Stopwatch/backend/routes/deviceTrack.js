const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const fetch = require("node-fetch"); // npm i node-fetch

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const ALERT_EMAIL = process.env.ALERT_EMAIL;

router.post("/", async (req, res) => {
  const { device_id, platform, language, location } = req.body;

  console.log("➡️ /api/device-track called");
  console.log("📥 Payload:", { device_id, platform, language, location });

  if (!device_id) return res.status(400).json({ error: "Missing device_id" });

  try {
    // 1️⃣ Check if device exists
    const { data: existing } = await supabase
      .from("devices")
      .select("device_id")
      .eq("device_id", device_id)
      .single();

    let isNewDevice = false;

    if (!existing) {
      isNewDevice = true;
      console.log("🆕 New device detected");

      await supabase.from("devices").insert([{
        device_id,
        platform,
        language,
        location,
        first_seen: new Date(),
        last_seen: new Date()
      }]);
    } else {
      console.log("♻️ Existing device, updating last_seen");

      await supabase
        .from("devices")
        .update({ last_seen: new Date() })
        .eq("device_id", device_id);
    }

    // =========================
    // 📊 STATISTICS
    // =========================
    const { data: devices } = await supabase
      .from("devices")
      .select("device_id, first_seen");

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Filter devices
    const todayDevices = devices.filter(d => new Date(d.first_seen) >= startOfToday).length;
    const last7DaysDevices = devices.filter(d => new Date(d.first_seen) >= sevenDaysAgo).length;
    const totalDevices = devices.length;

    // =========================
    // 📧 FORMSpree PLAIN TEXT MAIL
    // =========================
    if (isNewDevice) {
      console.log("📧 Sending Formspree email");

      const formData = new URLSearchParams();
      formData.append("_subject", "📱 New device on BetaVersionWebsite");
      formData.append("_replyto", ALERT_EMAIL || "noreply@betaversion.com");
      formData.append("email", ALERT_EMAIL || "test@betaversion.com");

      formData.append(
        "message",
        `🆕 New Device Detected

Platform: ${platform}
Language: ${language}
Location: ${location || "Unknown"}

Stats:
Today: ${todayDevices}
Last 7 days: ${last7DaysDevices}
Total: ${totalDevices}`
      );

      try {
        const response = await fetch("https://formspree.io/f/xqeqngke", {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        console.log("📨 Formspree status:", response.status);
        console.log("📨 Formspree response:", await response.text());
      } catch (err) {
        console.error("❌ Formspree fetch failed:", err);
      }
    }

    // =========================
    // ✅ RESPONSE
    // =========================
    res.json({ isNewDevice, totalDevices, todayDevices, last7DaysDevices });

  } catch (err) {
    console.error("🔥 Device tracking error:", err);
    res.status(500).json({ error: "Device tracking failed" });
  }
});

module.exports = router;
