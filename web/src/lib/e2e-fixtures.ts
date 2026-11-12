import { placeholderSettings } from "./placeholder";
import type { SiteSettings } from "./sanity";

// Feste Testdaten für `npm run test:e2e` – unabhängig davon, was im Studio steht
const testImage = { _type: "image", asset: { _type: "reference", _ref: "image-abc123-800x600-jpg" } } as const;

export const e2eSettings: SiteSettings = {
  ...placeholderSettings,
  ownerName: "Test Therapeutin",
  address: "Teststrasse 1\n5607 Uezwil",
  phone: "079 000 00 00",
  heroImage: { ...testImage, alt: "Hund bei der Massage" },
  aboutImage: { ...testImage, alt: "Melinda mit Hund" },
  methods: [
    { _key: "a", name: "Testmassage", text: "Lockert die Muskeln.", image: { ...testImage, alt: "Massage" } },
    { _key: "b", name: "Testtraining", text: "Mehr Kraft und Koordination." },
  ],
  requestTypes: ["Erster Termin", "Folgetermin"],
};
