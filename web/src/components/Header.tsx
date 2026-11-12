import Image from "next/image";
import Link from "next/link";
import { nav, requestHref } from "@/lib/nav";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

export function Header({ siteName }: { siteName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/90 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-x-6 px-4 py-2 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteName} Hundetherapie – zur Startseite`}>
          <Image src="/logo.svg" alt="" width={853} height={696} className="h-16 w-auto sm:h-20" priority unoptimized />
        </Link>

        <nav aria-label="Hauptmenü" className="hidden items-center gap-x-1 md:flex">
          <NavLinks links={nav} />
        </nav>

        <div className="flex items-center gap-2">
          <Link href={requestHref} className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex">
            Termin anfragen
          </Link>
          <MobileMenu nav={nav} />
        </div>
      </div>
    </header>
  );
}
