const express = require("express");
const router = express.Router();

// Primer GET rute
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        // Ovde ide logika za YouTube API poziv
        res.json({ message: `Tražimo za: ${query}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
