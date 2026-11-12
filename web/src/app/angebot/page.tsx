import type { Metadata } from "next";
import { RichText } from "@/components/RichText";
import { CtaBand, Indications, Methods, PageHeader } from "@/components/Sections";
import { filled, getSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Angebot",
  description: "Massage, Triggerpunkttherapie, Lymphdrainage, Faszientechnik, Dorn-Breuss, Trainingstherapie und Hydrotherapie für Hunde in Uezwil AG.",
  alternates: { canonical: "/angebot" },
};

export default async function OfferPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader eyebrow="Angebot" title={settings.methodsTitle ?? "Angebot"} intro={settings.methodsIntro} />
      {filled(settings.methods) && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <Methods methods={settings.methods} withImages />
        </section>
      )}
      {settings.offerText && (
        <section className="mx-auto max-w-3xl px-4 pb-16 text-lg text-muted sm:px-6 sm:pb-20">
          <RichText value={settings.offerText} />
        </section>
      )}
      <Indications settings={settings} />
      <CtaBand settings={settings} />
    </>
  );
}
