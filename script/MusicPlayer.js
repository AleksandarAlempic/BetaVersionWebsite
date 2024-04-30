
let currentMusic = 0;

const music = document.querySelector('#audio');

const songName = document.querySelector('.songName');
const artistName = document.querySelector('.artistName');
const disk = document.querySelector('.disk');
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.pervious-btn');

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
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;  
}

setMusic(0);

nextBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
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
        currentMusic = songs.length - 1;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
});

