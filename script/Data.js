
const playLists = [];

let introSongs = [

   {
      name: 'Waka waka',
      path: 'audio/Waka Waka (Esto es Africa).mp3',
      artist: 'Shakira',
      cover: 'images/audio/WakaWaka.jpg'
   },
   {
      name: 'La la la',
      path: 'audio/Shakira - La La La (Brazil 2014) ft. Carlinhos Brown.mp3',
      artist: 'Shakira ft. Carlinhos Brown',
      cover: 'images/audio/Shakira.jpg'
   },

   {
      name: 'Wavin Flag',
      path: 'audio/Wavin Flag (Spanish Version) - Knaan & David Bisbal - World Cup 2010 theme song (128 kbps).mp3',
      artist: 'Knaan & David Bisbal',
      cover: 'images/audio/World Cup 2010 theme song.jpg'
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

   {   
      name: 'Superheroes',
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
      name: 'E.K. Nachtmusik',
      path: 'audio/Eine Kleine Nachtmusik - Mozart.mp3',
      artist: 'Mozart',
      cover: 'images/audio/Wolfgang-Amadeus-Mozart-scaled.jpeg'
   },
   {
      name: 'La finta giardiniera',
      path: 'audio/Mozart_ Overture - La finta giardiniera.mp3',
      artist: 'Mozart',
      cover: 'images/audio/Wolfgang-Amadeus-Mozart-scaled.jpeg'
   },

   {
      name: 'Concerto No.4',
      path: 'audio/Antonio Vivaldi - Concerto No.4 in F minor.mp3',
      artist: 'Antonio Vivaldi',
      cover: 'images/audio/AntonioVivaldi.jpg'
   },
   {
      name: 'The Riders of Rohan',
      path: 'audio/The Lord Of The Rings - The Riders of Rohan - Erhu & Violin cover.mp3',
      artist: 'The Lord Of The Rings',
      cover: 'images/audio/RidersOfRohan.jpg'
   },

   {
      name: 'Hall of Fame',
      path: 'audio/The Script - Hall of Fame (Official Video) ft. will.i.am.mp3',
      artist: 'The Script - ft. will.i.am',
      cover: 'images/audio/HallOfFame.jpg '
   },  

    {
      name: 'Der letzte Mohikaner',
      path: 'audio/Der letzte Mohikaner.mp3',
      artist: 'Leo Rohas',
      cover: 'images/audio/LeoRohas.jpg'
   },  

   {
      name: 'Der einsame Hirte',
      path: 'audio/Leo_Rojas_-_Der_einsame_Hirte_Videoclip.mp3',
      artist: 'Leo Rohas',
      cover: 'images/audio/LeoRohas1.jpg'
   },  

 
   
]

playLists.push(classicSongs);

let narodnjaciSongs = [

   {
      name: 'Kazni me',
      path: 'audio/Vesna Zmijanac - Kazni me - (Audio 1989) HD (mp3cut.net).mp3',
      artist: 'Vesna Zmijanac',
      cover: 'images/audio/KazniMeKazni.jpg'
   },

   {
      name: 'Jutro je',
      path: 'audio/Nada Topcagic - Jutro je - (Audio 1990) HD (128 kbps).mp3',
      artist: 'Nada Topcagic',
      cover: 'images/audio/NadaTopcagic.jpg'
   },
  
   {
      name: 'Imam jedan zivot',
      path: 'audio/Ana Bekuta - Imam jedan zivot (Sava Centar 22.02.2012.).mp3',
      artist: 'Ana Bekuta',
      cover: 'images/audio/AnaBekuta.jpg'
   },

   {
      name: 'Veseli se srpski rode',
      path: 'audio/Veseli se srpski rode.mp3',
      artist: 'Danica Crnogorcevic',
      cover: 'images/audio/Danica.jpg'
   },

   {
      name: 'Molitva',
      path: 'audio/MARIJA SERIFOVIC - MOLITVA - (OFFICIAL VIDEO 2020).mp3',
      artist: 'Marija Serifovic',
      cover: 'images/audio/MarijaSerifovic.jpg'
   },
   
   {
      name: 'U inat proslosti',
      path: 'audio/Aleksandra Radovic & The Beatshakers - Who Gonna Stop Me Now (Official HD Video).mp3',
      artist: 'Aleksandra Radovic',
      cover: 'images/audio/AleksandraRadovic.jpg'
   },
 
  {
      name: 'Sve po starom',
      path: 'audio/ALEKSANDRA PRIJOVIC - SVE PO STAROM (OFFICIAL VIDEO).mp3',
      artist: 'Aleksandra Prijovic',
      cover: 'images/audio/PrijovicSvePoStarom.jpg'
   },
   
   {
      name: 'Legitimno',
      path: 'audio/ALEKSANDRA PRIJOVIC - LEGITIMNO (OFFICIAL VIDEO 2020).mp3',
      artist: 'Aleksandra Prijovic',
      cover: 'images/audio/Legitimno.jpg'
   },
   {
      name: 'Placebo',
      path: 'audio/ALEKSANDRA PRIJOVIC - PLACEBO (OFFICIAL VIDEO) (1).mp3',
      artist: 'Aleksandra Prijovic',
      cover: 'images/audio/Placebo.jpg'
   },
   {
      name: 'Boli Boli',
      path: 'audio/Ivana Selakov x Amar Gile - BOLI BOLI ( Official Video 2020 ).mp3',
      artist: 'Ivana Selakov & Amar Gile',
      cover: 'images/audio/BoliBoliOvaBol.jpg'
   },

   {
      name: 'Ruzo Rumena',
      path: 'audio/RUZO RUMENA - Dragan Jovanovic.mp3',
      artist: 'Dragan Jovanovic',
      cover: 'images/audio/RuzoRumena.jpeg'
   },
   // {
   //    name: 'Ne Pitaj',
   //    path: 'audio/LegendE _ Ne pitaj - (LIVE) - (Sava centar 2005) (128 kbps).mp3',
   //    artist: 'Legende',
   //    cover: 'images/audio/LegendeNePitaj.jpg'
   // },


 
   // {
   //    name: 'Devet Zivota',
   //    path: 'audio/ALEKSANDRA PRIJOVIC - DEVET ZIVOTA (OFFICIAL VIDEO).mp3',
   //    artist: 'Aleksandra Prijovic',
   //    cover: 'images/audio/AleksandraPrijovic.jpg'
   // },
   {
      name: 'Vracaju se dani pobede',
      path: 'audio/Grupa JNA - Vracaju se dani pobede.mp3',
      artist: '',
      cover: 'images/audio/GrupaJNA.jpg'
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
      name: 'Say It Right',
      path: 'audio/Nelly Furtado - Say It Right (Official Music Video).mp3',
      artist: 'Nelly Furtado',
      cover: 'images/audio/NellyFurtado.jpg'
   }, 
  
  {
      name: 'Amor, Amor',
      path: 'audio/Jennifer Lopez - Amor, Amor, Amor (Official Video) ft. Wisin.mp3',
      artist: 'J.Lopez ft. Wisin',
      cover: 'images/audio/JeniferLopezAmor.jpg'
   },

   {
      name: 'Vivir Mi Vida',
      path: 'audio/Marc Anthony - Vivir Mi Vida (Official Video).mp3',
      artist: 'Marc Anthony',
      cover: 'images/audio/MarchAnthony.jpg'
   },
 
   {
      name: 'We Are One',
      path: 'audio/We Are One (Ole Ola) [The Official 2014 FIFA World Cup Song].mp3',
      artist: 'Pitbull feat J.Lopez&C.Leitte ',
      cover: 'images/audio/WeAreOne.jpg'
   },
   {
      name: 'Ni Tu Ni Yo',
      path: 'audio/Jennifer Lopez - Ni Tu Ni Yo (Official Audio) ft. Gente de Zona.mp3',
      artist: 'J Lopez ft. Gente de Zona',
      cover: 'images/audio/NiTuNiJo.jpg'
   }, 
   {
      name: 'Walk',
      path: 'audio/Kwabs - Walk (Official Video).mp3',
      artist: 'Kwabs',
      cover: 'images/audio/Kwabs.jpg'
   },
  
   // {
   //    name: 'Hey DJ',
   //    path: 'audio/CNCO, Meghan Trainor, Sean Paul - Hey DJ (Remix) [Official Video].mp3',
   //    artist: 'CNCO, Meghan Trainor',
   //    cover: 'images/audio/CNCO.jpg'
   // },
   
   
]

playLists.push(danceSongs);

let rockSongs = [
   {
      name: 'Give It Up',
      path: 'audio/KC and The Sunshine Band - Give It Up.mp3',
      artist: 'KC & The Sunshine Band',
      cover: 'images/audio/GiveItUp.jpg'
   },
   {
      name: 'Out of Touch',
      path: 'audio/Hall & Oates  - Out of Touch.mp3',
      artist: 'Hall & Oates',
      cover: 'images/audio/Hall & Oates.jpg'
   },
 
   {
      name: 'Gimme! Gimme!',
      path: 'audio/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3',
      artist: 'ABBA',
      cover: 'images/audio/ABBA-GimmeGimmeGimme-video.png'
    },
    {
      name: 'Voulez-Vous',
      path: 'audio/ABBA - Voulez-Vous (Lyric Video).mp3',
      artist: 'ABBA',
      cover: 'images/audio/Voulez-Vous.jpg'
    },

]

playLists.push(rockSongs);

let classicArab = [
   {
      name: 'Inta Umri',
      path: 'audio/National Arab Orchestra -  Inta Umri  - Mai Farouk.mp3',
      artist: 'National Arab Orchestra',
      cover: 'images/audio/Mai Farouk.jpg'
    },
   {
      name: 'Ahwak',
      path: 'audio/National Arab Orchestra - Ahwak  - Chadi Kassem.mp3',
      artist: 'National Arab Orchestra',
      cover: 'images/audio/Ahwak.jpg'
   },
   {
      name: 'Alf Leila wi Leila',
      path: 'audio/National Arab Orchestra - Alf Leila wi Leila - Mai Farouk.mp3',
      artist: 'National Arab Orchestra',
      cover: 'images/audio/NationalArabOrchestra.jpg'
    },
 
   {
      name: 'Sandal Maker',
      path: 'audio/Sandal Maker.mp3',
      artist: 'Stronghold Crusader',
      cover: 'images/audio/SandalMaker.jpg'
    },
    {
      name: 'Belisarius',
      path: 'audio/Justinian-Epic Symphony - Belisarius.mp3',
      artist: 'Justinian Epic Symphony',
      cover: 'images/audio/Justinian.jpg'
    },

    {
      name: 'Digenis and Death',
      path: 'audio/Digenis and Death - Epic Byzantine Music.mp3',
      artist: 'Byzantine Epic Music',
      cover: 'images/audio/Digenis and Death.jpg'
    },
   

]



playLists.push(classicArab);
