import type { SiteSettings } from "./sanity";

// Startinhalt: die Texte von Bettina (November 2026). Wird angezeigt, solange kein Sanity-Projekt verbunden ist,
// und dient als Vorlage für den ersten Inhalt im Studio (studio/scripts/seed.ts).
// TODO vor dem Aufschalten: Nachname, Strasse und evtl. Telefon von Melinda (Impressum braucht eine vollständige Adresse).
export const placeholderSettings: SiteSettings = {
  siteName: "Astivita",
  tagline: "Hundetherapie in Uezwil",
  ownerName: "Melinda",
  address: "Uezwil AG",
  email: "info@astivita.ch",

  heroEyebrow: "Hundetherapie in Uezwil",
  heroTitle: "Hundetherapie – für mehr Bewegungsfreude und Lebensqualität",
  heroText: "Mit Fachwissen, Feingefühl und gezielten Behandlungsmethoden zu mehr Wohlbefinden für deinen Hund.",
  introText: `Ob nach einer Operation, bei altersbedingten Beschwerden, Verspannungen oder Bewegungseinschränkungen: Auch Hunde profitieren von gezielter therapeutischer Unterstützung. Mit individuell abgestimmten Behandlungen helfe ich deinem Vierbeiner, seine Beweglichkeit zu verbessern, Schmerzen zu lindern und seine Lebensqualität zu erhalten oder zurückzugewinnen.

Dabei steht dein Hund mit seinen ganz persönlichen Bedürfnissen im Mittelpunkt. Jede Behandlung beginnt mit einer sorgfältigen Befundaufnahme und wird individuell auf seinen Gesundheitszustand, sein Alter und seine körperlichen Voraussetzungen abgestimmt.`,

  indicationsTitle: "Wann ist Hundetherapie sinnvoll?",
  indicationsIntro: "Eine therapeutische Begleitung kann in unterschiedlichen Lebensphasen und Situationen wertvoll sein:",
  indications: [
    "Nach Operationen und Verletzungen zur Unterstützung der Rehabilitation",
    "Bei Gelenkproblemen und altersbedingten Bewegungseinschränkungen",
    "Bei Muskelverspannungen und Bewegungsschmerzen",
    "Bei orthopädischen und neurologischen Beschwerden",
    "Zur Unterstützung von sportlich aktiven Hunden",
    "Zur Vorbeugung von körperlichen Beschwerden und zum Erhalt der Beweglichkeit",
    "Zur Förderung der Fitness und des allgemeinen Wohlbefindens",
  ],

  methodsTitle: "Ganzheitliche Therapie für deinen Hund",
  methodsIntro:
    "Die Hundetherapie verbindet verschiedene manuelle und bewegungstherapeutische Methoden. Je nach Befund und Behandlungsziel kommen unterschiedliche Techniken zum Einsatz:",
  methods: [
    { _key: "massage", name: "Klassische Massage", text: "Löst Verspannungen, fördert die Durchblutung und unterstützt die Entspannung der Muskulatur." },
    { _key: "triggerpunkt", name: "Triggerpunkttherapie", text: "Gezielte Behandlung schmerzhafter Muskelpunkte zur Verbesserung des Wohlbefindens." },
    { _key: "lymph", name: "Lymphdrainage", text: "Unterstützt den Lymphfluss und kann helfen, Schwellungen und Ödeme zu reduzieren." },
    { _key: "faszien", name: "Myofasciale Releasetechnik", text: "Fördert die Beweglichkeit des Fasziengewebes und kann Spannungen im Körper lösen." },
    { _key: "dorn", name: "Dorntherapie und Breussmassage", text: "Sanfte manuelle Behandlungstechniken für den Bewegungsapparat." },
    { _key: "training", name: "Trainingstherapie und Bewegungsschulung", text: "Gezielte Übungen für mehr Kraft, Koordination, Stabilität und Beweglichkeit." },
    { _key: "hydro", name: "Hydrotherapie", text: "Bewegung im Wasser und auf dem Unterwasserlaufband zur gelenkschonenden Mobilisation und zum Muskelaufbau." },
  ],

  aboutTitle: "Fachwissen trifft auf Einfühlungsvermögen",
  aboutText: `Eine fundierte veterinärmedizinische Ausbildung bildet die Grundlage meiner therapeutischen Arbeit. Dazu gehören Kenntnisse in Anatomie, Physiologie und Pathologie ebenso wie das Verständnis für den Bewegungsapparat, die verschiedenen Organsysteme und mögliche Krankheitsbilder.

Durch die Kombination aus veterinärmedizinischem Wissen und manualtherapeutischen Behandlungsmethoden kann ich den körperlichen Zustand deines Hundes ganzheitlich beurteilen und ein bedarfsgerechtes Therapiekonzept entwickeln.`,
  goal: "Mein Ziel ist es, deinen Hund individuell zu begleiten – mit Zeit, Ruhe und einem offenen Blick für das, was er gerade braucht.",
  disclaimer: "Hundetherapie versteht sich als Ergänzung zur tierärztlichen Betreuung und ersetzt keine tierärztliche Diagnose oder Behandlung.",

  contactTitle: "Termin anfragen",
  contactText:
    "Erzähl mir kurz von deinem Hund und was ihn gerade beschäftigt. Ich melde mich bei dir, um einen Termin in der Praxis in Uezwil zu vereinbaren.",
  requestTypes: ["Erster Termin", "Folgetermin", "Allgemeine Frage"],

  maintenance: false,
};
