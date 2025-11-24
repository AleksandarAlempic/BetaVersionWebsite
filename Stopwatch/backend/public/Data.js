
const playLists = [];

let introSongs = [
    
   {
      name: 'Jutro je',
      path: 'audio/Nada%20Topcagic%20-%20Jutro%20je%20-%20(Audio%201990)%20HD%20(128%20kbps).mp3',
      artist: 'Nada Topcagic',
      cover: 'images/audio/NadaTopcagic.jpg'
   },
{
      name: 'Malo po malo',
      path: 'audio/Vesna Zmijanac - Malo po malo - (Official Video 1995).mp3',
      artist: 'Vesna Zmijanac',
      cover: 'images/audio/MaloPoMalo.jpg'
   },
       {
      name: 'Ej, dragi, dragi',
      path: 'audio/Cakana - Ej, dragi, dragi - (Audio 2009).mp3',
      artist: 'Cakana',
      cover: 'images/audio/EjDragi.jpg'
   },
  
   {
      name: 'Waka waka',
      path: 'audio/WakaWaka.mp3',
      artist: 'Shakira',
      cover: 'images/audio/WakaWaka.jpg'
   },
   {
      name: 'La la la',
      path: 'audio/Shakira%20-%20La%20La%20La%20(Brazil%202014)%20ft.%20Carlinhos%20Brown.mp3',
      artist: 'Shakira ft. Carlinhos Brown',
      cover: 'images/audio/Shakira.jpg'
   },
   // {
   //    name: 'Wavin Flag',
   //    path: 'audio/Wavin%20Flag%20(Spanish%20Version)%20-%20Knaan%20&%20David%20Bisbal%20-%20World%20Cup%202010%20theme%20song%20(128%20kbps).mp3',
   //    artist: 'Knaan & David Bisbal',
   //    cover: 'images/audio/World%20Cup%202010%20theme%20song.jpg'
   // },
   {
      name: 'We Are One',
      path: 'audio/We%20Are%20One%20(Ole%20Ola)%20%5BThe%20Official%202014%20FIFA%20World%20Cup%20Song%5D.mp3',
      artist: 'Pitbull feat J.Lopez&C.Leitte ',
      cover: 'images/audio/WeAreOne.jpg'
   },
   {
      name: 'Walk',
      path: 'audio/Kwabs%20-%20Walk%20(Official%20Video).mp3',
      artist: 'Kwabs',
      cover: 'images/audio/Kwabs.jpg'
   },
   {
      name: 'Say It Right',
      path: 'audio/Nelly%20Furtado%20-%20Say%20It%20Right%20(Official%20Music%20Video).mp3',
      artist: 'Nelly Furtado',
      cover: 'images/audio/NellyFurtado.jpg'
   },
   {
      name: 'Out of Touch',
      path: 'audio/Hall%20&%20Oates%20-%20Out%20of%20Touch.mp3',
      artist: 'Hall & Oates',
      cover: 'images/audio/Hall%20&%20Oates.jpg'
   },
   {
      name: 'The Power Of Love',
      path: 'audio/IL%20DIVO%20-%20The%20Power%20Of%20Love%20(La%20Fuerza%20Mayor)%20(Live%20Video).mp3',
      artist: 'IL DIVO',
      cover: 'images/audio/IlDivo.jpg'
   },
   {
      name: 'Alone (Solo)',
      path: 'audio/Alone%20(Solo).mp3',
      artist: 'IL DIVO',
      cover: 'images/audio/Alone.jpg'
   },
   // {
   //    name: 'Vracaju se dani pobede',
   //    path: 'audio/Grupa%20JNA%20-%20Vracaju%20se%20dani%20pobede.mp3',
   //    artist: '',
   //    cover: 'images/audio/GrupaJNA.jpg'
   // },
   {
      name: 'U inat proslosti',
      path: 'audio/Aleksandra%20Radovic%20&%20The%20Beatshakers%20-%20Who%20Gonna%20Stop%20Me%20Now%20(Official%20HD%20Video).mp3',
      artist: 'Aleksandra Radovic',
      cover: 'images/audio/AleksandraRadovic.jpg'
   },
   // {
   //    name: 'Devet Zivota',
   //    path: 'audio/ALEKSANDRA%20PRIJOVIC%20-%20DEVET%20ZIVOTA%20(OFFICIAL%20VIDEO).mp3',
   //    artist: 'Aleksandra Prijovic',
   //    cover: 'images/audio/AleksandraPrijovic.jpg'
   // },
 
   // {
   //    name: 'Ne Pitaj',
   //    path: 'audio/LegendE%20_%20Ne%20pitaj%20-%20(LIVE)%20-%20(Sava%20centar%202005)%20(128%20kbps).mp3',
   //    artist: 'Legende',
   //    cover: 'images/audio/LegendeNePitaj.jpg'
   // },
   // {
   //    name: 'Hall of Fame',
   //    path: 'audio/The%20Script%20-%20Hall%20of%20Fame%20(Official%20Video)%20ft.%20will.i.am.mp3',
   //    artist: 'The Script - ft. will.i.am',
   //    cover: 'images/audio/HallOfFame.jpg '
   // },
   // {
   //    name: 'Superheroes',
   //    path: 'audio/The%20Script%20-%20Superheroes%20(Official%20Video).mp3',
   //    artist: 'The Script',
   //    cover: 'images/audio/TheScript.jpg'
   // },
   // {
   //    name: 'Calling On Me',
   //    path: 'audio/Sean%20Paul,%20Tove%20Lo%20-%20Calling%20On%20Me%20(128%20kbps).mp3',
   //    artist: 'Sean Paul',
   //    cover: 'images/audio/SeanPaul.jpg'
   // },
   {
      name: 'Gimme! Gimme!',
      path: 'audio/ABBA%20-%20Gimme!%20Gimme!%20Gimme!%20(A%20Man%20After%20Midnight).mp3',
      artist: 'ABBA',
      cover: 'images/audio/ABBA-GimmeGimmeGimme-video.png'
   },
   {
      name: 'Alive',
      path: 'audio/Sia%20-%20Alive%20(Official%20Video).mp3',
      artist: 'Sia',
      cover: 'images/audio/Alive.jpg'
   },
];

playLists.push({ name: "Intro", songs: introSongs });


let classicSongs = [
       {
      name: 'La finta giardiniera',
      path: 'audio/Mozart_ Overture - La finta giardiniera.mp3',
      artist: 'Mozart',
      cover: 'images/audio/Wolfgang-Amadeus-Mozart-scaled.jpeg'
   },
   {
      name: 'Spring ',
      path: 'audio/Antonio Vivaldi - Four Seasons Autumn - Frederieke Saeijs.mp3',
      artist: 'Antonio Vivaldi',
      cover: 'images/audio/AntonioVivaldi.jpg'
   },
   {
      name: 'E.K. Nachtmusik',
      path: 'audio/Eine Kleine Nachtmusik - Mozart.mp3',
      artist: 'Mozart',
      cover: 'images/audio/Wolfgang-Amadeus-Mozart-scaled.jpeg'
   },
   {
      name: 'Hungarian Dance No.5',
      path: 'audio/Johannes Brahms -- Hungarian Dance No.5 - Hungarian Symphony Orchestra Budapest (1).mp3',
      artist: 'Johannes Brahms',
      cover: 'images/audio/Hungarian Dance No.5.jpg'
   },

   {
      name: 'The Second Waltz, Op. 99a',
      path: 'audio/The Second Waltz, Op. 99a.mp3',
      artist: 'Andre Rieu',
      cover: 'images/audio/The Second Waltz, Op. 99a.jpg'
   },
   {
      name: 'Viva España',
      path: 'audio/Viva España.mp3',
      artist: 'Andre Rieu',
      cover: 'images/audio/The Second Waltz, Op. 99a.jpg'
   },
   {
      name: 'Griechischer Wein',
      path: 'audio/Griechischer Wein.mp3',
      artist: 'Andre Rieu',
      cover: 'images/audio/The Second Waltz, Op. 99a.jpg'
   },
   {
      name: 'Amigos para siempre',
      path: 'audio/Amigos para siempre.mp3',
      artist: 'Andre Rieu',
      cover: 'images/audio/The Second Waltz, Op. 99a.jpg'
   },
   // {
   //    name: 'Der einsame Hirte',
   //    path: 'audio/Leo_Rojas_-_Der_einsame_Hirte_Videoclip.mp3',
   //    artist: 'Leo Rohas',
   //    cover: 'images/audio/LeoRohas1.jpg'
   // },
   // {
   //    name: 'Der letzte Mohikaner',
   //    path: 'audio/Der letzte Mohikaner.mp3',
   //    artist: 'Leo Rohas',
   //    cover: 'images/audio/LeoRohas.jpg'
   // },
   {
      name: 'The Riders of Rohan',
      path: 'audio/The Lord Of The Rings - The Riders of Rohan - Erhu & Violin cover.mp3',
      artist: 'The Lord Of The Rings',
      cover: 'images/audio/RidersOfRohan.jpg'
   },
    {
  name: 'Tamo daleko',
  path: 'audio/Tamo daleko.mp3',
  artist: 'Tradicionalna srpska',
  cover: 'images/audio/TamoDaleko.jpg'
},
   {
      name: 'Victory',
      path: 'audio/Two Steps From Hell - Victory.mp3',
      artist: 'Two Steps From Hell',
      cover: 'images/audio/VictoryTwoStepsFromHell.jpg'
   },
      {
      name: 'The Power Of Love',
      path: 'audio/IL%20DIVO%20-%20The%20Power%20Of%20Love%20(La%20Fuerza%20Mayor)%20(Live%20Video).mp3',
      artist: 'IL DIVO',
      cover: 'images/audio/IlDivo.jpg'
   },
   {
      name: 'Alone (Solo)',
      path: 'audio/Alone (Solo).mp3',
      artist: 'IL DIVO',
      cover: 'images/audio/Alone.jpg'
   }
];

playLists.push({ name: "Classic", songs: classicSongs });



let narodnjaciSongs = [
  {
    name: 'Takni me, takni',
    path: 'audio/Takni me, takni.mp3',
    artist: 'Sneki',
    cover: 'images/audio/TakniMeTakni.jpg'
  },
  {
    name: 'Pristajem na sve',
    path: 'audio/Semsa Suljakovic i Juzni Vetar - Pristajem na sve (Audio 1986).mp3',
    artist: 'Šemsa Suljaković',
    cover: 'images/audio/SemsaSuljakovic.jpg'
  },
  {
    name: 'Kazni me',
    path: 'audio/Vesna%20Zmijanac%20-%20Kazni%20me%20-%20(Audio%201989)%20HD%20(mp3cut.net).mp3',
    artist: 'Vesna Zmijanac',
    cover: 'images/audio/KazniMeKazni.jpg'
  },
  {
    name: 'Malo po malo',
    path: 'audio/Vesna Zmijanac - Malo po malo - (Official Video 1995).mp3',
    artist: 'Vesna Zmijanac',
    cover: 'images/audio/MaloPoMalo.jpg'
  },
  {
    name: 'Ej, dragi, dragi',
    path: 'audio/Cakana - Ej, dragi, dragi - (Audio 2009).mp3',
    artist: 'Cakana',
    cover: 'images/audio/EjDragi.jpg'
  },
  {
    name: 'Srpkinja je mene majka rodila',
    path: 'audio/Cakana & Sastav Svitanje - Srpkinja je mene majka rodila.mp3',
    artist: 'Cakana',
    cover: 'images/audio/SrpkinjaJeMeneMajkaRodila.jpg'
  },
  {
    name: 'Jutro je',
    path: 'audio/Nada%20Topcagic%20-%20Jutro%20je%20-%20(Audio%201990)%20HD%20(128%20kbps).mp3',
    artist: 'Nada Topčagić',
    cover: 'images/audio/NadaTopcagic.jpg'
  },
  {
    name: 'Zar za mene nema sreće',
    path: 'audio/Zar za mene nema srece.mp3',
    artist: 'Šemsa Suljaković',
    cover: 'images/audio/SemsaSuljakovic.jpg'
  },
  {
    name: 'Opet imam razloga da živim',
    path: 'audio/Ana Bekuta - Opet imam razloga da zivim.mp3',
    artist: 'Ana Bekuta',
    cover: 'images/audio/AnaBekuta1.jpg'
  },
  {
    name: 'Imam jedan život',
    path: 'audio/Ana%20Bekuta%20-%20Imam%20jedan%20zivot%20(Sava%20Centar%2022.02.2012.).mp3',
    artist: 'Ana Bekuta',
    cover: 'images/audio/AnaBekuta.jpg'
  },
  {
    name: 'Molitva',
    path: 'audio/MARIJA%20SERIFOVIC%20-%20MOLITVA%20-%20(OFFICIAL%20VIDEO%202020).mp3',
    artist: 'Marija Šerifović',
    cover: 'images/audio/MarijaSerifovic.jpg'
  },
  {
    name: 'Ružo rumena',
    path: 'audio/RUZO%20RUMENA%20-%20Dragan%20Jovanovic.mp3',
    artist: 'Dragan Jovanović',
    cover: 'images/audio/RuzoRumena.jpeg'
  }
];

playLists.push({ name: "Narodnjaci", songs: narodnjaciSongs });


let danceSongs = [
   {
      name: 'La la la',
      path: 'audio/Shakira%20-%20La%20La%20La%20(Brazil%202014)%20ft.%20Carlinhos%20Brown.mp3',
      artist: 'Shakira ft. Carlinhos Brown',
      cover: 'images/audio/Shakira.jpg'
   },
   {
      name: 'Ni Tu Ni Yo',
      path: 'audio/Jennifer%20Lopez%20-%20Ni%20Tu%20Ni%20Yo%20(Official%20Audio)%20ft.%20Gente%20de%20Zona.mp3',
      artist: 'J Lopez ft. Gente de Zona',
      cover: 'images/audio/NiTuNiJo.jpg'
   },
   {
      name: 'Bailando',
      path: 'audio/Enrique Iglesias - Bailando ft. Descemer Bueno, Gente De Zona.mp3',
      artist: 'Enrique Iglesias',
      cover: 'images/audio/Bailando.jpg'
   },
   {
      name: 'Aint Your Mama',
      path: 'audio/Jennifer%20Lopez%20-%20Aint%20Your%20Mama%20(Lyrics)%20we%20used%20to%20be%20crazy%20in%20love.mp3',
      artist: 'Jennifer Lopez',
      cover: 'images/audio/JenniferLopez.jpg'
   },
   {
      name: 'Cheap Thrills ft. Sean Paul',
      path: 'audio/Sia - Cheap Thrills (Official Lyric Video) ft. Sean Paul.mp3',
      artist: 'Sia',
      cover: 'images/audio/CheapThrills.jpg'
   },
   {
      name: 'Say It Right',
      path: 'audio/Nelly%20Furtado%20-%20Say%20It%20Right%20(Official%20Music%20Video).mp3',
      artist: 'Nelly Furtado',
      cover: 'images/audio/NellyFurtado.jpg'
   },
   {
      name: 'Walk',
      path: 'audio/Kwabs%20-%20Walk%20(Official%20Video).mp3',
      artist: 'Kwabs',
      cover: 'images/audio/Kwabs.jpg'
   },
   {
      name: 'La Vida Tombola',
      path: 'audio/Manu Chao - La Vida Tombola (Played for Diego Maradona).mp3',
      artist: 'Manu Chao',
      cover: 'images/audio/LaTombola.jpg'
   },
   {
      name: 'Brother Louie 98',
      path: 'audio/Modern Talking - Brother Louie 98 (OfficialVideo - New Version).mp3',
      artist: 'Modern Talking',
      cover: 'images/audio/BrotherLouie.jpg'
   },
   {
      name: 'Amor, Amor',
      path: 'audio/Jennifer%20Lopez%20-%20Amor,%20Amor,%20Amor%20(Official%20Video)%20ft.%20Wisin.mp3',
      artist: 'J.Lopez ft. Wisin',
      cover: 'images/audio/JeniferLopezAmor.jpg'
   },
   {
      name: 'Vivir Mi Vida',
      path: 'audio/Marc%20Anthony%20-%20Vivir%20Mi%20Vida%20(Official%20Video).mp3',
      artist: 'Marc Anthony',
      cover: 'images/audio/MarchAnthony.jpg'
   },
   {
      name: 'We Are One',
      path: 'audio/We%20Are%20One%20(Ole%20Ola)%20[The%20Official%202014%20FIFA%20World%20Cup%20Song].mp3',
      artist: 'Pitbull feat J.Lopez&C.Leitte',
      cover: 'images/audio/WeAreOne.jpg'
   }
];
playLists.push({ name: "Dance", songs: danceSongs });


  let rockSongs = [
         {
      name: 'Give It Up',
      path: 'audio/KC%20and%20The%20Sunshine%20Band%20-%20Give%20It%20Up.mp3',
      artist: 'KC & The Sunshine Band',
      cover: 'images/audio/GiveItUp.jpg'
   },
   {
      name: 'Cheri Cheri Lady',
      path: 'audio/Modern Talking - Cheri Cheri Lady (OfficialVideo).mp3',
      artist: 'Modern Talking',
      cover: 'images/audio/CherryCherry.jpg'
   },
   {
      name: 'Gimme! Gimme!',
      path: 'audio/ABBA%20-%20Gimme!%20Gimme!%20Gimme!%20(A%20Man%20After%20Midnight).mp3',
      artist: 'ABBA',
      cover: 'images/audio/ABBA-GimmeGimmeGimme-video.png'
   },
   {
      name: 'Out of Touch',
      path: 'audio/Out of Touch.mp3',
      artist: 'Hall & Oates',
      cover: 'images/audio/Hall%20&%20Oates.jpg'
   },
   {
      name: 'Hot Stuff',
      path: 'audio/Hot Stuff.mp3',
      artist: 'Donna Summer',
      cover: 'images/audio/Hot Stuff.jpg'
   },
   {
      name: 'Bella Ciao',
      path: 'audio/Bella Ciao.mp3',
      artist: 'Goran Bregovic',
      cover: 'images/audio/BellaCiao.jpg'
   },
   {
      name: 'I Will Survive',
      path: 'audio/Gloria Gaynor - I Will Survive.mp3',
      artist: 'Gloria Gaynor',
      cover: 'images/audio/GloriaIWillSurvive.jpg'
   }
];


playLists.push({ name: "Rock", songs: rockSongs });

let BalkanSongs = [
   {
    name: 'Legitimno',
    path: 'audio/ALEKSANDRA%20PRIJOVIC%20-%20LEGITIMNO%20(OFFICIAL%20VIDEO%202020).mp3',
    artist: 'Aleksandra Prijović',
    cover: 'images/audio/Legitimno.jpg'
  },
  {
    name: 'Placebo',
    path: 'audio/ALEKSANDRA%20PRIJOVIC%20-%20PLACEBO%20(OFFICIAL%20VIDEO)%20(1).mp3',
    artist: 'Aleksandra Prijović',
    cover: 'images/audio/Placebo.jpg'
  },
   //    {
   //    name: 'Devet Zivota',
   //    path: 'audio/ALEKSANDRA%20PRIJOVIC%20-%20DEVET%20ZIVOTA%20(OFFICIAL%20VIDEO).mp3',
   //    artist: 'Aleksandra Prijovic',
   //    cover: 'images/audio/AleksandraPrijovic.jpg'
   // },
  {
    name: 'U inat prošlosti',
    path: 'audio/Aleksandra%20Radovic%20&%20The%20Beatshakers%20-%20Who%20Gonna%20Stop%20Me%20Now%20(Official%20HD%20Video).mp3',
    artist: 'Aleksandra Radović',
    cover: 'images/audio/AleksandraRadovic.jpg'
  }
]

playLists.push({ name: "Balkan", songs: BalkanSongs });





