import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { e2eSettings } from "./e2e-fixtures";
import { placeholderSettings } from "./placeholder";

// E2E=1: feste Testdaten für die automatischen Tests (npm run test:e2e), unabhängig von den Inhalten im Studio
const e2e = process.env.E2E === "1";
const projectId = e2e ? undefined : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Ohne Project-ID (lokal, bevor Sanity eingerichtet ist) zeigt die Seite die Texte aus placeholder.ts
const client = projectId ? createClient({ projectId, dataset, apiVersion: "2026-11-01", useCdn: false }) : null;
const builder = projectId || e2e ? createImageUrlBuilder({ projectId: projectId ?? "e2etest", dataset }) : null;

export type SanityImage = SanityImageSource & { alt?: string | null };

/** Text aus dem Studio-Editor (Blöcke) – oder reiner Text (Platzhalter): «## » Zwischentitel, «- » Aufzählung */
export type RichTextValue = string | { _type: string; _key?: string; [key: string]: unknown }[];

export type Method = { _key: string; name: string; text?: string | null; image?: SanityImage | null };

// Alle Inhalte stehen in einem Dokument «Website» mit einem Reiter pro Seite (studio/schemaTypes/siteSettings.ts)
export type SiteSettings = {
  siteName?: string | null;
  tagline?: string | null;
  ownerName?: string | null;
  company?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  shareImage?: SanityImage | null;

  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroText?: string | null;
  heroImage?: SanityImage | null;
  introText?: RichTextValue | null;

  indicationsTitle?: string | null;
  indicationsIntro?: string | null;
  indications?: string[] | null;

  methodsTitle?: string | null;
  methodsIntro?: string | null;
  methods?: Method[] | null;
  offerText?: RichTextValue | null;

  aboutTitle?: string | null;
  aboutText?: RichTextValue | null;
  aboutImage?: SanityImage | null;
  goal?: string | null;
  disclaimer?: string | null;

  contactTitle?: string | null;
  contactText?: string | null;
  requestTypes?: string[] | null;
  privacyText?: RichTextValue | null;

  maintenance?: boolean | null;
  maintenanceText?: string | null;
  previewPassword?: string | null;
};

const SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  ...,
  // Leere Bildplätze (Bild hinzugefügt, aber keine Datei gewählt) weglassen
  "methods": methods[]{ _key, name, text, "image": select(defined(image.asset) => image) }
}`;

export async function getSettings(): Promise<SiteSettings> {
  if (e2e) return e2eSettings;
  if (!client) return placeholderSettings;
  return (await client.fetch<SiteSettings | null>(SETTINGS_QUERY)) ?? {};
}

/** Bild-URL; mit `crop` schneidet Sanity auf dieses Seitenverhältnis zu – nach dem Bildausschnitt (Hotspot) im Studio */
export function imageUrl(image?: SanityImage | null, crop?: { width: number; height: number }): string | null {
  if (!image || typeof image !== "object" || !("asset" in image) || !image.asset || !builder) return null;
  const img = builder.image(image);
  return (crop ? img.width(crop.width).height(crop.height).fit("crop") : img).url();
}

/** Liste mit Inhalt? (leere Listen aus dem Studio gelten als «nicht ausgefüllt») */
export const filled = <T,>(list?: T[] | null): list is T[] => Array.isArray(list) && list.length > 0;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
