import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
      <p className="eyebrow">Seite nicht gefunden</p>
      <h1 className="font-display text-5xl font-semibold text-navy">Hier ist leider nichts.</h1>
      <p className="text-lg text-muted">Die Seite gibt es nicht (mehr). Vielleicht hilft dir die Startseite weiter.</p>
      <Link href="/" className="btn-primary">
        Zur Startseite
      </Link>
    </section>
  );
}
