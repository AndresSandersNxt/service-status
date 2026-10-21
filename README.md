# Servicestatus

Publieke statuspagina in het Nederlands, Engels en Frans, gehost op GitHub Pages. Geen externe lettertypes, trackers, cookies of afhankelijkheden. De taalkeuze wordt lokaal in de browser bewaard, indien beschikbaar. Statussen zijn handmatige mededelingen en geen automatische beschikbaarheidsmetingen.

## Ontwikkeling en publicatie

Nieuwe functies, correcties en statusupdates volgen deze route: **featurebranch → `development` → `main` → GitHub Pages**.

1. Haal de laatste wijzigingen op met `git fetch origin` en maak een eigen featurebranch of worktree vanaf `origin/development`. Werk niet rechtstreeks op `development` of `main`.
2. Gebruik in Conductor `development` als basisbranch voor nieuwe werkruimtes. Elke werkruimte heeft een eigen featurebranch; bestaande werkruimtes veranderen niet automatisch van basisbranch.
3. Test de pagina lokaal en voer `node --check app.js`, `node validate.mjs` en `git diff --check` uit.
4. Open een pull request naar `development` (`gh pr create --base development`). Na samenvoegen staan de wijzigingen op `development`; de live website verandert nog niet.
5. Zodra de wijzigingen klaar zijn voor publicatie, kan elke ontwikkelaar met de vereiste repositoryrechten een release-pull-request van `development` naar `main` openen en samenvoegen (`gh pr create --base main --head development`). Agents doen dit alleen na een expliciet verzoek om publicatie. Een release bevat alle wijzigingen die op `development` klaarstaan.
6. Voeg de release samen met **Create a merge commit**, niet met squash of rebase, zodat `development` en `main` hun gedeelde geschiedenis behouden. GitHub Actions controleert daarna de statusgegevens en GitHub Pages publiceert de website. Volg de publicatie in het tabblad **Actions**.

`development` is de standaardbranch voor nieuwe ontwikkeling en pull requests. `main` is de productiebranch. De gedeelde instructies voor agents staan in [`AGENTS.md`](AGENTS.md).

### Overdracht na wijzigingen

Agents vermelden bij de overdracht altijd waar de wijzigingen staan: alleen lokaal, op een featurebranch, in een open PR, samengevoegd naar `development` of succesvol uitgerold naar productie. Meld een stap pas als voltooid nadat die is gecontroleerd.

Na samenvoegen naar `development` moet de agent expliciet melden:

> De wijzigingen zijn samengevoegd naar `development`. Ze zijn nog niet zichtbaar op de live website. Om ze te publiceren, voeg je een release-pull-request van `development` naar `main` samen; dat start de GitHub Pages-deployment. Deze release bevat alle wijzigingen die op `development` klaarstaan.

Voeg waar beschikbaar de PR-link toe. Staat de wijziging nog lokaal of is de feature-PR nog open, meld dan dat samenvoegen naar `development` de volgende stap is. Na samenvoegen naar `main` is de deployment nog in uitvoering; meld pas dat de wijzigingen zijn uitgerold nadat GitHub Actions succes bevestigt.

## Samenwerken en mergeconflicten beperken

- Gebruik per taak een eigen, kortlevende branch met een unieke naam, bijvoorbeeld `andres/update-vpn-status`. Deel geen actieve featurebranch tussen ontwikkelaars of agents.
- Houd pull requests klein en gericht. Stem af wie dezelfde bestanden bewerkt, vooral `status.json` en de vertalingen. Voeg statusupdates snel samen zodat andere branches niet onnodig achterlopen.
- Commit je werk voordat je de laatste wijzigingen integreert. Voer op je featurebranch `git fetch origin` en vervolgens `git merge origin/development` uit voordat je de PR laat samenvoegen. Los eventuele conflicten op die featurebranch op en voer de controles opnieuw uit. Force-push niet naar gedeelde branches.
- Behoud bij conflicten de bedoelde wijzigingen van beide bijdragers. Controleer bij `status.json` ook het tijdstip, de updates en alle drie de talen; kies niet blind het volledige bestand van één kant.
- Komt een dringende hotfix uitzonderlijk rechtstreeks op `main` terecht, breng die dan meteen terug naar `development` via een PR van `main` naar `development`, eveneens met een mergecommit.

## Een update publiceren

1. Maak een eigen branch vanaf de laatste `origin/development` en bewerk `status.json` op die branch. Dit kan ook via het potlood in GitHub.
2. Pas de betrokken applicatie(s), de melding en de verwachte hersteltijd aan. Zet `updatedAt` op het tijdstip van de inhoudelijke update, met de juiste Belgische tijdzone (`+02:00` in de zomertijd, `+01:00` in de wintertijd).
3. Voeg een nieuw bericht bovenaan `updates` toe. Gebruik bij `timestamp` het volledige tijdstip met tijdzone, bijvoorbeeld `2026-10-21T15:45:00+02:00`. Gebruik in alle drie de talen hetzelfde tijdstip; de pagina toont de datum en tijd in Belgische tijd. Werk dezelfde inhoud ook bij in `translations.en` en `translations.fr`: titel, incident, impact, geruststelling en alle updates. Dienststatussen en `updatedAt` worden gedeeld tussen de talen. Optionele `localizedNames` bij een dienst bevatten de Engelse (`en`) en Franse (`fr`) benaming.
4. Werk ook `available`, `unavailable`, `contractInstructions` (contractaanvragen) en `assurance` (applicaties die beschikbaar blijven) bij als de impact wijzigt. Bij volledig herstel pas je de melding en fase aan, verwijder je de oude herstelverwachting uit de tekst en zet je de diensten op `operational`.
5. Open een pull request van je featurebranch naar `development`. Publiceer de geteste wijzigingen daarna via een release-pull-request van `development` naar `main`, zoals hierboven beschreven.

Het veld `date` bij updates blijft behouden voor bezoekers met een eerder geopend tabblad. Houd dit gelijk aan de Belgische datum van `timestamp`.

Toegestane statussen: `offline` (tijdelijk offline), `operational` (beschikbaar), `degraded` (beperkt beschikbaar), `unknown` (nog niet bevestigd).

Zet het gedeelde veld `updateInProgress` op `true` wanneer de veiligheidsupdate daadwerkelijk in uitvoering is. Dit toont een geanimeerde melding boven de actuele melding, in de gekozen taal. Zet het op `false` (of verwijder het) zodra de update is afgerond. De animatie toont activiteit, geen gemeten voortgang of hersteltijd, en verandert de dienststatussen niet. Bij een voorkeur voor minder beweging staat de animatie automatisch stil.

Voeg bij diensten die alleen in België beschikbaar zijn `"access": "belgium"` toe. Bij de status `operational` toont de pagina **Alleen in België beschikbaar**, met de bijbehorende Engelse en Franse vertaling. Toegang via VPN is niet mogelijk. Verwijder `access` zodra de geografische beperking is opgeheven.

Voeg bij elke applicatie met gepland onderhoud `"maintenanceStartsAt": "2026-10-21T15:45:00+02:00"` toe, met het juiste tijdstip en de juiste tijdzone. De tabel toont de huidige beschikbaarheid en daaronder wanneer de applicatie offline gaat voor onderhoud. Bij applicaties die al offline zijn, wordt geen onderhoudsmelding getoond. Alle tijden worden in Belgische tijd getoond. Laat dit veld weg bij applicaties zonder gepland onderhoud. Werk bij de start van het onderhoud de status handmatig bij naar `offline` en verwijder `maintenanceStartsAt`; bevestig herstel voordat je de status weer op `operational` zet.

De pagina haalt elke minuut de laatste gegevens op wanneer het tabblad zichtbaar is. Bezoekers kunnen ook op **Vernieuwen** klikken. Publicatie en caching via GitHub kunnen kort duren. De publicatie gebruikt automatisch versiegebonden URL’s voor JavaScript en CSS, zodat een nieuwe pagina geen verouderd script uit de browsercache gebruikt. Het tijdstip op de pagina verwijst naar de inhoudelijke update, niet naar de laatste raadpleging.

## Talen

Bezoekers kiezen bovenaan **Nederlands**, **English** of **Français**. Rechtstreekse links gebruiken `?lang=nl`, `?lang=en` of `?lang=fr`. Een taal in de URL heeft voorrang op de lokaal bewaarde voorkeur; zonder beide is Nederlands de standaard. De interface, meldingen, statussen, datums en toegankelijkheidslabels volgen de gekozen taal. Alle tijden blijven Belgische tijd. Zonder JavaScript is een korte melding in alle drie de talen beschikbaar.

## Publicatie instellen

Maak deze repository publiek. Kies bij **Settings → Pages → Build and deployment → Source** voor **GitHub Actions**. De workflow `.github/workflows/pages.yml` publiceert de website bij elke wijziging op `main`.

## Lokaal bekijken

Voer `python3 -m http.server 8080` uit in deze map en open `http://localhost:8080`. Controleer de gegevens met `node validate.mjs`.

Test de publicatiebestanden met `node --test build.test.mjs`. Maak ze aan met `node build.mjs` en bekijk ze met `python3 -m http.server 8080 --directory _site`.

In Conductor start de **Run**-knop dezelfde server op de toegewezen `CONDUCTOR_PORT`, zodat meerdere werkruimtes tegelijk kunnen draaien. De gedeelde configuratie staat in `.conductor/settings.toml` en wordt door Conductor gebruikt zodra die op de standaardbranch is samengevoegd.

## Redactioneel

De eerste melding is overgenomen uit het aangeleverde bericht en gedateerd op 21 oktober 2026. De veiligheidsupdate start volgens de CIO op 21 oktober om 15.45 uur. Voor NxtMatch, NxtPlan en NxtPay wordt maximaal 1 uur onderbreking verwacht; voor Harry kan dit langer duren. Dit zijn verwachtingen, geen bevestigde hersteltijden. De dienststatussen tonen de laatst bevestigde beschikbaarheid; pas ze bij de start van de onderbreking en bij bevestigd herstel handmatig aan. Publiceer uitsluitend bevestigde informatie en pas verstreken verwachtingen aan zodra nieuwe informatie beschikbaar is. Alle bestanden en de volledige wijzigingsgeschiedenis van deze publieke repository zijn openbaar.
