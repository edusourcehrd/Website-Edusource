import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: SITE_CONFIG.themeColor,
    icons: [
      {
        src: "/edusource-mini-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/edusource-mini-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
