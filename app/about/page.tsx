import type { Metadata } from "next";
import AboutHeader from "./AboutHeader";
import "./about.css";

const origin = "https://go-florida.hocainsali.chatgpt.site";
const title = "About Go Florida Guide — Honest Advice for UK Families";
const description = "Honest, independent Florida holiday advice for UK families. Practical guides, realistic budgets and a simpler way to plan your family trip.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${origin}/about` },
  openGraph: {
    title, description, type: "website", url: `${origin}/about`,
    images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Go Florida Guide" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
};

const principles = [
  { number: "01", title: "Honest & independent", image: "/images/about-honest-independent.webp", alt: "A family researching their Florida holiday together around the kitchen table", fit: "cover", width: 1672, height: 941, copy: "Straightforward advice you can trust, with no fluff and your family’s holiday at the heart of it." },
  { number: "02", title: "Practical at every step", image: "/images/about-practical-planning.webp", alt: "Parents and children packing practical holiday essentials together", fit: "cover", width: 1672, height: 941, copy: "Realistic budget breakdowns, clear planning guides and actionable tips that make a difference." },
  { number: "03", title: "Made for UK families", image: "/images/about-uk-family-road-trip.webp", alt: "A family enjoying a colourful Florida coastal road-trip stop", fit: "cover", width: 1774, height: 887, copy: "From theme park days with young children to coastal gems and road trips beyond Orlando." },
];

/* eslint-disable @next/next/no-img-element -- preserve the site's local editorial image treatment */
export default function AboutPage() {
  return (
    <main className="about-page inner-page" id="top">
      <a className="about-skip" href="#about-intro">Skip to content</a>
      <AboutHeader />

      <section className="about-intro inner-content" id="about-intro" aria-labelledby="about-title">
        <div className="about-intro-heading">
          <p className="about-eyebrow type-eyebrow"><span aria-hidden="true" />About Go Florida Guide</p>
          <h1 className="type-page-title" id="about-title"><span>Honest, Independent</span><span>Advice for <em>UK Families.</em></span></h1>
        </div>
        <div className="about-intro-copy">
          <p className="type-body">Planning a family holiday to Florida from the UK is a major investment of time and resources. Between deciphering theme park ticket tiers, selecting the right accommodation, and managing a family budget, the process easily becomes overwhelming. Go Florida Guide was built to simplify this experience and remove the stress from holiday planning.</p>
        </div>
      </section>

      <figure className="about-hero-image" hidden>
        <img src="/images/florida-popup-family-beach.webp" alt="A family following a palm-lined sandy path to a Florida beach" width="1500" height="540" fetchPriority="high" />
        <figcaption><span>Less planning stress.</span><span>More moments like this.</span></figcaption>
      </figure>

      <section className="about-story inner-content" aria-labelledby="about-story-title">
        <div className="about-story-image">
          <div className="about-story-journal">
            <div className="about-story-photo">
              <img src="/images/about-family-planning.webp" alt="Parents and two children planning their Florida day with a map beside a sunny coastal boardwalk" width="1122" height="1402" loading="lazy" />
              <p className="about-story-photo-caption type-body">Your family comes first.<span aria-hidden="true">✳</span></p>
            </div>
            <div className="about-story-stamp type-body" aria-hidden="true"><span>FAMILY</span><strong>FIRST</strong></div>
            <div className="about-story-ticket">
              <div className="about-story-ticket-main">
                <div className="about-story-route type-body"><span>UK</span><span className="about-story-route-line" aria-hidden="true">→</span><span>FLORIDA</span></div>
                <p className="type-card-title">More memories.<br />Less guesswork.</p>
              </div>
              <div className="about-story-ticket-stub type-body" aria-hidden="true"><span>GO<br />MAKE<br />MEMORIES</span><span>↗</span></div>
            </div>
          </div>
        </div>
        <div className="about-story-content">
          <p className="about-eyebrow type-eyebrow"><span aria-hidden="true" />Our purpose</p>
          <h2 className="type-section-title" id="about-story-title">Built on <em>Trust.</em><br />Made for Families.</h2>
          <div className="about-story-copy">
            <div className="about-story-point">
              <h3 className="type-body">Independent by nature</h3>
              <p className="type-body">The platform serves as an independent, fluff-free resource dedicated entirely to UK families navigating the <span className="keep-together">Sunshine State.</span></p>
            </div>
            <div className="about-story-point">
              <h3 className="type-body">Practical from the start</h3>
              <p className="type-body">The primary goal is to provide practical, reliable information—from surviving the theme park heat with young children to discovering hidden coastal gems and road trips <span className="keep-together">beyond Orlando.</span></p>
            </div>
            <div className="about-story-point">
              <h3 className="type-body">Confidence at every step</h3>
              <p className="type-body">Trust and authenticity form the core of the brand. Visitors will find straightforward guides, realistic budget breakdowns, and actionable tips designed to ensure every holiday is memorable, well-planned, <span className="keep-together">and stress-free.</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-follow" aria-labelledby="about-follow-title">
        <img className="about-follow-image" src="/images/florida-guides-expanded.webp" alt="Florida travel guides covering trip planning, flights, food, theme parks and budgets" width="3070" height="1804" loading="lazy" />
        <h2 className="type-section-title" id="about-follow-title">Ready to explore Florida with confidence?</h2>
        <p className="type-body">Follow us on:</p>
        <nav className="about-follow-links" aria-label="Follow Go Florida Guide">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" title="Instagram">
            <span className="social-icon social-icon-instagram" aria-hidden="true"><i /></span>
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube (opens in a new tab)" title="YouTube">
            <span className="social-icon social-icon-youtube" aria-hidden="true"><i /></span>
          </a>
        </nav>
      </section>

      <section className="about-principles-section" aria-label="What Go Florida Guide stands for">
        <div className="about-principles inner-content">
        {principles.map((principle) => (
          <article className="about-principle" key={principle.number}>
            <div className="about-principle-copy">
              <h2 className="type-card-title">{principle.title}</h2>
              <p className="type-body">{principle.copy}</p>
            </div>
            <div className={`about-principle-image about-principle-image--${principle.fit}`}>
              <img src={principle.image} alt={principle.alt} width={principle.width} height={principle.height} loading="lazy" />
              <span className="about-principle-number" aria-hidden="true">{principle.number}</span>
            </div>
          </article>
        ))}
        </div>
      </section>
    </main>
  );
}
