
let currentMusic = 0;
let currentPlayList = 0;

const music = document.querySelector('#audio');

const songName = document.querySelector('.songName');
const artistName = document.querySelector('.artistName');
const disk = document.querySelector('.disk');
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.pervious-btn');
const kindOfMusic = document.querySelector('.kindOfMusic');
const nextBtnPlayList = document.querySelector('.next-btnPlayList');
const previousBtnPlayList = document.querySelector('.previous-btnPlayList');

let songList1 = document.getElementById("kindOfMusic1");
let songList2 = document.getElementById("kindOfMusic2");
let songList3 = document.getElementById("kindOfMusic3");
let songList4 = document.getElementById("kindOfMusic4");
let songList5 = document.getElementById("kindOfMusic5");
let songList6 = document.getElementById("kindOfMusic6");
let songList7 = document.getElementById("kindOfMusic7");


let List;

List = [songList1, songList2, songList3, songList4,songList5, songList6]; 

let length = List.length; 



music.volume = 0.25;

playBtn.addEventListener('click', () => {
    music.play();
    if(playBtn.className.includes('pause')){
        music.play();
    }
    else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.remove('pause');
    playBtn.classList.add('play');
    disk.classList.add('play');
}


const setMusic = (i) => {
    let songs = playLists[currentPlayList];
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;  
}

setMusic(0);

nextBtn.addEventListener('click', () => {
    if(currentMusic >= playLists[currentPlayList].length - 1){
        currentMusic = 0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
});

previousBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = playLists[currentPlayList].length - 1;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
});


const setPlaylist = (i) => {
    let play = playLists[i];
    currentPlayList = i;
    // music.src = song.path;
    // kindOfMusic.innerHTML = play.name;
    // artistName.innerHTML = play.artist;
    // disk.style.backgroundImage = `url('${play.cover}')`;  
}

setPlaylist(0);

nextBtnPlayList.addEventListener('click', () => {
    if(currentPlayList >=  length-1){
        List[0].innerHTML = songList7.innerHTML;
        currentPlayList = 0;   
    }
    else{
        currentPlayList++;
        List[0].innerHTML = List[currentPlayList].innerHTML;
       
    }
    setPlaylist(currentPlayList);
    playMusic();
});

previousBtnPlayList.addEventListener('click', () => {
     if (currentPlayList <= 0){
        currentPlayList = playLists.length-1;
         List[0].innerHTML = songList6.innerHTML;
    }
    else if(currentPlayList==1){ /// Bug with not displaying the Promo Songs after back click from Classic
        List[0].innerHTML = songList7.innerHTML;
        currentPlayList--;
    }
    else{
        currentPlayList--;
        List[0].innerHTML = List[currentPlayList].innerHTML;
    }
    setPlaylist(currentPlayList);
    playMusic();
});

music.addEventListener('ended',function(){
    if(currentMusic >= playLists[currentPlayList].length - 1){
        currentMusic = 0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
 });

// Definiši media query (mobilni ekran)

// Media query za initial-scale 0.5
const mq = window.matchMedia("screen and (max-width: 1640px) and (max-height: 3500px)");


nextBtnPlayList.addEventListener("click", () => {
  if (
    mq.matches &&
    (songList1.innerHTML === "Classics" || songList1.innerHTML === "Narodna")
  ) {
    songList1.style.setProperty("margin-top", "-36%", "important");
    nextBtnPlayList.style.setProperty("margin-top", "-38%", "important");
    previousBtnPlayList.style.setProperty("margin-top", "-40%", "important");
    console.log("Mobilni ekran — pomeri dugmad dole");
  } else {
    console.log("Desktop — ništa se ne menja");
  }
});

previousBtnPlayList.addEventListener("click", () => {
  if (
    mq.matches &&
    (songList1.innerHTML === "Classics" || songList1.innerHTML === "Narodna")
  ) {
    songList1.style.setProperty("margin-top", "-36%", "important");
    nextBtnPlayList.style.setProperty("margin-top", "-38%", "important");
    previousBtnPlayList.style.setProperty("margin-top", "-40%", "important");
    console.log("Mobilni ekran — pomeri dugmad dole");
  } else {
    console.log("Desktop — ništa se ne menja");
  }
});

