// =================== ELEMENT REFERENCES ===================
const musicPlayer = document.getElementById("checkboxMusicPlayer");
const checkboxRoot = document.getElementById("checkboxRoot");
const audioContainer = document.getElementById("audioContainer");
const newNextAndPreviousButtons = document.getElementById("newNextAndPreviousButtons");
const stopwatchLabel = document.getElementById("stopwatchLabel");

const startRouteButton = document.getElementById("startRouteButton");
const Root = document.getElementById("map-content");
const Map = document.getElementById("map");
const mapContent = document.getElementById("map-content");

const timer = document.getElementById("timer");
const stopwatch = document.getElementById("stopwatch");

const addTrainingButton = document.getElementById("fetchAddTrainingButton");
const addTrainingPopup = document.getElementById("addTrainingPopup");

const stopRouteButton = document.getElementById("stopRouteButton");
const fetchNearbyRoutesButton = document.getElementById("fetchNearbyRoutesButton");
const fetchNearbyTrainingsButton = document.getElementById("fetchNearbyTrainingsButton");

const distance = document.getElementById("distance");
const speed = document.getElementById("speed");

const stopwatchDiv = document.getElementById("StopwatchOptions");
const timerDiv = document.getElementById("TimerOptions");
const input = document.getElementById("input");

let defaultTimerSecondsValue = 60;
const songNameAndArtist = document.getElementById("songNameAndArtist");

let stopwatchCounter = 0;
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

let hours = 0;
let minutes = 0;
let seconds = 0;
let rotationDegree = 0;

const secondHand = document.getElementById('secondHand');
let myInterval;

// =================== STOPWATCH LOGIC ===================
stopwatch.addEventListener('click', () => {
  stopwatchTriggered = true;
  timerTriggered = false;
  stopwatchDiv.style.display = "inline-flex";
  timerDiv.style.display = "none";
});

timer.addEventListener('click', () => {
  stopwatchTriggered = false;
  timerTriggered = true;
  stopwatchDiv.style.display = "none";
  timerDiv.style.display = "inline-flex";
  input.value = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds % 60);
});

addTrainingButton.addEventListener('click', () => {
  addTrainingPopup.style.display = "block";
});

function setInterval1Stopwatch() {
  myInterval = setInterval(myTimer, 1000);
}

function myTimer() {
  seconds++;
  minutes = Math.floor(seconds / 60);
  hours = Math.floor(minutes / 60);
  rotationDegree = (rotationDegree + 6) % 360;
  secondHand.style.transform = `rotate(${rotationDegree}deg)`;
  input.value = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds % 60);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function myStopStopwatch() {
  clearInterval(myInterval);
  myInterval = null;
  secondHand.style.transition = "transform 1s ease";
  secondHand.style.transform = `rotate(${rotationDegree}deg)`;
}

function resetFunctionStopwatch() {
  input.value = "00:00:00";
  seconds = minutes = hours = rotationDegree = 0;
  secondHand.style.transition = "none";
  secondHand.style.transform = "rotate(0deg)";
  secondHand.style.animation = "none";
}

start.addEventListener('click', () => {
  if (!myInterval) {
    setInterval1Stopwatch();
    secondHand.style.transition = "transform 1s linear";
    secondHand.style.animation = "rotateSecond 60s infinite linear";
  }
});

stop.addEventListener('click', () => {
  myStopStopwatch();
});

reset.addEventListener('click', () => {
  resetFunctionStopwatch();
});

// =================== MUSIC PLAYER TOGGLE ===================
musicPlayer.addEventListener('click', () => {
  const visible = !musicPlayer.checked;
  audioContainer.style.display = visible ? "block" : "none";
  newNextAndPreviousButtons.style.display = visible ? "flex" : "none";
  songNameAndArtist.style.display = visible ? "grid" : "none";
});

// =================== MAP VISIBILITY TOGGLE ===================
checkboxRoot.addEventListener('click', () => {
  if (checkboxRoot.checked) {
    Root.style.display = "none";
    distance.style.display = "none";
    speed.style.display = "none";
  } else {
    Root.style.display = "block";
    distance.style.display = "block";
    speed.style.display = "block";
  }
});

function closePage() {
  addTrainingPopup.style.display = "none";
}

// =================== RESPONSIVE MAP ===================
const mediaQuery = window.matchMedia('(max-width: 1000px)');
if (mediaQuery.matches && !checkboxRoot.checked) {
  Root.style.width = "700px";
  Map.style.width = "860px";
  Map.style.height = "1000px";
  Map.style.marginLeft = "25%";
  Map.style.position = "absolute";
  mapContent.style.width = "100%";
  mapContent.style.height = "100vh";
}

// =================== MAP INTERACTION ===================
checkboxRoot.addEventListener('click', () => {
  const pointer = checkboxRoot.checked ? "none" : "auto";
  Map.style.pointerEvents = pointer;
  startRouteButton.style.display = checkboxRoot.checked ? "none" : "block";
  stopRouteButton.style.display = checkboxRoot.checked ? "none" : "block";
  fetchNearbyRoutesButton.style.display = checkboxRoot.checked ? "none" : "block";
});

// =================== ROUTES DISPLAY ===================
function drawNearbyRoutesOnLeaflet(routes) {
  if (!Array.isArray(routes)) return;
  routes.forEach(route => {
    try {
      const parsedPolyline = JSON.parse(route.polyline);
      const latlngs = parsedPolyline.map(coord => L.latLng(coord.lat, coord.lng));
      const polyline = L.polyline(latlngs, {
        color: 'red',
        weight: 4,
        opacity: 0.7
      }).addTo(map);
      polyline.bindPopup(`<b>${route.routeName || "Unnamed Route"}</b>`);
    } catch (e) {
      console.warn("Invalid polyline:", route);
    }
  });
}

function displayRouteWithLabel(route) {
  try {
    const latlngs = JSON.parse(route.polyline).map(coord => L.latLng(coord.lat, coord.lng));
    const polyline = L.polyline(latlngs, { color: 'blue', weight: 4, opacity: 0.8 }).addTo(map);
    const topCoord = latlngs.reduce((top, coord) => (coord.lat > top.lat ? coord : top));
    const labelText = `${route.username} | ${route.distance.toFixed(2)} km | ${route.speed.toFixed(2)} km/h`;
    L.marker(topCoord, {
      icon: L.divIcon({
        className: 'route-label',
        html: `<div style="
          background: white;
          border: 1px solid #ccc;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0px 2px 6px rgba(0,0,0,0.25);
        ">${labelText}</div>`,
        iconAnchor: [30, 15]
      })
    }).addTo(map);
  } catch (err) {
    console.error("Failed to parse polyline for route:", err);
  }
}

function fetchNearbyRoutes(lat, lng) {
  fetch(`https://betaversionwebsite.onrender.com/api/routes-nearby?lat=${lat}&lng=${lng}`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        alert("No nearby routes found.");
        return;
      }
      data.forEach(route => displayRouteWithLabel(route));
      drawNearbyRoutesOnLeaflet(data);
    })
    .catch(err => console.error("Fetch failed:", err));
}

// =================== TRAININGS NEARBY ===================
async function retrieveNearbyTrainings() {
  console.log("🟢 Button clicked - retrieveNearbyTrainings triggered"); // <-- odmah na startu

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    console.log(`📍 User location: lat=${latitude}, lng=${longitude}`);

    const radius = 35000; // radius u metrima
    console.log(`🛣 Fetching trainings within radius: ${radius}m`);

    if (window.currentMarkers) {
      window.currentMarkers.forEach(marker => map.removeLayer(marker));
      window.currentMarkers = [];
      console.log("🗑 Previous markers removed");
    }

    try {
      const res = await fetch(`https://betaversionwebsite.onrender.com/api/nearby-trainings?lat=${latitude}&lng=${longitude}&radius=${radius}`);
      console.log("🌐 Fetch response status:", res.status);

      const trainings = await res.json();
      console.log("📦 Trainings received from server:", trainings);

      if (!Array.isArray(trainings) || trainings.length === 0) {
        console.log("⚠️ No trainings found nearby.");
        alert("No trainings found nearby.");
        return;
      }
const dumbbellIcon = L.icon({
  iconUrl: 'https://img.icons8.com/ios/50/dumbbell.png', // tvoja sportska ikona
  iconSize: [40, 40],      // veličina ikone
  iconAnchor: [20, 40],    // tačka na ikoni koja pokazuje lokaciju
  popupAnchor: [0, -40]    // pozicija popup-a u odnosu na ikonu
});
      trainings.forEach(t => {
        console.log(`🏋️ Training: ${t.trainingName || "Unnamed"}, Lat: ${t.latitude}, Lng: ${t.longitude}`);
        if (t.latitude && t.longitude) {
            const marker = L.marker([t.latitude, t.longitude], { icon: dumbbellIcon })
            .addTo(map)
            .bindPopup(`
              <b>${t.trainingName || "Unnamed Training"}</b><br>
              🏋️‍♂️ PushUps: ${t.pushUps || 0}<br>
              💪 PullUps: ${t.pullUps || 0}<br>
              🧍 SitUps: ${t.sitUps || 0}<br>
              ⏱ Duration: ${t.duration || 0} min
            `);
          window.currentMarkers = window.currentMarkers || [];
          window.currentMarkers.push(marker);
        }
      });

    } catch (err) {
      console.error("❌ Error retrieving trainings:", err);
      alert("Error retrieving trainings.");
    }
  }, (error) => {
    console.error("⚠️ Could not get location:", error);
    alert("Could not get location: " + error.message);
  });
}

// ✅ Jedan jedini listener
fetchNearbyTrainingsButton.addEventListener("click", retrieveNearbyTrainings);
