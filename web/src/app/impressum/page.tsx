import type { Metadata } from "next";
import { getSettings, telHref } from "@/lib/sanity";

export const metadata: Metadata = { title: "Impressum", alternates: { canonical: "/impressum" } };

export default async function ImprintPage() {
  const settings = await getSettings();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-8 font-display text-5xl font-semibold text-navy">Impressum</h1>
      <div className="flex flex-col gap-1 text-lg text-muted">
        <p className="font-semibold text-ink">{settings.company || `${settings.siteName ?? "Astivita"} Hundetherapie`}</p>
        {settings.ownerName && <p>Inhaberin: {settings.ownerName}</p>}
        {settings.address && <p className="whitespace-pre-line">{settings.address}</p>}
        {settings.email && (
          <p>
            E-Mail:{" "}
            <a href={`mailto:${settings.email}`} className="text-navy underline decoration-navy/30 underline-offset-2 hover:decoration-navy">
              {settings.email}
            </a>
          </p>
        )}
        {settings.phone && (
          <p>
            Telefon:{" "}
            <a href={telHref(settings.phone)} className="text-navy underline decoration-navy/30 underline-offset-2 hover:decoration-navy">
              {settings.phone}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
