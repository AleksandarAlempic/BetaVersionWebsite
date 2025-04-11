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
let seconds = 0;  // To track the time passed

let rotationDegree = 0; // Track the rotation degree of the second hand

stopwatchCounter = hours + ":" + minutes + ":" + seconds;

const secondHand = document.getElementById('secondHand');

let init = true; 

let stopwatchTriggered = true;

let timerTriggered = false;

let myInterval; // Declare a variable to store the interval ID

// Start function for setting the interval and beginning the animation

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




function setInterval1Stopwatch() {
   myInterval = setInterval(myTimer, 1000); 
}


function myTimer() {
   seconds = seconds + 1; 
   
   minutes = Math.floor(seconds/60); 
   hours = Math.floor(minutes / 60);


   rotationDegree = (rotationDegree + 6) % 360; 
   secondHand.style.transform = `rotate(${rotationDegree}deg)`;

   input.value = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds % 60);
}


function formatTime(time) {
   if(time < 10){
       time =  "0" + time;
   }
      else {
         time = time;
      }
      return time; 
   }


function myStopStopwatch() {
   clearInterval(myInterval); 

   secondHand.style.transition = "transform 1s ease";  // Smooth transition
   secondHand.style.transform = `rotate(${rotationDegree}deg)`; // Keep current position

   // Clear animation
   secondHand.style.animation = "none";
}

// Reset function to reset the stopwatch and the rotation
function resetFunctionStopwatch() {
   input.value = "00" + ":" +  "00" + ":" +  "00";
   seconds = 0;
   minutes = 0;
   hours = 0; 
   rotationDegree = 0; 
   secondHand.style.transition = "none";  
   secondHand.style.transform = "rotate(0deg)";  
   secondHand.style.animation = "none";  
 
   secondHand.style.removeProperty('animation'); 
   secondHand.style.removeProperty('transition');  
}

start.addEventListener('click', () => {

   if (!myInterval) {  
      setInterval1();  
      secondHand.style.transition = "transform 1s linear"; 
      secondHand.style.animation = "rotateSecond 60s infinite linear"; 
   }

   if(secondHand.style.animation = "auto ease 0s 1 normal none running none"){
      secondHand.style.transition = "transform 1s linear";  // Smooth transition - Fix for unknown/default animation that comes after Start/Stop action
   }
});

// Event listener for stopping the stopwatch and rotation
stop.addEventListener('click', () => {
   myStopStopwatch(); 
   secondHand.style.animation = "none";  
   secondHand.style.transition = "transform 1s ease";  
   secondHand.style.transform = `rotate(${rotationDegree}deg)`;
});


reset.addEventListener('click', () => {
   resetFunctionStopwatch();  
   secondHand.style.animation = "none"; 
   secondHand.style.removeProperty('animation'); 
   secondHand.style.removeProperty('transition'); 
});





   function setInterval1Timer() {
      if(input.value === "00:00:00"){
         seconds = defaultTimerSecondsValue;
      }

      if (input.value != "00:00:00"){
         hours = input.value.substring(1, 2);
         minutes = input.value.substring(3, 5);
         seconds =  input.value.substring(6);

         input.value = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
      }
      
      myInterval = setInterval(myTimerTimer, 1000); 
   }
   
   
   function myTimerTimer() {

      if (seconds === 0 & minutes === 0 & hours === 0){
        input.value = "00" + ":" + "00" + ":" + "00";
        let myAudio = document.querySelector('#audio1');
        document.getElementById('displayTime').style.animation = " pulse 2s linear infinite;";;
        displayTime.style.animation = " pulse 2s linear infinite;";
        myAudio.play();
        return 0;  
      }

     else if (seconds < 1 & minutes != 0){
         minutes--;
         seconds = 59;
     }

     else if  (minutes === 0 & hours != 0) {
       hours--;
       minutes = 59;
     }

     else if(minutes === 0 & seconds === 0){
      input.value = "00" + ":" + "00" + ":" + "00";
     let myAudio = document.querySelector('#audio1');
     document.getElementById('displayTime').style.animation = " pulse 2s linear infinite;";;
     displayTime.style.animation = " pulse 2s linear infinite;";
     myAudio.play()
     return 0;  
}

else if(seconds === 0 & hours < 1 & minutes < 1) {
   input.value = "00" + ":" + "00" + ":" + "00";
  let myAudio = document.querySelector('#audio1');
  document.getElementById('displayTime').style.animation = " pulse 2s linear infinite;";;
  displayTime.style.animation = " pulse 2s linear infinite;";
  myAudio.play()
  return 0;  
}
     else{
      seconds --; 
     }
     
      
      
      
      // minutes = minutes; 
      // hours = hours;
   
      rotationDegree = (rotationDegree + 6) % 360; 
      secondHand.style.transform = `rotate(${rotationDegree}deg)`;
   
      input.value = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds % 60);
   }
   
   
   // function formatTimeTimer(time) {
   //    if(time < -10){
   //        time =  "0" + time;
   //    }
   //       else {
   //          time = time;
   //       }
   //       return time; 
   //    }
   
   
   function myStopTimer() {
      clearInterval(myInterval); 
   
      secondHand.style.transition = "transform 1s ease";  // Smooth transition
      secondHand.style.transform = `rotate(${rotationDegree}deg)`; // Keep current position
   
      // Clear animation
      secondHand.style.animation = "none";
   }
   
   // Reset function to reset the stopwatch and the rotation
   function resetFunction() {
      input.value = "00" + ":" +  "00" + ":" +  "00";
      seconds = 0;
      minutes = 0;
      hours = 0; 
      rotationDegree = 0; 
      secondHand.style.transition = "none";  
      secondHand.style.transform = "rotate(0deg)";  
      secondHand.style.animation = "none";  
    
      secondHand.style.removeProperty('animation'); 
      secondHand.style.removeProperty('transition');  
   }
   
   start.addEventListener('click', () => {
   
      if (!myInterval) {  
         setInterval1();  
         secondHand.style.transition = "transform 1s linear"; 
         secondHand.style.animation = "rotateSecond 60s infinite linear"; 
      }
   
      if(secondHand.style.animation = "auto ease 0s 1 normal none running none"){
         secondHand.style.transition = "transform 1s linear";  // Smooth transition - Fix for unknown/default animation that comes after Start/Stop action
      }
   });
   
   // Event listener for stopping the stopwatch and rotation
   stop.addEventListener('click', () => {
      myStopTimer(); 
      secondHand.style.animation = "none";  
      secondHand.style.transition = "transform 1s ease";  
      secondHand.style.transform = `rotate(${rotationDegree}deg)`;
   });
   
   
   reset.addEventListener('click', () => {
      resetFunction();  
      secondHand.style.animation = "none"; 
      secondHand.style.removeProperty('animation'); 
      secondHand.style.removeProperty('transition'); 
   });
   
   
   

// Music player toggle for UI visibility
musicPlayer.addEventListener('click', () => {
   if (musicPlayer.checked){
      audioContainer.style.display = "none";
      newNextAndPreviousButtons.style.display = "none";
      songNameAndArtist.style.display = "none";
      timer.style.marginTop = "95%";
      stopwatch.style.marginTop = "95%";
      input.style.marginTop = "107%";
   } else {
      audioContainer.style.display = "block";
      newNextAndPreviousButtons.style.display = "flex";
      songNameAndArtist.style.display = "grid";
      timer.style.marginTop = "108%";
      stopwatch.style.marginTop = "108%";
      input.style.marginTop = "120%";
   }
});

// Music player toggle for UI visibility
checkboxRoot.addEventListener('click', () => {
   if (checkboxRoot.checked){
      Root.style.display = "none";
      stopwatchLabel.style.marginTop = "11%"
   } else {
      Root.style.display = "block";
     stopwatchLabel.style.marginTop = "5.6%"
   }
});


const mediaQuery = window.matchMedia('(max-width: 1000px)');

if (mediaQuery.matches & !checkboxRoot.checked) {
   Root.style.width = "700px";
   Map.style.width = "860px";
   Map.style.height = "1000px";
   Map.style.marginLeft = "25%";
   Map.style.position = "absolute";
   mapContent.style.width = "100%";
   mapContent.style.height = "100vh";
   Root.style.zIndex = "1000000";
   checkboxRoot.style.zIndex = "10000000";
   
   
   mapContent.style.height = "100vh";
}
else{
   stopwatchLabel.style.display = "block";
  
}





// Ensure that when the Root checkbox or other elements are clicked, the map interaction is disabled
checkboxRoot.addEventListener('click', () => {
   if (checkboxRoot.checked) {
       // Disable map interaction when the checkbox is checked
       document.getElementById("map").style.pointerEvents = "none";
       startRouteButton.style.display = "none";
   } else {
       // Enable map interaction when the checkbox is unchecked
       document.getElementById("map").style.pointerEvents = "auto";
       startRouteButton.style.display = "block";
   }
});

// Ensure the same for the music player checkbox if needed
musicPlayer.addEventListener('click', () => {
   if (musicPlayer.checked) {
       // Disable map interaction when the music player is toggled off
       document.getElementById("map").style.pointerEvents = "none";
   } else {
       // Enable map interaction again
       document.getElementById("map").style.pointerEvents = "auto";
   }
});


