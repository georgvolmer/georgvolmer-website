# CLAUDE.md — georgvolmer-website

Kontext für neue Claude-Code-Sessions in diesem Repo. Kurz halten, bei größeren Entscheidungen ergänzen.

## Zweck & Zielgruppen

- Business-/Portfolio-Website von Georg Volmer (Learning Designer / Articulate Storyline Coach).
- Zwei Sprachen als **komplett getrennte Seiten**, keine In-Page-Umschaltung:
  - DE: Hauptzielgruppe, deutschsprachige Unternehmen/Kunden.
  - EN: internationale Sichtbarkeit, eigenständiges Portfolio (nicht 1:1 identisch zu DE).
- Startseite (`index.html`) ist **nur Deutsch** (Ansprache mit „Sie“, Zielgruppe Auftraggeber, Bildungsträger, Agenturen). Eine englische Startseite gibt es nicht, auf den EN-Seiten übernimmt `/portfolio` diese Rolle.

## Seitenstruktur & Dateien

- `index.html`: Startseite (nur DE) mit Sektionen `#leistungen`, `#projekte`, `#ueber-mich`, `#werdegang`, `#kontakt`.
- `portfolio.html` / `portfolio-de.html` — eigenständige Portfolio-Seiten, eigene Texte je Sprache.
- `impressum.html`, `datenschutz.html` (DE) / `privacy.html` (EN) — rechtliche Seiten, ebenfalls getrennt.
- `check-inbox.html` — **nicht verlinkte** Bestätigungsseite für Kit-Landingpages nach Signup, `noindex`.
- `projects/ceo-spoof/` — kompletter Storyline-Webexport. Nie einzelne Dateien editieren, nur als Ganzes ersetzen (alte Inhalte löschen, neue Kopie 1:1 reinkopieren).
- `assets/style.css`: geteiltes Basis-Stylesheet für **alle** Seiten, inklusive Header, Navigation, Sprachlink und Footer (Icons).
- `assets/home.css`: nur die Sektionen der Startseite (lädt zusätzlich zu `style.css`).
- `assets/portfolio.css` — eigenes Stylesheet nur für die Portfolio-Seiten (lädt zusätzlich zu `style.css`).
- `assets/video/`, `assets/clients/` — Video-Assets bzw. Kundenlogos für Portfolio-Einträge.
- `img/portfolio/` — Bilder für Portfolio-Einträge.
- `img/home/`: Fotos der Startseite. Das Hero-Foto ist bewusst ohne Schuhe beschnitten, die koralle Fläche dahinter hat eine per SVG-Filter angerissene Kante (angelehnt an die Raute im Logo). Nicht durch einen glatten Rahmen ersetzen.
- `fonts/` — Plus Jakarta Sans, self-hosted (woff2).

## Hosting & Deploy

- GitHub-Repo `georgvolmer/georgvolmer-website`, Netlify deployt `main` automatisch nach **georgvolmer.com**.
- Netlify Pretty-URLs sind aktiv (`foo.html` → erreichbar unter `/foo`), kein `netlify.toml` nötig dafür.
- Deploy Previews entstehen nur bei **offenen Pull Requests**, nicht bei reinem Branch-Push.
- Netlify postet nur bei PR-Previews einen GitHub-Commit-Status — bei direkten Pushes auf `main` gibt es keinen Status; Produktions-Deploys über die Live-Domain selbst prüfen.

## Design-System

- Schrift: Plus Jakarta Sans (400/500/700), self-hosted, `@font-face` in `style.css`.
- Farben: Koralle `#F15B4E` (primär), `#CB3D2D`/`#D2402F` (Link-/Button-Variante in portfolio.css), Text dunkel `#4D4D4F`, Text sekundär `#6B6B6D`/`#999999`, Flächen/Rahmen hell `#ECECEB`/`#D2D2D2`/`#F7F7F6`/`#FAFAF9`.
- Container: Header überall `max-width: 1080px`, damit Logo und Navigation nicht springen. Inhalt der Rechtsseiten `760px` (style.css); Startseite und Portfolio-Seiten `1080px` (home.css bzw. portfolio.css).
- Radius durchgängig 10–12px, Schatten meist `rgba(77,77,79,0.12–0.18)`.
- Breakpoints: 960px (Nav ohne „Werdegang“), 780px (Grids → 1 Spalte, Nav nur noch Logo, Kontakt-Button, Sprachlink), 600px (einfache Seiten), 420px (kompakter Header).

## Header & Footer (kanonisch)

Auf allen öffentlichen Seiten gleich aufgebaut, statisch in jede Seite kopiert (kein JS-Include, kein Build). Header ist sticky, `html` hat `scroll-padding-top`, damit Anker nicht unter dem Header landen. Neue Seiten übernehmen diese Snippets 1:1 und passen nur die markierten Stellen an.

**DE-Header** (index, portfolio-de, impressum, datenschutz). `aria-current="page"` nur am Portfolio-Link auf portfolio-de. EN-Ziel: index/portfolio-de/impressum → `/portfolio`, datenschutz → `/privacy`.

```html
<header class="site-header">
    <div class="container">
        <a href="/" class="site-logo" aria-label="Georg Volmer, Startseite">
            <img src="/assets/Georg-Volmer-logo-RGB.png" alt="Georg Volmer" height="38">
        </a>
        <nav class="site-nav" aria-label="Hauptnavigation">
            <ul>
                <li><a href="/#leistungen">Leistungen</a></li>
                <li><a href="/portfolio-de">Portfolio</a></li>
                <li><a href="/#ueber-mich">Über mich</a></li>
                <li class="nav-hide-md"><a href="/#werdegang">Werdegang</a></li>
            </ul>
            <a href="/#kontakt" class="nav-cta">Kontakt</a>
            <div class="lang-switch">
                <span class="lang-switch-current">DE</span>
                <span class="lang-switch-sep" aria-hidden="true">/</span>
                <a href="/portfolio" lang="en" hreflang="en">EN</a>
            </div>
        </nav>
    </div>
</header>
```

**EN-Header** (portfolio, privacy). Logo führt auf `/portfolio`. `aria-current="page"` nur am Projects-Link auf portfolio. DE-Ziel: portfolio → `/portfolio-de`, privacy → `/datenschutz`. Bewusst keine Links auf die deutschen Startseiten-Anker.

```html
<header class="site-header">
    <div class="container">
        <a href="/portfolio" class="site-logo" aria-label="Georg Volmer, Portfolio">
            <img src="/assets/Georg-Volmer-logo-RGB.png" alt="Georg Volmer" height="38">
        </a>
        <nav class="site-nav" aria-label="Main navigation">
            <ul>
                <li><a href="/portfolio">Projects</a></li>
            </ul>
            <a href="/portfolio#contact" class="nav-cta">Contact</a>
            <div class="lang-switch">
                <a href="/portfolio-de" lang="de" hreflang="de">DE</a>
                <span class="lang-switch-sep" aria-hidden="true">/</span>
                <span class="lang-switch-current">EN</span>
            </div>
        </nav>
    </div>
</header>
```

**Footer.** DE-Seiten: Labels „auf LinkedIn/YouTube“, Rechtslinks Impressum · Datenschutz · Privacy Policy. EN-Seiten: Labels „on LinkedIn/YouTube“, Rechtslinks `<a href="/impressum" hreflang="de">Legal Notice</a>` · Privacy Policy. `aria-current="page"` am Link der aktuellen Rechtsseite.

```html
<footer class="site-footer">
    <div class="container">
        <div class="footer-social">
            <a href="https://www.linkedin.com/in/georg-volmer" target="_blank" rel="noopener" aria-label="Georg Volmer auf LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4z"/></svg>
            </a>
            <a href="https://www.youtube.com/@georgvolmer" target="_blank" rel="noopener" aria-label="Georg Volmer auf YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5zM9.6 15.6V8.4l6.3 3.6z"/></svg>
            </a>
        </div>
        <ul class="footer-nav">
            <li><a href="/impressum">Impressum</a></li>
            <li><a href="/datenschutz">Datenschutz</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
        <p class="footer-copy">&copy; 2026 Georg Volmer</p>
    </div>
</footer>
```

Ausnahme: `check-inbox.html` hat nur das Logo (keine Navigation), aber den EN-Footer. Kontakt-Sections der Portfolio-Seiten tragen `id="contact"` (EN) bzw. `id="kontakt"` (DE); der DE-Header-Button zielt trotzdem auf `/#kontakt`.

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
- Sprachlink oben rechts im Header (`.lang-switch`, immer „DE / EN“): aktuelle Sprache = fett/dunkel, kein Link; andere Sprache = Link.
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

- Burger-Menü für Mobil, sobald weitere Seiten (z. B. Community) in die Navigation kommen. Aktuell werden unter 780px die Textlinks einfach ausgeblendet.
- CEO-Spoof-Storyline-Modul existiert nur auf Englisch, wird aber auch auf der DE-Seite eingebettet (mit Hinweis "Das Modul ist auf Englisch"). Für eine deutsche Version wäre ein zweiter Export nötig.
- Kein `netlify.toml` im Repo — falls künftig Content-Type-Overrides oder Redirects nötig werden, dort ergänzen.
- `.github/workflows/` liegt lokal im Arbeitsverzeichnis, ist aber nicht Teil dieses Repos/Projekts — nicht committen.
