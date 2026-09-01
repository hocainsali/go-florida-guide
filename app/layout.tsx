import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/inter";
import "./globals.css";
import PageMotion from "./components/PageMotion";
import SiteFooter from "./components/SiteFooter";
import SmoothScroll from "./components/SmoothScroll";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3001";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const origin = `${protocol}://${host}`;
  const title = "Go Florida — Find Your Wild Side";
  const description = "Florida's hidden springs, salt-air cities and untold road trips.";
  const socialImage = `${origin}/og.png`;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    icons: {
      icon: [{ url: "/favicon.svg?v=20260821-2", type: "image/svg+xml" }],
      shortcut: "/favicon.svg?v=20260821-2",
    },
    openGraph: { title, description, type: "website", url: origin, images: [{ url: socialImage, width: 1536, height: 1024, alt: "Go Florida — Find Your Wild Side" }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<SmoothScroll /><PageMotion /><SiteFooter /></body>
    </html>
  );
}
