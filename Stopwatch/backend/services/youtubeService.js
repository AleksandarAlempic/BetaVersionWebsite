// services/youtubeService.js
console.log("YOUTUBE SERVICE LOADED - NO NODE FETCH");

// Simple in-memory cache
const searchCache = new Map(); // key: query string, value: data

// Pretraga videa po query
async function searchYouTube(query, maxResults = 5) {
    const cacheKey = `${query}_${maxResults}`;
    if (searchCache.has(cacheKey)) {
        console.log("Cache hit for query:", query);
        return searchCache.get(cacheKey);
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&fields=items(id/videoId,snippet(title,channelTitle,thumbnails)),pageInfo&key=${process.env.YOUTUBE_API_KEY}`
        );

        const data = await response.json();
        searchCache.set(cacheKey, data); // Save to cache

        // Optional: auto-clear cache after 10 minutes
        setTimeout(() => searchCache.delete(cacheKey), 10 * 60 * 1000);

        return data;
    } catch (error) {
        throw new Error(`YouTube API error: ${error.message}`);
    }
}

// Dobijanje informacija o videu po ID
async function getVideoInfo(id) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&fields=items(id,snippet(title,channelTitle,thumbnails)),pageInfo&key=${process.env.YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`YouTube API error: ${error.message}`);
    }
}

module.exports = { searchYouTube, getVideoInfo };
