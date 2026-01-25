const express = require("express");
const router = express.Router();

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

router.post("/", async (req, res) => {
  const { device_id, user_agent, platform, language } = req.body;

  if (!device_id) {
    return res.status(400).json({ error: "Missing device_id" });
  }

  const { error } = await supabase
    .from("devices")
    .upsert({
      device_id,
      user_agent,
      platform,
      language,
      last_seen: new Date()
    }, { onConflict: ["device_id"] });

  if (error) {
    console.error("Device track error:", error);
    return res.status(500).json({ error: "DB error" });
  }

  res.json({ success: true });
});

module.exports = router;
