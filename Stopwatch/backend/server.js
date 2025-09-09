// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { Pool } = require('pg');
// const path = require('path');

// const app = express();
// const port = 4000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Serve static files from the 'public' folder
// app.use(express.static(path.join(__dirname, 'public')));

// // PostgreSQL connection setup

// const pool = new Pool({
//   user: 'postgres', // Ensure this is the correct user
//   host: 'localhost', // Correct host if it's running locally
//   database: 'stopwatchdb', // Ensure this matches the correct database name in PostgreSQL 16
//   password: 'admin', // Use the correct password
//   port: 5434, // Correct port for PostgreSQL 16
// });

// // Route for saving run data
// app.post('/api/save-run', async (req, res) => {
//   const { user_id, root, distance, speed, time, polyline, startLat, startLng, location = "Unknown Location" } = req.body;

//   // Check if userId is provided
//   if (!user_id) {
//       return res.status(400).json({ error: "User ID is required" });
//   }

//   try {
//       await pool.query(
//           `INSERT INTO runs (user_id, distance, time_seconds, speed, route, polyline, created_at, location, start_lat, start_lng)
//            VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, $8, $9)`,
//           [user_id, distance, time, speed, root, JSON.stringify(polyline), location, startLat, startLng]
//       );

//       res.status(201).json({ message: "Run saved successfully." });
//   } catch (err) {
//       console.error("Error saving run:", err);
//       res.status(500).json({ error: "Failed to save run" });
//   }
// });

// app.get('/api/routes-nearby', async (req, res) => {
//   const { lat, lng } = req.query;

//   try {
//       const radius = 0.5; // kilometara (500m)

//       const result = await pool.query(
//           `
//           SELECT * FROM runs
//           WHERE (
//               6371 * acos(
//                   cos(radians($1)) *
//                   cos(radians(start_lat)) *
//                   cos(radians(start_lng) - radians($2)) +
//                   sin(radians($1)) *
//                   sin(radians(start_lat))
//               )
//           ) < $3
//           ORDER BY created_at DESC
//           `,
//           [lat, lng, radius]
//       );

//       res.json(result.rows);
//   } catch (err) {
//       console.error("Error fetching nearby routes:", err);
//       res.status(500).json({ error: "Failed to fetch nearby routes" });
//   }
// });


// // This will serve your index.html if it is placed inside the 'public' folder
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// }); Old code



/// Integration with Supabase

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');  // Import Supabase client
require('dotenv').config();  // To load environment variables

const app = express();
const port = process.env.PORT || 4000;  // Use environment variable for port or default to 4000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;  // Set this in your .env file
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;  // Set this in your .env file
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.post('/api/save-run', async (req, res) => {
  const { user_id, root, distance, speed, time, polyline, startLat, startLng, location = "Unknown Location", username } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }


  try {
    const { data, error } = await supabase
      .from('runs')  // Assuming 'runs' is the table where you store your data
      .insert([
        {
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
        }
      ]);

    if (error) {
      console.error("Error saving run:", error);
      return res.status(500).json({ error: "Failed to save run" });
    }

    res.status(201).json({ message: "Run saved successfully.", data });
  } catch (err) {
    console.error("Error saving run:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/save-training', async (req, res) => {
  const { user_id, trainingName, userName, pushUps, pullUps, sitUps, absCount, otherExercise, duration} = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!userName) {
    return res.status(400).json({ error: "Username is required" });
  }


  try {
    const { data, error } = await supabase
      .from('training')  // Assuming 'runs' is the table where you store your data
      .insert([
        {
          trainingName,
          userName,
          pushUps,
          pullUps,
          sitUps,
          absCount,
          otherExercise,
          duration: time
        }
      ]);

    if (error) {
      console.error("Error saving training:", error);
      return res.status(500).json({ error: "Failed to save training" });
    }

    res.status(201).json({ message: "Training saved successfully.", data });
  } catch (err) {
    console.error("Error saving training:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/api/routes-nearby', async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const radius = 0.5; // 500 meters

    // ✅ Parse query params as floats
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    const latMin = latNum - radius;
    const latMax = latNum + radius;
    const lngMin = lngNum - radius;
    const lngMax = lngNum + radius;

    const { data, error } = await supabase
      .from('runs')
      .select('*')
      .gte('start_lat', latMin)
      .lte('start_lat', latMax)
      .gte('start_lng', lngMin)
      .lte('start_lng', lngMax);

    if (error) {
      console.error("Error fetching nearby routes:", error);
      return res.status(500).json({ error: "Failed to fetch nearby routes" });
    }

    res.json(data);
  } catch (err) {
    console.error("Error fetching nearby routes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


