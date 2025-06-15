
const playLists = [];

let introSongs = [
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
   {
      name: 'Wavin Flag',
      path: 'audio/Wavin%20Flag%20(Spanish%20Version)%20-%20Knaan%20&%20David%20Bisbal%20-%20World%20Cup%202010%20theme%20song%20(128%20kbps).mp3',
      artist: 'Knaan & David Bisbal',
      cover: 'images/audio/World%20Cup%202010%20theme%20song.jpg'
   },
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
      cover: 'images/audio/OutOfTouch.webp'
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
   {
      name: 'Vracaju se dani pobede',
      path: 'audio/Grupa%20JNA%20-%20Vracaju%20se%20dani%20pobede.mp3',
      artist: '',
      cover: 'images/audio/GrupaJNA.jpg'
   },
   {
      name: 'U inat proslosti',
      path: 'audio/Aleksandra%20Radovic%20&%20The%20Beatshakers%20-%20Who%20Gonna%20Stop%20Me%20Now%20(Official%20HD%20Video).mp3',
      artist: 'Aleksandra Radovic',
      cover: 'images/audio/AleksandraRadovic.jpg'
   },
   {
      name: 'Devet Zivota',
      path: 'audio/ALEKSANDRA%20PRIJOVIC%20-%20DEVET%20ZIVOTA%20(OFFICIAL%20VIDEO).mp3',
      artist: 'Aleksandra Prijovic',
      cover: 'images/audio/AleksandraPrijovic.jpg'
   },
   {
      name: 'Jutro je',
      path: 'audio/Nada%20Topcagic%20-%20Jutro%20je%20-%20(Audio%201990)%20HD%20(128%20kbps).mp3',
      artist: 'Nada Topcagic',
      cover: 'images/audio/NadaTopcagic.jpg'
   },
   {
      name: 'Ne Pitaj',
      path: 'audio/LegendE%20_%20Ne%20pitaj%20-%20(LIVE)%20-%20(Sava%20centar%202005)%20(128%20kbps).mp3',
      artist: 'Legende',
      cover: 'images/audio/LegendeNePitaj.jpg'
   },
   {
      name: 'Hall of Fame',
      path: 'audio/The%20Script%20-%20Hall%20of%20Fame%20(Official%20Video)%20ft.%20will.i.am.mp3',
      artist: 'The Script - ft. will.i.am',
      cover: 'images/audio/HallOfFame.jpg '
   },
   {
      name: 'Superheroes',
      path: 'audio/The%20Script%20-%20Superheroes%20(Official%20Video).mp3',
      artist: 'The Script',
      cover: 'images/audio/TheScript.jpg'
   },
   {
      name: 'Calling On Me',
      path: 'audio/Sean%20Paul,%20Tove%20Lo%20-%20Calling%20On%20Me%20(128%20kbps).mp3',
      artist: 'Sean Paul',
      cover: 'images/audio/SeanPaul.jpg'
   },
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

playLists.push(introSongs);


let classicSongs = [

   {
      name: 'La finta giardiniera',
      path: 'audio/Mozart_ Overture - La finta giardiniera.mp3',
      artist: 'Mozart',
      cover: 'images/audio/Wolfgang-Amadeus-Mozart-scaled.jpeg'
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
      name: 'E.K. Nachtmusik',
      path: 'audio/Eine Kleine Nachtmusik - Mozart.mp3',
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
      name: 'Spring ',
      path: 'audio/Vivaldi Four Seasons_ Spring (La Primavera) Full, original. Youssefian & Voices of Music RV 269 4K.mp3',
      artist: 'Antonio Vivaldi',
      cover: 'images/audio/AntonioVivaldi.jpg'
   },
   {
      name: 'The Riders of Rohan',
      path: 'audio/The Lord Of The Rings - The Riders of Rohan - Erhu & Violin cover.mp3',
      artist: 'The Lord Of The Rings',
      cover: 'images/audio/RidersOfRohan.jpg'
   },

   // {
   //    name: 'Hall of Fame',
   //    path: 'audio/The Script - Hall of Fame (Official Video) ft. will.i.am.mp3',
   //    artist: 'The Script - ft. will.i.am',
   //    cover: 'images/audio/HallOfFame.jpg '
   // },  

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
      name: 'Legitimno',
      path: 'audio/ALEKSANDRA%20PRIJOVIC%20-%20LEGITIMNO%20(OFFICIAL%20VIDEO%202020).mp3',
      artist: 'Aleksandra Prijovic',
      cover: 'images/audio/Legitimno.jpg'
   },

   {
      name: 'Jutro je',
      path: 'audio/Nada%20Topcagic%20-%20Jutro%20je%20-%20(Audio%201990)%20HD%20(128%20kbps).mp3',
      artist: 'Nada Topcagic',
      cover: 'images/audio/NadaTopcagic.jpg'
   },
   {
      name: 'Imam jedan zivot',
      path: 'audio/Ana%20Bekuta%20-%20Imam%20jedan%20zivot%20(Sava%20Centar%2022.02.2012.).mp3',
      artist: 'Ana Bekuta',
      cover: 'images/audio/AnaBekuta.jpg'
   },
   {
      name: 'Opet imam razloga da zivim',
      path: 'audio/Ana Bekuta - Opet imam razloga da zivim.mp3',
      artist: 'Ana Bekuta',
      cover: 'images/audio/AnaBekuta1.jpg'
   },
   {
      name: 'Srpkinja je mene majka rodila',
      path: 'audio/Cakana & Sastav Svitanje - Srpkinja je mene majka rodila.mp3',
      artist: 'Cakana',
      cover: 'images/audio/SrpkinjaJeMeneMajkaRodila.jpg'
   },

   {
      name: 'Ej, dragi, dragi',
      path: 'audio/Cakana - Ej, dragi, dragi - (Audio 2009).mp3',
      artist: 'Cakana',
      cover: 'images/audio/EjDragi.jpg'
   },

   {
      name: 'Ruzo Rumena',
      path: 'audio/RUZO%20RUMENA%20-%20Dragan%20Jovanovic.mp3',
      artist: 'Dragan Jovanovic',
      cover: 'images/audio/RuzoRumena.jpeg'
   },

   {
      name: 'Malo po malo',
      path: 'audio/Vesna Zmijanac - Malo po malo - (Official Video 1995).mp3',
      artist: 'Vesna Zmijanac',
      cover: 'images/audio/MaloPoMalo.jpg'
   },

   {
      name: 'Pristajem na sve',
      path: 'audio/Semsa Suljakovic i Juzni Vetar - Pristajem na sve (Audio 1986).mp3',
      artist: 'Semsa Suljakovic',
      cover: 'images/audio/SemsaSuljakovic.jpg'
   },

   {
      name: 'Kazni me',
      path: 'audio/Vesna%20Zmijanac%20-%20Kazni%20me%20-%20(Audio%201989)%20HD%20(mp3cut.net).mp3',
      artist: 'Vesna Zmijanac',
      cover: 'images/audio/KazniMeKazni.jpg'
   },

   {
      name: 'Molitva',
      path: 'audio/MARIJA%20SERIFOVIC%20-%20MOLITVA%20-%20(OFFICIAL%20VIDEO%202020).mp3',
      artist: 'Marija Serifovic',
      cover: 'images/audio/MarijaSerifovic.jpg'
   },
   {
      name: 'U inat proslosti',
      path: 'audio/Aleksandra%20Radovic%20&%20The%20Beatshakers%20-%20Who%20Gonna%20Stop%20Me%20Now%20(Official%20HD%20Video).mp3',
      artist: 'Aleksandra Radovic',
      cover: 'images/audio/AleksandraRadovic.jpg'
   },
 
   {
      name: 'Placebo',
      path: 'audio/ALEKSANDRA%20PRIJOVIC%20-%20PLACEBO%20(OFFICIAL%20VIDEO)%20(1).mp3',
      artist: 'Aleksandra Prijovic',
      cover: 'images/audio/Placebo.jpg'
   },
   // {
   //    name: 'Boli Boli',
   //    path: 'audio/Ivana%20Selakov%20x%20Amar%20Gile%20-%20BOLI%20BOLI%20(Official%20Video%202020).mp3',
   //    artist: 'Ivana Selakov & Amar Gile',
   //    cover: 'images/audio/BoliBoliOvaBol.jpg'
   // },
 
]

playLists.push(narodnjaciSongs);


let danceSongs = [
   {
      name: 'Aint Your Mama',
      path: 'audio/Jennifer%20Lopez%20-%20Aint%20Your%20Mama%20(Lyrics)%20we%20used%20to%20be%20crazy%20in%20love.mp3',
      artist: 'Jennifer Lopez',
      cover: 'images/audio/JenniferLopez.jpg'
   },
   {
      name: 'Say It Right',
      path: 'audio/Nelly%20Furtado%20-%20Say%20It%20Right%20(Official%20Music%20Video).mp3',
      artist: 'Nelly Furtado',
      cover: 'images/audio/NellyFurtado.jpg'
   },
   {
      name: 'Amor, Amor',
      path: 'audio/Jennifer%20Lopez%20-%20Amor,%20Amor,%20Amor%20(Official%20Video)%20ft.%20Wisin.mp3',
      artist: 'J.Lopez ft. Wisin',
      cover: 'images/audio/JeniferLopezAmor.jpg'
   },
   {
      name: 'Ni Tu Ni Yo',
      path: 'audio/Jennifer%20Lopez%20-%20Ni%20Tu%20Ni%20Yo%20(Official%20Audio)%20ft.%20Gente%20de%20Zona.mp3',
      artist: 'J Lopez ft. Gente de Zona',
      cover: 'images/audio/NiTuNiJo.jpg'
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
   },
   {
      name: 'Walk',
      path: 'audio/Kwabs%20-%20Walk%20(Official%20Video).mp3',
      artist: 'Kwabs',
      cover: 'images/audio/Kwabs.jpg'
   },
   {
      name: 'La la la',
      path: 'audio/Shakira%20-%20La%20La%20La%20(Brazil%202014)%20ft.%20Carlinhos%20Brown.mp3',
      artist: 'Shakira ft. Carlinhos Brown',
      cover: 'images/audio/Shakira.jpg'
   }
   // Uncomment and add more songs as needed
]

playLists.push(danceSongs);


let rockSongs = [
   {
      name: 'Give It Up',
      path: 'audio/KC%20and%20The%20Sunshine%20Band%20-%20Give%20It%20Up.mp3',
      artist: 'KC & The Sunshine Band',
      cover: 'images/audio/GiveItUp.jpg'
   },
   // {
   //    name: 'Voulez-Vous',
   //    path: 'audio/ABBA%20-%20Voulez-Vous%20(Lyric%20Video).mp3',
   //    artist: 'ABBA',
   //    cover: 'images/audio/Voulez-Vous.jpg'
   // },
   {
      name: 'Out of Touch',
      path: 'audio/Out of Touch.mp3',
      artist: 'Hall & Oates',
      cover: 'images/audio/Hall%20&%20Oates.jpg'
   },

   {
      name: 'I Will Survive',
      path: 'audio/Gloria Gaynor - I Will Survive.mp3',
      artist: 'Gloria Gaynor',
      cover: 'images/audio/GloriaIWillSurvive.jpg'
   },
   {
      name: 'Hot Stuff',
      path: 'audio/Hot Stuff.mp3',
      artist: 'Donna Summer',
      cover: 'images/audio/Hot Stuff.jpg'
   },
   {
      name: 'Gimme! Gimme!',
      path: 'audio/ABBA%20-%20Gimme!%20Gimme!%20Gimme!%20(A%20Man%20After%20Midnight).mp3',
      artist: 'ABBA',
      cover: 'images/audio/ABBA-GimmeGimmeGimme-video.png'
   },
   {
      name: 'Cheri Cheri Lady',
      path: 'audio/Modern Talking - Cheri Cheri Lady (OfficialVideo).mp3',
      artist: 'Modern Talking',
      cover: 'images/audio/CherryCherry.jpg'
   },
   {
      name: 'Bella Ciao',
      path: 'audio/Bella Ciao.mp3',
      artist: 'Goran Bregovic',
      cover: 'images/audio/BellaCiao.jpg'
   },
]

playLists.push(rockSongs);

let classicArab = [
   {
      name: 'Inta Umri',
      path: 'audio/National%20Arab%20Orchestra%20-%20Inta%20Umri%20-%20Mai%20Farouk.mp3',
      artist: 'National Arab Orchestra',
      cover: 'images/audio/Mai%20Farouk.jpg'
   },
   {
      name: 'Ahwak',
      path: 'audio/National%20Arab%20Orchestra%20-%20Ahwak%20-%20Chadi%20Kassem.mp3',
      artist: 'National Arab Orchestra',
      cover: 'images/audio/Ahwak.jpg'
   },
   {
      name: 'Alf Leila wi Leila',
      path: 'audio/National%20Arab%20Orchestra%20-%20Alf%20Leila%20wi%20Leila%20-%20Mai%20Farouk.mp3',
      artist: 'National Arab Orchestra',
      cover: 'images/audio/NationalArabOrchestra.jpg'
   },
   {
      name: 'Sandal Maker',
      path: 'audio/Sandal%20Maker.mp3',
      artist: 'Stronghold Crusader',
      cover: 'images/audio/SandalMaker.jpg'
   },
   {
      name: 'Belisarius',
      path: 'audio/Justinian-Epic%20Symphony%20-%20Belisarius.mp3',
      artist: 'Justinian Epic Symphony',
      cover: 'images/audio/Justinian.jpg'
   },
   {
      name: 'Digenis and Death',
      path: 'audio/Digenis%20and%20Death%20-%20Epic%20Byzantine%20Music.mp3',
      artist: 'Byzantine Epic Music',
      cover: 'images/audio/Digenis%20and%20Death.jpg'
   }
]

playLists.push(classicArab);

