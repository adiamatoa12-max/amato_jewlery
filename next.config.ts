import type { NextConfig } from "next";

// Content-Security-Policy — explicitly allowlists only the origins this site
// actually loads: Shopify (checkout/CDN), Google Tag Manager, Meta Pixel,
// and WhatsApp deep links. next/font self-hosts fonts at build time, so no
// external font origin is needed. 'unsafe-inline' is required for Next.js's
// own hydration bootstrap and the GTM/Pixel snippets injected via next/script;
// everything else is locked to 'self' or the specific third-party origin.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.shopify.com https://www.facebook.com https://www.googletagmanager.com",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self' https://*.myshopify.com https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
  "frame-src https://www.googletagmanager.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Applies to every route — pages and API routes alike.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
