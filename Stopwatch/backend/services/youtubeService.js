// services/youtubeService.js
// Node 22+ ima globalni fetch, nema potrebe za node-fetch

// Pretraga videa po query
async function searchYouTube(query, maxResults = 5) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${process.env.YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`YouTube API error: ${error.message}`);
    }
}

// Dobijanje informacija o videu po ID
async function getVideoInfo(id) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`YouTube API error: ${error.message}`);
    }
}
 
module.exports = { searchYouTube, getVideoInfo };
