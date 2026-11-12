import Image from "next/image";
import Link from "next/link";
import { nav, requestHref, type NavLink } from "@/lib/nav";
import { telHref, type SiteSettings } from "@/lib/sanity";

export function Footer({ settings }: { settings: SiteSettings }) {
  const siteName = settings.siteName ?? "Astivita";
  const socials = [
    settings.instagram && { href: settings.instagram, label: "Instagram" },
    settings.facebook && { href: settings.facebook, label: "Facebook" },
  ].filter(Boolean) as NavLink[];

  return (
    <footer className="bg-navy text-white/80 print:hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          {/* Logo in Weiss auf dem dunkelblauen Grund */}
          <Image
            src="/logo.svg"
            alt={`${siteName} Hundetherapie`}
            width={853}
            height={696}
            className="h-24 w-auto self-start brightness-0 invert"
            unoptimized
          />
          {settings.disclaimer && <p className="max-w-xs text-sm">{settings.disclaimer}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-2xl font-semibold text-white">Seiten</h2>
          <ul className="flex flex-col gap-2">
            {[{ href: "/", label: "Startseite" }, ...nav].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-2xl font-semibold text-white">Kontakt</h2>
          {settings.ownerName && <p>{settings.ownerName}</p>}
          {settings.address && <p className="whitespace-pre-line">{settings.address}</p>}
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="hover:text-white">
              {settings.email}
            </a>
          )}
          {settings.phone && (
            <a href={telHref(settings.phone)} className="hover:text-white">
              {settings.phone}
            </a>
          )}
          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-full border border-white/25 px-3 py-1.5 text-sm hover:border-white hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <Link href={requestHref} className="btn-light mt-2 self-start px-5 py-2.5 text-sm">
            Termin anfragen
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteName} Hundetherapie
          </p>
          <nav aria-label="Rechtliches" className="flex gap-5">
            <Link href="/impressum" className="hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
