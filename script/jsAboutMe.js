
let newslideIndex = 0;
SlideText();

function SlideText() {
  let i;
  let slides = document.getElementsByClassName("mySlidesLeftBackgroundIntro");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  newslideIndex++;

  if (newslideIndex > slides.length) {newslideIndex = 1}  
  slides[newslideIndex-1].style.display = "block";
  setTimeout(SlideText, 16000); // Change image every 16 seconds
}

let newslideIndexExpirience = 0;
SlideTextExpirience();

function SlideTextExpirience() {
  let i;
  let slides = document.getElementsByClassName("mySlidesLeftBackgroundExpirience");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  newslideIndexExpirience++;

  if (newslideIndexExpirience > slides.length) {newslideIndexExpirience = 1}  
  slides[newslideIndexExpirience-1].style.display = "block";
  setTimeout(SlideTextExpirience, 16000); // Change image every 15 seconds
}

let newslideIndexCertification = 0;
SlideTextCertification();

function SlideTextCertification() {
  let i;
  let slides = document.getElementsByClassName("mySlidesLeftBackgroundCertifications");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  newslideIndexCertification++;

  if (newslideIndexCertification > slides.length) {newslideIndexCertification= 1}  
  slides[newslideIndexCertification-1].style.display = "block";
  setTimeout(SlideTextCertification, 16000); // Change image every 10 seconds
}

let newslideIndexCertificationIndividual = 0;
SlideTextCertificationIndividual();

function SlideTextCertificationIndividual() {
  let i;
  let slides = document.getElementsByClassName("mySlidesLeftBackgroundCertificationsIndividual");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  newslideIndexCertificationIndividual++;

  if (newslideIndexCertificationIndividual > slides.length) {newslideIndexCertificationIndividual= 1}  
  slides[newslideIndexCertificationIndividual-1].style.display = "block";
  setTimeout(SlideTextCertificationIndividual, 8000); // Change image every 5 seconds
}

let newslideIndexCertificationIndividual1 = 0;
SlideTextCertificationIndividual1();

function SlideTextCertificationIndividual1() {
  let i;
  let slides = document.getElementsByClassName("mySlidesLeftBackgroundCertificationsIndividual1");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  newslideIndexCertificationIndividual1++;

  if (newslideIndexCertificationIndividual1 > slides.length) {newslideIndexCertificationIndividual1= 1}  
  slides[newslideIndexCertificationIndividual1-1].style.display = "block";
  setTimeout(SlideTextCertificationIndividual1, 8000); // Change image every 5 seconds
}

let newslideIndexCertificationIndividual2 = 0;
SlideTextCertificationIndividual2();

function SlideTextCertificationIndividual2() {
  let i;
  let slides = document.getElementsByClassName("mySlidesLeftBackgroundCertificationsIndividual2");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  newslideIndexCertificationIndividual2++;

  if (newslideIndexCertificationIndividual2 > slides.length) {newslideIndexCertificationIndividual2= 1}  
  slides[newslideIndexCertificationIndividual2-1].style.display = "block";
  setTimeout(SlideTextCertificationIndividual2, 8000); // Change image every 5 seconds
}

let newslideIndexCertificationIndividual3 = 0;
SlideTextCertificationIndividual3();

function SlideTextCertificationIndividual3() {
  let i;
  let slides = document.getElementsByClassName("mySlidesLeftBackgroundCertificationsIndividual3");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  newslideIndexCertificationIndividual3++;

  if (newslideIndexCertificationIndividual3 > slides.length) {newslideIndexCertificationIndividual3= 1}  
  slides[newslideIndexCertificationIndividual3-1].style.display = "block";
  setTimeout(SlideTextCertificationIndividual3, 8000); // Change image every 5 seconds
}



let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 24000); // Change image every 18 seconds
}

let slideIndex1 = 0;
showSlidesContactMe();

function showSlidesContactMe() {
  let i;
  let slides = document.getElementsByClassName("mySlidesContactMe");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex1++;
  if (slideIndex1 > slides.length) {slideIndex1 = 1}    
  slides[slideIndex1-1].style.display = "block";  
  setTimeout(showSlidesContactMe, 48000); // Change image every 60 seconds
}

let slideIndex11 = 0;
showSlidesContactMeOther();

function showSlidesContactMeOther() {
  let i;
  let slides = document.getElementsByClassName("mySlidesContactMeOther");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex11++;
  if (slideIndex11 > slides.length) {slideIndex11 = 1}    
  slides[slideIndex11-1].style.display = "block";  
  setTimeout(showSlidesContactMeOther, 36000); // Change image every 48 seconds
}



var myIndexAboutMe = 0;
carouselSlidesRightBackground();
function carouselSlidesRightBackground() {
var i;
var x = document.getElementsByClassName("mySlidesRightBackgroundAboutMe");
for (i = 0; i < x.length; i++) {
x[i].style.display = "none";  
}
myIndexAboutMe++;
if (myIndexAboutMe > x.length) {myIndexAboutMe = 1}    
x[myIndexAboutMe-1].style.display = "block";  
setTimeout(carouselSlidesRightBackground, 13000); // Change image every 2 seconds
}
