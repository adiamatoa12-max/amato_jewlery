import type { MetadataRoute } from "next";

const SITE_URL = "https://vaultshaker.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/shipping", priority: 0.5 },
    { path: "/returns", priority: 0.5 },
    { path: "/privacy", priority: 0.4 },
    { path: "/terms", priority: 0.4 },
    { path: "/sizing", priority: 0.5 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));
}
