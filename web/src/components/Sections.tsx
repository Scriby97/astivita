import Link from "next/link";
import { requestHref } from "@/lib/nav";
import { filled, type Method, type SiteSettings } from "@/lib/sanity";
import { Photo } from "./Photo";

export function Check() {
  return (
    <svg viewBox="0 0 20 20" className="tick mt-1 size-5 shrink-0 text-sage" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity={0.15} />
      <path pathLength={1} d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** «Wann ist Hundetherapie sinnvoll?» – Liste mit Häkchen auf Salbeigrün */
export function Indications({ settings, headingLevel = 2 }: { settings: SiteSettings; headingLevel?: 2 | 3 }) {
  if (!filled(settings.indications)) return null;
  const Heading = `h${headingLevel}` as const;
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="rounded-[2rem] bg-sage-light px-6 py-12 sm:px-12 sm:py-16">
        <Heading className="reveal font-display text-4xl font-semibold text-navy sm:text-5xl">{settings.indicationsTitle}</Heading>
        {settings.indicationsIntro && <p className="reveal mt-4 max-w-2xl text-lg text-muted">{settings.indicationsIntro}</p>}
        <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
          {settings.indications.map((item) => (
            <li key={item} className="tick-item flex gap-3 text-lg">
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Behandlungsmethoden: kompakt (Startseite) oder mit Bildern (Angebot) */
export function Methods({ methods, withImages = false }: { methods: Method[]; withImages?: boolean }) {
  return (
    <ul className="reveal-row grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {methods.map((m) => (
        <li key={m._key} className="reveal method-card flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
          {withImages && m.image && <Photo image={m.image} alt={m.name} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" crop={{ width: 800, height: 560 }} className="aspect-[10/7]" />}
          <div className="flex flex-1 flex-col gap-2 p-6">
            <h3 className="font-display text-2xl font-semibold text-navy">{m.name}</h3>
            {m.text && <p className="text-muted">{m.text}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Abschluss jeder Seite: Melindas Ziel, Knopf zur Anfrage, Hinweis zur tierärztlichen Betreuung */
export function CtaBand({ settings }: { settings: SiteSettings }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-navy px-6 py-14 text-center text-white sm:px-16">
        {settings.goal && <p className="reveal max-w-3xl font-display text-3xl font-medium leading-snug sm:text-4xl">{settings.goal}</p>}
        <Link href={requestHref} className="btn-light">
          Termin anfragen
        </Link>
        {settings.disclaimer && <p className="max-w-2xl text-sm text-white/75">{settings.disclaimer}</p>}
      </div>
    </section>
  );
}

/** Seitentitel der Unterseiten */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string | null }) {
  return (
    <div className="hero-in mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-navy sm:text-6xl">{title}</h1>
      {intro && <p className="mt-5 max-w-3xl text-lg text-muted sm:text-xl">{intro}</p>}
    </div>
  );
}
