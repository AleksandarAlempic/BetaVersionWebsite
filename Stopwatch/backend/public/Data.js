const playLists = [];

// ====================== Intro Songs ======================
let introSongs = [
  { name: 'Jutro je', path: '/audio/Nada%20Topcagic%20-%20Jutro%20je%20-%20(Audio%201990)%20HD%20(128%20kbps).mp3', artist: 'Nada Topcagic', cover: '/images/audio/NadaTopcagic.jpg' },
  { name: 'Malo po malo', path: '/audio/Vesna%20Zmijanac%20-%20Malo%20po%20malo%20-%20(Official%20Video%201995).mp3', artist: 'Vesna Zmijanac', cover: '/images/audio/MaloPoMalo.jpg' },
  { name: 'Ej, dragi, dragi', path: '/audio/Cakana%20-%20Ej,%20dragi,%20dragi%20-%20(Audio%202009).mp3', artist: 'Cakana', cover: '/images/audio/EjDragi.jpg' },
  { name: 'Waka waka', path: '/audio/WakaWaka.mp3', artist: 'Shakira', cover: '/images/audio/WakaWaka.jpg' },
  { name: 'La la la', path: '/audio/Shakira%20-%20La%20La%20La%20(Brazil%202014)%20ft.%20Carlinhos%20Brown.mp3', artist: 'Shakira ft. Carlinhos Brown', cover: '/images/audio/Shakira.jpg' },
  { name: 'Walk', path: '/audio/Kwabs%20-%20Walk%20(Official%20Video).mp3', artist: 'Kwabs', cover: '/images/audio/Kwabs.jpg' },
  { name: 'Say It Right', path: '/audio/Nelly%20Furtado%20-%20Say%20It%20Right%20(Official%20Music%20Video).mp3', artist: 'Nelly Furtado', cover: '/images/audio/NellyFurtado.jpg' },
  { name: 'Out of Touch', path: '/audio/Hall%20&%20Oates%20-%20Out%20of%20Touch.mp3', artist: 'Hall & Oates', cover: '/images/audio/OutOfTouch.webp' },
  { name: 'The Power Of Love', path: '/audio/IL%20DIVO%20-%20The%20Power%20Of%20Love%20(La%20Fuerza%20Mayor)%20(Live%20Video).mp3', artist: 'IL DIVO', cover: '/images/audio/IlDivo.jpg' },
  { name: 'Alone (Solo)', path: '/audio/Alone%20(Solo).mp3', artist: 'IL DIVO', cover: '/images/audio/Alone.jpg' },
  { name: 'Vracaju se dani pobede', path: '/audio/Grupa%20JNA%20-%20Vracaju%20se%20dani%20pobede.mp3', artist: '', cover: '/images/audio/GrupaJNA.jpg' },
  { name: 'U inat proslosti', path: '/audio/Aleksandra%20Radovic%20&%20The%20Beatshakers%20-%20Who%20Gonna%20Stop%20Me%20Now%20(Official%20HD%20Video).mp3', artist: 'Aleksandra Radovic', cover: '/images/audio/AleksandraRadovic.jpg' },
  { name: 'Devet Zivota', path: '/audio/ALEKSANDRA%20PRIJOVIC%20-%20DEVET%20ZIVOTA%20(OFFICIAL%20VIDEO).mp3', artist: 'Aleksandra Prijovic', cover: '/images/audio/AleksandraPrijovic.jpg' },
  { name: 'Ne Pitaj', path: '/audio/LegendE%20_%20Ne%20pitaj%20-%20(LIVE)%20-%20(Sava%20centar%202005)%20(128%20kbps).mp3', artist: 'Legende', cover: '/images/audio/LegendeNePitaj.jpg' },
  { name: 'Hall of Fame', path: '/audio/The%20Script%20-%20Hall%20of%20Fame%20(Official%20Video)%20ft.%20will.i.am.mp3', artist: 'The Script - ft. will.i.am', cover: '/images/audio/HallOfFame.jpg' },
  { name: 'Superheroes', path: '/audio/The%20Script%20-%20Superheroes%20(Official%20Video).mp3', artist: 'The Script', cover: '/images/audio/TheScript.jpg' },
  { name: 'Calling On Me', path: '/audio/Sean%20Paul,%20Tove%20Lo%20-%20Calling%20On%20Me%20(128%20kbps).mp3', artist: 'Sean Paul', cover: '/images/audio/SeanPaul.jpg' },
  { name: 'Gimme! Gimme!', path: '/audio/ABBA%20-%20Gimme!%20Gimme!%20Gimme!%20(A%20Man%20After%20Midnight).mp3', artist: 'ABBA', cover: '/images/audio/ABBA-GimmeGimmeGimme-video.png' },
  { name: 'Alive', path: '/audio/Sia%20-%20Alive%20(Official%20Video).mp3', artist: 'Sia', cover: '/images/audio/Alive.jpg' },
];

playLists.push(introSongs);

// ====================== Classic Songs ======================
let classicSongs = [
  { name: 'La finta giardiniera', path: '/audio/Mozart_%20Overture%20-%20La%20finta%20giardiniera.mp3', artist: 'Mozart', cover: '/images/audio/Wolfgang-Amadeus-Mozart-scaled.jpeg' },
  { name: 'Spring', path: '/audio/Vivaldi%20Four%20Seasons_%20Spring%20(La%20Primavera).mp3', artist: 'Antonio Vivaldi', cover: '/images/audio/AntonioVivaldi.jpg' },
  { name: 'E.K. Nachtmusik', path: '/audio/Eine%20Kleine%20Nachtmusik%20-%20Mozart.mp3', artist: 'Mozart', cover: '/images/audio/Wolfgang-Amadeus-Mozart-scaled.jpeg' },
  { name: 'Hungarian Dance No.5', path: '/audio/Johannes%20Brahms%20--%20Hungarian%20Dance%20No.5.mp3', artist: 'Johannes Brahms', cover: '/images/audio/Hungarian Dance No.5.jpg' },
  { name: 'The Second Waltz, Op. 99a', path: '/audio/The%20Second%20Waltz,%20Op.%2099a.mp3', artist: 'Andre Rieu', cover: '/images/audio/The Second Waltz, Op. 99a.jpg' },
  { name: 'Viva España', path: '/audio/Viva%20España.mp3', artist: 'Andre Rieu', cover: '/images/audio/The Second Waltz, Op. 99a.jpg' },
  { name: 'Griechischer Wein', path: '/audio/Griechischer%20Wein.mp3', artist: 'Andre Rieu', cover: '/images/audio/The Second Waltz, Op. 99a.jpg' },
  { name: 'Amigos para siempre', path: '/audio/Amigos%20para%20siempre.mp3', artist: 'Andre Rieu', cover: '/images/audio/The Second Waltz, Op. 99a.jpg' },
  { name: 'Der einsame Hirte', path: '/audio/Leo_Rojas_-_Der_einsame_Hirte_Videoclip.mp3', artist: 'Leo Rohas', cover: '/images/audio/LeoRohas1.jpg' },
  { name: 'Der letzte Mohikaner', path: '/audio/Der%20letzte%20Mohikaner.mp3', artist: 'Leo Rohas', cover: '/images/audio/LeoRohas.jpg' },
  { name: 'The Riders of Rohan', path: '/audio/The%20Lord%20Of%20The%20Rings%20-%20The%20Riders%20of%20Rohan.mp3', artist: 'The Lord Of The Rings', cover: '/images/audio/RidersOfRohan.jpg' },
  { name: 'Tamo daleko', path: '/audio/Tamo%20daleko.mp3', artist: 'Tradicionalna srpska', cover: '/images/audio/TamoDaleko.jpg' },
  { name: 'Victory', path: '/audio/Two%20Steps%20From%20Hell%20-%20Victory.mp3', artist: 'Two Steps From Hell', cover: '/images/audio/VictoryTwoStepsFromHell.jpg' },
  { name: 'The Power Of Love', path: '/audio/IL%20DIVO%20-%20The%20Power%20Of%20Love%20(La%20Fuerza%20Mayor).mp3', artist: 'IL DIVO', cover: '/images/audio/IlDivo.jpg' },
  { name: 'Alone (Solo)', path: '/audio/Alone%20(Solo).mp3', artist: 'IL DIVO', cover: '/images/audio/Alone.jpg' }
];

playLists.push(classicSongs);

// ====================== Narodnjaci ======================
let narodnjaciSongs = [
  { name: 'Takni me, takni', path: '/audio/Takni%20me,%20takni.mp3', artist: 'Sneki', cover: '/images/audio/TakniMeTakni.jpg' },
  { name: 'Pristajem na sve', path: '/audio/Semsa%20Suljakovic%20i%20Juzni%20Vetar%20-%20Pristajem%20na%20sve%20(Audio%201986).mp3', artist: 'Šemsa Suljaković', cover: '/images/audio/SemsaSuljakovic.jpg' },
  { name: 'Kazni me', path: '/audio/Vesna%20Zmijanac%20-%20Kazni%20me.mp3', artist: 'Vesna Zmijanac', cover: '/images/audio/KazniMeKazni.jpg' },
  { name: 'Malo po malo', path: '/audio/Vesna%20Zmijanac%20-%20Malo%20po%20malo%20-%20(Official%20Video%201995).mp3', artist: 'Vesna Zmijanac', cover: '/images/audio/MaloPoMalo.jpg' },
  { name: 'Ej, dragi, dragi', path: '/audio/Cakana%20-%20Ej,%20dragi,%20dragi%20-%20(Audio%202009).mp3', artist: 'Cakana', cover: '/images/audio/EjDragi.jpg' },
  { name: 'Srpkinja je mene majka rodila', path: '/audio/Cakana%20&%20Sastav%20Svitanje%20-%20Srpkinja%20je%20mene%20majka%20rodila.mp3', artist: 'Cakana', cover: '/images/audio/SrpkinjaJeMeneMajkaRodila.jpg' },
  { name: 'Jutro je', path: '/audio/Nada%20Topcagic%20-%20Jutro%20je.mp3', artist: 'Nada Topčagić', cover: '/images/audio/NadaTopcagic.jpg' },
  { name: 'Zar za mene nema sreće', path: '/audio/Zar%20za%20mene%20nema%20srece.mp3', artist: 'Šemsa Suljaković', cover: '/images/audio/SemsaSuljakovic.jpg' },
  { name: 'Opet imam razloga da živim', path: '/audio/Ana%20Bekuta%20-%20Opet%20imam%20razloga%20da%20zivim.mp3', artist: 'Ana Bekuta', cover: '/images/audio/AnaBekuta1.jpg' },
  { name: 'Imam jedan život', path: '/audio/Ana%20Bekuta%20-%20Imam%20jedan%20zivot.mp3', artist: 'Ana Bekuta', cover: '/images/audio/AnaBekuta.jpg' },
  { name: 'Molitva', path: '/audio/MARIJA%20SERIFOVIC%20-%20MOLITVA.mp3', artist: 'Marija Šerifović', cover: '/images/audio/MarijaSerifovic.jpg' },
  { name: 'Ružo rumena', path: '/audio/RUZO%20RUMENA%20-%20Dragan%20Jovanovic.mp3', artist: 'Dragan Jovanović', cover: '/images/audio/RuzoRumena.jpeg' },
  { name: 'Legitimno', path: '/audio/ALEKSANDRA%20PRIJOVIC%20-%20LEGITIMNO.mp3', artist: 'Aleksandra Prijović', cover: '/images/audio/Legitimno.jpg' },
  { name: 'Placebo', path: '/audio/ALEKSANDRA%20PRIJOVIC%20-%20PLACEBO.mp3', artist: 'Aleksandra Prijović', cover: '/images/audio/Placebo.jpg' },
  { name: 'U inat prošlosti', path: '/audio/Aleksandra%20Radovic%20-%20Who%20Gonna%20Stop%20Me%20Now.mp3', artist: 'Aleksandra Radović', cover: '/images/audio/AleksandraRadovic.jpg' }
];

playLists.push(narodnjaciSongs);

// ====================== Dance Songs ======================
let danceSongs = [
  { name: 'La la la', path: '/audio/Shakira%20-%20La%20La%20La%20(Brazil%202014)%20ft.%20Carlinhos%20Brown.mp3', artist: 'Shakira ft. Carlinhos Brown', cover: '/images/audio/Shakira.jpg' },
  { name: 'Ni Tu Ni Yo', path: '/audio/Jennifer%20Lopez%20-%20Ni%20Tu%20Ni%20Yo%20(Official%20Audio)%20ft.%20Gente%20de%20Zona.mp3', artist: 'J Lopez ft. Gente de Zona', cover: '/images/audio/NiTuNiJo.jpg' },
  { name: 'Bailando', path: '/audio/Enrique%20Iglesias%20-%20Bailando%20ft.%20Descemer%20Bueno,%20Gente%20De%20Zona.mp3', artist: 'Enrique Iglesias', cover: '/images/audio/Bailando.jpg' },
  { name: 'Aint Your Mama', path: '/audio/Jennifer%20Lopez%20-%20Aint%20Your%20Mama.mp3', artist: 'Jennifer Lopez', cover: '/images/audio/JenniferLopez.jpg' },
  { name: 'Cheap Thrills ft. Sean Paul', path: '/audio/Sia%20-%20Cheap%20Thrills%20ft.%20Sean%20Paul.mp3', artist: 'Sia ft. Sean Paul', cover: '/images/audio/CheapThrils.jpg' },
  { name: 'Say It Right', path: '/audio/Nelly%20Furtado%20-%20Say%20It%20Right.mp3', artist: 'Nelly Furtado', cover: '/images/audio/NellyFurtado.jpg' },
  { name: 'Walk', path: '/audio/Kwabs%20-%20Walk.mp3', artist: 'Kwabs', cover: '/images/audio/Kwabs.jpg' },
  { name: 'La Vida Tombola', path: '/audio/Manu%20Chao%20-%20La%20Vida%20Tombola.mp3', artist: 'Manu Chao', cover: '/images/audio/LaTombola.jpg' },
  { name: 'Brother Louie 98', path: '/audio/Modern%20Talking%20-%20Brother%20Louie%2098.mp3', artist: 'Modern Talking', cover: '/images/audio/BrotherLouie.jpg' },
  { name: 'Amor, Amor', path: '/audio/Jennifer%20Lopez%20-%20Amor,%20Amor,%20Amor.mp3', artist: 'J.Lopez ft. Wisin', cover: '/images/audio/JeniferLopezAmor.jpg' },
  { name: 'Vivir Mi Vida', path: '/audio/Marc%20Anthony%20-%20Vivir%20Mi%20Vida.mp3', artist: 'Marc Anthony', cover: '/images/audio/MarchAnthony.jpg' },
  { name: 'We Are One', path: '/audio/We%20Are%20One%20(Ole%20Ola)%20[Official%202014%20FIFA%20World%20Cup%20Song].mp3', artist: 'Pitbull feat J.Lopez & C.Leitte', cover: '/images/audio/WeAreOne.jpg' }
];

playLists.push(danceSongs);

// ====================== Rock Songs ======================
let rockSongs = [
  { name: 'Give It Up', path: '/audio/KC%20and%20The%20Sunshine%20Band%20-%20Give%20It%20Up.mp3', artist: 'KC & The Sunshine Band', cover: '/images/audio/GiveItUp.jpg' },
  { name: 'Cheri Cheri Lady', path: '/audio/Modern%20Talking%20-%20Cheri%20Cheri%20Lady.mp3', artist: 'Modern Talking', cover: '/images/audio/CherryCherry.jpg' },
  { name: 'Gimme! Gimme!', path: '/audio/ABBA%20-%20Gimme!%20Gimme!%20Gimme!.mp3', artist: 'ABBA', cover: '/images/audio/ABBA-GimmeGimmeGimme-video.png' },
  { name: 'Out of Touch', path: '/audio/Hall%20&%20Oates%20-%20Out%20of%20Touch.mp3', artist: 'Hall & Oates', cover: '/images/audio/OutOfTouch.webp' },
  { name: 'Hot Stuff', path: '/audio/Hot%20Stuff.mp3', artist: 'Donna Summer', cover: '/images/audio/Hot Stuff.jpg' },
  { name: 'Bella Ciao', path: '/audio/Bella%20Ciao.mp3', artist: 'Goran Bregovic', cover: '/images/audio/BellaCiao.jpg' },
  { name: 'I Will Survive', path: '/audio/Gloria%20Gaynor%20-%20I%20Will%20Survive.mp3', artist: 'Gloria Gaynor', cover: '/images/audio/GloriaIWillSurvive.jpg' }
];

playLists.push(rockSongs);

// ====================== Classic Arab Songs ======================
let classicArabSongs = [
  { name: 'Inta Umri', path: '/audio/National%20Arab%20Orchestra%20-%20Inta%20Umri%20-%20Mai%20Farouk.mp3', artist: 'National Arab Orchestra', cover: '/images/audio/Mai Farouk.jpg' },
  { name: 'Ahwak', path: '/audio/National%20Arab%20Orchestra%20-%20Ahwak%20-%20Chadi%20Kassem.mp3', artist: 'National Arab Orchestra', cover: '/images/audio/Ahwak.jpg' },
  { name: 'Alf Leila wi Leila', path: '/audio/National%20Arab%20Orchestra%20-%20Alf%20Leila%20wi%20Leila%20-%20Mai%20Farouk.mp3', artist: 'National Arab Orchestra', cover: '/images/audio/NationalArabOrchestra.jpg' },
  { name: 'Sandal Maker', path: '/audio/Sandal%20Maker.mp3', artist: 'Stronghold Crusader', cover: '/images/audio/SandalMaker.jpg' },
  { name: 'Belisarius', path: '/audio/Justinian-Epic%20Symphony%20-%20Belisarius.mp3', artist: 'Justinian Epic Symphony', cover: '/images/audio/Justinian.jpg' },
  { name: 'Digenis and Death', path: '/audio/Digenis%20and%20Death%20-%20Epic%20Byzantine%20Music.mp3', artist: 'Byzantine Epic Music', cover: '/images/audio/Digenis and Death.jpg' }
];

playLists.push(classicArabSongs);

playLists.push(danceSongs);
