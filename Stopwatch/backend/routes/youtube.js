const express = require("express");
const router = express.Router();
const { searchYouTube, getVideoInfo } = require("../services/youtubeService"); // putanja prema tvom folderu

console.log("YOUTUBE ROUTE LOADED");

// Search endpoint
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ error: "Missing query parameter" });

        const data = await searchYouTube(query);
        res.json(data);
    } catch (error) {
        console.error("Search endpoint error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Video info endpoint
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
