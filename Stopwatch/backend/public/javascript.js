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

const YT_API_KEY = "TVOJ_API_KEY"; // zameni svojim ključem
const MAX_CUSTOM_SONGS = 12;

let customPlaylist = [];
let currentCustomIndex = 0;
let selectedSongForAdd = null;
let ytPlayer = null;

// DOM elementi
const ytInput = document.getElementById("youtubeInput");
const suggestionsBox = document.getElementById("youtubeSuggestions");
const saveYoutubeBtn = document.getElementById("saveYoutubeBtn");
const cancelYoutubeBtn = document.getElementById("cancelYoutubeBtn");
const ytContainer = document.getElementById('youtubePlayerContainer');
const coverImg = document.querySelector('.disk');
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.pervious-btn');
const songNameAndArtist = document.getElementById("songNameAndArtist");

// --- HELPERS ---
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

async function youtubeSearch(query, maxResults = 5) {
    if (!query || query.length < 2) return [];
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${YT_API_KEY}`);
        const data = await res.json();
        return data.items || [];
    } catch(e){ console.warn("YT search error", e); return []; }
}

// --- SHOW SUGGESTIONS ---
function showYtSuggestions(items) {
    suggestionsBox.innerHTML = "";
    if (!items.length) {
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
                videoId: it.id.videoId
            };
            ytInput.value = selectedSongForAdd.name;
            suggestionsBox.innerHTML = "";
            suggestionsBox.style.display = "none";
        });
        suggestionsBox.appendChild(div);
    });
}

// --- INPUT EVENT ---
let ytTypingTimer = null;
ytInput.addEventListener("input", () => {
    const v = ytInput.value.trim();
    selectedSongForAdd = null;
    if (ytTypingTimer) clearTimeout(ytTypingTimer);
    if (!v) return;

    ytTypingTimer = setTimeout(async () => {
        const items = await youtubeSearch(v, 6);
        showYtSuggestions(items);
    }, 300);
});

// --- CANCEL BUTTON ---
cancelYoutubeBtn.addEventListener("click", () => {
    selectedSongForAdd = null;
    ytInput.value = "";
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "none";
});

// --- SAVE TO PLAYLIST ---
saveYoutubeBtn.addEventListener("click", () => {
    if (!selectedSongForAdd) {
        alert("Select a song first.");
        return;
    }
    if (customPlaylist.length >= MAX_CUSTOM_SONGS) {
        alert("Playlist limit reached.");
        return;
    }

    customPlaylist.push(selectedSongForAdd);
    saveCustomPlaylist();
    ytInput.value = "";
    selectedSongForAdd = null;
    playCustomSong(customPlaylist.length-1); // automatski pusti poslednju dodatu pesmu
});

// --- LOCAL STORAGE ---
function saveCustomPlaylist() {
    localStorage.setItem("customPlaylist_v2", JSON.stringify(customPlaylist));
}

function loadCustomPlaylist() {
    const raw = localStorage.getItem("customPlaylist_v2");
    if(raw){
        customPlaylist = JSON.parse(raw);
    }
}
loadCustomPlaylist();

// --- YT PLAYER ---
function createYTPlayer(videoId) {
    if (!ytPlayer) {
        ytPlayer = new YT.Player('youtubePlayerContainer', {
            height: '0',
            width: '0',
            videoId: videoId,
            events: {
                'onReady': (e) => e.target.playVideo(),
                'onStateChange': onPlayerStateChange
            }
        });
    } else {
        ytPlayer.loadVideoById(videoId);
    }
}

function onPlayerStateChange(event) {
    if(event.data === YT.PlayerState.ENDED) nextCustomSong();
}

// --- PLAYBACK FUNCTIONS ---
function playCustomSong(index) {
    if (!customPlaylist[index]) return;
    currentCustomIndex = index;
    const song = customPlaylist[index];
    coverImg.src = song.cover;
    songNameAndArtist.innerText = `${song.name} - ${song.artist}`;
    createYTPlayer(song.videoId);
}

function playPauseCustom() {
    if(!ytPlayer) return;
    const state = ytPlayer.getPlayerState();
    if(state === YT.PlayerState.PLAYING) ytPlayer.pauseVideo();
    else ytPlayer.playVideo();
}

function nextCustomSong() {
    let nextIndex = (currentCustomIndex + 1) % customPlaylist.length;
    playCustomSong(nextIndex);
}

function prevCustomSong() {
    let prevIndex = (currentCustomIndex - 1 + customPlaylist.length) % customPlaylist.length;
    playCustomSong(prevIndex);
}

// --- EVENT LISTENERS ---
playBtn.addEventListener('click', playPauseCustom);
nextBtn.addEventListener('click', nextCustomSong);
prevBtn.addEventListener('click', prevCustomSong);

