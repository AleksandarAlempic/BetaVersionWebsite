const express = require("express");
const router = express.Router();
const { searchYouTube } = require("../services/youtubeService"); // putanja do servis fajla

// GET /api/youtube/search?q=neka+pretraga
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ error: "Query param 'q' je obavezan." });

        const data = await searchYouTube(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
