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


// =================== YOUTUBE POPUP TRANSLATIONS ===================
translations.en.youtubePopup = {
  title: "Add YouTube Song",
  placeholder: "Paste your YouTube link or type a song name",
  save: "Save",
  cancel: "Cancel",
  openButton: "Add Playlist" 
};

translations.sr.youtubePopup = {
  title: "Dodaj YouTube pesmu",
  placeholder: "Nalepi YouTube link ili unesi naziv pesme",
  save: "Sačuvaj",
  cancel: "Otkaži",
  openButton: "Dodaj plejlistu"
};


// =================== DODAJ FEEDBACK U POSTOJEĆI TRANSLATIONS ===================
translations.en.feedback = {
  title: "Send Feedback - Share your idea",
  placeholder: "Write your message...",
  send: "Send",
  cancel: "Cancel",
  button: "Feedback"
};

translations.sr.feedback = {
  title: "Podeli svoje mišljenje – dodaj svoju ideju",
  placeholder: "Napiši svoju poruku...",
  send: "Pošalji",
  cancel: "Zatvori",
  button: "Feedback"
};

// =================== UPDATE YOUTUBE POPUP LANGUAGE ===================
function updateYoutubePopupLanguage() {
  const t = translations[currentLanguage]?.youtubePopup;
  if (!t) return;

  // Popup
  const popup = document.getElementById("addPlaylistPopup");
  if (!popup) return;

  // Naslov (H2, ne H3)
  const title = popup.querySelector(".h2Youtube");

  // Input
  const input = document.getElementById("youtubeInput");

  // Dugmad u popup-u
  const saveBtn = document.getElementById("saveYoutubeBtn");
  const cancelBtn = document.getElementById("cancelYoutubeBtn");

  // Dugme koje otvara popup
  const openPopupBtn = document.getElementById("fetchCustomPlaylistButton");

  if (title) title.innerText = t.title;
  if (input) input.placeholder = t.placeholder;
  if (saveBtn) saveBtn.innerText = t.save;
  if (cancelBtn) cancelBtn.innerText = t.cancel;
  if (openPopupBtn) openPopupBtn.innerText = t.openButton;
}

let currentLanguage = localStorage.getItem("selectedLanguage") || "en";
languageSelect.value = currentLanguage;

// =================== UPDATE FEEDBACK POPUP ===================
function updateFeedbackPopupLanguage() {

  const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
  
  const t = translations[currentLanguage].feedback;
  if (!t) return;

  // Naslov i textarea dugmad
  feedbackPopup.querySelector("h3").innerText = t.title;
  feedbackText.placeholder = t.placeholder;
  sendFeedbackBtn.innerText = t.send;
  closeFeedbackBtn.innerText = t.cancel;
  openFeedbackBtn.innerText = t.button;

  // ⬅ DODAJEMO PREVOD ZA FIRST NAME I LAST NAME
  const firstNameLabel = feedbackPopup.querySelector('label[for="firstName"]');
  const lastNameLabel = feedbackPopup.querySelector('label[for="lastName"]');

  if (currentLanguage === "sr") {
    firstNameLabel.innerText = "Ime";
    firstNameInput.placeholder = "Ime";

    lastNameLabel.innerText = "Prezime";
    lastNameInput.placeholder = "Prezime";
  } else {
    firstNameLabel.innerText = "First Name";
    firstNameInput.placeholder = "First Name";

    lastNameLabel.innerText = "Last Name";
    lastNameInput.placeholder = "Last Name";
  }
}


// // Pozovi odmah kada se stranica učita
// updateFeedbackPopupLanguage();

// // Kada korisnik promeni jezik
// languageSelect.addEventListener("change", (e) => {
//   currentLanguage = e.target.value;
//   localStorage.setItem("selectedLanguage", currentLanguage);

//   updateInterfaceLanguage();
//   updateTrainingPopupLanguage(currentLanguage);
//   updateRouteMarkersLanguage(currentLanguage);
//   updateTrainingMarkersLanguage(currentLanguage);

//   updateFeedbackPopupLanguage(); // ⬅ samo ovo dodaješ
//     updateYoutubePopupLanguage(); 
// });



// =================== LANGUAGE DROPDOWN ===================
languageSelect.addEventListener("change", (e) => {
  currentLanguage = e.target.value;
  localStorage.setItem("selectedLanguage", currentLanguage);
  updateInterfaceLanguage();
  updateTrainingPopupLanguage(currentLanguage);
  updateRouteMarkersLanguage(currentLanguage);
  updateTrainingMarkersLanguage(currentLanguage);
  updateFeedbackPopupLanguage()
   updateYoutubePopupLanguage(); 
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
// =================== FETCH NEARBY ROUTES ===================
async function retrieveNearbyRoutes() {
  let latitude, longitude;

  try {
    // pokušaj geolokaciju
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: false,
          timeout: 30000,      // 30s
          maximumAge: 60000    // koristi keširanu lokaciju ako postoji
        }
      );
    });

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // zapamti poslednju validnu lokaciju
    window.lastLat = latitude;
    window.lastLng = longitude;

  } catch (geoErr) {
    console.warn("⚠️ GEO TIMEOUT → fallback location");

    // fallback ako geo pukne
    latitude = window.lastLat || 45.0142;
    longitude = window.lastLng || 19.8220;
  }

  const radius = 35000;

  // uklanjanje starih markera
  if (window.currentRouteMarkers) {
    window.currentRouteMarkers.forEach(marker => map.removeLayer(marker));
    window.currentRouteMarkers = [];
  }

  // **Dodavanje TTL provere pre slanja FETCH zahteva**
  if (navigator.serviceWorker) {
    const swRegistration = await navigator.serviceWorker.ready;
    // Dodavanje URL sa parametrima za TTL proveru
    swRegistration.active.postMessage({ type: 'CHECK_TTL', url: `/api/routes-nearby?lat=${latitude}&lng=${longitude}&radius=${radius}` });
  }

  try {
    // ⚡ FETCH SE UVEK POZIVA → SW → TTL
    const res = await fetch(`/api/routes-nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
    const routes = await res.json();

    if (!Array.isArray(routes) || routes.length === 0) {
      alert(translations[currentLanguage].noNearbyRoutes);
      return;
    }

    window.currentRouteMarkers = [];

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
        🏃‍♂️ ${route.routeName || translations[currentLanguage].unnamedRoute}
      `);

      marker.addTo(map);
      window.currentRouteMarkers.push(marker);
    });

    console.log("✅ ROUTES FETCH → SW TTL ACTIVE");

  } catch (err) {
    console.error("❌ FETCH FAILED:", err);
    alert("Network/API error");
  }
}



// =================== FETCH NEARBY TRAININGS ===================
async function retrieveNearbyTrainings() {
  try {
    // 1️⃣ Čekamo geolokaciju
  const position = await new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    resolve,
    reject,
    {
      enableHighAccuracy: true,   // koristi GPS kad može
      timeout: 30000,             // 30s timeout (rešava TTL + geo timeout)
      maximumAge: 0               // ne koristi keširanu lokaciju
    }
  );
});

    const { latitude, longitude } = position.coords;
    const radius = 35000;

    // 2️⃣ Uklanjamo stare markere
    if (window.currentTrainingMarkers) {
      window.currentTrainingMarkers.forEach(marker => map.removeLayer(marker));
      window.currentTrainingMarkers = [];
    }

    // 3️⃣ Fetch sa relativnim path-om (TTL radi automatski)
    const res = await fetch(`/api/nearby-trainings?lat=${latitude}&lng=${longitude}&radius=${radius}`);
    const trainings = await res.json();

    if (!Array.isArray(trainings) || trainings.length === 0) {
      alert(translations[currentLanguage].noNearbyTrainings);
      return;
    }

    // 4️⃣ Dodajemo treninge na mapu
    window.currentTrainingMarkers = [];
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
        window.currentTrainingMarkers.push(marker);
      }
    });

  } catch (err) {
    console.error("Could not retrieve nearby trainings:", err);
    alert(translations[currentLanguage].couldNotGetLocation + (err.message || ""));
  }
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

// ================= DEVICE TRACKING =================

function generateDeviceId() {
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("device_id", id);
  }
  return id;
}

async function getLocationName(lat, lng) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await res.json();
        return data.display_name || "Unknown";
    } catch (err) {
        console.warn("Reverse geocoding failed:", err);
        return "Unknown";
    }
}

async function trackDevice() {
  try {
    let location = "Unknown";
    let locationName = "Unknown";
    let latitude, longitude;

    await new Promise((resolve) => {
      if (!navigator.geolocation) return resolve();
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          location = await getLocationName(latitude, longitude);

          // Dobijanje imena lokacije
          locationName = await getLocationName(latitude, longitude);

          resolve();
        },
        (err) => {
          console.warn("Geolocation failed:", err);
          resolve();
        },
        { timeout: 5000 }
      );
    });

    const payload = {
      device_id: generateDeviceId(),
      user_agent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      location: location,
      location_name: locationName // <--- ime lokacije
    };

    const res = await fetch("/api/device-track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("📱 Device tracked:", data);

  } catch (err) {
    console.error("Device tracking failed:", err);
  }
}

// POZIV SAMO JEDNOM
trackDevice();




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
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addPlaylistPopup1 = document.getElementById("addPlaylistPopup");

// Otvaranje popup-a
btnOpen.addEventListener("click", () => {
    panel.style.left = "7.5px";
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
    addPlaylistPopup1.style.display = "none";
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
    // Browser native validation
    if (!firstNameInput.checkValidity()) {
        firstNameInput.reportValidity();
        return;
    }
    if (!lastNameInput.checkValidity()) {
        lastNameInput.reportValidity();
        return;
    }
    if (!textArea.checkValidity()) {
        textArea.reportValidity();
        return;
    }

    const formData = new FormData();
  formData.append("First name", firstNameInput.value.trim());
  formData.append("Last name", lastNameInput.value.trim());
  formData.append("Message", textArea.value.trim());

    try {
        const res = await fetch(FORMSPREE_URL, {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            alert("Your feedback was sent. Thank you!");
            firstNameInput.value = "";
            lastNameInput.value = "";
            textArea.value = "";
            closeFeedbackPanel();
        } else {
            alert("Failed to send feedback.");
        }
    } catch (err) {
        alert("Sent.");
    console.log("Error sending email:", err);
    }
});

/* ================= CUSTOM PLAYLIST + YOUTUBE PLAYER ================= */



document.addEventListener("DOMContentLoaded", () => {

const MAX_CUSTOM_SONGS = 28;

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
const nextBtnPlayList = document.querySelector('.next-btnPlayList');
const previousBtnPlayList = document.querySelector('.previous-btnPlayList');

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

window.ensureYTPlayer = ensureYTPlayer;

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
    window.updateNextPrevVisibility = updateNextPrevVisibility;

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

    /* ================= STYLING ZA CUSTOM PLAYLIST ================= */
  // const currentText = List[0]?.textContent.trim();
  const currentText = kindOfMusic?.textContent.trim();
    if (currentText === "Custom Playlist") {
        nextBtnPlayList.style.marginTop = "-20%";
        nextBtnPlayList.style.marginLeft = "80%";

        previousBtnPlayList.style.marginTop = "-26%";
        previousBtnPlayList.style.marginLeft = "-25%";

        const customPlaylistLabel = document.getElementById("kindOfMusic7");

        if (customPlaylistLabel && kindOfMusic) {
            kindOfMusic.textContent = customPlaylistLabel.textContent;
            customPlaylistLabel.style.display = "none";
            kindOfMusic.style.setProperty("margin-top", "-24%", "important");
            kindOfMusic.style.setProperty("margin-left", "1%", "important");
            kindOfMusic.style.setProperty("min-width", "159px", "important");
        }
    }
  else {

      kindOfMusic.style.removeProperty("min-width");
    
    if (currentText === "Narodna") {
        nextBtnPlayList.style.marginTop = "-37%";
        previousBtnPlayList.style.marginTop = "-37%";
        nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginLeft = "-25%";
        kindOfMusic.style.setProperty("margin-top", "-34%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
    else if (currentText === "Promo" || currentText === "Balkan") {
        nextBtnPlayList.style.marginTop = "-44%";
        previousBtnPlayList.style.marginTop = "-43.5%";
        nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginLeft = "-25%";
        kindOfMusic.style.setProperty("margin-top", "-40%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
    else if (currentText === "Classics") {
        nextBtnPlayList.style.marginTop = "-40%";
        previousBtnPlayList.style.marginTop = "-40%";
        nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginLeft = "-25%";
        kindOfMusic.style.setProperty("margin-top", "-36%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
    else {
        nextBtnPlayList.style.marginTop = "-45%";
        previousBtnPlayList.style.marginTop = "-46%";
        nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginLeft = "-25%";
        kindOfMusic.style.setProperty("margin-top", "-43%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
}
    updateNextPrevVisibility();
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
// ytInput?.addEventListener("input", async () => {
//     const v = ytInput.value.trim();
//     selectedSongForAdd = null;
//     suggestionsBox.innerHTML = "";

//     if (!v) { suggestionsBox.style.display = "none"; return; }

//     if (v.includes("youtube.com") || v.includes("youtu.be") || /^[a-zA-Z0-9_-]{10,}$/.test(v)) {
//         suggestionsBox.style.display = "none";
//         const vid = extractVideoId(v);
//         if (vid) {
//           const info = await fetch(`/api/youtube/video?id=${vid}`)
//     .then(r => r.json())
//     .then(d => d.items?.[0]?.snippet)
//     .catch(() => null);
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

// --- Search input sa debounce ---
function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

ytInput?.addEventListener("input", debounce(async () => {
    const v = ytInput.value.trim();
    selectedSongForAdd = null;
    suggestionsBox.innerHTML = "";

    if (!v) {
        suggestionsBox.style.display = "none";
        return;
    }

    // LINK / VIDEO ID
    if (
        v.includes("youtube.com") ||
        v.includes("youtu.be") ||
        /^[a-zA-Z0-9_-]{10,}$/.test(v)
    ) {
        suggestionsBox.style.display = "none";
        const vid = extractVideoId(v);
        if (!vid) return;

        const info = await fetch(`/api/youtube/video?id=${vid}`)
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
        return;
    }

    // SEARCH
    const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(v)}`);
    const data = await res.json();
    const items = data.items || [];

    if (!items.length) {
        suggestionsBox.style.display = "none";
        return;
    }

    suggestionsBox.style.display = "block";
    suggestionsBox.innerHTML = "";

    items.forEach(it => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerHTML = `${it.snippet.title} - ${it.snippet.channelTitle}`;
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
}, 300));

 
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

// --- Kada se klikne na Custom Playlist tab ---
tabElements[6].addEventListener("click", () => {
    window.activePlayer = "custom";
    if (customPlaylistElement) {
        customPlaylistElement.style.display = "block";
        customPlaylistElement.innerText = "Custom Playlist";
    }

    // --- ⬅ OVDE DODAJEMO ---
    if (window.customPlaylist.length > 0) {
        window.ensureYTPlayer().then(() => {
            playYouTube(window.customPlaylist[currentSongIndex]);
        });
    }

    updateNextPrevVisibility();
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
   // --- Test / Custom pesme sa poznatim izvođačima
window.customPlaylist = [
    { 
        name: "Rockin’ Around the Christmas Tree", 
        artist: "Brenda Lee", 
        cover: "https://upload.wikimedia.org/wikipedia/en/0/0a/Brenda_Lee_-_Rockin%27_Around_the_Christmas_Tree.jpg", 
        path: "https://www.youtube.com/watch?v=_6xNuUEnh2g" 
    },
    { 
        name: "Last Christmas", 
        artist: "Wham!", 
        cover: "https://upload.wikimedia.org/wikipedia/en/3/3b/Wham!_-_Last_Christmas.png", 
        path: "https://www.youtube.com/watch?v=E8gmARGvPlI" 
    },
    { 
        name: "All I Want for Christmas Is You", 
        artist: "Mariah Carey", 
        cover: "https://upload.wikimedia.org/wikipedia/en/6/6e/All_I_Want_for_Christmas_Is_You.png", 
        path: "https://www.youtube.com/watch?v=yXQViqx6GMY" 
    },
    { 
        name: "Counting Stars", 
        artist: "OneRepublic", 
        cover: "https://upload.wikimedia.org/wikipedia/en/6/65/Counting_Stars_-_OneRepublic.jpg", 
        path: "https://www.youtube.com/watch?v=hT_nvWreIhg" 
    },
    { 
        name: "Shape of You", 
        artist: "Ed Sheeran", 
        cover: "https://upload.wikimedia.org/wikipedia/en/4/45/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png", 
        path: "https://www.youtube.com/watch?v=JGwWNGJdvx8" 
    },
    { 
        name: "Unstoppable", 
        artist: "Sia", 
        cover: "https://upload.wikimedia.org/wikipedia/en/1/12/Sia_-_Unstoppable.png", 
        path: "https://www.youtube.com/watch?v=c5M5c9D9C2k" 
    },
    { 
        name: "Rolling in the Deep", 
        artist: "Adele", 
        cover: "https://upload.wikimedia.org/wikipedia/en/1/11/Adele_-_Rolling_in_the_Deep.png", 
        path: "https://www.youtube.com/watch?v=rYEDA3JcQqw" 
    },
    { 
        name: "Ocean Eyes", 
        artist: "Billie Eilish", 
        cover: "https://upload.wikimedia.org/wikipedia/en/3/3e/Billie_Eilish_-_Ocean_Eyes.png", 
        path: "https://www.youtube.com/watch?v=viimfQi_pUw" 
    },
    { 
        name: "Bad Guy", 
        artist: "Billie Eilish", 
        cover: "https://upload.wikimedia.org/wikipedia/en/7/7c/Bad_Guy_by_Billie_Eilish.png", 
        path: "https://www.youtube.com/watch?v=DyDfgMOUjCI" 
    },
    { 
        name: "7 Rings", 
        artist: "Ariana Grande", 
        cover: "https://upload.wikimedia.org/wikipedia/en/3/30/Ariana_Grande_-_7_rings.png", 
        path: "https://www.youtube.com/watch?v=QYh6mYIJG2Y" 
    },
    { 
        name: "The Fate of Ophelia", 
        artist: "Taylor Swift", 
        cover: "https://upload.wikimedia.org/wikipedia/en/9/9b/Taylor_Swift_-_The_Fate_of_Ophelia.png", 
        path: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
    },
    { 
        name: "Psycho", 
        artist: "BABYMONSTER", 
        cover: "https://upload.wikimedia.org/wikipedia/en/0/0e/BABYMONSTER_-_We_Go_Up_EP.png", 
        path: "https://www.youtube.com/watch?v=5Tn3yRoK6mA" 
    },
    { 
        name: "We Go Up", 
        artist: "BABYMONSTER", 
        cover: "https://upload.wikimedia.org/wikipedia/en/0/0e/BABYMONSTER_-_We_Go_Up_EP.png", 
        path: "https://www.youtube.com/watch?v=5Tn3yRoK6mA" 
          }
    // ,
    // { 
    //     name: "Čokolada", 
    //     artist: "AN NA", 
    //     cover: "https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/5a/2d/42/5a2d4275-17c6-c5e4-3274-b06b00c58d85/source/600x600bb.jpg", 
    //     path: "https://www.youtube.com/watch?v=EXAMPLE_ANNA" 
    // }
];
 // --- Aktiviraj custom player ---
    window.activePlayer = "custom";
    currentSongIndex = 0;

    // Dve labele
    const customPlaylistElement = document.getElementById("kindOfMusic7"); // stara labela
    const mainLabelElement = document.getElementById("kindOfMusic1");       // nova glavna labela

    // --- Sakrij staru labelu i postavi naziv na glavnoj ---
    if (customPlaylistElement) {
        customPlaylistElement.style.display = "none";  // gasimo staru labelu
    }

    if (mainLabelElement) {
        mainLabelElement.style.display = "block";      // prikazujemo glavnu labelu
        mainLabelElement.innerText = "Custom Playlist"; // postavljamo naziv
    }

    // --- Resetuj prethodne stilove ---
    mainLabelElement.style.removeProperty("margin-top");
    mainLabelElement.style.removeProperty("margin-left");
    mainLabelElement.style.removeProperty("min-width");

    nextBtnPlayList.style.removeProperty("margin-top");
    nextBtnPlayList.style.removeProperty("margin-left");
    previousBtnPlayList.style.removeProperty("margin-top");
    previousBtnPlayList.style.removeProperty("margin-left");

    // --- Postavi inicijalne pozicije dugmadi i labele samo prvi put ---
    mainLabelElement.style.setProperty("margin-top", "-24%", "important");
    mainLabelElement.style.setProperty("margin-left", "-22%", "important");
    mainLabelElement.style.setProperty("min-width", "159px", "important");

    nextBtnPlayList.style.marginTop = "-26%";
    nextBtnPlayList.style.marginLeft = "1%";
    previousBtnPlayList.style.marginTop = "-26%";
    previousBtnPlayList.style.marginLeft = "-41%";

    // --- Prikaz Next/Prev dugmadi (dalja logika Next/Prev preuzima kontrolu) ---
    updateNextPrevVisibility();

    // --- Osiguraj YT Player i pokreni prvu pesmu ---
    window.ensureYTPlayer().then(() => {
        window.enableCustomPlayerUI();
        playYouTube(window.customPlaylist[currentSongIndex]);
    });
}

// Dodaj listener za test dugme
document.getElementById("testCustomBtn")?.addEventListener("click", playTestCustomPlaylist);

//Dodajemo TTL
const DATA_CACHE = "data-v1";
const TTL = 10 * 1000; // 10s test



self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

console.log("🟣 SW RAW FETCH:", req.method, req.destination, url.pathname);
 
  // HARD GUARDS
  if (req.method !== "GET") return;
  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  // if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith("/api/")) return;
  if (req.destination === "audio" || req.destination === "video") return;
  if (req.headers.has("range")) return;

  event.respondWith(handleApiRequest(req));
});

async function handleApiRequest(req) {
  const cache = await caches.open(DATA_CACHE);

  // Pokušaj da uzmeš iz keša
  const cached = await cache.match(req);
  if (cached) {
    const fetchedAt = Number(cached.headers.get("sw-fetched-at"));
    if (fetchedAt && Date.now() - fetchedAt < TTL) {
      console.log("🟢 Cache hit:", req.url);
      return cached;
    }
  }

  try {
    const network = await fetch(req);

    // ⚠️ Sigurni filter
    if (network.type !== "basic" || network.status !== 200) {
      console.log("⚠️ Skipping cache (not 200/basic):", req.url, network.status, network.type);
      return network;
    }

    // Napravi response sa sw-fetched-at
    const headers = new Headers(network.headers);
    headers.set("sw-fetched-at", Date.now().toString());

    const blob = await network.clone().blob();
    const response = new Response(blob, {
      status: network.status,
      statusText: network.statusText,
      headers
    });

    await cache.put(req, response.clone());
    console.log("🔄 Cache refreshed:", req.url);
    return response;

  } catch (err) {
    console.log("❌ Network failed, using cache if available:", req.url);
    if (cached) return cached;

    return new Response(
      JSON.stringify({ error: "offline" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}

window.fetchNearbyRoutes = retrieveNearbyRoutes;
window.fetchNearbyTrainings = retrieveNearbyTrainings;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      console.log(`Unregistering service worker: ${registration}`);
      registration.unregister();  // Brisanje starih registracija
    });

    // Zatim registrovanje novog Service Worker-a
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('✅ Service Worker registered:', reg);
    }).catch(err => {
      console.error("❌ Service Worker registration failed:", err);
    });
  }).catch(err => {
    console.error("❌ Error while fetching service worker registrations:", err);
  });
}



