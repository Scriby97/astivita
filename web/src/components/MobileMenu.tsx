"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { requestHref, type NavLink } from "@/lib/nav";

// Aufklappbares Menü für schmale Bildschirme; die Desktop-Leiste steht im Header
export function MobileMenu({ nav }: { nav: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Menü schliessen" : "Menü öffnen"}
        className="flex size-11 items-center justify-center rounded-full text-navy hover:bg-sand"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="size-6" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Menü" className="absolute inset-x-0 top-full border-b border-line bg-cream shadow-lg">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 pb-6 pt-2 sm:px-6">
            {[{ href: "/", label: "Startseite" }, ...nav].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block border-b border-line/60 py-3 text-lg font-medium aria-[current=page]:text-sage"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-5">
              <Link href={requestHref} onClick={() => setOpen(false)} className="btn-primary w-full">
                Termin anfragen
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
