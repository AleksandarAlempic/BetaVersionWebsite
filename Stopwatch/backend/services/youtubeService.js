const fetch = require("node-fetch"); // ako koristiš Node <18

// Funkcija koja poziva YouTube API i vraća podatke
async function searchYouTube(query, maxResults = 5) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${process.env.YOUTUBE_API_KEY}&maxResults=${maxResults}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`YouTube API error: ${error.message}`);
    }
}

module.exports = { searchYouTube };
