
const playLists = [];

let introSongs = [
   {
      name: 'Waka waka',
      path: 'audio/Waka Waka (Esto es Africa).mp3',
      artist: 'Shakira',
      cover: 'images/audio/WakaWaka.jpg'
   },
   {
      name: 'Wavin Flag',
      path: 'audio/Wavin Flag (Spanish Version) - Knaan & David Bisbal - World Cup 2010 theme song (128 kbps).mp3',
      artist: 'Knaan & David Bisbal',
      cover: 'images/audio/World Cup 2010 theme song.jpg'
   },
   {
      name: 'La la la',
      path: 'audio/Shakira - La La La (Brazil 2014) ft. Carlinhos Brown.mp3',
      artist: 'Shakira ft. Carlinhos Brown',
      cover: 'images/audio/Shakira.jpg'
   },
   {
      name: 'We Are One',
      path: 'audio/We Are One (Ole Ola) [The Official 2014 FIFA World Cup Song].mp3',
      artist: 'Pitbull feat J.Lopez&C.Leitte ',
      cover: 'images/audio/WeAreOne.jpg'
   },
  
 
   {
      name: 'Walk',
      path: 'audio/Kwabs - Walk (Official Video).mp3',
      artist: 'Kwabs',
      cover: 'images/audio/Kwabs.jpg'
   },
   {
      name: 'Say It Right',
      path: 'audio/Nelly Furtado - Say It Right (Official Music Video).mp3',
      artist: 'Nelly Furtado',
      cover: 'images/audio/NellyFurtado.jpg'
   }, 
     
   {
      name: 'Out of Touch',
      path: 'audio/Hall & Oates  - Out of Touch.mp3',
      artist: 'Hall & Oates',
      cover: 'images/audio/Hall & Oates.jpg'
   },

  
   {
      name: 'The Power Of Love',
      path: 'audio/IL DIVO - The Power Of Love (La Fuerza Mayor) (Live Video).mp3',
      artist: 'IL DIVO',
      cover: 'images/audio/IlDivo.jpg'
    },

   {
      name: 'Alone (Solo)',
      path: 'audio/Alone (Solo).mp3',
      artist: 'IL DIVO',
      cover: 'images/audio/Alone.jpg'
   }, 

   {
      name: 'Vracaju se dani pobede',
      path: 'audio/Grupa JNA - Vracaju se dani pobede.mp3',
      artist: '',
      cover: 'images/audio/GrupaJNA.jpg'
   },
   {
      name: 'U inat proslosti',
      path: 'audio/Aleksandra Radovic & The Beatshakers - Who Gonna Stop Me Now (Official HD Video).mp3',
      artist: 'Aleksandra Radovic',
      cover: 'images/audio/AleksandraRadovic.jpg'
   },
   {
      name: 'Devet Zivota',
      path: 'audio/ALEKSANDRA PRIJOVIC - DEVET ZIVOTA (OFFICIAL VIDEO).mp3',
      artist: 'Aleksandra Prijovic',
      cover: 'images/audio/AleksandraPrijovic.jpg'
   },
   {
      name: 'Jutro je',
      path: 'audio/Nada Topcagic - Jutro je - (Audio 1990) HD (128 kbps).mp3',
      artist: 'Nada Topcagic',
      cover: 'images/audio/NadaTopcagic.jpg'
   },
   {
      name: 'Ne Pitaj',
      path: 'audio/LegendE _ Ne pitaj - (LIVE) - (Sava centar 2005) (128 kbps).mp3',
      artist: 'Legende',
      cover: 'images/audio/LegendeNePitaj.jpg'
   },

   {
      name: 'Hall of Fame',
      path: 'audio/The Script - Hall of Fame (Official Video) ft. will.i.am.mp3',
      artist: 'The Script - ft. will.i.am',
      cover: 'images/audio/HallOfFame.jpg '
   },

   {      name: 'Superheroes',
      path: 'audio/The Script - Superheroes (Official Video).mp3',
      artist: 'The Script',
      cover: 'images/audio/TheScript.jpg'
   },
   
   {
      name: 'Calling On Me',
      path: 'audio/Sean Paul, Tove Lo - Calling On Me (128 kbps).mp3',
      artist: 'Sean Paul',
      cover: 'images/audio/SeanPaul.jpg'
   },
 
   {
      name: 'Gimme! Gimme!',
      path: 'audio/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3',
      artist: 'ABBA',
      cover: 'images/audio/ABBA-GimmeGimmeGimme-video.png'
    },


   {
      name: 'Alive',
      path: 'audio/Sia - Alive (Official Video).mp3',
      artist: 'Sia',
      cover: 'images/audio/Alive.jpg'
   },
   
]

playLists.push(introSongs);

let classicSongs = [

   {
      name: 'Alone (Solo)',
      path: 'audio/Alone (Solo).mp3',
      artist: 'IL DIVO',
      cover: 'images/audio/Alone.jpg'
   },

   {
      name: 'The Power Of Love',
      path: 'audio/IL DIVO - The Power Of Love (La Fuerza Mayor) (Live Video).mp3',
      artist: 'IL DIVO',
      cover: 'images/audio/IlDivo.jpg'
    },
    {
      name: 'Hall of Fame',
      path: 'audio/The Script - Hall of Fame (Official Video) ft. will.i.am.mp3',
      artist: 'The Script - ft. will.i.am',
      cover: 'images/audio/HallOfFame.jpg '
   },

   
]

playLists.push(classicSongs);

let narodnjaciSongs = [

   {
      name: 'Jutro je',
      path: 'audio/Nada Topcagic - Jutro je - (Audio 1990) HD (128 kbps).mp3',
      artist: 'Nada Topcagic',
      cover: 'images/audio/NadaTopcagic.jpg'
   },

   {
      name: 'U inat proslosti',
      path: 'audio/Aleksandra Radovic & The Beatshakers - Who Gonna Stop Me Now (Official HD Video).mp3',
      artist: 'Aleksandra Radovic',
      cover: 'images/audio/AleksandraRadovic.jpg'
   },
   {
      name: 'Molitva',
      path: 'audio/MARIJA SERIFOVIC - MOLITVA - (OFFICIAL VIDEO 2020).mp3',
      artist: 'Marija Serifovic',
      cover: 'images/audio/MarijaSerifovic.jpg'
   },

  {
      name: 'Sve po starom',
      path: 'audio/ALEKSANDRA PRIJOVIC - SVE PO STAROM (OFFICIAL VIDEO).mp3',
      artist: 'Aleksandra Prijovic',
      cover: 'images/audio/PrijovicSvePoStarom.jpg'
   },
   {
      name: 'Devet Zivota',
      path: 'audio/ALEKSANDRA PRIJOVIC - DEVET ZIVOTA (OFFICIAL VIDEO).mp3',
      artist: 'Aleksandra Prijovic',
      cover: 'images/audio/AleksandraPrijovic.jpg'
   },
   {
      name: 'Boli Boli',
      path: 'audio/Ivana Selakov x Amar Gile - BOLI BOLI ( Official Video 2020 ).mp3',
      artist: 'Ivana Selakov & Amar Gile',
      cover: 'images/audio/BoliBoliOvaBol.jpg'
   },

   {
      name: 'Vracaju se dani pobede',
      path: 'audio/Grupa JNA - Vracaju se dani pobede.mp3',
      artist: '',
      cover: 'images/audio/GrupaJNA.jpg'
   },
  
   {
      name: 'Ruzo Rumena',
      path: 'audio/RUZO RUMENA - Dragan Jovanovic.mp3',
      artist: 'Dragan Jovanovic',
      cover: 'images/audio/RuzoRumena.jpeg'
   },
   {
      name: 'Ne Pitaj',
      path: 'audio/LegendE _ Ne pitaj - (LIVE) - (Sava centar 2005) (128 kbps).mp3',
      artist: 'Legende',
      cover: 'images/audio/LegendeNePitaj.jpg'
   },
]

playLists.push(narodnjaciSongs);

let danceSongs = [
   {
      name: 'Aint Your Mama',
      path: 'audio/Jennifer Lopez - Aint Your Mama (Lyrics) we used to be crazy in love.mp3',
      artist: 'Jennifer Lopez',
      cover: 'images/audio/JenniferLopez.jpg'
   }, 
   {
      name: 'Ni Tu Ni Yo',
      path: 'audio/Jennifer Lopez - Ni Tu Ni Yo (Official Audio) ft. Gente de Zona.mp3',
      artist: 'J Lopez ft. Gente de Zona',
      cover: 'images/audio/NiTuNiJo.jpg'
   }, 
  
  {
      name: 'Amor, Amor',
      path: 'audio/Jennifer Lopez - Amor, Amor, Amor (Official Video) ft. Wisin.mp3',
      artist: 'J.Lopez ft. Wisin',
      cover: 'images/audio/JeniferLopezAmor.jpg'
   },
   
]

playLists.push(danceSongs);