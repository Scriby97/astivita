export type NavLink = { href: string; label: string };

// Bewusst schlicht: drei Seiten, dazu der Knopf «Termin anfragen» (führt zum Formular auf /kontakt)
export const nav: NavLink[] = [
  { href: "/angebot", label: "Angebot" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

export const requestHref = "/kontakt#anfrage";

export const siteUrl = "https://astivita.ch";
