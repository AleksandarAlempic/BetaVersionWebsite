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

// =================== ICON DEFINITIONS ===================
const runnerIcon = L.icon({
  iconUrl: '/images/MarkersAndRoute.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const dumbbellIcon = L.icon({
  iconUrl: 'https://img.icons8.com/ios/50/dumbbell.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// =================== FETCH NEARBY ROUTES ===================
async function retrieveNearbyRoutes() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const radius = 35000; // radius u metrima

    if (window.currentRouteMarkers) {
      window.currentRouteMarkers.forEach(marker => map.removeLayer(marker));
      window.currentRouteMarkers = [];
    }

    try {
      const res = await fetch(`https://betaversionwebsite.onrender.com/api/routes-nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
      const routes = await res.json();

      if (!Array.isArray(routes) || routes.length === 0) {
        alert("No nearby routes found.");
        return;
      }

      routes.forEach(route => {
        const latlngs = JSON.parse(route.polyline).map(coord => L.latLng(coord.lat, coord.lng));
        L.polyline(latlngs, { color: 'blue', weight: 4, opacity: 0.8 }).addTo(map);
        const topCoord = latlngs.reduce((top, coord) => (coord.lat > top.lat ? coord : top));

        const marker = L.marker(topCoord, { icon: runnerIcon }).addTo(map);
        marker.bindPopup(`
          <b>${route.username || "Unknown User"}</b><br>
          🛣 Distance: ${route.distance.toFixed(2)} km<br>
          ⏱ Speed: ${route.speed.toFixed(2)} km/h<br>
          🏃‍♂️ Route Name: ${route.routeName || "Unnamed"}
        `);

        window.currentRouteMarkers = window.currentRouteMarkers || [];
        window.currentRouteMarkers.push(marker);
      });

    } catch (err) {
      console.error("Error retrieving nearby routes:", err);
      alert("Error retrieving nearby routes.");
    }
  }, (error) => {
    console.error("Could not get location:", error);
    alert("Could not get location: " + error.message);
  });
}

// =================== FETCH NEARBY TRAININGS ===================
async function retrieveNearbyTrainings() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const radius = 35000; // radius u metrima

    if (window.currentTrainingMarkers) {
      window.currentTrainingMarkers.forEach(marker => map.removeLayer(marker));
      window.currentTrainingMarkers = [];
    }

    try {
      const res = await fetch(`https://betaversionwebsite.onrender.com/api/nearby-trainings?lat=${latitude}&lng=${longitude}&radius=${radius}`);
      const trainings = await res.json();

      if (!Array.isArray(trainings) || trainings.length === 0) {
        alert("No trainings found nearby.");
        return;
      }

      trainings.forEach(t => {
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
          window.currentTrainingMarkers = window.currentTrainingMarkers || [];
          window.currentTrainingMarkers.push(marker);
        }
      });

    } catch (err) {
      console.error("Error retrieving trainings:", err);
      alert("Error retrieving trainings.");
    }
  }, (error) => {
    console.error("Could not get location:", error);
    alert("Could not get location: " + error.message);
  });
}

// =================== BUTTON LISTENERS ===================
fetchNearbyRoutesButton.addEventListener("click", retrieveNearbyRoutes);
fetchNearbyTrainingsButton.addEventListener("click", retrieveNearbyTrainings);
