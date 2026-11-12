import type { Metadata } from "next";
import { RequestForm } from "@/components/RequestForm";
import { PageHeader } from "@/components/Sections";
import { filled, getSettings, telHref } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Kontakt & Termin anfragen",
  description: "Termin für die Hundetherapie in Uezwil AG anfragen – kurz das Anliegen schildern, ich melde mich.",
  alternates: { canonical: "/kontakt" },
};

export default async function ContactPage() {
  const settings = await getSettings();
  const requestTypes = filled(settings.requestTypes) ? settings.requestTypes : ["Erster Termin", "Folgetermin", "Allgemeine Frage"];

  return (
    <>
      <PageHeader eyebrow="Kontakt" title={settings.contactTitle ?? "Termin anfragen"} intro={settings.contactText} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 rounded-3xl bg-sage-light p-6">
            <h2 className="font-display text-2xl font-semibold text-navy">Praxis</h2>
            {settings.ownerName && <p>{settings.ownerName}</p>}
            {settings.address && <p className="whitespace-pre-line">{settings.address}</p>}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy">
                {settings.email}
              </a>
            )}
            {settings.phone && (
              <a href={telHref(settings.phone)} className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy">
                {settings.phone}
              </a>
            )}
          </div>
          {settings.disclaimer && <p className="text-sm text-muted">{settings.disclaimer}</p>}
        </div>
        <RequestForm requestTypes={requestTypes} />
      </section>
    </>
  );
}
