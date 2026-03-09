# 🏍️ MotoTours

Egy egyszerű **motoros túraútvonal nyilvántartó webalkalmazás**, amely lehetővé teszi túraútvonalak létrehozását, listázását, szerkesztését és törlését.

A projekt célja egy **teljes e2e fejlesztési és telepítési folyamat bemutatása** modern webes technológiák használatával.

---

# 🚀 Főbb jellemzők

A rendszer az alábbi funkciókat biztosítja:

- 📝 új túraútvonal létrehozása
- 📋 meglévő túraútvonalak listázása
- ✏️ túraútvonal szerkesztése
- 🗑️ túraútvonal törlése
- 💾 adatok perzisztens tárolása MongoDB adatbázisban

A kezelt adatok:

- útvonal neve
- kiindulópont
- célpont
- távolság (km)
- időtartam (perc)
- nehézség (Easy / Medium / Hard)
- megjegyzés
- létrehozás ideje

---

# 🏗️ Architektúra

A rendszer **három fő komponensből** áll:

## Frontend

- Angular alkalmazás
- buildelt statikus fájlokat **Nginx** szolgálja ki
- az `/api` hívások **reverse proxy** segítségével a backendhez kerülnek

## Backend

- ASP.NET Web API
- REST végpontokat biztosít
- MongoDB adatbázissal kommunikál

## Adatbázis

- MongoDB
- Docker volume biztosítja a perzisztens adattárolást

---

## Architektúra áttekintés

```text
Browser
   |
   v
Frontend (Angular + Nginx)
   |
   v
Backend API (ASP.NET)
   |
   v
MongoDB
```

---

# 📂 Könyvtárstruktúra

```text
mototours/
│
├── backend/
│   └── MotoTours.Api/
│
├── frontend/
│
├── infra/
│   ├── docker-compose.yml
│   └── docker-compose.prod.yml
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
└── README.md
```

---

# ⚙️ Lokális futtatás (fejlesztői környezet)

## Előfeltételek

Szükséges szoftverek:

- Docker
- Docker Compose
- Git

Fejlesztéshez opcionálisan:

- Node.js
- Angular CLI
- .NET SDK

---

## Alkalmazás indítása

```bash
docker compose -f infra/docker-compose.yml up -d --build
```

---

## Elérhetőségek

| Service | URL |
|--------|-----|
| Frontend | http://localhost:8081 |
| Backend Swagger | http://localhost:8080/swagger |
| MongoDB | mongodb://localhost:27017 |

---

## Leállítás

```bash
docker compose -f infra/docker-compose.yml down
```

---

# 🚀 Production / Deployment

A production környezet már **előre buildelt Docker image-eket használ** a GitHub Container Registryből.

## Indítás

```bash
docker compose -f infra/docker-compose.prod.yml up -d
```

## Frissítés új image-ekre

```bash
docker compose -f infra/docker-compose.prod.yml pull

docker compose -f infra/docker-compose.prod.yml up -d
```

## Leállítás

```bash
docker compose -f infra/docker-compose.prod.yml down
```

---

# 🔌 Backend API

A backend REST API-n keresztül érhető el.

## Összes útvonal lekérése

```http
GET /api/routes
```

## Egy útvonal lekérése

```http
GET /api/routes/{id}
```

## Új útvonal létrehozása

```http
POST /api/routes
Content-Type: application/json
```

Példa kérés:

```json
{
  "name": "Teszt kör",
  "startLocation": "Budapest",
  "endLocation": "Esztergom",
  "distanceKm": 42.5,
  "durationMinutes": 60,
  "difficulty": "Easy",
  "notes": "első mentés"
}
```

## Útvonal módosítása

```http
PUT /api/routes/{id}
```

## Útvonal törlése

```http
DELETE /api/routes/{id}
```

A teljes API dokumentáció Swagger felületen érhető el.

---

# 👤 Felhasználói útmutató

## 1. Az alkalmazás megnyitása

Nyisd meg a frontendet:

```
http://<szerver-ip>:8081
```

---

## 2. Új útvonal létrehozása

Töltsd ki az űrlapot:

- név
- kiindulópont
- célpont
- távolság
- időtartam
- nehézség
- opcionális megjegyzés

Ezután kattints a **Létrehozás** gombra.

---

## 3. Útvonal szerkesztése

A listában válaszd ki az útvonalat, majd kattints a **Szerkesztés** gombra.

A módosítás után kattints a **Mentés** gombra.

---

## 4. Útvonal törlése

A listában kattints a **Törlés** gombra.

---

## 5. Lista frissítése

A **Frissítés** gomb újra lekéri az aktuális adatokat a szerverről.

---

## 6. Űrlap ürítése

Az **Űrlap ürítése** gomb visszaállítja az alapértelmezett állapotot.

---

# 🔄 CI/CD

A projekt tartalmaz **GitHub Actions pipeline-t**, amely automatikusan buildeli és publikálja a Docker image-eket.

A pipeline lépései:

1. repository checkout
2. bejelentkezés a GitHub Container Registrybe
3. backend image build és push
4. frontend image build és push

Workflow fájl:

```
.github/workflows/ci.yml
```

Publikált image-ek:

```
ghcr.io/bachgy/mototours-backend:latest

ghcr.io/bachgy/mototours-frontend:latest
```

---

# 🧰 Használt technológiák

- Angular
- TypeScript
- ASP.NET Web API
- C#
- MongoDB
- Docker
- Docker Compose
- GitHub Actions
- GitHub Container Registry
- Nginx

---

# 🔮 Továbbfejlesztési lehetőségek

- keresés és szűrés a listában
- felhasználókezelés
- autentikáció
- modernebb UI
- seed adatok
- healthcheck és monitoring

---

# 📌 Összegzés

A **MotoTours** projekt egy teljes, konténerizált webalkalmazás, amely bemutatja a modern full‑stack fejlesztési folyamatot:

- frontend + backend fejlesztés
- adatbázis integráció
- Docker alapú futtatás
- CI pipeline
- container registry publikálás

A rendszer teljesíti a feladat specifikációban szereplő követelményeket, és egy **fejlesztéstől a telepítésig tartó automatizált workflow-t** demonstrál.
