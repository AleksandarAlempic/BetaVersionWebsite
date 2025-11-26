// =================== ELEMENT REFERENCES =====================
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
const playListBtn = document.querySelector('.addPlaylistButton');

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
    distance: "Distance:",
    speed: "Speed:",
    routeName: "Route Name",
    unknownUser: "Unknown User",
    pushUps: "PushUps",
    pullUps: "PullUps",
    sitUps: "SitUps",
    duration: "Duration",
    unnamedTraining: "Unnamed Training",
    unnamedRoute: "Unnamed",
    stopwatchLabel: "Stopwatch",
    timerLabel: "Timer",
    addTrainingPopupLabels: {
      pushUps: "PushUps",
      pullUps: "PullUps",
      sitUps: "SitUps",
      duration: "Duration",
      trainingName: "Training Name"
    }
  },
  sr: {
    noNearbyRoutes: "Nema ruta u blizini.",
    noNearbyTrainings: "Nema treninga u blizini.",
    couldNotGetLocation: "Ne mogu da dobijem lokaciju: ",
    distance: "Rastojanje:",
    speed: "Brzina:",
    routeName: "Naziv rute",
    unknownUser: "Nepoznat korisnik",
    pushUps: "Sklekovi",
    pullUps: "Zgibovi",
    sitUps: "Trbušnjaci",
    duration: "Trajanje",
    unnamedTraining: "Neimenovani trening",
    unnamedRoute: "Neimenovana ruta",
    stopwatchLabel: "Štoperica",
    timerLabel: "Tajmer",
    addTrainingPopupLabels: {
      pushUps: "Sklekovi",
      pullUps: "Zgibovi",
      sitUps: "Trbušnjaci",
      duration: "Trajanje",
      trainingName: "Naziv treninga"
    }
  }
};

let currentLanguage = localStorage.getItem("selectedLanguage") || "en";
languageSelect.value = currentLanguage;

// =================== LANGUAGE DROPDOWN ===================
languageSelect.addEventListener("change", (e) => {
  currentLanguage = e.target.value;
  localStorage.setItem("selectedLanguage", currentLanguage);
  updateInterfaceLanguage();
  updateTrainingPopupLanguage(currentLanguage);
  updateRouteMarkersLanguage(currentLanguage);
  updateTrainingMarkersLanguage(currentLanguage);
});

// =================== UPDATE UI LANGUAGE ===================
function updateInterfaceLanguage() {
  distance.innerText = translations[currentLanguage].distance;
  speed.innerText = translations[currentLanguage].speed;

  stopwatch.innerText = translations[currentLanguage].stopwatchLabel;
  timer.innerText = translations[currentLanguage].timerLabel;

  input.placeholder = currentLanguage === "en" ? "HH:MM:SS" : "SS:MM:HH";

  startRouteButton.innerText = currentLanguage === "en" ? "Start Route" : "Pokreni rutu";
  stopRouteButton.innerText = currentLanguage === "en" ? "Stop Route" : "Zaustavi rutu";
  fetchNearbyRoutesButton.innerText = currentLanguage === "en" ? "Fetch Nearby Routes" : "Prikaži rute u blizini";
  fetchNearbyTrainingsButton.innerText = currentLanguage === "en" ? "Fetch Nearby Trainings" : "Prikaži treninge u blizini";
  addTrainingButton.innerText = currentLanguage === "en" ? "Add Training" : "Dodaj trening";

  const popupTitle = addTrainingPopup.querySelector(".popup-title");
  if (popupTitle) popupTitle.innerText = currentLanguage === "en" ? "Add New Training" : "Dodaj novi trening";

  const popupLabels = addTrainingPopup.querySelectorAll(".popup-label");
  popupLabels.forEach(label => {
    const key = label.dataset.labelKey;
    if (key && translations[currentLanguage].addTrainingPopupLabels[key]) {
      label.innerText = translations[currentLanguage].addTrainingPopupLabels[key];
    }
  });
}

// =================== TRAINING POPUP TRANSLATIONS ===================
const trainingTranslations = {
  en: {
    addTrainingButton: "Add Training",
    trainingNameLabel: "Training Name",
    userNameLabel: "User Name",
    pushUpsLabel: "Push Ups",
    pullUpsLabel: "Pull Ups",
    sitUpsLabel: "Sit Ups",
    absCountLabel: "Abs",
    durationLabel: "Duration (min)",
    otherExerciseLabel: "Other Exercise",
    saveButton: "Save",
    cancelButton: "X"
  },
  sr: {
    addTrainingButton: "Dodaj Trening",
    trainingNameLabel: "Naziv treninga",
    userNameLabel: "Ime korisnika",
    pushUpsLabel: "Sklekovi",
    pullUpsLabel: "Zgibovi",
    sitUpsLabel: "Čučnjevi",
    absCountLabel: "Trbušnjaci",
    durationLabel: "Trajanje (min)",
    otherExerciseLabel: "Ostale vežbe",
    saveButton: "Sačuvaj",
    cancelButton: "X"
  }
};

function updateTrainingPopupLanguage(lang) {
  document.getElementById("fetchAddTrainingButton").textContent = trainingTranslations[lang].addTrainingButton;
  document.querySelector('label[for="trainingName"]').textContent = trainingTranslations[lang].trainingNameLabel;
  document.querySelector('label[for="userName"]').textContent = trainingTranslations[lang].userNameLabel;
  document.querySelector('label[for="pushUps"]').textContent = trainingTranslations[lang].pushUpsLabel;
  document.querySelector('label[for="pullUps"]').textContent = trainingTranslations[lang].pullUpsLabel;
  document.querySelector('label[for="sitUps"]').textContent = trainingTranslations[lang].sitUpsLabel;
  document.querySelector('label[for="absCount"]').textContent = trainingTranslations[lang].absCountLabel;
  document.querySelector('label[for="duration"]').textContent = trainingTranslations[lang].durationLabel;
  document.querySelector('label[for="otherExercise"]').textContent = trainingTranslations[lang].otherExerciseLabel;
  document.querySelector(".saveButtonTraining").textContent = trainingTranslations[lang].saveButton;
  document.querySelector(".cancelButtonTraining").textContent = trainingTranslations[lang].cancelButton;
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

let timerInterval;  // globalno za kontrolu intervala

function setInterval1Timer() {
    // Uzmi vrednost iz input polja
    const inputValue = document.getElementById('input').value.trim(); // format HH:MM:SS
    const parts = inputValue.split(':');

    if (parts.length !== 3) {
        alert("Format mora biti HH:MM:SS");
        return;
    }

    let hours = parseInt(parts[0], 10);
    let minutes = parseInt(parts[1], 10);
    let seconds = parseInt(parts[2], 10);

    // Zaustavi prethodni interval ako postoji
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(timerInterval);
                   

                    // Pusti audio pesmu
                    const alarmAudio = document.getElementById('audio1');
                    if (alarmAudio) {
                        alarmAudio.currentTime = 0; // Vrati na početak
                        alarmAudio.play();           // Pusti pesmu
                    }

                    return;
                }
            }
        }

        // Formatiranje sa vodećim nulama
        const hStr = hours.toString().padStart(2, '0');
        const mStr = minutes.toString().padStart(2, '0');
        const sStr = seconds.toString().padStart(2, '0');

        document.getElementById('input').value = `${hStr}:${mStr}:${sStr}`;
    }, 1000);
}

// Funkcija za zaustavljanje tajmera
function myStopTimer() {
    clearInterval(timerInterval);
}

// Funkcija za resetovanje tajmera
function resetFunction() {
    clearInterval(timerInterval);
    document.getElementById('input').value = "00:00:00";
}


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
  fetchNearbyTrainingsButton.style.display = checkboxRoot.checked ? "none" : "block";
  addTrainingButton.style.display = checkboxRoot.checked ? "none" : "block";
  playListBtn.style.display = checkboxRoot.checked ? "none" : "block";
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

        const marker = L.marker(topCoord, { icon: runnerIcon });
        marker.options.routeData = route; 
        marker.bindPopup(`
          <b>${route.username || translations[currentLanguage].unknownUser}</b><br>
          🛣 ${translations[currentLanguage].distance}: ${route.distance.toFixed(2)} km<br>
          ⏱ ${translations[currentLanguage].speed}: ${route.speed.toFixed(2)} km/h<br>
          🏃‍♂️ ${translations[currentLanguage].routeName}: ${route.routeName || translations[currentLanguage].unnamedRoute}
        `);
        marker.addTo(map); 
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
          const marker = L.marker([t.latitude, t.longitude], { icon: dumbbellIcon });
          marker.options.trainingData = t;
          marker.addTo(map).bindPopup(`
            <b>${t.trainingName || translations[currentLanguage].unnamedTraining}</b><br>
            🏋️‍♂️ ${translations[currentLanguage].addTrainingPopupLabels.pushUps}: ${t.pushUps || 0}<br>
            💪 ${translations[currentLanguage].addTrainingPopupLabels.pullUps}: ${t.pullUps || 0}<br>
            🧍 ${translations[currentLanguage].addTrainingPopupLabels.sitUps}: ${t.sitUps || 0}<br>
            ⏱ ${translations[currentLanguage].addTrainingPopupLabels.duration}: ${t.duration || 0} min
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
addTrainingButton.addEventListener('click', () => addTrainingPopup.style.display = "block");

// =================== UPDATE MARKERS LANGUAGE ===================
function updateRouteMarkersLanguage(lang) {
  if (window.currentRouteMarkers) {
    window.currentRouteMarkers.forEach(marker => {
      const route = marker.options.routeData;
      if (!route) return;
      marker.setPopupContent(`
        <b>${route.username || translations[lang].unknownUser}</b><br>
        🛣 ${translations[lang].distance} ${route.distance.toFixed(2)} km<br>
        ⏱ ${translations[lang].speed} ${route.speed.toFixed(2)} km/h<br>
        🏃‍♂️ ${translations[lang].routeName}: ${route.routeName || translations[lang].unnamedRoute}
      `);
    });
  }
}

function updateTrainingMarkersLanguage(lang) {
  if (window.currentTrainingMarkers) {
    window.currentTrainingMarkers.forEach(marker => {
      const t = marker.options.trainingData;
      if (!t) return;
      marker.setPopupContent(`
        <b>${t.trainingName || translations[lang].unnamedTraining}</b><br>
        🏋️‍♂️ ${translations[lang].addTrainingPopupLabels.pushUps}: ${t.pushUps || 0}<br>
        💪 ${translations[lang].addTrainingPopupLabels.pullUps}: ${t.pullUps || 0}<br>
        🧍 ${translations[lang].addTrainingPopupLabels.sitUps}: ${t.sitUps || 0}<br>
        ⏱ ${translations[lang].addTrainingPopupLabels.duration}: ${t.duration || 0} min
      `);
    });
  }
}

stopwatch.addEventListener('click', () => {
  stopwatchTriggered = true;
  timerTriggered = false;
  stopwatchDiv.style.display = "inline-flex";
  timerDiv.style.display = "none";
  
});

playListBtn.addEventListener('click', () => {
    Root.style.setProperty("z-index", "1000000", "important");
});
// =================== CLOSE POPUP ===================
function closePage() {
  addTrainingPopup.style.display = "none";
}

// =================== INITIAL LANGUAGE SETUP ===================
updateInterfaceLanguage();
updateTrainingPopupLanguage(currentLanguage);
updateRouteMarkersLanguage(currentLanguage);
updateTrainingMarkersLanguage(currentLanguage);

document.addEventListener("DOMContentLoaded", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log("Window width:", width);
    console.log("Window height:", height);

    // Ako želiš da automatski reaguješ na promenu veličine prozora
    window.addEventListener("resize", () => {
        console.log("Resized width:", window.innerWidth);
        console.log("Resized height:", window.innerHeight);
    });
});

/* ================= CUSTOM PLAYLIST + YT SEARCH ================= */

const YT_API_KEY = "AIzaSyBwwc6TSxopW7mc3PMjK6dYks0jfPZ_cbY";
const MAX_CUSTOM_SONGS = 12;

// --- state ---
window.customPlaylist = window.customPlaylist || [];
let selectedSongForAdd = null;

// --- DOM ---
const ytInput = document.getElementById("youtubeInput");
const suggestionsBox = document.getElementById("youtubeSuggestions");
const saveYoutubeBtn = document.getElementById("saveYoutubeBtn");
const cancelYoutubeBtn = document.getElementById("cancelYoutubeBtn");
const addPlaylistPopup = document.getElementById("addPlaylistPopup");
const customLimitMsg = document.getElementById("customPlaylistLimitMsg");
const customPlaylistElement = document.getElementById("kindOfMusic7");

// --- helpers ---
function extractVideoId(url) {
    if (!url) return null;
    const patterns = [
        /(?:youtu\.be\/)([^?&\n]+)/,
        /[?&]v=([^?&\n]+)/,
        /youtube\.com\/embed\/([^?&\n]+)/,
        /youtube\.com\/shorts\/([^?&\n]+)/,
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m && m[1]) return m[1];
    }
    if (/^[a-zA-Z0-9_-]{10,}$/.test(url)) return url;
    return null;
}

async function youtubeGetVideoInfo(videoId) {
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YT_API_KEY}`);
        const data = await res.json();
        if (data.items && data.items.length) return data.items[0].snippet;
    } catch(e) { console.warn("YT info error", e); }
    return null;
}

async function youtubeSearch(query, maxResults = 5) {
    if (!query || query.length < 2) return [];
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${YT_API_KEY}`);
        const data = await res.json();
        return data.items || [];
    } catch(e){ console.warn("YT search error", e); return []; }
}

function showYtSuggestions(items) {
    suggestionsBox.innerHTML = "";
    if (!items || !items.length) {
        suggestionsBox.style.display = "none";
        return;
    }
    suggestionsBox.style.display = "block";

    items.forEach(it => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;">
                <img src="${it.snippet.thumbnails.default.url}" style="width:48px;height:36px;object-fit:cover;border-radius:4px;">
                <div style="text-align:left;">
                    <div style="font-size:13px;font-weight:600;">${it.snippet.title}</div>
                    <div style="font-size:11px;color:#666;">${it.snippet.channelTitle}</div>
                </div>
            </div>
        `;
        div.addEventListener("click", () => {
            selectedSongForAdd = {
                name: it.snippet.title,
                artist: it.snippet.channelTitle,
                cover: `https://img.youtube.com/vi/${it.id.videoId}/maxresdefault.jpg`,
                path: `https://www.youtube.com/watch?v=${it.id.videoId}`
            };
            ytInput.value = selectedSongForAdd.name;
            suggestionsBox.innerHTML = "";
            suggestionsBox.style.display = "none";
        });
        suggestionsBox.appendChild(div);
    });
}

// --- Input ---
let ytTypingTimer = null;
ytInput.addEventListener("input", async () => {
    const v = ytInput.value.trim();
    selectedSongForAdd = null;

    if (v.includes("youtube.com") || v.includes("youtu.be") || /^[a-zA-Z0-9_-]{10,}$/.test(v)) {
        suggestionsBox.style.display = "none";
        const vid = extractVideoId(v);
        if (vid) {
            const info = await youtubeGetVideoInfo(vid);
            if (info) {
                selectedSongForAdd = {
                    name: info.title,
                    artist: info.channelTitle,
                    cover: `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`,
                    path: `https://www.youtube.com/watch?v=${vid}`
                };
                ytInput.value = selectedSongForAdd.name;
            }
        }
        return;
    }

    if (ytTypingTimer) clearTimeout(ytTypingTimer);
    if (!v) return;

    ytTypingTimer = setTimeout(async () => {
        const items = await youtubeSearch(v, 6);
        showYtSuggestions(items);
    }, 380);
});

// --- Cancel ---
cancelYoutubeBtn.addEventListener("click", () => {
    selectedSongForAdd = null;
    ytInput.value = "";
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "none";
    customLimitMsg.textContent = "";
    if (addPlaylistPopup) addPlaylistPopup.style.display = "none";
});

// --- Add YouTube song ---
saveYoutubeBtn.addEventListener("click", () => {
    if (!selectedSongForAdd) {
        alert("Select a song first.");
        return;
    }
    if (window.customPlaylist.length >= MAX_CUSTOM_SONGS) {
        alert("Limit reached.");
        return;
    }

    // Add song to customPlaylist array
    window.customPlaylist.push(selectedSongForAdd);

    // Ensure Custom Playlist exists in playLists
    let customIndex = playLists.findIndex(pl => pl.name === "Custom Playlist");
    if (customIndex === -1) {
        playLists.push({
            name: "Custom Playlist",
            songs: [...window.customPlaylist]
        });
    } else {
        playLists[customIndex].songs = [...window.customPlaylist];
    }

    // Show Custom Playlist button/UI
    if (customPlaylistElement) customPlaylistElement.style.display = "block";

    // Reset input
    selectedSongForAdd = null;
    ytInput.value = "";
    suggestionsBox.innerHTML = "";
    if (addPlaylistPopup) addPlaylistPopup.style.display = "none";

    // Save to localStorage
    try {
        localStorage.setItem("customPlaylist_v1", JSON.stringify(window.customPlaylist));
    } catch(e){}
});

// --- Load from localStorage on page load ---
(function loadCustomFromLocal() {
    try {
        const raw = localStorage.getItem("customPlaylist_v1");
        if (!raw) return;
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) {
            window.customPlaylist = arr;

            let customIndex = playLists.findIndex(pl => pl.name === "Custom Playlist");
            if (customIndex === -1) {
                playLists.push({
                    name: "Custom Playlist",
                    songs: [...window.customPlaylist]
                });
            } else {
                playLists[customIndex].songs = [...window.customPlaylist];
            }

            if (customPlaylistElement) customPlaylistElement.style.display = "block";
        }
    } catch(e){}
})();

