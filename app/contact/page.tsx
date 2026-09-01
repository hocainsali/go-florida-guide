import type { Metadata } from "next";
import Link from "next/link";
import InnerHeader from "../components/InnerHeader";
import ContactForm from "./ContactForm";
import ContactJourneyCard from "./ContactJourneyCard";
import "./contact.css";

const origin = "https://go-florida.hocainsali.chatgpt.site";
const title = "Contact Us — Go Florida Guide";
const description = "Have a Florida planning question, feedback on a guide or an idea to share? Get in touch with Go Florida Guide, the independent resource for UK families.";

const showcaseImages = [
  { src: "/images/contact-static-shells.webp", alt: "A smiling family collecting shells on a wide Florida Gulf Coast beach" },
  { src: "/images/contact-static-miami-cycles.webp", alt: "A smiling couple cycling past colourful Art Deco buildings in Miami Beach" },
  { src: "/images/contact-static-gulf-family.webp", alt: "A multigenerational family sharing a happy morning on a white-sand Florida beach" },
  { src: "/images/contact-static-everglades.webp", alt: "A family enjoying an airboat adventure together in the Florida Everglades" },
  { src: "/images/contact-static-key-west.webp", alt: "Friends walking beside the Key West waterfront at sunset" },
] as const;

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: `${origin}/contact` },
  openGraph: { title, description, type: "website", url: `${origin}/contact`, images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Go Florida Guide" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
};

/* eslint-disable @next/next/no-img-element -- reuse the site's dimensioned editorial photography */
export default function ContactPage() {
  return (
    <main className="contact-page inner-page" id="top">
      <a className="contact-skip" href="#contact-form">Skip to contact form</a>
      <InnerHeader activePage="contact" />
      <div className="contact-layout inner-content">
        <section className="contact-hero" aria-labelledby="contact-title">
          <p className="contact-plan-pill type-body">PLAN YOUR FLORIDA</p>
          <div className="contact-title-row">
            <h1 className="type-page-title" id="contact-title"><span>Florida Questions,</span><span><em>Answered Honestly.</em></span></h1>
            <p className="contact-lead type-body">Tell us what you’re planning or where you need a little clarity. We’ll point you towards practical, independent Florida advice.</p>
          </div>
        </section>
        <div className="contact-workspace">
          <ContactForm />
          <ContactJourneyCard />
        </div>
        <section className="contact-methods" aria-labelledby="contact-methods-title">
          <div className="contact-methods-heading">
            <p className="type-eyebrow"><span aria-hidden="true" />WAYS TO REACH US</p>
            <h2 className="type-section-title" id="contact-methods-title">Big plans or small questions,<br /><em>we’re here to help.</em></h2>
            <p className="type-body">Choose the way that suits you. You’ll always get a straightforward, human response.</p>
          </div>
          <article className="contact-method">
            <span className="contact-method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7.4 3.5 10 7.9 7.8 10a15 15 0 0 0 6.2 6.2l2.1-2.2 4.4 2.6-.9 3.1c-.3 1-1.2 1.7-2.3 1.7C9.2 20.9 3.1 14.8 2.6 6.7c-.1-1.1.6-2 1.7-2.3l3.1-.9Z" /><path d="M14.5 4.7a7 7 0 0 1 4.8 4.8" /><path d="M14.8 8a3.5 3.5 0 0 1 1.2 1.2" /></svg></span>
            <h2 className="type-card-title">Call Us</h2>
            <p className="type-body">+44 (0)1632 960 000</p>
            <p className="type-body">Planning questions welcome</p>
          </article>
          <article className="contact-method">
            <span className="contact-method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5.5h4" /></svg></span>
            <h2 className="type-card-title">Working Hours</h2>
            <p className="type-body">Monday–Friday: 9am–5pm</p>
            <p className="type-body">UK time</p>
          </article>
          <article className="contact-method">
            <span className="contact-method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4.5 7 7.5 6 7.5-6" /></svg></span>
            <h2 className="type-card-title">Write to Us</h2>
            <p className="type-body">hello@goflorida.example</p>
            <nav className="contact-method-links type-body" aria-label="Helpful links"><Link href="/#hidden-gems">Guides</Link><Link href="/about">About us</Link></nav>
          </article>
        </section>
      </div>
      <section className="contact-showcase inner-content" aria-labelledby="contact-showcase-title">
        <div className="contact-showcase-panel">
          <div className="contact-showcase-cards" role="list" aria-label="Fresh Florida moments">
            {showcaseImages.map((image, index) => (
              <figure className={`contact-showcase-card contact-showcase-card--${index + 1}`} role="listitem" key={image.src}>
                <img src={image.src} alt={image.alt} width="1122" height="1402" loading="lazy" />
              </figure>
            ))}
          </div>
          <div className="contact-showcase-copy">
            <p className="contact-showcase-kicker type-eyebrow">FOLLOW THE SUNSHINE</p>
            <h2 className="type-section-title" id="contact-showcase-title">More Florida. More moments.</h2>
            <p className="type-body">Fresh ideas, practical guides and the places families remember.</p>
            <Link className="contact-showcase-cta site-cta type-body" href="/#hidden-gems">EXPLORE THE GUIDES</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
