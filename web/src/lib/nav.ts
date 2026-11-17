export type NavLink = { href: string; label: string };

// Bewusst schlicht: drei Seiten, dazu der Knopf «Termin anfragen» (führt zum Formular auf /kontakt)
export const nav: NavLink[] = [
  { href: "/angebot", label: "Angebot" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

export const requestHref = "/kontakt#anfrage";

// Hauptadresse der Website (Google, Sitemap, Bild beim Teilen). astivita.ch läuft seit November 2026 über Cloudflare (Konto Kurcom).
export const siteUrl = "https://astivita.ch";

// Phase «im Aufbau»: Beim Teilen erscheint das Astivita-Logo mit Kurkuma-Stempel («Neue Website im Aufbau von …»).
// Wenn die Website fertig ist (Fotos, Impressum): auf false stellen – dann gilt das Bild aus dem Studio.
export const underConstruction = true;
