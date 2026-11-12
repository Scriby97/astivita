"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/nav";

// Menüpunkte der Kopfzeile; die aktuelle Seite ist hervorgehoben
export function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  return links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={pathname === link.href ? "page" : undefined}
      className="rounded-full px-4 py-2 font-medium text-ink hover:text-navy aria-[current=page]:bg-sage-light aria-[current=page]:text-navy"
    >
      {link.label}
    </Link>
  ));
}
