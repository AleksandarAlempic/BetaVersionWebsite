// =================== ELEMENT REFERENCES ===================
const musicPlayer = document.getElementById("checkboxMusicPlayer");
const checkboxRoot = document.getElementById("checkboxRoot");
const audioContainer = document.getElementById("audioContainer");
const newNextAndPreviousButtons = document.getElementById("newNextAndPreviousButtons");
const songNameAndArtist = document.getElementById("songNameAndArtist");

const stopwatchDiv = document.getElementById("StopwatchOptions");
const timerDiv = document.getElementById("TimerOptions");
const input = document.getElementById("input");

const startRouteButton = document.getElementById("startRouteButton");
const stopRouteButton = document.getElementById("stopRouteButton");
const fetchNearbyRoutesButton = document.getElementById("fetchNearbyRoutesButton");
const fetchNearbyTrainingsButton = document.getElementById("fetchNearbyTrainingsButton");
const addTrainingButton = document.getElementById("fetchAddTrainingButton");
const addTrainingPopup = document.getElementById("addTrainingPopup");

const Root = document.getElementById("map-content");
const Map = document.getElementById("map");
const mapContent = document.getElementById("map-content");

const distance = document.getElementById("distance");
const speed = document.getElementById("speed");

const stopwatch = document.getElementById("stopwatch");
const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

const secondHand = document.getElementById('secondHand');
const languageSelect = document.getElementById("languageSelect");

let stopwatchTriggered = false;
let timerTriggered = false;
let hours = 0, minutes = 0, seconds = 0;
let rotationDegree = 0;
let myInterval;

// =================== TRANSLATIONS ===================
const translations = {
  en: {
    noNearbyRoutes: "No nearby routes found.",
    noNearbyTrainings: "No trainings found nearby.",
    couldNotGetLocation: "Could not get location: ",
    distance: "Distance",
    speed: "Speed",
    routeName: "Route Name",
    unknownUser: "Unknown User",
    pushUps: "PushUps",
    pullUps: "PullUps",
    sitUps: "SitUps",
    duration: "Duration",
    unnamedTraining: "Unnamed Training",
    unnamedRoute: "Unnamed"
  },
  sr: {
    noNearbyRoutes: "Nema ruta u blizini.",
    noNearbyTrainings: "Nema treninga u blizini.",
    couldNotGetLocation: "Ne mogu da dobijem lokaciju: ",
    distance: "Udaljenost",
    speed: "Brzina",
    routeName: "Naziv rute",
    unknownUser: "Nepoznat korisnik",
    pushUps: "Sklekovi",
    pullUps: "Zgibovi",
    sitUps: "Trbušnjaci",
    duration: "Trajanje",
    unnamedTraining: "Neimenovani trening",
    unnamedRoute: "Neimenovana ruta"
  }
};

let currentLanguage = "en";

// =================== LANGUAGE DROPDOWN ===================
languageSelect.addEventListener("change", (e) => {
  currentLanguage = e.target.value;
  updateInterfaceLanguage();
});

function updateInterfaceLanguage() {
  distance.innerText = translations[currentLanguage].distance;
  speed.innerText = translations[currentLanguage].speed;
}
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

  const pointer = checkboxRoot.checked ? "none" : "auto";
  Map.style.pointerEvents = pointer;
  startRouteButton.style.display = checkboxRoot.checked ? "none" : "block";
  stopRouteButton.style.display = checkboxRoot.checked ? "none" : "block";
  fetchNearbyRoutesButton.style.display = checkboxRoot.checked ? "none" : "block";
});

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
    const radius = 35000;

    if (window.currentRouteMarkers) {
      window.currentRouteMarkers.forEach(marker => map.removeLayer(marker));
      window.currentRouteMarkers = [];
    }

    try {
      const res = await fetch(`https://betaversionwebsite.onrender.com/api/routes-nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
      const routes = await res.json();

      if (!Array.isArray(routes) || routes.length === 0) {
        alert(translations[currentLanguage].noNearbyRoutes);
        return;
      }

      routes.forEach(route => {
        const latlngs = JSON.parse(route.polyline).map(coord => L.latLng(coord.lat, coord.lng));
        L.polyline(latlngs, { color: 'blue', weight: 4, opacity: 0.8 }).addTo(map);
        const topCoord = latlngs.reduce((top, coord) => (coord.lat > top.lat ? coord : top));

        const marker = L.marker(topCoord, { icon: runnerIcon }).addTo(map);
        marker.bindPopup(`
          <b>${route.username || translations[currentLanguage].unknownUser}</b><br>
          🛣 ${translations[currentLanguage].distance}: ${route.distance.toFixed(2)} km<br>
          ⏱ ${translations[currentLanguage].speed}: ${route.speed.toFixed(2)} km/h<br>
          🏃‍♂️ ${translations[currentLanguage].routeName}: ${route.routeName || translations[currentLanguage].unnamedRoute}
        `);

        window.currentRouteMarkers = window.currentRouteMarkers || [];
        window.currentRouteMarkers.push(marker);
      });

    } catch (err) {
      console.error("Error retrieving nearby routes:", err);
      alert(translations[currentLanguage].noNearbyRoutes);
    }
  }, (error) => {
    console.error("Could not get location:", error);
    alert(translations[currentLanguage].couldNotGetLocation + error.message);
  });
}

// =================== FETCH NEARBY TRAININGS ===================
async function retrieveNearbyTrainings() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const radius = 35000;

    if (window.currentTrainingMarkers) {
      window.currentTrainingMarkers.forEach(marker => map.removeLayer(marker));
      window.currentTrainingMarkers = [];
    }

    try {
      const res = await fetch(`https://betaversionwebsite.onrender.com/api/nearby-trainings?lat=${latitude}&lng=${longitude}&radius=${radius}`);
      const trainings = await res.json();

      if (!Array.isArray(trainings) || trainings.length === 0) {
        alert(translations[currentLanguage].noNearbyTrainings);
        return;
      }

      trainings.forEach(t => {
        if (t.latitude && t.longitude) {
          const marker = L.marker([t.latitude, t.longitude], { icon: dumbbellIcon })
            .addTo(map)
            .bindPopup(`
              <b>${t.trainingName || translations[currentLanguage].unnamedTraining}</b><br>
              🏋️‍♂️ ${translations[currentLanguage].pushUps}: ${t.pushUps || 0}<br>
              💪 ${translations[currentLanguage].pullUps}: ${t.pullUps || 0}<br>
              🧍 ${translations[currentLanguage].sitUps}: ${t.sitUps || 0}<br>
              ⏱ ${translations[currentLanguage].duration}: ${t.duration || 0} min
            `);

          window.currentTrainingMarkers = window.currentTrainingMarkers || [];
          window.currentTrainingMarkers.push(marker);
        }
      });

    } catch (err) {
      console.error("Error retrieving trainings:", err);
      alert(translations[currentLanguage].noNearbyTrainings);
    }
  }, (error) => {
    console.error("Could not get location:", error);
    alert(translations[currentLanguage].couldNotGetLocation + error.message);
  });
}

// =================== BUTTON LISTENERS ===================
fetchNearbyRoutesButton.addEventListener("click", retrieveNearbyRoutes);
fetchNearbyTrainingsButton.addEventListener("click", retrieveNearbyTrainings);

function closePage() {
  addTrainingPopup.style.display = "none";
}
