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

// Povlačenje ruta u blizini
app.get('/api/routes-nearby', async (req, res) => {
  const { lat, lng } = req.query;
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  if (isNaN(latNum) || isNaN(lngNum)) {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }

  try {
    const { data: routes, error } = await supabase
      .from('runs')
      .select('id, username, distance, speed, polyline, start_lat, start_lng');

    if (error) throw error;

    console.log("📡 Frontend coords:", latNum, lngNum);
    console.log("📦 Routes from DB count:", routes?.length);
    console.log("📦 Routes raw:", routes);

    const radius = 10000; // 10 km
    const toRad = deg => (deg * Math.PI) / 180;

    const nearby = routes.filter(r => {
      const rLat = parseFloat(r.start_lat);
      const rLng = parseFloat(r.start_lng);

      if (isNaN(rLat) || isNaN(rLng)) {
        console.warn(`⚠️ Route ${r.id} ima nevalidne koordinate: lat=${r.start_lat}, lng=${r.start_lng}`);
        return false;
      }

      const R = 6371000;
      const dLat = toRad(latNum - rLat);
      const dLng = toRad(lngNum - rLng);

      const a = Math.sin(dLat/2)**2 + Math.cos(toRad(latNum)) * Math.cos(toRad(rLat)) * Math.sin(dLng/2)**2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;

      console.log(`📍 Route ${r.id}: distance=${distance.toFixed(2)}m`);
      return distance <= radius;
    });

    console.log("✅ Nearby routes found:", nearby.length);
    res.json(nearby);

  } catch (err) {
    console.error("❌ Error fetching nearby routes:", err);
    res.status(500).json({ error: "Failed to fetch nearby routes" });
  }
});

app.get('/api/all-routes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('runs')
      .select('*'); // sve kolone

    if (error) throw error;

    console.log("📦 All routes count:", data.length);
    res.json(data);
  } catch (err) {
    console.error("Error fetching all routes:", err);
    res.status(500).json({ error: "Failed to fetch all routes" });
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
