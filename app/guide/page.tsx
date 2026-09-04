import type { Metadata } from "next";
import InnerHeader from "../components/InnerHeader";
import GuideListingContent from "./GuideListingContent";
import "./guide.css";

const origin = "https://go-florida.hocainsali.chatgpt.site";
const title = "Florida Guides & Insights for UK Families | Go Florida Guide";
const description = "Practical Florida holiday guides for UK families, covering theme parks, flights, budgets, accommodation, beaches and road trips.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${origin}/guide` },
  openGraph: { title, description, type: "website", url: `${origin}/guide`, images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Go Florida Guide" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
};

export default function GuideListingPage() {
  return (
    <main className="guide-page inner-page" id="top">
      <a className="guide-skip" href="#guide-list">Skip to guides</a>
      <InnerHeader activePage="guide" />
      <GuideListingContent />
    </main>
  );
}
