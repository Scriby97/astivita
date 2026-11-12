export type NavLink = { href: string; label: string };

// Bewusst schlicht: drei Seiten, dazu der Knopf «Termin anfragen» (führt zum Formular auf /kontakt)
export const nav: NavLink[] = [
  { href: "/angebot", label: "Angebot" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

export const requestHref = "/kontakt#anfrage";

// Phase «im Aufbau»: Die Seite läuft als Vorschau auf workers.dev (Konto Kurcom), astivita.ch ist noch nicht verbunden.
// Beim Teilen erscheint ein Bild mit Astivita- und Kurkuma-Logo («Neue Website im Aufbau von …»).
// Beim Aufschalten: siteUrl auf "https://astivita.ch" und underConstruction auf false stellen.
export const underConstruction = true;
export const siteUrl = underConstruction ? "https://astivita.kurcom.workers.dev" : "https://astivita.ch";
