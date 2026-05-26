// routes/youtube.js
const express = require("express");
const router = express.Router();
const { searchYouTube, getVideoInfo } = require("../services/youtubeService");

console.log("YOUTUBE ROUTE LOADED");

// ================= SEARCH ENDPOINT ================= //
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ error: "Missing query parameter" });

        const maxResults = parseInt(req.query.maxResults) || 5; // opcionalno može front da pošalje
        const data = await searchYouTube(query, maxResults);
        res.json(data);
    } catch (error) {
        console.error("Search endpoint error:", error);
        res.status(500).json({ error: error.message });
    }
});

// ================= VIDEO INFO ENDPOINT ================= //
router.get("/video", async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ error: "Missing video id" });

        const data = await getVideoInfo(id);
        res.json(data);
    } catch (error) {
        console.error("Video endpoint error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
