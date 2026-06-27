import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllHandles, getCollections } from "@/lib/catalog";

// Refresh the sitemap on the same ISR cadence as the catalog so new
// products/collections appear without a redeploy.
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static, indexable routes. /admin, /thank-you and /api are intentionally
  // excluded (handled in robots + noindex metadata).
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/shipping", priority: 0.5 },
    { path: "/returns", priority: 0.5 },
    { path: "/privacy", priority: 0.4 },
    { path: "/terms", priority: 0.4 },
    { path: "/sizing", priority: 0.5 },
  ];

  // Dynamic product + collection pages from the live catalog (mock fallback).
  const [handles, collections] = await Promise.all([
    getAllHandles().catch(() => [] as string[]),
    getCollections().catch(() => []),
  ]);

  const productRoutes = handles.map((handle) => ({
    url: `${SITE_URL}/product/${encodeURIComponent(handle)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${SITE_URL}/collections/${encodeURIComponent(c.handle)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticEntries = staticRoutes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority,
  }));

  return [...staticEntries, ...productRoutes, ...collectionRoutes];
}
