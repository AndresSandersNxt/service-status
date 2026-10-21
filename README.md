# Servicestatus

Publieke statuspagina in het Nederlands, Engels en Frans, gehost op GitHub Pages. Geen externe lettertypes, trackers, cookies of afhankelijkheden. De taalkeuze wordt lokaal in de browser bewaard, indien beschikbaar. Statussen zijn handmatige mededelingen en geen automatische beschikbaarheidsmetingen.

## Een update publiceren

1. Open `status.json` in GitHub en kies het potlood om te bewerken.
2. Pas de betrokken toepassing(en), de melding en de verwachte hersteltijd aan. Zet `updatedAt` op het tijdstip van de inhoudelijke update, met de juiste Belgische tijdzone (`+02:00` in de zomertijd, `+01:00` in de wintertijd).
3. Voeg een nieuw bericht bovenaan `updates` toe. Gebruik bij `date` het formaat `YYYY-MM-DD`. Werk dezelfde inhoud ook bij in `translations.en` en `translations.fr`: titel, incident, impact, geruststelling en alle updates. Dienststatussen en `updatedAt` worden gedeeld tussen de talen. Optionele `localizedNames` bij een dienst bevatten de Engelse (`en`) en Franse (`fr`) benaming.
4. Werk ook `available`, `unavailable` en `assurance` bij als de impact wijzigt. Bij volledig herstel pas je de melding en fase aan, verwijder je de oude herstelverwachting uit de tekst en zet je de diensten op `operational`.
5. Sla de wijziging op de branch `main` op. GitHub Actions controleert de gegevens en publiceert de pagina. Volg het resultaat in het tabblad **Actions**.

Toegestane statussen: `offline` (tijdelijk offline), `operational` (beschikbaar), `degraded` (beperkt beschikbaar), `unknown` (nog niet bevestigd).

Voeg bij diensten die uitsluitend via VPN bereikbaar zijn `"access": "vpn"` toe. Bij de status `operational` toont de pagina dan expliciet **Beschikbaar via VPN**, met de bijbehorende Engelse en Franse vertaling. Verwijder `access` zodra de dienst ook zonder VPN bereikbaar is.

De pagina haalt elke minuut de laatste gegevens op wanneer het tabblad zichtbaar is. Bezoekers kunnen ook op **Vernieuwen** klikken. Publicatie en caching via GitHub kunnen kort duren. Het tijdstip op de pagina verwijst naar de inhoudelijke update, niet naar de laatste raadpleging.

## Talen

Bezoekers kiezen bovenaan **Nederlands**, **English** of **Français**. Rechtstreekse links gebruiken `?lang=nl`, `?lang=en` of `?lang=fr`. Een taal in de URL heeft voorrang op de lokaal bewaarde voorkeur; zonder beide is Nederlands de standaard. De interface, meldingen, statussen, datums en toegankelijkheidslabels volgen de gekozen taal. Alle tijden blijven Belgische tijd. Zonder JavaScript is een korte melding in alle drie de talen beschikbaar.

## Publicatie instellen

Maak deze repository publiek. Kies bij **Settings → Pages → Build and deployment → Source** voor **GitHub Actions**. De workflow `.github/workflows/pages.yml` publiceert de website bij elke wijziging op `main`.

## Lokaal bekijken

Voer `python3 -m http.server 8080` uit in deze map en open `http://localhost:8080`. Controleer de gegevens met `node validate.mjs`.

## Redactioneel

De eerste melding is overgenomen uit het aangeleverde bericht en gedateerd op 21 oktober 2026. De tijden van 16.00 en 17.00 uur zijn verwachtingen, geen bevestigde hersteltijden. Publiceer uitsluitend bevestigde informatie en pas verstreken verwachtingen aan zodra nieuwe informatie beschikbaar is. Alle bestanden en de volledige wijzigingsgeschiedenis van deze publieke repository zijn openbaar.
