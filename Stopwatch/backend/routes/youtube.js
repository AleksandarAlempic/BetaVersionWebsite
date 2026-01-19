const fetch = require("node-fetch"); // ako nisi instalirao: npm i node-fetch

router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${process.env.YOUTUBE_API_KEY}&maxResults=5`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
