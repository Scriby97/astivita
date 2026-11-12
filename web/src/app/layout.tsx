import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MaintenanceGate } from "@/components/MaintenanceGate";
import { getSettings, imageUrl } from "@/lib/sanity";
import { siteUrl, underConstruction } from "@/lib/nav";
import "./globals.css";

// next/font speichert die Schriften beim Build auf der Website selbst – keine Verbindung zu Google beim Besuch
const heading = Cormorant_Garamond({ variable: "--font-heading", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Nunito_Sans({ variable: "--font-body", subsets: ["latin"] });


export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = settings.siteName ?? "Astivita";
  // Bild beim Teilen (WhatsApp, Facebook, …): im Aufbau mit Kurkuma-Hinweis, danach aus dem Studio oder das Logo
  const shareImage = underConstruction ? "/og-aufbau.png" : (imageUrl(settings.shareImage, { width: 1200, height: 630 }) ?? "/og.png");
  const shareAlt = underConstruction ? `${siteName} Hundetherapie – neue Website im Aufbau von Kurkuma Communication` : `${siteName} Hundetherapie`;
  return {
    title: { default: `${siteName} Hundetherapie – Physiotherapie für Hunde in Uezwil AG`, template: `%s | ${siteName} Hundetherapie` },
    description: settings.heroText ?? undefined,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: "./" },
    openGraph: { images: [{ url: shareImage, width: 1200, height: 630, alt: shareAlt }], locale: "de_CH", siteName, type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  const siteName = settings.siteName ?? "Astivita";

  const page = (
    <>
      <a href="#inhalt" className="sr-only z-50 rounded-full bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Zum Inhalt springen
      </a>
      <Header siteName={siteName} />
      <main id="inhalt" className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );

  return (
    <html lang="de-CH" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {/* Wartungsmodus aus dem Studio. Google wird bewusst nicht ausgesperrt: die Inhalte stehen weiter im HTML. */}
        {settings.maintenance ? (
          <MaintenanceGate
            siteName={siteName}
            text={settings.maintenanceText || "Hier entsteht die neue Website – bald geht’s los!"}
            password={settings.previewPassword ?? undefined}
          >
            {page}
          </MaintenanceGate>
        ) : (
          page
        )}
      </body>
    </html>
  );
}
