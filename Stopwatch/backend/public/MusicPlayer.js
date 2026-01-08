

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
let songList8 = document.getElementById("kindOfMusic8");


let List;

List = [songList1, songList2, songList3, songList4,songList5, songList6, songList7];

let length = List.length; 



music.volume = 0.25;



// playBtn.addEventListener('click', () => { Old Working
//     music.play();
//     if(playBtn.className.includes('pause')){
//         music.play();
//     }
//     else{
//         music.pause();
//     }
//     playBtn.classList.toggle('pause');
//     disk.classList.toggle('play');
// })

playBtn.addEventListener('click', () => {

    // ⬅ Ako je Custom player aktivan – IGNORIŠI klik
    if (window.activePlayer === "custom") return;

    if (music.paused) {
        music.play();
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
        disk.classList.add('play');
    } else {
        music.pause();
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
        disk.classList.remove('play');
    }
});

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.remove('pause');
    playBtn.classList.add('play');
    disk.classList.add('play');
}


// const setMusic = (i) => { Verzija koja radi za staticke liste
//     let songs = playLists[currentPlayList];
//     let song = songs[i];
//     currentMusic = i;
//     music.src = song.path;

//     songName.innerHTML = song.name;
//     artistName.innerHTML = song.artist;
//     disk.style.backgroundImage = `url('${song.cover}')`;  
// }

const setMusic = (i) => {
    let songs = playLists[currentPlayList];
    
    if (!songs || !songs[i]) {
        console.error(`Ne postoji pesma na indeksu ${i} u playlisti ${currentPlayList}`);
        return; // izlazimo iz funkcije da ne padne
    }
console.log("currentPlayList:", currentPlayList, "songs:", songs, "i:", i);
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    songName.innerText = song.name;
    artistName.innerText = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;  
};



setMusic(0);

nextBtn.addEventListener('click', () => {

    if (window.activePlayer === "custom") return; // ⬅ KLJUČNO

    const currentList = playLists[currentPlayList];

    if (!currentList || !Array.isArray(currentList) || currentList.length === 0) {
        console.warn("Trenutna playlist ne postoji ili je prazna.");
        return;
    }

    if (currentMusic >= currentList.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }

    setMusic(currentMusic);
    playMusic();
});

previousBtn.addEventListener('click', () => {

    if (window.activePlayer === "custom") return; // ⬅ KLJUČNO

    if (currentMusic <= 0) {
        currentMusic = playLists[currentPlayList].length - 1;
    } else {
        currentMusic--;
    }

    setMusic(currentMusic);
    playMusic();
    
});



const setPlaylist = (i) => {
    if (window.disableCustomPlayer) {
        window.disableCustomPlayer();
    }
    let play = playLists[i];
    currentPlayList = i;
};

setPlaylist(0);

function resetNextPrevUI() {
    kindOfMusic1.style.removeProperty("margin-top");
    kindOfMusic1.style.removeProperty("margin-left");
    kindOfMusic1.style.removeProperty("min-width");

    nextBtnPlayList.style.removeProperty("margin-top");
    nextBtnPlayList.style.removeProperty("margin-left");
    previousBtnPlayList.style.removeProperty("margin-top");
    previousBtnPlayList.style.removeProperty("margin-left");
}

nextBtnPlayList.addEventListener('click', () => {
   if (currentPlayList >= playLists.length) { // ako smo na Custom Playlist
        currentPlayList = 0; // ide nazad na prvu statičku
        List[0].innerHTML = List[currentPlayList].innerHTML;
    } else if (currentPlayList === playLists.length - 1) { // poslednja statička playlist
        currentPlayList = playLists.length; // Custom Playlist
        List[0].innerHTML = "Custom Playlist";
    } else {
        currentPlayList++;
        List[0].innerHTML = List[currentPlayList].innerHTML;
    }

    resetNextPrevUI();


     if (List[currentPlayList].innerHTML.trim() === "Narodna") {
        nextBtnPlayList.style.marginTop = "-37%";
        previousBtnPlayList.style.marginTop = "-37%";
           nextBtnPlayList.style.marginLeft = "10%";
         previousBtnPlayList.style.marginLeft = "-25%"
        // previousBtnPlayList.style.marginLeft = "1%";
        kindOfMusic.style.setProperty("margin-top", "-34%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
    else if(List[currentPlayList].innerHTML.trim() === "Promo" || 
        List[currentPlayList].innerHTML.trim() === "Balkan"){
        nextBtnPlayList.style.marginTop = "-44%";
        previousBtnPlayList.style.marginTop = "-43.5%";
          nextBtnPlayList.style.marginLeft = "10%";
         previousBtnPlayList.style.marginLeft = "-30%"
         kindOfMusic.style.setProperty("margin-top", "-40%", "important");
         kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
        else if(List[currentPlayList].innerHTML.trim() === "Custom Playlist"){
        nextBtnPlayList.style.marginTop = "-19%";
        nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginTop = "-20%";
        previousBtnPlayList.style.marginLeft = "-25%";
         kindOfMusic.style.setProperty("margin-top", "-19%", "important");
         // kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
         else if(List[currentPlayList].innerHTML.trim() === "Classics"){
        nextBtnPlayList.style.marginTop = "-40%";
        previousBtnPlayList.style.marginTop = "-40%";
               nextBtnPlayList.style.marginLeft = "10%";
         previousBtnPlayList.style.marginLeft = "-30%"
         kindOfMusic.style.setProperty("margin-top", "-36%", "important");
              kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }       
              else if(List[currentPlayList].innerHTML.trim() === "Rock"){
        nextBtnPlayList.style.marginTop = "-50%";
        // nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginTop = "-50%";
        previousBtnPlayList.style.marginLeft = "-34%";
         kindOfMusic.style.setProperty("margin-top", "-45.5%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
    else {
        nextBtnPlayList.style.marginTop = "-45%";
        previousBtnPlayList.style.marginTop = "-46%";
        kindOfMusic.style.setProperty("margin-top", "-43%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
          nextBtnPlayList.style.marginLeft = "10%";
         previousBtnPlayList.style.marginLeft = "-31.5%"
    }

    songList1.style.textAlign = "center";
    setPlaylist(currentPlayList);
    playMusic();
    handleCustomPlaylistToggleFromStatic();
});


previousBtnPlayList.addEventListener('click', () => {
    if (currentPlayList <= 0) {
        currentPlayList = playLists.length;
        List[0].innerHTML = "Custom Playlist";
    } 
    else if (currentPlayList == 1) { // Bug with not displaying the Promo Songs after back click from Classic
        List[0].innerHTML = songList8.innerHTML;
        currentPlayList--;
    }
    else {
        currentPlayList--;
        List[0].innerHTML = List[currentPlayList].innerHTML;
    }

        resetNextPrevUI();

    if (List[currentPlayList].innerHTML.trim() === "Narodna") {
        nextBtnPlayList.style.marginTop = "-37%";
        nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginTop = "-37%";
        previousBtnPlayList.style.marginLeft = "-25%";
        // previousBtnPlayList.style.marginLeft = "0%";
        kindOfMusic.style.setProperty("margin-top", "-34%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
    else if(List[currentPlayList].innerHTML.trim() === "Promo" || 
        List[currentPlayList].innerHTML.trim() === "Balkan"){
        nextBtnPlayList.style.marginTop = "-44%";
         nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginTop = "-43.5%";
         previousBtnPlayList.style.marginLeft = "-30%";
         kindOfMusic.style.setProperty("margin-top", "-40%", "important");
         kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
         else if(List[currentPlayList].innerHTML.trim() === "Custom Playlist"){
        nextBtnPlayList.style.marginTop = "-19%";
        nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginTop = "-20%";
        previousBtnPlayList.style.marginLeft = "-25%";
         kindOfMusic.style.setProperty("margin-top", "-19%", "important");
         // kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
         else if(List[currentPlayList].innerHTML.trim() === "Classics"){
        nextBtnPlayList.style.marginTop = "-40%";
        nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginTop = "-40%";
        previousBtnPlayList.style.marginLeft = "-30%";
         kindOfMusic.style.setProperty("margin-top", "-36%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
                else if(List[currentPlayList].innerHTML.trim() === "Rock"){
        nextBtnPlayList.style.marginTop = "-50%";
        // nextBtnPlayList.style.marginLeft = "10%";
        previousBtnPlayList.style.marginTop = "-50%";
        previousBtnPlayList.style.marginLeft = "-34%";
         kindOfMusic.style.setProperty("margin-top", "-45.5%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
    else {
        nextBtnPlayList.style.marginTop = "-45%";
        previousBtnPlayList.style.marginTop = "-46%";
         nextBtnPlayList.style.marginLeft = "10%";
         previousBtnPlayList.style.marginLeft = "-31.5%"
        kindOfMusic.style.setProperty("margin-top", "-43%", "important");
        kindOfMusic.style.setProperty("margin-left", "0%", "important");
    }
    songList1.style.textAlign = "center";
    setPlaylist(currentPlayList);
    playMusic();
});

music.addEventListener('ended',function(){
      if (currentMusic >= playLists[currentPlayList].length - 1) {
    currentMusic = 0;
} 
   else {
    currentMusic++;
}
    setMusic(currentMusic);
    playMusic();
 });

function handleCustomPlaylistToggleFromStatic() {
   
    // 1. Pauziraj statički audio odmah
    if (!music.paused) {
        music.pause();
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
        disk.classList.remove('play');
    }
    
     // Pogledaj da li je labela playlist-a Custom
    const currentLabel = document.querySelector('.kindOfMusic').innerText.trim();
    
    if (currentLabel === "Custom Playlist") {
        // Aktiviraj custom player
        window.activePlayer = "custom";
        if (typeof window.enableCustomPlayerUI === "function") {
            window.enableCustomPlayerUI();
        }

        // Ako ima pesama u custom playlisti, pusti prvu
        if (window.customPlaylist && window.customPlaylist.length > 0) {
            window.ensureYTPlayer().then(() => {
                playYouTube(window.customPlaylist[0]);
            });
        }
    } else {
        // Vrati statički player
        window.activePlayer = "static";
        if (typeof window.disableCustomPlayer === "function") {
            window.disableCustomPlayer();
        }
    }
}

// Ovo pozovi svaki put kada korisnik menja playlist tab
nextBtnPlayList.addEventListener('click', handleCustomPlaylistToggleFromStatic);
previousBtnPlayList.addEventListener('click', handleCustomPlaylistToggleFromStatic);
