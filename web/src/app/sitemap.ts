import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/nav";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/angebot", "/ueber-mich", "/kontakt", "/impressum", "/datenschutz"].map((path) => ({ url: `${siteUrl}${path}` }));
}
