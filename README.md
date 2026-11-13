# Astivita Hundetherapie – Website

Website für Melindas Hundetherapie-Praxis in Uezwil (astivita.ch). Inhalte pflegt Bettina im Sanity-Studio.

- `web/` – Next.js, statischer Export (`out/`), gehostet als Cloudflare Worker mit Static Assets (`wrangler.jsonc`)
- `studio/` – Sanity-Studio: ein Dokument «Website» mit Reitern Startseite, Angebot, Über mich, Kontakt & Rechtliches, Wartung
- `material/` – Logo-Original und Bettinas Texte (nicht im Repo)

## Seiten

Startseite · Angebot · Über mich · Kontakt (Terminanfrage) · Impressum · Datenschutz

Die Terminanfrage ist ein Formular ohne eigenen Server: Web3Forms schickt sie per E-Mail an info@astivita.ch, Melinda meldet sich mit einem Terminvorschlag. Keine Online-Buchung mit Kalender (bewusst einfach gehalten).

## Lokal

```sh
cd web
cp .env.example .env.local   # Sanity-Project-ID und Web3Forms-Key eintragen
npm install
npm run dev
```

Ohne Sanity-Project-ID zeigt die Seite Bettinas Texte aus `web/src/lib/placeholder.ts`. Fotos fehlen dann; an ihrer Stelle steht der Hund aus dem Logo.

Tests: `npm run test:e2e` (baut mit festen Testdaten aus `src/lib/e2e-fixtures.ts`, fängt Web3Forms ab, prüft auch Barrierefreiheit).

## Sanity

- Projekt `i4ht1xtp` (Name «Astivita», Dataset `production`, öffentlich lesbar) im Konto von Nicolas, angelegt am 13.11.2026.
- Studio: https://astivita.sanity.studio (`cd studio && npm run deploy`).
- `npm run seed` hat das Dokument «Website» mit Bettinas Texten angelegt. Es überschreibt nichts, falls das Dokument schon existiert.
- Wartungsmodus: im Studio unter «Wartung», vorbereitet mit Passwort «hund», zurzeit ausgeschaltet.
- Vor Aktionen mit der CLI immer `npx sanity debug` prüfen (welches Konto angemeldet ist).

Das Datenformat steht doppelt: im Schema (`studio/schemaTypes/siteSettings.ts`) und als Typ `SiteSettings` in `web/src/lib/sanity.ts` – bei Änderungen beide anpassen.

## Online stellen (Cloudflare)

Workers & Pages → Projekt aus dem GitHub-Repo, Stammverzeichnis `web`, Build `npm run build`, Variablen aus `.env.example`. Nach jeder Änderung im Studio neu bauen (Deploy-Hook in Sanity → Webhook).

## Noch offen

- Nachname, Strasse und Telefon von Melinda (Impressum braucht eine vollständige Adresse)
- Fotos (Startseite, Über mich, optional pro Methode)
- Web3Forms-Key für info@astivita.ch
- Sanity-Projekt, Cloudflare, DNS von astivita.ch
