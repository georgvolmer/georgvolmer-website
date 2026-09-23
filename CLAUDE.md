# CLAUDE.md — georgvolmer-website

Kontext für neue Claude-Code-Sessions in diesem Repo. Kurz halten, bei größeren Entscheidungen ergänzen.

## Zweck & Zielgruppen

- Business-/Portfolio-Website von Georg Volmer (Learning Designer / Articulate Storyline Coach).
- Zwei Sprachen als **komplett getrennte Seiten**, keine In-Page-Umschaltung:
  - DE: Hauptzielgruppe, deutschsprachige Unternehmen/Kunden.
  - EN: internationale Sichtbarkeit, eigenständiges Portfolio (nicht 1:1 identisch zu DE).
- Homepage (`index.html`) ist eine Ausnahme: DE- und EN-Block auf einer Seite untereinander.

## Seitenstruktur & Dateien

- `index.html` — Homepage, DE oben/EN unten, CTA-Buttons zu `/portfolio-de` bzw. `/portfolio`.
- `portfolio.html` / `portfolio-de.html` — eigenständige Portfolio-Seiten, eigene Texte je Sprache.
- `impressum.html`, `datenschutz.html` (DE) / `privacy.html` (EN) — rechtliche Seiten, ebenfalls getrennt.
- `check-inbox.html` — **nicht verlinkte** Bestätigungsseite für Kit-Landingpages nach Signup, `noindex`.
- `projects/ceo-spoof/` — kompletter Storyline-Webexport. Nie einzelne Dateien editieren, nur als Ganzes ersetzen (alte Inhalte löschen, neue Kopie 1:1 reinkopieren).
- `assets/style.css` — geteiltes Stylesheet für die "einfachen" Seiten (Home, Impressum, Datenschutz, Privacy, Check-inbox).
- `assets/portfolio.css` — eigenes Stylesheet nur für die Portfolio-Seiten (lädt zusätzlich zu `style.css`).
- `assets/video/`, `assets/clients/` — Video-Assets bzw. Kundenlogos für Portfolio-Einträge.
- `img/portfolio/` — Bilder für Portfolio-Einträge.
- `fonts/` — Plus Jakarta Sans, self-hosted (woff2).

## Hosting & Deploy

- GitHub-Repo `georgvolmer/georgvolmer-website`, Netlify deployt `main` automatisch nach **georgvolmer.com**.
- Netlify Pretty-URLs sind aktiv (`foo.html` → erreichbar unter `/foo`), kein `netlify.toml` nötig dafür.
- Deploy Previews entstehen nur bei **offenen Pull Requests**, nicht bei reinem Branch-Push.
- Netlify postet nur bei PR-Previews einen GitHub-Commit-Status — bei direkten Pushes auf `main` gibt es keinen Status; Produktions-Deploys über die Live-Domain selbst prüfen.

## Design-System

- Schrift: Plus Jakarta Sans (400/500/700), self-hosted, `@font-face` in `style.css`.
- Farben: Koralle `#F15B4E` (primär), `#CB3D2D`/`#D2402F` (Link-/Button-Variante in portfolio.css), Text dunkel `#4D4D4F`, Text sekundär `#6B6B6D`/`#999999`, Flächen/Rahmen hell `#ECECEB`/`#D2D2D2`/`#F7F7F6`/`#FAFAF9`.
- Container: einfache Seiten `max-width: 760px` (style.css); Portfolio-Seiten `max-width: 1080px` (eigene `.container`-Definition in portfolio.css überschreibt).
- Radius durchgängig 10–12px, Schatten meist `rgba(77,77,79,0.12–0.18)`.
- Breakpoints: 780px (Portfolio-Grids → 1 Spalte), 600px (einfache Seiten).

## Markup-Muster: Portfolio-Eintrag

Jeder Eintrag = eine `<section id="..." class="project [project--tinted]">`:

1. Hero-Karte oben (`.card` im `.cards`-Grid): `card-media`, `card-tag`, `card-title`, `card-blurb` — Blurb muss ähnlich lang sein wie bei den anderen Karten (notfalls eigene kürzere Version bauen, Original bleibt im `project-lede`).
2. `project-intro`: `kicker` (= card-tag), `h2.project-title`, `project-lede`.
3. `pair-wrap`: `pair-problem` + `pair-solution` (2 Spalten) mit Pfeil-SVG dazwischen; optional `.recognition` (fett Label + Satz) für Zusatzinfo wie "Ergebnis"/"Result" oder "Anerkennung".
4. `decisions-block`: 3× `.decision` mit Nummer 01/02/03, `h4` (ohne Punkt am Ende), `p`.
5. `skills`: `.chips` mit einzelnen `.chip`-Spans, jeweils groß geschrieben (keine Fließtext-Kommaliste).
6. Medium: entweder Click-to-load-iframe (`.embed-facade` + JS unten im `<script>`, Pattern Storyline/YouTube) **oder** natives `<video>` (`.video-embed`, kein Autoplay/Loop/Mute, Captions per `<track default>`).
7. Optional `.quotes` (2 Testimonials nebeneinander) oder `.quotes.quotes--single` (1 Testimonial, optional Kundenlogo via `.quote-logo`).
8. `<details class="story"><summary>…</summary>` mit aufklappbarer Projektgeschichte: mehrere `<p><strong>Label.</strong> Text</p>`, optional `<figure>` mit Bild + `figcaption`.

## Konventionen

- DE/EN sind eigenständige Dateien mit eigener finaler Copy — **lokalisieren, nicht wörtlich übersetzen**. Reihenfolge/Inhalt der Einträge muss nicht identisch sein.
- Section-IDs (`#ceo-spoof`, `#adr-tour`, `#theme-genie`, `#hartleib`, …) sind auf beiden Sprachseiten identisch.
- Sprachlink oben rechts im Header (`.lang-switch`): aktuelle Sprache = fett/dunkel, kein Link; andere Sprache = Link.
- **Keine Gedankenstriche** (— oder –) in neuen Texten, auch nicht in Alt-Texten/Attributen. Gilt nicht rückwirkend für bereits bestehende Stellen (z. B. `<title>`-Tags).
- `datenschutz.html`/`privacy.html` anpassen, **sobald ein neuer Drittanbieter/Embed** dazukommt (siehe YouTube bei ADR). Native/selbst gehostete Inhalte (Video, Storyline) brauchen keinen neuen Eintrag.
- Kunden-Bilder/-Videos 1:1 kopieren, nie verändern oder neu kodieren.
- Textdateien wie `.vtt` per `.gitattributes` (`-text`) vor Zeilenumbruch-Normalisierung schützen, sonst verändert Git sie beim Commit (Byte-Identität danach mit `sha256sum` prüfen).
- Neue Standalone-Seiten (wie `check-inbox.html`) nie in Header-/Footer-Nav verlinken.

## Workflow (Branches, PRs, Deploy)

- Für jede Änderung eigenen Branch von `main` abzweigen, nicht direkt auf `main` committen (Ausnahme: sehr kleine, risikoarme Fixes mit expliziter Freigabe).
- Diff immer zeigen, bevor committet wird.
- Für Vorschau: Branch pushen, PR gegen `main` öffnen (nur um Netlify Deploy Preview auszulösen, **nicht mergen**).
- Erst nach OK: PR mergen (normaler Merge-Commit), danach Branch lokal **und** remote löschen.
- GitHub-Auth läuft über den lokal gespeicherten Credential (`git credential fill`) — keine Tokens in Dateien ablegen.

## Bekannte Stolperfallen

- Root-relative Pfade (`/assets/...`, `/img/...`) funktionieren nicht bei `file://`-Vorschau. Für lokale Vorschau kleinen Static-Server aufsetzen (z. B. PowerShell `HttpListener`) oder direkt die Netlify Deploy Preview nutzen.
- `<details>`: geschlossene Inhalte lassen sich **nicht** zuverlässig per CSS erzwingen offen anzeigen — nur das `open`-Attribut funktioniert wirklich (wichtig z. B. für PDF-Export der Seite).
- Git mit `autocrlf=true` verändert Textdateien mit CRLF beim Commit (z. B. `.vtt`, Teile des Storyline-Exports) — immer vorher per `.gitattributes` schützen.
- `grep -P` mit `\x{...}` für Unicode-Zeichen ist in dieser Umgebung unzuverlässig — stattdessen mit `printf` erzeugte UTF-8-Bytes und `grep -F` verwenden (z. B. beim Gedankenstrich-Check).

## Offene Punkte

- CEO-Spoof-Storyline-Modul existiert nur auf Englisch, wird aber auch auf der DE-Seite eingebettet (mit Hinweis "Das Modul ist auf Englisch"). Für eine deutsche Version wäre ein zweiter Export nötig.
- Kein `netlify.toml` im Repo — falls künftig Content-Type-Overrides oder Redirects nötig werden, dort ergänzen.
- `.github/workflows/` liegt lokal im Arbeitsverzeichnis, ist aber nicht Teil dieses Repos/Projekts — nicht committen.
