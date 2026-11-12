import Link from "next/link";
import { Photo } from "@/components/Photo";
import { RichText } from "@/components/RichText";
import { CtaBand, Indications, Methods } from "@/components/Sections";
import { requestHref } from "@/lib/nav";
import { filled, getSettings } from "@/lib/sanity";

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 md:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          {settings.heroEyebrow && <p className="eyebrow">{settings.heroEyebrow}</p>}
          <h1 className="font-display text-5xl font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">{settings.heroTitle}</h1>
          {settings.heroText && <p className="max-w-xl text-lg text-muted sm:text-xl">{settings.heroText}</p>}
          <div className="flex flex-wrap gap-3">
            <Link href={requestHref} className="btn-primary">
              Termin anfragen
            </Link>
            <Link href="/angebot" className="btn-outline">
              Mein Angebot
            </Link>
          </div>
        </div>
        <Photo
          image={settings.heroImage}
          alt="Hund bei der Therapie"
          sizes="(min-width: 768px) 45vw, 100vw"
          crop={{ width: 1000, height: 1150 }}
          priority
          className="aspect-[20/23] rounded-[2rem] rounded-tr-[6rem]"
        />
      </section>

      {settings.introText && (
        <section className="mx-auto max-w-3xl px-4 pb-16 text-lg leading-relaxed text-ink sm:px-6 sm:pb-20 sm:text-xl">
          <RichText value={settings.introText} />
        </section>
      )}

      <Indications settings={settings} />

      {filled(settings.methods) && (
        <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Angebot</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-navy sm:text-5xl">{settings.methodsTitle}</h2>
            </div>
            <Link href="/angebot" className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy">
              Mehr zum Angebot
            </Link>
          </div>
          <Methods methods={settings.methods} />
        </section>
      )}

      {settings.aboutTitle && (
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 sm:px-6 sm:pt-20 md:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Photo
            image={settings.aboutImage}
            alt={settings.ownerName ?? "Über mich"}
            sizes="(min-width: 768px) 40vw, 100vw"
            crop={{ width: 900, height: 1000 }}
            className="aspect-[9/10] rounded-[2rem] rounded-bl-[6rem]"
          />
          <div className="flex flex-col gap-5">
            <p className="eyebrow">Über mich</p>
            <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">{settings.aboutTitle}</h2>
            <RichText value={settings.aboutText} className="text-lg text-muted" />
            <Link href="/ueber-mich" className="btn-outline self-start">
              Mehr über mich
            </Link>
          </div>
        </section>
      )}

      <CtaBand settings={settings} />
    </>
  );
}
