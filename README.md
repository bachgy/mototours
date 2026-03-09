**MotoTours
Projekt leírás
**

A MotoTours egy egyszerű motoros túraútvonal-nyilvántartó webalkalmazás. A rendszer célja, hogy a felhasználó motoros útvonalakat tudjon létrehozni, listázni, szerkeszteni és törölni.

A megoldás full-stack architektúrát használ:

Frontend: Angular

Backend: ASP.NET Web API

Adatbázis: MongoDB

Konténerizálás: Docker, Docker Compose

CI/CD: GitHub Actions + GitHub Container Registry (GHCR)

Funkciók

A rendszer az alábbi funkciókat támogatja:

új túraútvonal létrehozása

meglévő túraútvonalak listázása

túraútvonal szerkesztése

túraútvonal törlése

adatok perzisztens tárolása MongoDB-ben

A kezelt adatmezők:

név

kiindulópont

célpont

távolság (km)

időtartam (perc)

nehézség (Easy / Medium / Hard)

megjegyzés

létrehozás ideje

Architektúra

A rendszer három fő komponensből áll:

Frontend konténer

Angular alkalmazás

Nginx szolgálja ki a buildelt statikus állományokat

az /api végpontokat reverse proxy segítségével a backend felé továbbítja

Backend konténer

ASP.NET Web API

REST API végpontokat biztosít a frontend számára

MongoDB-hez csatlakozik

MongoDB konténer

a túraútvonalak adatait tárolja

Docker volume biztosítja a perzisztens adattárolást

Logikai kapcsolat:

Böngésző -> Frontend (Nginx) -> Backend API -> MongoDB

Könyvtárstruktúra
mototours/
  backend/
    MotoTours.Api/
  frontend/
  infra/
    docker-compose.yml
    docker-compose.prod.yml
  .github/
    workflows/
      ci.yml
  README.md
Lokális futtatás fejlesztői környezetben
Előfeltételek

Szükséges szoftverek:

Docker

Docker Compose

Git

Fejlesztéshez opcionálisan:

Node.js és Angular CLI

.NET SDK

Indítás Docker Compose-szal

A projekt gyökerében vagy az infra mappában futtatható:

docker compose -f infra/docker-compose.yml up -d --build
Elérhetőségek

Frontend: http://<szerver-ip>:8081

Backend Swagger: http://<szerver-ip>:8080/swagger

MongoDB: mongodb://<szerver-ip>:27017

Leállítás
docker compose -f infra/docker-compose.yml down
Production / deployment futtatás

A production compose fájl már előre buildelt image-eket használ a GitHub Container Registryből.

Indítás:

docker compose -f infra/docker-compose.prod.yml up -d

Frissítés új image-ekre:

docker compose -f infra/docker-compose.prod.yml pull
docker compose -f infra/docker-compose.prod.yml up -d

Leállítás:

docker compose -f infra/docker-compose.prod.yml down
Backend API végpontok
Összes útvonal lekérése
GET /api/routes
Egy útvonal lekérése azonosító alapján
GET /api/routes/{id}
Új útvonal létrehozása
POST /api/routes
Content-Type: application/json

Példa kérés:

{
  "name": "Teszt kör",
  "startLocation": "Budapest",
  "endLocation": "Esztergom",
  "distanceKm": 42.5,
  "durationMinutes": 60,
  "difficulty": "Easy",
  "notes": "első mentés"
}
Meglévő útvonal módosítása
PUT /api/routes/{id}
Content-Type: application/json
Útvonal törlése
DELETE /api/routes/{id}

A teljes API dokumentáció Swagger felületen érhető el.

Felhasználói útmutató
1. Az alkalmazás megnyitása

Nyisd meg a frontend címet a böngészőben:

http://<szerver-ip>:8081
2. Új útvonal létrehozása

A bal oldali űrlapon töltsd ki a szükséges mezőket:

név

kiindulópont

célpont

táv

időtartam

nehézség

opcionális megjegyzés

Ezután kattints a Létrehozás gombra.

3. Meglévő útvonal szerkesztése

A listában a kiválasztott útvonalnál kattints a Szerkesztés gombra. Az űrlap kitöltődik a meglévő adatokkal. A módosítás után kattints a Mentés gombra.

4. Útvonal törlése

A listában kattints a Törlés gombra a kívánt elemnél.

5. Lista frissítése

A Frissítés gombbal újra lekérhető az aktuális lista.

6. Űrlap ürítése

Az Űrlap ürítése gomb visszaállítja az alapértelmezett űrlapállapotot.

CI/CD működés

A projekt tartalmaz GitHub Actions workflow-t.

A workflow feladata:

a repository kódjának checkoutja

bejelentkezés a GitHub Container Registrybe

backend Docker image buildelése és pusholása

frontend Docker image buildelése és pusholása

A workflow fájl helye:

.github/workflows/ci.yml

Push után a pipeline automatikusan lefut a main branch-en.

Publikált image-ek:

ghcr.io/bachgy/mototours-backend:latest

ghcr.io/bachgy/mototours-frontend:latest

Használt technológiák

Angular

TypeScript

ASP.NET Web API

C#

MongoDB

Docker

Docker Compose

GitHub Actions

GitHub Container Registry

Nginx

Továbbfejlesztési lehetőségek

keresés és szűrés a listában

felhasználókezelés és autentikáció

részletesebb validáció

egységesebb, modernebb UI

seed adatok

healthcheck és monitorozás

Összegzés

A MotoTours projekt egy teljes, konténerizált, e2e módon futtatható webalkalmazás, amely lefedi a fejlesztéstől a telepítésig tartó folyamat fő lépéseit. A rendszer alkalmas a követelmény specifikációban megadott feladat teljesítésére, és bemutatja a modern full-stack fejlesztés, konténerizálás és automatizált build/publish folyamatok alapjait.
