import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { RichText } from "@/components/RichText";
import { CtaBand } from "@/components/Sections";
import { getSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Über mich",
  description: "Veterinärmedizinisches Fachwissen und manualtherapeutische Methoden – mit Zeit, Ruhe und Einfühlungsvermögen für deinen Hund.",
  alternates: { canonical: "/ueber-mich" },
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 pt-12 sm:px-6 sm:pt-16 md:grid-cols-[1fr_1.25fr] lg:gap-16">
        <Photo
          image={settings.aboutImage}
          alt={settings.ownerName ?? "Über mich"}
          sizes="(min-width: 768px) 40vw, 100vw"
          crop={{ width: 900, height: 1100 }}
          priority
          className="hero-photo aspect-[9/11] rounded-[2rem] rounded-tl-[6rem] md:sticky md:top-28"
        />
        <div className="hero-in flex flex-col gap-6">
          <p className="eyebrow">Über mich{settings.ownerName ? ` · ${settings.ownerName}` : ""}</p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] text-navy sm:text-6xl">{settings.aboutTitle ?? "Über mich"}</h1>
          <RichText value={settings.aboutText} className="text-lg leading-relaxed text-muted" />
          {settings.disclaimer && (
            <p className="rounded-2xl border border-line bg-white p-5 text-muted">
              <strong className="font-semibold text-ink">Wichtig: </strong>
              {settings.disclaimer}
            </p>
          )}
        </div>
      </section>
      <CtaBand settings={settings} />
    </>
  );
}
