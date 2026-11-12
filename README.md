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

## Sanity einrichten (einmalig)

1. `cd studio && npx sanity debug` – prüfen, mit welchem Konto die CLI angemeldet ist.
2. Projekt anlegen (`npx sanity init` oder sanity.io/manage), Project-ID in `studio/sanity.config.ts`, `studio/sanity.cli.ts` und `web/.env.local` eintragen.
3. `npm run seed` – legt das Dokument «Website» mit Bettinas Texten an (Wartungsmodus an, Passwort «hund»).
4. `npm run deploy` – Studio unter https://astivita.sanity.studio, Bettina als Mitglied einladen.
5. CORS: `https://astivita.ch` ist nicht nötig (die Seite wird beim Build gebaut), aber für die lokale Vorschau `http://localhost:3000` erlauben.

Das Datenformat steht doppelt: im Schema (`studio/schemaTypes/siteSettings.ts`) und als Typ `SiteSettings` in `web/src/lib/sanity.ts` – bei Änderungen beide anpassen.

## Online stellen (Cloudflare)

Workers & Pages → Projekt aus dem GitHub-Repo, Stammverzeichnis `web`, Build `npm run build`, Variablen aus `.env.example`. Nach jeder Änderung im Studio neu bauen (Deploy-Hook in Sanity → Webhook).

## Noch offen

- Nachname, Strasse und Telefon von Melinda (Impressum braucht eine vollständige Adresse)
- Fotos (Startseite, Über mich, optional pro Methode)
- Web3Forms-Key für info@astivita.ch
- Sanity-Projekt, Cloudflare, DNS von astivita.ch
