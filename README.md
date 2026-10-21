# Servicestatus

Publieke Nederlandstalige statuspagina, gehost op GitHub Pages. Geen externe lettertypes, trackers, cookies of afhankelijkheden. Statussen zijn handmatige mededelingen en geen automatische beschikbaarheidsmetingen.

## Een update publiceren

1. Open `status.json` in GitHub en kies het potlood om te bewerken.
2. Pas de betrokken toepassing(en), de melding en de verwachte hersteltijd aan. Zet `updatedAt` op het tijdstip van de inhoudelijke update, met de juiste Belgische tijdzone (`+02:00` in de zomertijd, `+01:00` in de wintertijd).
3. Voeg een nieuw bericht bovenaan `updates` toe. Gebruik bij `date` het formaat `YYYY-MM-DD`.
4. Werk ook `available`, `unavailable` en `assurance` bij als de impact wijzigt. Bij volledig herstel pas je de melding en fase aan, verwijder je de oude herstelverwachting uit de tekst en zet je de diensten op `operational`.
5. Sla de wijziging op de branch `main` op. GitHub Actions controleert de gegevens en publiceert de pagina. Volg het resultaat in het tabblad **Actions**.

Toegestane statussen: `offline` (tijdelijk offline), `operational` (beschikbaar), `degraded` (beperkt beschikbaar), `unknown` (nog niet bevestigd).

De pagina haalt elke minuut de laatste gegevens op wanneer het tabblad zichtbaar is. Bezoekers kunnen ook op **Vernieuwen** klikken. Publicatie en caching via GitHub kunnen kort duren. Het tijdstip op de pagina verwijst naar de inhoudelijke update, niet naar de laatste raadpleging.

## Publicatie instellen

Maak deze repository publiek. Kies bij **Settings → Pages → Build and deployment → Source** voor **GitHub Actions**. De workflow `.github/workflows/pages.yml` publiceert de website bij elke wijziging op `main`.

## Lokaal bekijken

Voer `python3 -m http.server 8080` uit in deze map en open `http://localhost:8080`. Controleer de gegevens met `node validate.mjs`.

## Redactioneel

De eerste melding is overgenomen uit het aangeleverde bericht en gedateerd op 21 oktober 2026. De tijden van 16.00 en 17.00 uur zijn verwachtingen, geen bevestigde hersteltijden. Publiceer uitsluitend bevestigde informatie en pas verstreken verwachtingen aan zodra nieuwe informatie beschikbaar is. Alle bestanden en de volledige wijzigingsgeschiedenis van deze publieke repository zijn openbaar.
