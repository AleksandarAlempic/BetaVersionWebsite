# BetaVersionWebsite

Lični portfolio sajt + Stopwatch PWA (sa muzičkim plejerom i mapom trčanja). Vanilla HTML/CSS/JS na frontu, Node.js + Express + Supabase na bekendu. Bez build koraka i bez framework-a.

## Šta sadrži

- **Portfolio stranice** (otvaraju se kao obični fajlovi):
  - `index.html` — početna
  - `indexPortfolioPage.html` — portfolio projekti
  - `indexAboutMe.html` — about
  - `indexContactMe.html` — kontakt forma
- **Stopwatch PWA** — pokreće se preko bekenda na `http://localhost:4000` (štoperica + Leaflet mapa sa "nearby" trčanjima i treninzima + muzički plejer)
- **Mini-projekti** linkovani sa portfolio stranice:
  - `Calculator website/` — kalkulator
  - `Weather App/` — vremenska prognoza

## Struktura

```
BetaVersionWebsite/
├── index*.html              ← portfolio stranice (otvaraju se kao fajlovi)
├── styles/                  ← CSS za portfolio
├── script/                  ← JS za portfolio
├── images/                  ← slike za portfolio
├── audio/                   ← svi MP3-ovi (jedno mesto)
├── Calculator website/      ← standalone mini-projekat
├── Weather App/             ← standalone mini-projekat
└── backend/                 ← Express server (Stopwatch PWA + API)
    ├── .env                 ← TVOJI secrets (ne commituješ ovaj fajl)
    ├── .env.example         ← šablon — kopiraj u .env i popuni
    ├── package.json
    ├── server.js            ← glavni entry
    ├── public/              ← Stopwatch PWA frontend
    ├── routes/              ← /api/device-track, /api/youtube
    └── services/            ← YouTube API helper
```

## Pokretanje

```bash
cd backend
cp .env.example .env        # prvi put — pa popuni vrednosti unutra
npm install                 # prvi put
npm start                   # → http://localhost:4000
```

Šta otvaraš u pretraživaču:
- **Stopwatch PWA**: `http://localhost:4000`
- **Portfolio stranice**: dupli klik na `index.html` u fajl exploreru (otvaraju se direktno, ne preko servera)

## .env varijable

Otvori `backend/.env.example` da vidiš spisak. Trebaće ti:

| Varijabla | Odakle da je dobiješ |
|---|---|
| `SUPABASE_URL` | iz Supabase projekta → Settings → API |
| `SUPABASE_ANON_KEY` | iz istog mesta (anon public key, **ne** service role) |
| `YOUTUBE_API_KEY` | iz Google Cloud Console → APIs & Services → Credentials |
| `ALERT_EMAIL` | tvoj email |
| `PORT` | opciono, defaultuje na 4000 |

## API rute (backend)

Sve definisano u [backend/server.js](backend/server.js) osim ako ne kaže drugačije:

- `POST /api/save-run` — sačuva trčanje (user + ruta + poly­line + lokacija)
- `POST /api/save-training` — sačuva trening (broj sklekova/zgibova/...)
- `GET /api/routes-nearby?lat=...&lng=...&radius=...` — trčanja u okolini (haversine u JS-u, ne PostGIS)
- `GET /api/nearby-trainings?lat=...&lng=...&radius=...` — treninzi u okolini
- `GET /api/all-routes` — sve rute (bez filtera)
- `POST /api/device-track` — track novog uređaja (u [backend/routes/deviceTrack.js](backend/routes/deviceTrack.js))
- `GET /api/youtube/search?q=...` — YouTube pretraga (u [backend/routes/youtube.js](backend/routes/youtube.js))
- `GET /api/youtube/video?id=...` — info o pesmi

## Stvari koje treba znati

- **`script/` i `backend/public/` imaju duplikate** — `Data.js`, `MusicPlayer.js`, `Stopwatch.css`, `javascript.js` postoje u oba foldera i nisu sinkronizovani. Kad menjaš jedno, proveri da li drugo treba isto.
- **Portfolio HTML nije serviran kroz Express** — to su čisto statički fajlovi koji se otvaraju lokalno; backend ne učestvuje.
- **MP3-ovi** se učitavaju sa putanjom `audio/...` (relativna od HTML-a) — fajlovi su u root `audio/` folderu. Ako dodaješ novu pesmu, dodaj je u `audio/` i upiši unos u `script/Data.js` (portfolio) i/ili `backend/public/Data.js` (Stopwatch PWA).
- **Forma za kontakt** ima dva odvojena fajla: [script/FormValidation.js](script/FormValidation.js) za desktop i [script/FormValidationMobile.js](script/FormValidationMobile.js) za mobile. Promene u validaciji obično idu na oba mesta.

## Šta NE da radiš

- Ne commituješ `.env` (ima prave secrets, gitignored je)
- Ne commituješ `node_modules/` (gitignored)
- Ne stavljaš nove MP3-ove ili slike na više mesta — jedno mesto, pa referenca odakle treba
