import type { Metadata } from "next";
import Link from "next/link";
import InnerHeader from "../components/InnerHeader";
import { FeaturedGuideCard, GuideCard, GuideHeader } from "./GuideComponents";
import { guideArticles } from "./data";
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

const categories = ["All guides", "Theme parks", "Planning", "Beaches", "Road trips"];

export default function GuideListingPage() {
  const featured = guideArticles.slice(0, 2);
  const remaining = guideArticles.slice(2);

  return (
    <main className="guide-page inner-page" id="top">
      <a className="guide-skip" href="#guide-list">Skip to guides</a>
      <InnerHeader activePage="guide" />
      <GuideHeader eyebrow="Plan with confidence" description="Straightforward Florida advice made for UK families—from the first booking decision to the days you will remember most." />

      <nav className="guide-filters inner-content" aria-label="Guide categories">
        {categories.map((category, index) => <span className={index === 0 ? "is-active" : ""} key={category}>{category}</span>)}
      </nav>

      <section className="featured-guides inner-content" aria-labelledby="featured-guides-title">
        <div className="guide-section-heading">
          <p className="guide-eyebrow type-eyebrow"><span aria-hidden="true" />Start here</p>
          <h2 className="type-section-title" id="featured-guides-title">Featured Guides</h2>
        </div>
        <div className="featured-guides-grid">
          {featured.map((article) => <FeaturedGuideCard article={article} key={article.slug} />)}
        </div>
      </section>

      <section className="all-guides inner-content" id="guide-list" aria-labelledby="all-guides-title">
        <div className="guide-section-heading guide-section-heading--row">
          <div>
            <p className="guide-eyebrow type-eyebrow"><span aria-hidden="true" />Explore Florida</p>
            <h2 className="type-section-title" id="all-guides-title">Latest Guides</h2>
          </div>
          <p className="type-body">Useful answers for every stage of your Florida holiday.</p>
        </div>
        <div className="guide-grid">
          {remaining.map((article) => <GuideCard article={article} key={article.slug} />)}
        </div>
      </section>

      <section className="guide-newsletter" aria-labelledby="guide-newsletter-title">
        <div className="guide-newsletter-inner inner-content">
          <div>
            <p className="guide-eyebrow type-eyebrow"><span aria-hidden="true" />Weekly Florida notes</p>
            <h2 className="type-section-title" id="guide-newsletter-title">Get practical advice<br />in your inbox.</h2>
          </div>
          <div className="guide-newsletter-action">
            <p className="type-body">Planning tips, honest comparisons and new guides—written for UK families and sent without the fluff.</p>
            <Link className="site-cta" href="#footer-email">JOIN THE NEWSLETTER</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
