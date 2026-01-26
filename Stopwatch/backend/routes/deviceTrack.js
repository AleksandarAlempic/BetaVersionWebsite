const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

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

    // 4️⃣ Ukupan broj uređaja
    const { count } = await supabase
      .from("devices")
      .select("*", { count: "exact", head: true });

    res.json({
      isNewDevice,
      totalDevices: count
    });

  } catch (err) {
    console.error("Device tracking error:", err);
    res.status(500).json({ error: "Device tracking failed" });
  }
});

module.exports = router;
