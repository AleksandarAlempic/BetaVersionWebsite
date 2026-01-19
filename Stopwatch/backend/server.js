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

// YouTube API routes
app.use("/api/youtube", require("./routes/youtube"))

// Servira public folder (Data.js i frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Servira folder sa muzikom kao /audio
app.use('/audio', express.static(path.join(__dirname, '../../Audio'))); 
// ../../Audio → ide dva foldera gore do BetaVersionWebsite/Audio

// Supabase client
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------- API ROUTES ---------------- //

// Snimanje trčanja
app.post('/api/save-run', async (req, res) => {
  const { user_id, username, root, distance, speed, time, polyline, startLat, startLng, location = "Unknown Location" } = req.body;

  if (!user_id || !username) {
    return res.status(400).json({ error: "User ID and Username are required" });
  }

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
    console.error("❌ Error saving run:", err);
    res.status(500).json({ error: "Failed to save run" });
  }
});

// Snimanje treninga
app.post('/api/save-training', async (req, res) => {
  const { user_id, userName, trainingName, pushUps, pullUps, sitUps, absCount, otherExercise, duration, latitude, longitude } = req.body;
  
  if (!user_id || !userName || !trainingName) {
    return res.status(400).json({ error: "User ID, Username, and Training name are required" });
  }

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
    console.error("❌ Error saving training:", err);
    res.status(500).json({ error: "Failed to save training" });
  }
});

app.get('/api/routes-nearby', async (req, res) => {
  const { lat, lng, radius = 35000 } = req.query; // default 50km
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  const radiusNum = parseFloat(radius);

  if (isNaN(latNum) || isNaN(lngNum)) {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }
  if (isNaN(radiusNum)) {
    return res.status(400).json({ error: "Invalid radius" });
  }

  try {
    const { data: routes, error } = await supabase
      .from('runs')
      .select('id, username, distance, speed, polyline, start_lat, start_lng');

    if (error) throw error;
    if (!routes || routes.length === 0) return res.json([]);

    const toRad = deg => (deg * Math.PI) / 180;
    const R = 6371000; // Earth radius in meters

    const nearby = routes.reduce((acc, r) => {
      if (r.start_lat == null || r.start_lng == null) return acc;

      const lat1 = toRad(latNum);
      const lng1 = toRad(lngNum);
      const lat2 = toRad(parseFloat(r.start_lat));
      const lng2 = toRad(parseFloat(r.start_lng));

      const dLat = lat2 - lat1;
      const dLng = lng2 - lng1;

      const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      if (distance <= radiusNum) {
        acc.push({ ...r, _distance_m: distance });
      }
      return acc;
    }, []);

    console.log(`Frontend coords: ${latNum} ${lngNum}, radius(m): ${radiusNum}`);
    nearby.forEach(r => console.log(`Route ${r.id}: distance=${Math.round(r._distance_m)}m`));
    console.log("Nearby routes found:", nearby.length);

    res.json(nearby);
  } catch (err) {
    console.error("Error fetching nearby routes:", err);
    res.status(500).json({ error: "Failed to fetch nearby routes" });
  }
});
app.get('/api/all-routes', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('runs')
            .select('*'); // bez filtera
        if (error) return res.status(500).json({ error });
        console.log("Routes raw:", data);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET trainings near given coordinates
app.get('/api/nearby-trainings', async (req, res) => {
  const { lat, lng, radius } = req.query;
  console.log("API /api/nearby-trainings called", req.query);
  if (!lat || !lng || !radius) {
    return res.status(400).json({ error: "Missing lat, lng or radius" });
  }

  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);
  const searchRadius = parseFloat(radius);

  try {
    const { data: trainings, error } = await supabase
      .from('training')
      .select('*');

    if (error) throw error;

    const nearbyTrainings = trainings.filter(t => {
      if (!t.latitude || !t.longitude) return false;

      const R = 6371e3; // Earth radius in meters
      const φ1 = (userLat * Math.PI) / 180;
      const φ2 = (t.latitude * Math.PI) / 180;
      const Δφ = ((t.latitude - userLat) * Math.PI) / 180;
      const Δλ = ((t.longitude - userLng) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // distance in meters

      return d <= searchRadius;
    });

    res.json(nearbyTrainings);
  } catch (err) {
    console.error("Error fetching nearby trainings:", err);
    res.status(500).json({ error: "Error retrieving nearby trainings" });
  }
});


// ---------------- FRONTEND ---------------- //
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------------- START SERVER ---------------- //
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
