"use client";
/* eslint-disable @next/next/no-img-element -- local, dimensioned assets are animated directly by GSAP */

import "@fontsource-variable/inter";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Destination = {
  name: string;
  location: string;
  note: string;
  image: string;
  position?: string;
};

const destinations: Destination[] = [
  { name: "THEME PARKS", location: "Disney & Universal Strategy", note: "Master the parks without the meltdowns.", image: "/images/theme-park.webp", position: "50% 50%" },
  { name: "BUDGET & PLANNING", location: "Cost Breakdowns & Timelines", note: "What your trip will actually cost.", image: "/images/budget-planning.jpg", position: "50% 50%" },
  { name: "BEYOND THE PARKS", location: "Beaches, Road Trips & Hidden Gems", note: "Discover the real Florida.", image: "/images/beyond-the-parks.jpg", position: "50% 50%" },
  { name: "ACCOMMODATION", location: "Villas vs. Hotels, Area Guides", note: "Find your family’s perfect basecamp.", image: "/images/accommodation.jpg", position: "50% 50%" },
];

const momentImages = [
  { src: "/images/art-deco-palms.jpg", alt: "Pastel Art Deco architecture framed by palms in Miami Beach" },
  { src: "/images/keys-aerial.jpg", alt: "Aerial view over the blue water and islands of the Florida Keys" },
  { src: "/images/silver-springs.jpg", alt: "Sunlit trees reflected in the clear water of a Florida spring" },
  { src: "/images/south-beach-white.jpg", alt: "White Miami Beach architecture under a bright blue sky" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeSearch = (event: PointerEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("pointerdown", closeSearch);
    return () => document.removeEventListener("pointerdown", closeSearch);
  }, []);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Go Florida home">
          <img src="/images/go-florida-logo.svg" alt="Go Florida" width="482" height="223" />
        </a>
        <nav className="nav-cluster" aria-label="Primary navigation">
          <a href="#top">HOME</a>
          <a href="#about">ABOUT US</a>
          <a href="#hidden-gems">ALL GUIDES</a>
          <a href="#footer">CONTACT</a>
        </nav>
        <div className="header-utilities">
          <div ref={searchRef} className={`header-search ${searchOpen ? "is-open" : ""}`}>
            <button className="search-link" type="button" aria-label="Open search" onClick={() => setSearchOpen(true)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
              <span>SEARCH</span>
            </button>
            <form className="header-search-form" role="search" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="site-search">Search guides</label>
              <input id="site-search" type="search" placeholder="Search guides" autoFocus={searchOpen} />
              <button type="submit" aria-label="Submit search"><img src="/images/search.svg" alt="" aria-hidden="true" /></button>
            </form>
          </div>
          <a className="trip-button" href="#hidden-gems">GOING TO FLORIDA TRIP</a>
        </div>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </header>
      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
        <a href="#top" onClick={() => setMenuOpen(false)}>HOME</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT US</a>
        <a href="#hidden-gems" onClick={() => setMenuOpen(false)}>ALL GUIDES</a>
        <a href="#footer" onClick={() => setMenuOpen(false)}>CONTACT</a>
      </nav>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-stage">
        <video className="hero-background hero-background-primary" autoPlay muted loop playsInline preload="metadata" poster="/images/go-florida-hero-poster.webp?v=20260824" aria-hidden="true">
          <source src="/videos/go-florida-hero.webm?v=20260824" type="video/webm" />
          <source src="/videos/go-florida-hero.mp4?v=20260824" type="video/mp4" />
        </video>
        <Header />
        <div className="hero-content">
          <article className="hero-slide hero-slide-1">
            <h1 className="hero-title" id="hero-title"><span>Plan the Ultimate Florida Family Holiday,</span><span>Without the Stress.</span></h1>
            <div className="hero-copy-block">
              <p>The UK’s most trusted independent guide to the Sunshine State. Skip the overwhelm, avoid the tourist traps, and build a trip your family will remember forever.</p>
              <a className="primary-button hero-primary-button" href="#hidden-gems">GRAB YOUR FREE FLORIDA STARTER KIT</a>
            </div>
          </article>
        </div>
          <a className="hero-story" href="#moments">
            <img src="/images/beat-florida-heat-young-kids.png" alt="Young children enjoying a sunny playground" width="1536" height="1024" />
            <span>
              <small className="hero-story-label">FEATURED GUIDE</small>
              <b>Beat the Florida Heat<br />with Young Kids</b>
              <u>READ THE GUIDE</u>
              <small className="hero-story-meta">FAMILY TRAVEL • 5 MIN READ</small>
            </span>
          </a>
      </div>
    </section>
  );
}

function DestinationTrack() {
  return (
    <div className="destination-viewport" aria-label="Florida planning guides">
      <div className="destination-track">
        {destinations.map((destination) => (
          <a className="destination-card" href="#footer" key={destination.name} draggable={false}>
            <img src={destination.image} alt={`${destination.name}, ${destination.location}`} width="1600" height="1200" loading="lazy" draggable={false} style={{ objectPosition: destination.position }} />
            <span className="destination-shade" />
            <strong>{destination.name}</strong>
            <span className="destination-meta"><b>{destination.location}</b><small>{destination.note}</small></span>
          </a>
        ))}
      </div>
    </div>
  );
}

function HiddenGems() {
  return (
    <section className="hidden-gems" id="hidden-gems" aria-labelledby="gems-title">
      <div className="gems-sticky">
        <div className="gems-intro">
          <h2 id="gems-title"><span>Everything You Need</span><span>to Plan Florida Right</span></h2>
          <p>
            Explore expert guides on theme parks, budgeting, accommodation, beaches,
            road trips, and hidden gems — so you can plan the perfect Florida family
            holiday with confidence.
          </p>
        </div>
        <DestinationTrack />
      </div>
    </section>
  );
}

function Moments() {
  return (
    <section className="moments" id="moments" aria-labelledby="moments-title">
      <div className="moments-heading"><h2 id="moments-title">Moments to Share</h2></div>
      <div className="moments-grid">
        {momentImages.map((image, index) => (
          <figure className={`moment-card moment-${index + 1}`} key={image.src}>
            <img src={image.src} alt={image.alt} width="1600" height="1600" loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function DownloadGuide() {
  return (
    <section className="download-guide" id="resources" aria-labelledby="download-guide-title">
      <div className="download-guide-copy">
            <h2 id="download-guide-title">Honest<br /><em>Florida</em> Advice,<br />Designed for<br />UK Families.</h2>

        <article className="download-guide-sample">
          <video autoPlay muted loop playsInline preload="metadata" poster="/images/honest-florida-advice-left.png" aria-label="Find your Florida guide">
            <source src="/videos/find-guide.mp4" type="video/mp4" />
          </video>
              <p>YOUR INDEPENDENT FLORIDA GUIDE<br />[HONEST. PRACTICAL. NO FLUFF.]</p>
        </article>

        <div className="download-guide-action">
              <p>Planning a Florida holiday can feel overwhelming. We simplify theme parks, accommodation, budgets and everything in between with clear, practical advice from people who know Florida inside out.</p>
              <a href="#top">START PLANNING YOUR FLORIDA HOLIDAY</a>
        </div>
      </div>

      <figure className="download-guide-feature">
        <img src="/images/honest-florida-advice-right.jpg" alt="Cyclist riding beneath palm trees in Florida" width="1920" height="1280" />
      </figure>
    </section>
  );
}

const floridaExperts = [
  { name: "Beat the Florida Heat", image: "/images/featured-beat-florida-heat.png", position: "center", href: "#hidden-gems" },
  { name: "Book Flights from the UK", image: "/images/featured-book-flights-uk.png", position: "center", href: "#resources" },
  { name: "Theme Park Day Packing List", image: "/images/featured-theme-park-packing.png", position: "center", href: "#hidden-gems" },
  { name: "Plan Your Florida Budget", image: "/images/featured-plan-florida-budget.jpg", position: "center", href: "#resources" },
];

function FloridaExperts() {
  return (
    <section className="florida-experts" id="about" aria-labelledby="florida-experts-title">
      <div className="experts-portraits">
        {floridaExperts.map((expert) => (
          <a className="expert-card" href={expert.href} key={expert.name}>
                  <div
                    className="expert-card-image"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0, 12, 14, 0.78), transparent 45%), url("${expert.image}")`,
                      backgroundPosition: expert.position,
                    }}
                    aria-hidden="true"
                  />
            <div className="expert-card-copy">
              <strong>{expert.name}</strong>
            </div>
          </a>
        ))}
      </div>

      <div className="experts-story">
        <div className="experts-intro">
          <p className="experts-kicker"><span aria-hidden="true">✣</span> FEATURED GUIDES &amp; FAMILY TRAVEL TIPS</p>
          <h2 id="florida-experts-title">Start with the essential Florida guides every family needs for a smoother, smarter and stress-free holiday</h2>
        </div>
        <article className="experts-note experts-note-left">
          <span className="experts-plus" aria-hidden="true">＋</span>
          <div>
            <h3>Plan Smarter, Travel Better</h3>
            <p>Practical Florida tips to help UK families plan smarter and travel with confidence.</p>
          </div>
        </article>
        <article className="experts-note experts-note-right">
          <span className="experts-plus" aria-hidden="true">＋</span>
          <p>From flights to theme parks, our guides make planning your Florida holiday simpler and less stressful.</p>
        </article>
      </div>
    </section>
  );
}

function PlanningGuideCta() {
  return (
    <section className="planning-guide-cta" aria-labelledby="planning-guide-title">
      <img
        src="/images/florida-guides-expanded.jpg"
        alt="Complete Florida travel guide collection"
        width="3072"
        height="2048"
        loading="lazy"
      />
      <h2 id="planning-guide-title">Plan Your Florida Holiday with Confidence</h2>
      <p>Get the essential guide for building a smoother, smarter and stress-free family trip from start to finish.</p>
      <a href="#top">GET THE FLORIDA TRIP PLANNING GUIDE</a>
    </section>
  );
}

function PreFooterCta() {
  return (
    <div className="pre-footer-cta-shell">
      <section className="pre-footer-cta" aria-labelledby="pre-footer-cta-title">
        <div className="pre-footer-cta-content">
          <h2 id="pre-footer-cta-title">Ready to Plan Your<br />Florida Holiday?</h2>
          <p>Get practical, honest advice made for UK families — from flights and theme parks to budgets, packing and where to stay.</p>
          <a href="#top">Get Your Free Florida Starter Kit</a>
        </div>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-grid">
        <div className="footer-logo">
          <img
            src="/images/footer-go-florida-logo.svg"
            alt="Go Florida Guide"
            width="482"
            height="223"
          />
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          <h3>NAVIGATION</h3>
          <a href="#top">Home</a>
          <a href="#about">About Us</a>
          <a href="#hidden-gems">All Guides</a>
          <a href="#footer">Contact</a>
        </nav>
        <div className="footer-newsletter">
          <h3>NEWSLETTER</h3>
          <p>Join our weekly newsletter for Florida tips and early access to guides.</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="footer-email">Email address</label>
            <input id="footer-email" name="email" type="email" placeholder="Enter your e-mail address" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
        <div className="footer-socials">
          <h3>SOCIALS</h3>
          <div className="social-icons" aria-label="Future social channels">
            <a className="social-row" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <span className="social-icon social-icon-youtube" aria-hidden="true"><i /></span>
              <span>YouTube</span>
            </a>
            <a className="social-row" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <span className="social-icon social-icon-instagram" aria-hidden="true"><i /></span>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 GO FLORIDA</span>
        <div className="footer-legal" aria-label="Legal information">
          <a href="/privacy-policy">PRIVACY POLICY</a>
          <a href="/terms-and-conditions">TERMS &amp; CONDITIONS</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const context = gsap.context(() => {
      const load = gsap.timeline({ defaults: { ease: "power3.out" } });
      load.from(".brand", { y: -32, duration: 0.75 }, 0.15)
        .from(".nav-cluster, .header-utilities", { y: -32, opacity: 0, duration: 0.75, stagger: 0.06 }, 0.19)
        .from(".hero-slide-1 .hero-title span", { yPercent: 115, duration: 1.05, stagger: 0.1 }, 0.3)
        .from(".hero-slide-1 .hero-copy-block", { y: 28, opacity: 0, duration: 0.8 }, 0.7);

      gsap.fromTo(".hero-background", { yPercent: -1.5 }, { yPercent: 1.5, ease: "none", immediateRender: true, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 } });
      gsap.fromTo(".site-header", { opacity: 1, y: 0 }, { opacity: 0, y: -28, immediateRender: false, scrollTrigger: { trigger: ".hero", start: "8% top", end: "28% top", scrub: 0.8 } });
      gsap.fromTo(".hero-story", { opacity: 1, y: 0, pointerEvents: "auto" }, { opacity: 0, y: 28, pointerEvents: "none", immediateRender: false, scrollTrigger: { trigger: ".hero", start: "8% top", end: "28% top", scrub: 0.8 } });


      gsap.from(".moments-heading h2", { y: 100, opacity: 0, scrollTrigger: { trigger: ".moments", start: "top 75%", end: "top 35%", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>(".moment-card").forEach((card) => {
        const image = card.querySelector("img");
        if (!image) return;
        gsap.fromTo(image, { scale: 1.045 }, { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.from(".download-guide-copy > *, .download-guide-feature", {
        y: 42,
        opacity: 0,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".download-guide", start: "top 82%", end: "top 42%", scrub: 1 },
      });
      gsap.from(".expert-card, .experts-intro > *, .experts-note", {
        y: 46,
        opacity: 0,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".florida-experts", start: "top 82%", end: "top 42%", scrub: 1 },
      });
      gsap.fromTo(
        ".download-guide-feature img",
        { yPercent: -4, scale: 1.08 },
        {
          yPercent: 4,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".download-guide",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
      gsap.from(".footer-grid > *, .footer-bottom > *", { y: 35, opacity: 0, stagger: 0.07, scrollTrigger: { trigger: ".footer", start: "top 82%", end: "top 45%", scrub: 1 } });

      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef}>
      <DataCapturePopup />
      <Hero />
      <HiddenGems />
      <DownloadGuide />
      <FloridaExperts />
      <PlanningGuideCta />
      <PreFooterCta />
      <Footer />
    </main>
  );
}

function DataCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const hasOpened = useRef(false);

  const closePopup = () => {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => setIsOpen(false), 320);
  };

  useEffect(() => {
    const openPopup = () => {
      if (hasOpened.current) return;
      hasOpened.current = true;
      setIsOpen(true);
    };

    const timer = window.setTimeout(openPopup, 1200);
    const handleExitIntent = (event: MouseEvent) => {
      if (event.clientY <= 0) openPopup();
    };

    document.addEventListener("mouseout", handleExitIntent);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`capture-popup-backdrop ${isClosing ? "is-closing" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <section
        className="capture-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="capture-popup-title"
        aria-describedby="capture-popup-description"
      >
        <button
          className="capture-popup-close"
          type="button"
          aria-label="Close popup"
          onClick={closePopup}
        >
          ×
        </button>
        <img
          className="capture-popup-image"
          src="/images/florida-popup-family-beach.jpg"
          alt="Family walking along a sunny Florida beach path"
          width="2250"
          height="950"
        />
        <p className="capture-popup-kicker">FREE FLORIDA TRIP CHECKLIST</p>
        <h2 id="capture-popup-title">Don&apos;t Fly to Florida Without This.</h2>
        <p id="capture-popup-description">
          Planning a Florida holiday from the UK is a massive task. We&apos;ve broken it down for you.
          Enter your email to get our free Ultimate Florida Trip Checklist—covering everything you need
          to book, pack, and prepare, exactly when you need to do it.
        </p>

        {submitted ? (
          <div className="capture-popup-success" role="status">
            Thank you — your checklist request has been received.
          </div>
        ) : (
          <form
            className="capture-popup-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="capture-popup-field">
              <label htmlFor="checklist-first-name">First Name</label>
              <input
                id="checklist-first-name"
                name="firstName"
                autoComplete="given-name"
                required
                autoFocus
              />
            </div>
            <div className="capture-popup-field">
              <label htmlFor="checklist-email">Email Address</label>
              <input
                id="checklist-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <button className="capture-popup-submit" type="submit">
              Send Me the Checklist
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
