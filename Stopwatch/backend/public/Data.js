const playLists = [];

// ====================== Intro Songs ======================
let introSongs = [
  { name: 'Jutro je', path: '/audio/Nada Topcagic - Jutro je - (Audio 1990) HD (128 kbps).mp3', artist: 'Nada Topcagic', cover: '/images/audio/NadaTopcagic.jpg' },
  { name: 'Malo po malo', path: '/audio/Vesna Zmijanac - Malo po malo - (Official Video 1995).mp3', artist: 'Vesna Zmijanac', cover: '/images/audio/MaloPoMalo.jpg' },
  { name: 'Ej, dragi, dragi', path: '/audio/Cakana - Ej, dragi, dragi - (Audio 2009).mp3', artist: 'Cakana', cover: '/images/audio/EjDragi.jpg' },
  { name: 'Waka waka', path: '/audio/WakaWaka.mp3', artist: 'Shakira', cover: '/images/audio/WakaWaka.jpg' },
  { name: 'La la la', path: '/audio/Shakira - La La La (Brazil 2014) ft. Carlinhos Brown.mp3', artist: 'Shakira ft. Carlinhos Brown', cover: '/images/audio/Shakira.jpg' },
  { name: 'Walk', path: '/audio/Kwabs - Walk (Official Video).mp3', artist: 'Kwabs', cover: '/images/audio/Kwabs.jpg' },
  { name: 'Say It Right', path: '/audio/Nelly Furtado - Say It Right (Official Music Video).mp3', artist: 'Nelly Furtado', cover: '/images/audio/NellyFurtado.jpg' },
  { name: 'Out of Touch', path: '/audio/Hall & Oates - Out of Touch.mp3', artist: 'Hall & Oates', cover: '/images/audio/OutOfTouch.webp' },
  { name: 'The Power Of Love', path: '/audio/IL DIVO - The Power Of Love (La Fuerza Mayor) (Live Video).mp3', artist: 'IL DIVO', cover: '/images/audio/IlDivo.jpg' },
  { name: 'Alone (Solo)', path: '/audio/Alone (Solo).mp3', artist: 'IL DIVO', cover: '/images/audio/Alone.jpg' },
  { name: 'Vracaju se dani pobede', path: '/audio/Grupa JNA - Vracaju se dani pobede.mp3', artist: '', cover: '/images/audio/GrupaJNA.jpg' },
  { name: 'U inat proslosti', path: '/audio/Aleksandra Radovic & The Beatshakers - Who Gonna Stop Me Now (Official HD Video).mp3', artist: 'Aleksandra Radovic', cover: '/images/audio/AleksandraRadovic.jpg' },
  { name: 'Devet Zivota', path: '/audio/ALEKSANDRA PRIJOVIC - DEVET ZIVOTA (OFFICIAL VIDEO).mp3', artist: 'Aleksandra Prijovic', cover: '/images/audio/AleksandraPrijovic.jpg' },
  { name: 'Ne Pitaj', path: '/audio/LegendE _ Ne pitaj - (LIVE) - (Sava centar 2005) (128 kbps).mp3', artist: 'Legende', cover: '/images/audio/LegendeNePitaj.jpg' },
  { name: 'Hall of Fame', path: '/audio/The Script - Hall of Fame (Official Video) ft. will.i.am.mp3', artist: 'The Script - ft. will.i.am', cover: '/images/audio/HallOfFame.jpg' },
  { name: 'Superheroes', path: '/audio/The Script - Superheroes (Official Video).mp3', artist: 'The Script', cover: '/images/audio/TheScript.jpg' },
  { name: 'Calling On Me', path: '/audio/Sean Paul, Tove Lo - Calling On Me (128 kbps).mp3', artist: 'Sean Paul', cover: '/images/audio/SeanPaul.jpg' },
  { name: 'Gimme! Gimme!', path: '/audio/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3', artist: 'ABBA', cover: '/images/audio/ABBA-GimmeGimmeGimme-video.png' },
  { name: 'Alive', path: '/audio/Sia - Alive (Official Video).mp3', artist: 'Sia', cover: '/images/audio/Alive.jpg' },
];
playLists.push(introSongs);

// ====================== Classic Songs ======================
let classicSongs = [
  { name: 'La finta giardiniera', path: '/audio/Mozart_ Overture - La finta giardiniera.mp3', artist: 'Mozart', cover: '/images/audio/Wolfgang-Amadeus-Mozart-scaled.jpeg' },
  { name: 'Spring', path: '/audio/Vivaldi Four Seasons_ Spring (La Primavera).mp3', artist: 'Antonio Vivaldi', cover: '/images/audio/AntonioVivaldi.jpg' },
  { name: 'E.K. Nachtmusik', path: '/audio/Eine Kleine Nachtmusik - Mozart.mp3', artist: 'Mozart', cover: '/images/audio/Wolfgang-Amadeus-Mozart-scaled.jpeg' },
  { name: 'Hungarian Dance No.5', path: '/audio/Johannes Brahms -- Hungarian Dance No.5.mp3', artist: 'Johannes Brahms', cover: '/images/audio/Hungarian Dance No.5.jpg' },
  { name: 'The Second Waltz, Op. 99a', path: '/audio/The Second Waltz, Op. 99a.mp3', artist: 'Andre Rieu', cover: '/images/audio/The Second Waltz, Op. 99a.jpg' },
  { name: 'Viva España', path: '/audio/Viva España.mp3', artist: 'Andre Rieu', cover: '/images/audio/The Second Waltz, Op. 99a.jpg' },
  { name: 'Griechischer Wein', path: '/audio/Griechischer Wein.mp3', artist: 'Andre Rieu', cover: '/images/audio/The Second Waltz, Op. 99a.jpg' },
  { name: 'Amigos para siempre', path: '/audio/Amigos para siempre.mp3', artist: 'Andre Rieu', cover: '/images/audio/The Second Waltz, Op. 99a.jpg' },
  { name: 'Der einsame Hirte', path: '/audio/Leo_Rojas_-_Der_einsame_Hirte_Videoclip.mp3', artist: 'Leo Rohas', cover: '/images/audio/LeoRohas1.jpg' },
  { name: 'Der letzte Mohikaner', path: '/audio/Der letzte Mohikaner.mp3', artist: 'Leo Rohas', cover: '/images/audio/LeoRohas.jpg' },
  { name: 'The Riders of Rohan', path: '/audio/The Lord Of The Rings - The Riders of Rohan.mp3', artist: 'The Lord Of The Rings', cover: '/images/audio/RidersOfRohan.jpg' },
  { name: 'Tamo daleko', path: '/audio/Tamo daleko.mp3', artist: 'Tradicionalna srpska', cover: '/images/audio/TamoDaleko.jpg' },
  { name: 'Victory', path: '/audio/Two Steps From Hell - Victory.mp3', artist: 'Two Steps From Hell', cover: '/images/audio/VictoryTwoStepsFromHell.jpg' },
  { name: 'The Power Of Love', path: '/audio/IL DIVO - The Power Of Love (La Fuerza Mayor).mp3', artist: 'IL DIVO', cover: '/images/audio/IlDivo.jpg' },
  { name: 'Alone (Solo)', path: '/audio/Alone (Solo).mp3', artist: 'IL DIVO', cover: '/images/audio/Alone.jpg' },
];
playLists.push(classicSongs);

// ====================== Narodnjaci ======================
let narodnjaciSongs = [
  { name: 'Takni me, takni', path: '/audio/Takni me, takni.mp3', artist: 'Sneki', cover: '/images/audio/TakniMeTakni.jpg' },
  { name: 'Pristajem na sve', path: '/audio/Semsa Suljakovic i Juzni Vetar - Pristajem na sve (Audio 1986).mp3', artist: 'Šemsa Suljaković', cover: '/images/audio/SemsaSuljakovic.jpg' },
  { name: 'Kazni me', path: '/audio/Vesna Zmijanac - Kazni me.mp3', artist: 'Vesna Zmijanac', cover: '/images/audio/KazniMeKazni.jpg' },
  { name: 'Malo po malo', path: '/audio/Vesna Zmijanac - Malo po malo - (Official Video 1995).mp3', artist: 'Vesna Zmijanac', cover: '/images/audio/MaloPoMalo.jpg' },
  { name: 'Ej, dragi, dragi', path: '/audio/Cakana - Ej, dragi, dragi - (Audio 2009).mp3', artist: 'Cakana', cover: '/images/audio/EjDragi.jpg' },
  { name: 'Srpkinja je mene majka rodila', path: '/audio/Cakana & Sastav Svitanje - Srpkinja je mene majka rodila.mp3', artist: 'Cakana', cover: '/images/audio/SrpkinjaJeMeneMajkaRodila.jpg' },
  { name: 'Jutro je', path: '/audio/Nada Topcagic - Jutro je.mp3', artist: 'Nada Topčagić', cover: '/images/audio/NadaTopcagic.jpg' },
  { name: 'Zar za mene nema sreće', path: '/audio/Zar za mene nema srece.mp3', artist: 'Šemsa Suljaković', cover: '/images/audio/SemsaSuljakovic.jpg' },
  { name: 'Opet imam razloga da živim', path: '/audio/Ana Bekuta - Opet imam razloga da zivim.mp3', artist: 'Ana Bekuta', cover: '/images/audio/AnaBekuta1.jpg' },
  { name: 'Imam jedan život', path: '/audio/Ana Bekuta - Imam jedan zivot.mp3', artist: 'Ana Bekuta', cover: '/images/audio/AnaBekuta.jpg' },
  { name: 'Molitva', path: '/audio/MARIJA SERIFOVIC - MOLITVA.mp3', artist: 'Marija Šerifović', cover: '/images/audio/MarijaSerifovic.jpg' },
  { name: 'Ružo rumena', path: '/audio/RUZO RUMENA - Dragan Jovanovic.mp3', artist: 'Dragan Jovanović', cover: '/images/audio/RuzoRumena.jpeg' },
  { name: 'Legitimno', path: '/audio/ALEKSANDRA PRIJOVIC - LEGITIMNO.mp3', artist: 'Aleksandra Prijović', cover: '/images/audio/Legitimno.jpg' },
  { name: 'Placebo', path: '/audio/ALEKSANDRA PRIJOVIC - PLACEBO.mp3', artist: 'Aleksandra Prijović', cover: '/images/audio/Placebo.jpg' },
  { name: 'U inat prošlosti', path: '/audio/Aleksandra Radovic - Who Gonna Stop Me Now.mp3', artist: 'Aleksandra Radović', cover: '/images/audio/AleksandraRadovic.jpg' },
];
playLists.push(narodnjaciSongs);

// ====================== Dance Songs ======================
let danceSongs = [
  { name: 'La la la', path: '/audio/Shakira - La La La (Brazil 2014) ft. Carlinhos Brown.mp3', artist: 'Shakira ft. Carlinhos Brown', cover: '/images/audio/Shakira.jpg' },
  { name: 'Ni Tu Ni Yo', path: '/audio/Jennifer Lopez - Ni Tu Ni Yo (Official Audio) ft. Gente de Zona.mp3', artist: 'J Lopez ft. Gente de Zona', cover: '/images/audio/NiTuNiJo.jpg' },
  { name: 'Bailando', path: '/audio/Enrique Iglesias - Bailando ft. Descemer Bueno, Gente De Zona.mp3', artist: 'Enrique Iglesias', cover: '/images/audio/Bailando.jpg' },
  { name: 'Aint Your Mama', path: '/audio/Jennifer Lopez - Aint Your Mama.mp3', artist: 'Jennifer Lopez', cover: '/images/audio/JenniferLopez.jpg' },
  { name: 'Cheap Thrills ft. Sean Paul', path: '/audio/Sia - Cheap Thrills ft. Sean Paul.mp3', artist: 'Sia ft. Sean Paul', cover: '/images/audio/CheapThrils.jpg' },
  { name: 'Say It Right', path: '/audio/Nelly Furtado - Say It Right.mp3', artist: 'Nelly Furtado', cover: '/images/audio/NellyFurtado.jpg' },
  { name: 'Walk', path: '/audio/Kwabs - Walk.mp3', artist: 'Kwabs', cover: '/images/audio/Kwabs.jpg' },
  { name: 'La Vida Tombola', path: '/audio/Manu Chao - La Vida Tombola.mp3', artist: 'Manu Chao', cover: '/images/audio/LaTombola.jpg' },
  { name: 'Brother Louie 98', path: '/audio/Modern Talking - Brother Louie 98.mp3', artist: 'Modern Talking', cover: '/images/audio/BrotherLouie.jpg' },
  { name: 'Amor, Amor', path: '/audio/Jennifer Lopez - Amor, Amor, Amor.mp3', artist: 'J.Lopez ft. Wisin', cover: '/images/audio/JeniferLopezAmor.jpg' },
  { name: 'Vivir Mi Vida', path: '/audio/Marc Anthony - Vivir Mi Vida.mp3', artist: 'Marc Anthony', cover: '/images/audio/MarchAnthony.jpg' },
  { name: 'We Are One', path: '/audio/We Are One (Ole Ola) [Official 2014 FIFA World Cup Song].mp3', artist: 'Pitbull feat J.Lopez & C.Leitte', cover: '/images/audio/WeAreOne.jpg' },
];
playLists.push(danceSongs);

// ====================== Rock Songs ======================
let rockSongs = [
  { name: 'Give It Up', path: '/audio/KC and The Sunshine Band - Give It Up.mp3', artist: 'KC & The Sunshine Band', cover: '/images/audio/GiveItUp.jpg' },
  { name: 'Cheri Cheri Lady', path: '/audio/Modern Talking - Cheri Cheri Lady.mp3', artist: 'Modern Talking', cover: '/images/audio/CherryCherry.jpg' },
  { name: 'Gimme! Gimme!', path: '/audio/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3', artist: 'ABBA', cover: '/images/audio/ABBA-GimmeGimmeGimme-video.png' },
  { name: 'Out of Touch', path: '/audio/Hall & Oates - Out of Touch.mp3', artist: 'Hall & Oates', cover: '/images/audio/OutOfTouch.webp' },
  { name: 'Hot Stuff', path: '/audio/Hot Stuff.mp3', artist: 'Donna Summer', cover: '/images/audio/Hot Stuff.jpg' },
  { name: 'Bella Ciao', path: '/audio/Bella Ciao.mp3', artist: 'Goran Bregovic', cover: '/images/audio/BellaCiao.jpg' },
  { name: 'I Will Survive', path: '/audio/Gloria Gaynor - I Will Survive.mp3', artist: 'Gloria Gaynor', cover: '/images/audio/GloriaIWillSurvive.jpg' }
];
playLists.push(rockSongs);

// ====================== Classic Arab Songs ======================
let classicArabSongs = [
  { name: 'Inta Umri', path: '/audio/National Arab Orchestra - Inta Umri - Mai Farouk.mp3', artist: 'National Arab Orchestra', cover: '/images/audio/Mai Farouk.jpg' },
  { name: 'Ahwak', path: '/audio/National Arab Orchestra - Ahwak - Chadi Kassem.mp3', artist: 'National Arab Orchestra', cover: '/images/audio/Ahwak.jpg' },
  { name: 'Alf Leila wi Leila', path: '/audio/National Arab Orchestra - Alf Leila wi Leila - Mai Farouk.mp3', artist: 'National Arab Orchestra', cover: '/images/audio/NationalArabOrchestra.jpg' },
  { name: 'Sandal Maker', path: '/audio/Sandal Maker.mp3', artist: 'Stronghold Crusader', cover: '/images/audio/SandalMaker.jpg' },
  { name: 'Belisarius', path: '/audio/Justinian-Epic Symphony - Belisarius.mp3', artist: 'Justinian Epic Symphony', cover: '/images/audio/Justinian.jpg' },
  { name: 'Digenis and Death', path: '/audio/Digenis and Death - Epic Byzantine Music.mp3', artist: 'Byzantine Epic Music', cover: '/images/audio/Digenis and Death.jpg' }
];
playLists.push(classicArabSongs);
