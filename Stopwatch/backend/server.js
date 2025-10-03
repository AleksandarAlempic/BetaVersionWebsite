const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servira public folder (Data.js i frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Servira folder sa muzikom kao /audio
app.use('/audio', express.static(path.join(__dirname, '../../Audio'))); 
// ../../Audio → ide dva foldera gore do BetaVersionWebsite/Audio

// Supabase client
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Routes
app.post('/api/save-run', async (req, res) => {
  const { user_id, username, root, distance, speed, time, polyline, startLat, startLng, location = "Unknown Location" } = req.body;

  if (!user_id || !username) return res.status(400).json({ error: "User ID and Username are required" });

  try {
    const { data, error } = await supabase.from('runs').insert([{
      user_id,
      username,
      distance,
      time_seconds: time,
      speed,
      route: root,
      polyline: JSON.stringify(polyline),
      location,
      start_lat: startLat,
      start_lng: startLng
    }]);

    if (error) throw error;
    res.status(201).json({ message: "Run saved successfully.", data });
  } catch (err) {
    console.error("Error saving run:", err);
    res.status(500).json({ error: "Failed to save run" });
  }
});

app.post('/api/save-training', async (req, res) => {
const { user_id, userName, trainingName, pushUps, pullUps, sitUps, absCount, otherExercise, duration, latitude, longitude } = req.body;
  if (!user_id || !userName || !trainingName) return res.status(400).json({ error: "User ID, Username, and Training name are required" });

  try {
  const { data, error } = await supabase.from('training').insert([{
  trainingName,
  userName,
  pushUps,
  pullUps,
  sitUps,
  absCount,
  otherExercise,
  duration,
  latitude,    
  longitude    
}]);
    if (error) throw error;
    res.status(201).json({ message: "Training saved successfully.", data });
  } catch (err) {
    console.error("Error saving training:", err);
    res.status(500).json({ error: "Failed to save training" });
  }
});

app.get('/api/routes-nearby', async (req, res) => {
  const { lat, lng } = req.query;
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  if (isNaN(latNum) || isNaN(lngNum)) {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }

  try {
    // Uzmi sve rute iz baze
    const { data, error } = await supabase.from('runs').select('*');
    if (error) throw error;

    // Funkcija za Haversine distancu (u metrima)
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371000; // radius Zemlje u metrima
      const toRad = deg => (deg * Math.PI) / 180;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // Filtriraj rute unutar 500m
    const radius = 500; // metri
    const nearby = data.filter(r => {
      const rLat = parseFloat(r.start_lat);
      const rLng = parseFloat(r.start_lng);

      if (isNaN(rLat) || isNaN(rLng)) return false;

      const dist = haversineDistance(latNum, lngNum, rLat, rLng);
      return dist <= radius;
    });

    console.log("Found nearby runs:", nearby.length);
    res.json(nearby);

  } catch (err) {
    console.error("Error fetching nearby routes:", err);
    res.status(500).json({ error: "Failed to fetch nearby routes" });
  }
});


// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
