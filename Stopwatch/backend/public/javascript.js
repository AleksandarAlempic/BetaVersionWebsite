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

// =================== DODAJ FEEDBACK U POSTOJEĆI TRANSLATIONS ===================
translations.en.feedback = {
  title: "Send Feedback",
  placeholder: "Write your message...",
  send: "Send",
  cancel: "Cancel",
  button: "Feedback"
};

translations.sr.feedback = {
  title: "Podeli svoje mišljenje – tvoje iskustvo nam znači",
  placeholder: "Napiši svoju poruku...",
  send: "Pošalji",
  cancel: "Zatvori",
  button: "Feedback"
};

// =================== UPDATE FEEDBACK POPUP ===================
function updateFeedbackPopupLanguage() {
  const t = translations[currentLanguage].feedback;
  if (!t) return;

  feedbackPopup.querySelector("h3").innerText = t.title;
  feedbackText.placeholder = t.placeholder;
  sendFeedbackBtn.innerText = t.send;
  closeFeedbackBtn.innerText = t.cancel;
  openFeedbackBtn.innerText = t.button;
}

// Pozovi odmah kada se stranica učita
updateFeedbackPopupLanguage();

// Kada korisnik promeni jezik
languageSelect.addEventListener("change", (e) => {
  currentLanguage = e.target.value;
  localStorage.setItem("selectedLanguage", currentLanguage);

  updateInterfaceLanguage();
  updateTrainingPopupLanguage(currentLanguage);
  updateRouteMarkersLanguage(currentLanguage);
  updateTrainingMarkersLanguage(currentLanguage);

  updateFeedbackPopupLanguage(); // ⬅ samo ovo dodaješ
});

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
      const res = await fetch(`https://betaversionwebsite.onrender.com/api/nearby-trainings?lat=${laintitude}&lng=${longitude}&radius=${radius}`);
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

// Formspree javascript for feedback button

const FORMSPREE_URL = "https://formspree.io/f/mpwvryrz";

const btnOpen = document.getElementById("openFeedbackBtn");
const btnClose = document.getElementById("closeFeedbackBtn");
const panel = document.getElementById("feedbackPopup");
const overlay = document.getElementById("feedbackOverlay");
const sendBtn = document.getElementById("sendFeedbackBtn");
const textArea = document.getElementById("feedbackText");

// Otvaranje popup-a
btnOpen.addEventListener("click", () => {
    panel.style.left = "7.5px";   // slajd u desno
    overlay.style.display = "block";
   Root.style.display = "none";
    distance.style.display = "none";
    speed.style.display = "none";
  startRouteButton.style.display = "none";
  stopRouteButton.style.display ="none";
  fetchNearbyRoutesButton.style.display = "none";
  fetchNearbyTrainingsButton.style.display = "none";
  addTrainingButton.style.display = "none";
  playListBtn.style.display = "none";
});

// Zatvaranje popup-a
function closeFeedbackPanel() {
    panel.style.left = "-450px";
    overlay.style.display = "none";
   Root.style.display = "block";
    distance.style.display = "block";
    speed.style.display = "block";
   startRouteButton.style.display = "block";
  stopRouteButton.style.display ="block";
  fetchNearbyRoutesButton.style.display = "block";
  fetchNearbyTrainingsButton.style.display = "block";
  addTrainingButton.style.display = "block";
  playListBtn.style.display = "block";
}
btnClose.addEventListener("click", closeFeedbackPanel);
overlay.addEventListener("click", closeFeedbackPanel);

// Send feedback
sendBtn.addEventListener("click", async () => {
    const msg = textArea.value.trim();

    if (!msg) {
        alert("Please write your feedback.");
        return;
    }

    const formData = new FormData();
    formData.append("message", msg);

    try {
        const res = await fetch(FORMSPREE_URL, {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            alert("Your feedback was sent. Thank you!");
            textArea.value = "";
            closeFeedbackPanel();
        } else {
            alert("Failed to send feedback.");
        }
    } catch (err) {
        alert("Network error.");
    }
});

/* ================= CUSTOM PLAYLIST + YOUTUBE PLAYER ================= */



document.addEventListener("DOMContentLoaded", () => {

const YT_API_KEY = "AIzaSyBwwc6TSxopW7mc3PMjK6dYks0jfPZ_cbY"; 
const MAX_CUSTOM_SONGS = 12;

window.customPlaylist = window.customPlaylist || [];
let currentSongIndex = 0;
window.activePlayer = "static"; // po default-u statički player

// DOM elementi
const ytInput = document.getElementById("youtubeInput");
const suggestionsBox = document.getElementById("youtubeSuggestions");
const saveYoutubeBtn = document.getElementById("saveYoutubeBtn");
const cancelYoutubeBtn = document.getElementById("cancelYoutubeBtn");
const addPlaylistPopup = document.getElementById("addPlaylistPopup");
const customPlaylistElement = document.getElementById("kindOfMusic7"); 
const songCover = document.querySelector(".disk img");
const songNameElem = document.querySelector(".songName");
const artistNameElem = document.querySelector(".artistName");

let selectedSongForAdd = null;
let ytInitialized = false;
let ytPlayer = null;
let youtubeScriptLoaded = false;

// --- Helper za extract video ID ---
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
    if (/^[\w-]{10,}$/.test(url)) return url;
    return null;
}

// --- Osiguraj YT Player ---
function ensureYTPlayer() {
    return new Promise((resolve) => {
        if (ytInitialized && ytPlayer && ytPlayer.loadVideoById) return resolve(ytPlayer);
        if (!youtubeScriptLoaded) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
            youtubeScriptLoaded = true;
        }
        const checkYT = () => {
            if (window.YT && window.YT.Player && !ytInitialized) {
                ytInitialized = true;
                ytPlayer = new YT.Player('audioContainer', {
                    height: '0',
                    width: '0',
                    videoId: '',
                    events: { onReady: () => resolve(ytPlayer) },
                    playerVars: { autoplay: 1, controls: 0 }
                });
              window.ytPlayer = ytPlayer; // ⬅ OVO DODATI
            } else {
                setTimeout(checkYT, 100);
            }
        };
        checkYT();
    });
  
}

// --- Play song ---
function playYouTube(songObj) {
    if (!songObj) return;
    ensureYTPlayer().then(() => {
        const vid = extractVideoId(songObj.path);
        if (!vid) return;
        ytPlayer.loadVideoById(vid);
        if (songCover) songCover.src = songObj.cover;
        if (songNameElem) songNameElem.textContent = songObj.name;
        if (artistNameElem) artistNameElem.textContent = songObj.artist;
    });
}

// --- Update Next/Prev buttons ---
function updateNextPrevVisibility() {
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".pervious-btn");

    if (!nextBtn || !prevBtn) {
        setTimeout(updateNextPrevVisibility, 100);
        return;
    }

    // Statički player → dugmad uvek vidljiva
    if (window.activePlayer === "static") {
        nextBtn.style.display = "inline-block";
        prevBtn.style.display = "inline-block";
    } 
    // Custom playlist → vidljivo samo ako ima pesama
    else if (window.activePlayer === "custom" && window.customPlaylist.length > 0) {
        nextBtn.style.display = "inline-block";
        prevBtn.style.display = "inline-block";
    } 
    else {
        nextBtn.style.display = "none";
        prevBtn.style.display = "none";
    }
}

// --- Save song to playlist ---
saveYoutubeBtn && saveYoutubeBtn.addEventListener("click", async () => {
    if (!selectedSongForAdd) return alert("Select a song first.");
    if (window.customPlaylist.length >= MAX_CUSTOM_SONGS) return alert("Limit reached.");

    await ensureYTPlayer();
    window.customPlaylist.push(selectedSongForAdd);
    currentSongIndex = window.customPlaylist.length - 1;

    if (customPlaylistElement) customPlaylistElement.style.display = "block";
    localStorage.setItem("customPlaylist_v1", JSON.stringify(window.customPlaylist));
    window.activePlayer = "custom"; // tek sada aktivira Custom playlist
    enableCustomPlayerUI();
    playYouTube(window.customPlaylist[currentSongIndex]);

    selectedSongForAdd = null;
    ytInput.value = "";
    suggestionsBox.innerHTML = "";
    if (addPlaylistPopup) addPlaylistPopup.style.display = "none";
    setPlaylistToCustomUI();
    updateNextPrevVisibility();
  setPlaylistToCustomUI();
});

// --- Add playlist dugme ---
document.getElementById("fetchCustomPlaylistButton")?.addEventListener("click", () => {
 
    updateNextPrevVisibility();
    if (addPlaylistPopup) {
        addPlaylistPopup.style.display = "block";
        ytInput.value = "";
        selectedSongForAdd = null;
        suggestionsBox.innerHTML = "";
        ytInput.focus();
    }
});

// --- Cancel dugme ---
cancelYoutubeBtn?.addEventListener("click", () => {
    selectedSongForAdd = null;
    ytInput.value = "";
    suggestionsBox.innerHTML = "";
    if (addPlaylistPopup) addPlaylistPopup.style.display = "none";
});

// --- Search input ---
ytInput?.addEventListener("input", async () => {
    const v = ytInput.value.trim();
    selectedSongForAdd = null;
    suggestionsBox.innerHTML = "";

    if (!v) { suggestionsBox.style.display = "none"; return; }

    if (v.includes("youtube.com") || v.includes("youtu.be") || /^[a-zA-Z0-9_-]{10,}$/.test(v)) {
        suggestionsBox.style.display = "none";
        const vid = extractVideoId(v);
        if (vid) {
            const info = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${vid}&key=${YT_API_KEY}`)
                .then(r => r.json())
                .then(d => d.items?.[0]?.snippet)
                .catch(() => null);
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

    setTimeout(async () => {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(v)}&key=${YT_API_KEY}`);
        const data = await res.json();
        const items = data.items || [];
        if (!items.length) { suggestionsBox.style.display = "none"; return; }
        suggestionsBox.style.display = "block";
        items.forEach(it => {
            const div = document.createElement("div");
            div.className = "suggestion-item";
            div.innerHTML = `<div>${it.snippet.title} - ${it.snippet.channelTitle}</div>`;
            div.addEventListener("click", () => {
                selectedSongForAdd = {
                    name: it.snippet.title,
                    artist: it.snippet.channelTitle,
                    cover: `https://img.youtube.com/vi/${it.id.videoId}/maxresdefault.jpg`,
                    path: `https://www.youtube.com/watch?v=${it.id.videoId}`
                };
                ytInput.value = selectedSongForAdd.name;
                suggestionsBox.style.display = "none";
            });
            suggestionsBox.appendChild(div);
        });
    }, 300);
});

// --- Load from localStorage ---
(function loadCustomFromLocal() {
    try {
        const raw = localStorage.getItem("customPlaylist_v1");
        if (!raw) return;
        const arr = JSON.parse(raw);
        if (!Array.isArray(arr)) return;
        window.customPlaylist.length = 0;
        arr.slice(0, MAX_CUSTOM_SONGS).forEach(song => window.customPlaylist.push(song));
        if (window.customPlaylist.length && customPlaylistElement) customPlaylistElement.style.display = "block";
    } catch { window.customPlaylist.length = 0; }
})();
  
function setPlaylistToCustomUI() {
    currentPlayList = 6; // indeks za Custom Playlist
    window.activePlayer = "custom";
    
    if (customPlaylistElement) {
        customPlaylistElement.style.display = "block";
        customPlaylistElement.innerText = "Custom Playlist"; // labela na vrhu
    }

    updateNextPrevVisibility();
}

// --- Dev test songs ---
// window.customPlaylist = [
//     { name: "TEST SONG 1", artist: "Test Artist", cover: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", path: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
//     { name: "TEST SONG 2", artist: "Test Artist", cover: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg", path: "https://www.youtube.com/watch?v=9bZkp7q19f0" }
// ];
currentSongIndex = 0;

// ensureYTPlayer().then(() => { playYouTube(window.customPlaylist[0]); });

// --- Next/Prev buttons ---
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".pervious-btn");

function safeNext() {
    if (window.activePlayer === "custom" && window.customPlaylist.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % window.customPlaylist.length;
        playYouTube(window.customPlaylist[currentSongIndex]);
    } else {
        // statički player koristi svoje dugme i audio element (kao pre)
  
    }
}

function safePrev() {
    if (window.activePlayer === "custom" && window.customPlaylist.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + window.customPlaylist.length) % window.customPlaylist.length;
        playYouTube(window.customPlaylist[currentSongIndex]);
    } else {

    }
}

  // --- Switch između tabova (Custom vs Static player) ---
const tabElements = [
    document.getElementById("kindOfMusic1"),
    document.getElementById("kindOfMusic2"),
    document.getElementById("kindOfMusic3"),
    document.getElementById("kindOfMusic4"),
    document.getElementById("kindOfMusic5"),
    document.getElementById("kindOfMusic6"),
    document.getElementById("kindOfMusic7"), // Custom Playlist
    document.getElementById("kindOfMusic8")
];

tabElements.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        if (index === 6) { // Custom Playlist
            window.activePlayer = "custom";
            if (customPlaylistElement) customPlaylistElement.innerText = "Custom Playlist";
        } else {
            window.activePlayer = "static";
            tab.innerText && (tab.innerText = tab.innerText); // naziv taba
        }
        updateNextPrevVisibility();
    });
});

// if (nextBtn) { nextBtn.replaceWith(nextBtn.cloneNode(true)); }
// if (prevBtn) { prevBtn.replaceWith(prevBtn.cloneNode(true)); }

// const newNext = document.querySelector(".next-btn");
// const newPrev = document.querySelector(".pervious-btn");

// if (newNext) newNext.addEventListener("click", safeNext);
// if (newPrev) newPrev.addEventListener("click", safePrev);

  nextBtn?.addEventListener("click", () => {
    if (window.activePlayer === "custom") safeNext();
});

prevBtn?.addEventListener("click", () => {
    if (window.activePlayer === "custom") safePrev();
});

  

updateNextPrevVisibility();
});

window.disableCustomPlayer = function () {
    if (window.ytPlayer && window.ytPlayer.pauseVideo) {
        window.ytPlayer.pauseVideo();
    }

    const ytContainer = document.getElementById("audioContainer");
    if (ytContainer) ytContainer.style.display = "none";

    // ⬅ LOKALNI QUERY (scope-safe)
    const customPlaylistElement = document.getElementById("kindOfMusic7");
    if (customPlaylistElement) {
        customPlaylistElement.style.display = "none";
    }

    window.activePlayer = "static";
};

function enableCustomPlayerUI() {
    const ytContainer = document.getElementById("audioContainer");
    if (ytContainer) {
        ytContainer.style.display = "block";
    }
}

// --- Ovo je developer verzija za ubrizgagvanje test pesama kada search istekne. 
function playTestCustomPlaylist() {
    // Test pesme
    window.customPlaylist = [
        { 
            name: "TEST SONG 1", 
            artist: "Test Artist", 
            cover: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", 
            path: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
        },
        { 
            name: "TEST SONG 2", 
            artist: "Test Artist", 
            cover: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg", 
            path: "https://www.youtube.com/watch?v=9bZkp7q19f0" 
        }
    ];

    // Aktiviraj custom player
    window.activePlayer = "custom";
    currentSongIndex = 0;

    // Prikaz iframe-a
    const customPlaylistElement = document.getElementById("kindOfMusic7");
    if (customPlaylistElement) {
        customPlaylistElement.style.display = "block";
        customPlaylistElement.innerText = "Custom Playlist";
    }

    // Osiguraj YT Player i pokreni prvu pesmu
  window.ensureYTPlayer().then(() => {
    playYouTube(window.customPlaylist[currentSongIndex]);
});

    // Prikaz Next/Prev dugmadi
    updateNextPrevVisibility();
}

document.getElementById("testCustomBtn")?.addEventListener("click", playTestCustomPlaylist);

// --- Dugmad funkcionalnost --- ovo je test. 
// const nextBtn1 = document.querySelector(".next-btn");
// const prevBtn1 = document.querySelector(".pervious-btn");

// function safeNext() {
//     if (window.activePlayer === "custom" && window.customPlaylist.length > 0) {
//         currentSongIndex = (currentSongIndex + 1) % window.customPlaylist.length;
//         playYouTube(window.customPlaylist[currentSongIndex]);
//     }
// }

// function safePrev() {
//     if (window.activePlayer === "custom" && window.customPlaylist.length > 0) {
//         currentSongIndex = (currentSongIndex - 1 + window.customPlaylist.length) % window.customPlaylist.length;
//         playYouTube(window.customPlaylist[currentSongIndex]);
//     }
// }

// // ukloni stare listener-e
// if (nextBtn1) nextBtn1.replaceWith(nextBtn1.cloneNode(true));
// if (prevBtn1) prevBtn1.replaceWith(prevBtn1.cloneNode(true));

// // ponovo uzmi dugmad iz DOM-a
// const newNext = document.querySelector(".next-btn");
// const newPrev = document.querySelector(".pervious-btn");

// if (newNext) newNext.addEventListener("click", safeNext);
// if (newPrev) newPrev.addEventListener("click", safePrev);


// /* ================= CUSTOM PLAYLIST + YT SEARCH =================  OBSOLETE*/

// const YT_API_KEY = "AIzaSyBwwc6TSxopW7mc3PMjK6dYks0jfPZ_cbY";
// const MAX_CUSTOM_SONGS = 12;

// // --- state ---
// window.customPlaylist = window.customPlaylist || [];
// let selectedSongForAdd = null;

// // --- DOM ---
// const ytInput = document.getElementById("youtubeInput");
// const suggestionsBox = document.getElementById("youtubeSuggestions");
// const saveYoutubeBtn = document.getElementById("saveYoutubeBtn");
// const cancelYoutubeBtn = document.getElementById("cancelYoutubeBtn");
// const addPlaylistPopup = document.getElementById("addPlaylistPopup");
// const customLimitMsg = document.getElementById("customPlaylistLimitMsg");
// const customPlaylistElement = document.getElementById("kindOfMusic7"); // dugme/element u UI

// // --- helpers ---
// function extractVideoId(url) {
//     if (!url) return null;
//     const patterns = [
//         /(?:youtu\.be\/)([^?&\n]+)/,
//         /[?&]v=([^?&\n]+)/,
//         /youtube\.com\/embed\/([^?&\n]+)/,
//         /youtube\.com\/shorts\/([^?&\n]+)/,
//     ];
//     for (const p of patterns) {
//         const m = url.match(p);
//         if (m && m[1]) return m[1];
//     }
//     if (/^[a-zA-Z0-9_-]{10,}$/.test(url)) return url;
//     return null;
// }

// async function youtubeGetVideoInfo(videoId) {
//     try {
//         const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YT_API_KEY}`);
//         const data = await res.json();
//         if (data.items && data.items.length) return data.items[0].snippet;
//     } catch(e) { console.warn("YT info error", e); }
//     return null;
// }

// async function youtubeSearch(query, maxResults = 5) {
//     if (!query || query.length < 2) return [];
//     try {
//         const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${YT_API_KEY}`);
//         const data = await res.json();
//         return data.items || [];
//     } catch(e){ console.warn("YT search error", e); return []; }
// }

// // --- Show suggestions ---
// function showYtSuggestions(items) {
//     suggestionsBox.innerHTML = "";
//     if (!items || !items.length) {
//         suggestionsBox.style.display = "none";
//         return;
//     }
//     suggestionsBox.style.display = "block";

//     items.forEach(it => {
//         const div = document.createElement("div");
//         div.className = "suggestion-item";
//         div.innerHTML = `
//             <div style="display:flex;align-items:center;gap:8px;">
//                 <img src="${it.snippet.thumbnails.default.url}" style="width:48px;height:36px;object-fit:cover;border-radius:4px;">
//                 <div style="text-align:left;">
//                     <div style="font-size:13px;font-weight:600;">${it.snippet.title}</div>
//                     <div style="font-size:11px;color:#666;">${it.snippet.channelTitle}</div>
//                 </div>
//             </div>
//         `;
//         div.addEventListener("click", () => {
//             selectedSongForAdd = {
//                 name: it.snippet.title,
//                 artist: it.snippet.channelTitle,
//                 cover: `https://img.youtube.com/vi/${it.id.videoId}/maxresdefault.jpg`,
//                 path: `https://www.youtube.com/watch?v=${it.id.videoId}`
//             };
//             ytInput.value = selectedSongForAdd.name;
//             suggestionsBox.innerHTML = "";
//             suggestionsBox.style.display = "none";
//         });
//         suggestionsBox.appendChild(div);
//     });
// }

// // --- Input ---
// let ytTypingTimer = null;
// ytInput.addEventListener("input", async () => {
//     const v = ytInput.value.trim();
//     selectedSongForAdd = null;

//     if (v.includes("youtube.com") || v.includes("youtu.be") || /^[a-zA-Z0-9_-]{10,}$/.test(v)) {
//         suggestionsBox.style.display = "none";
//         const vid = extractVideoId(v);
//         if (vid) {
//             const info = await youtubeGetVideoInfo(vid);
//             if (info) {
//                 selectedSongForAdd = {
//                     name: info.title,
//                     artist: info.channelTitle,
//                     cover: `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`,
//                     path: `https://www.youtube.com/watch?v=${vid}`
//                 };
//                 ytInput.value = selectedSongForAdd.name;
//             }
//         }
//         return;
//     }

//     if (ytTypingTimer) clearTimeout(ytTypingTimer);
//     if (!v) return;

//     ytTypingTimer = setTimeout(async () => {
//         const items = await youtubeSearch(v, 6);
//         showYtSuggestions(items);
//     }, 380);
// });

// // --- Cancel ---
// cancelYoutubeBtn.addEventListener("click", () => {
//     selectedSongForAdd = null;
//     ytInput.value = "";
//     suggestionsBox.innerHTML = "";
//     suggestionsBox.style.display = "none";
//     customLimitMsg.textContent = "";
//     if (addPlaylistPopup) addPlaylistPopup.style.display = "none";
// });

// // --- Add YouTube song ---
// saveYoutubeBtn.addEventListener("click", () => {
//     if (!selectedSongForAdd) {
//         alert("Select a song first.");
//         return;
//     }
//     if (window.customPlaylist.length >= MAX_CUSTOM_SONGS) {
//         alert("Limit reached.");
//         return;
//     }

//     // Add to customPlaylist array
//     window.customPlaylist.push(selectedSongForAdd);

//     // Check if Custom Playlist exists in playLists
//     if (!playLists.includes(window.customPlaylist)) {
//         playLists.push(window.customPlaylist);
//     }

//     // Show Custom Playlist button/UI
//     if (customPlaylistElement) customPlaylistElement.style.display = "block";

//     // Reset input
//     selectedSongForAdd = null;
//     ytInput.value = "";
//     suggestionsBox.innerHTML = "";
//     if (addPlaylistPopup) addPlaylistPopup.style.display = "none";

//     // Save to localStorage
//     try {
//         localStorage.setItem("customPlaylist_v1", JSON.stringify(window.customPlaylist));
//     } catch(e){}
// });

// // --- Load from localStorage on page load ---
// (function loadCustomFromLocal() {
//     try {
//         const raw = localStorage.getItem("customPlaylist_v1");
//         if (!raw) return;
//         const arr = JSON.parse(raw);
//         if (Array.isArray(arr) && arr.length) {
//             window.customPlaylist = arr;
//             // Add to playLists if nije tu
//             if (!playLists.includes(window.customPlaylist)) {
//                 playLists.push(window.customPlaylist);
//             }
//             if (customPlaylistElement) customPlaylistElement.style.display = "block";
//         }
//     } catch(e){}
// })();
