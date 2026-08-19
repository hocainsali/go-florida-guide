"use client";
/* eslint-disable @next/next/no-img-element -- local, dimensioned assets are animated directly by GSAP */

import "@fontsource-variable/oswald";
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
  { name: "SILVER SPRINGS", location: "Ocala, Florida", note: "WILD WATER", image: "/images/silver-springs.jpg", position: "50% 44%" },
  { name: "SOUTH BEACH", location: "Miami, Florida", note: "AFTER DARK", image: "/images/ocean-drive-night.jpg", position: "50% 48%" },
  { name: "EVERGLADES", location: "South Florida", note: "RIVER OF GRASS", image: "/images/everglades-kayak.jpg" },
  { name: "CRYSTAL RIVER", location: "Citrus County, Florida", note: "SPRING FED", image: "/images/crystal-river.jpg", position: "50% 58%" },
  { name: "FLORIDA KEYS", location: "Monroe County, Florida", note: "OPEN ROAD", image: "/images/keys-aerial.jpg" },
  { name: "OCEAN DRIVE", location: "Miami Beach, Florida", note: "DECO ICON", image: "/images/carlyle-miami.jpg" },
  { name: "WILD FLORIDA", location: "Gulf Coast, Florida", note: "OFF THE MAP", image: "/images/wild-florida.jpg" },
];

const momentImages = [
  { src: "/images/art-deco-palms.jpg", alt: "Pastel Art Deco architecture framed by palms in Miami Beach" },
  { src: "/images/keys-aerial.jpg", alt: "Aerial view over the blue water and islands of the Florida Keys" },
  { src: "/images/silver-springs.jpg", alt: "Sunlit trees reflected in the clear water of a Florida spring" },
  { src: "/images/south-beach-white.jpg", alt: "White Miami Beach architecture under a bright blue sky" },
];

function TravelSwitch() {
  return (
    <div className="travel-switch" aria-label="Flight and stay tools">
      <span className="plane-icon" aria-hidden="true">✈</span>
      <i />
      <span className="hotel-icon" aria-hidden="true">▦</span>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Go Florida home">
          <span>GO</span>
          <span>FLORIDA</span>
        </a>
        <nav className="nav-cluster" aria-label="Primary navigation">
          <div>
            <a href="#top">HOME</a>
            <a href="#hidden-gems">PLACES</a>
            <a href="#moments">MOMENTS</a>
          </div>
          <div>
            <a href="#hidden-gems">DESTINATIONS</a>
            <a href="#footer">PLAN A TRIP</a>
            <a href="#footer">CONTACT</a>
          </div>
        </nav>
        <div className="header-utilities">
          <div className="languages"><span>ESPAÑOL</span><span>ENGLISH</span></div>
          <a className="search-link" href="#hidden-gems"><i aria-hidden="true" /> SEARCH</a>
          <div className="account-links"><a href="#footer">LOGIN</a><a href="#footer">REGISTER</a></div>
        </div>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </header>
      <TravelSwitch />
      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
        <a href="#top" onClick={() => setMenuOpen(false)}>HOME</a>
        <a href="#hidden-gems" onClick={() => setMenuOpen(false)}>DESTINATIONS</a>
        <a href="#moments" onClick={() => setMenuOpen(false)}>MOMENTS</a>
        <a href="#footer" onClick={() => setMenuOpen(false)}>CONTACT</a>
      </nav>
    </>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      hero.style.setProperty("--mouse-x", `${x}px`);
      hero.style.setProperty("--mouse-y", `${y}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={heroRef} className="hero" id="top" aria-labelledby="hero-title">
      <img className="hero-background" src="/images/hero-south-beach.jpg" alt="Miami Beach meeting the Atlantic under a wide blue sky" width="2000" height="1333" fetchPriority="high" />
      <div className="hero-color" aria-hidden="true" />
      <Header />
      <div className="hero-content">
        <h1 id="hero-title"><span>Step Into Florida’s</span><span>Wild Side</span></h1>
        <div className="hero-copy-block">
          <p>
            Salt-air mornings, hidden springs and roads that fade into the palms.
            Go Florida uncovers the state beyond the obvious—made for curious
            travelers and stories worth bringing home.
          </p>
          <a className="primary-button" href="#hidden-gems">EXPLORE NOW</a>
        </div>
      </div>
      <div className="sun-door" aria-hidden="true">
        <div className="door-panel"><b /></div>
        <div className="water-reflection" />
      </div>
      <span className="cursor-orbit hero-orbit" aria-hidden="true"><i /></span>
      <a className="hero-story" href="#moments">
        <img src="/images/south-beach-white.jpg" alt="White Art Deco architecture in Miami Beach" width="1600" height="1070" />
        <span><b>7 ROADS WORTH<br />GETTING LOST ON</b><u>READ THE STORY</u><small>FIELD NOTES<br />AUGUST 19, 2026</small></span>
      </a>
    </section>
  );
}

function DestinationTrack() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, min: 0, start: 0, origin: 0, last: 0, lastTime: 0, velocity: 0, dragging: false, moved: false, raf: 0 });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const dragState = state.current;
    if (!viewport || !track) return;
    const apply = () => { track.style.transform = `translate3d(${state.current.x}px,0,0)`; };
    const measure = () => {
      state.current.min = Math.min(0, viewport.clientWidth - track.scrollWidth - 32);
      state.current.x = Math.max(state.current.min, Math.min(0, state.current.x));
      apply();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    measure();
    return () => { observer.disconnect(); cancelAnimationFrame(dragState.raf); };
  }, []);

  const apply = () => {
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${state.current.x}px,0,0)`;
  };

  const settle = () => {
    const current = state.current;
    current.velocity *= 0.92;
    current.x += current.velocity;
    if (current.x > 0 || current.x < current.min) {
      const boundary = current.x > 0 ? 0 : current.min;
      current.x += (boundary - current.x) * 0.16;
      current.velocity *= 0.68;
    }
    apply();
    if (Math.abs(current.velocity) > 0.12 || current.x > 0.2 || current.x < current.min - 0.2) {
      current.raf = requestAnimationFrame(settle);
    } else {
      current.x = Math.max(current.min, Math.min(0, current.x));
      apply();
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const current = state.current;
    cancelAnimationFrame(current.raf);
    current.dragging = true;
    current.moved = false;
    current.start = event.clientX;
    current.origin = current.x;
    current.last = event.clientX;
    current.lastTime = performance.now();
    current.velocity = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const current = state.current;
    if (!current.dragging) return;
    const delta = event.clientX - current.start;
    let next = current.origin + delta;
    if (next > 0) next *= 0.24;
    if (next < current.min) next = current.min + (next - current.min) * 0.24;
    const now = performance.now();
    current.velocity = Math.max(-32, Math.min(32, (event.clientX - current.last) / Math.max(8, now - current.lastTime) * 11));
    current.last = event.clientX;
    current.lastTime = now;
    current.x = next;
    current.moved = current.moved || Math.abs(delta) > 6;
    apply();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const current = state.current;
    if (!current.dragging) return;
    current.dragging = false;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    current.raf = requestAnimationFrame(settle);
  };

  const shift = (amount: number) => {
    cancelAnimationFrame(state.current.raf);
    state.current.x = Math.max(state.current.min, Math.min(0, state.current.x + amount));
    gsap.to(trackRef.current, { x: state.current.x, duration: 0.65, ease: "power3.out", overwrite: true });
  };

  return (
    <div
      ref={viewportRef}
      className="destination-viewport"
      role="button"
      aria-label="Florida destinations. Drag or use arrow keys to explore."
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); shift(-160); }
        if (event.key === "ArrowLeft") { event.preventDefault(); shift(160); }
      }}
      onWheel={(event) => {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) {
          event.preventDefault();
          shift(-(event.deltaX || event.deltaY));
        }
      }}
      onClickCapture={(event) => { if (state.current.moved) event.preventDefault(); }}
    >
      <div ref={trackRef} className="destination-track">
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
          <p>
            Trade the obvious for tannin-dark rivers, limestone springs and islands
            where the road simply stops. These are Florida places that keep their
            magic just out of plain sight.
          </p>
          <h2 id="gems-title">Hidden Florida Places That Defy Imagination</h2>
          <div className="drag-cue"><span className="drag-ring"><i /></span><b>DRAG TO NAVIGATE</b></div>
        </div>
        <DestinationTrack />
      </div>
    </section>
  );
}

function Moments() {
  return (
    <section className="moments" id="moments" aria-labelledby="moments-title">
      <div className="moments-heading"><h2 id="moments-title">Moments to Share</h2><span className="cursor-orbit moments-orbit" aria-hidden="true"><i /></span></div>
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

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-grid">
        <div><h3>DISCOVER</h3><a href="#top">Home</a><a href="#hidden-gems">Places</a><a href="#moments">Moments</a></div>
        <div><h3>TRAVEL</h3><a href="#hidden-gems">Destinations</a><a href="#footer">Plan a trip</a><a href="#footer">Contact</a></div>
        <div><h3>LANGUAGES</h3><a href="#top">English</a><a href="#top">Español</a></div>
        <div><h3>SOCIALS</h3><a href="#footer">Pinterest</a><a href="#footer">Instagram</a><a href="#footer">YouTube</a><a href="#footer">TikTok</a></div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 GO FLORIDA</span>
        <div><a href="#footer">PRIVACY</a><a href="#footer">COOKIES</a><a href="#footer">IMPRINT</a></div>
        <span>MADE FOR THE SUNSHINE STATE</span>
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
      load.from(".hero-background", { scale: 1.12, duration: 1.8 })
        .from(".site-header > *, .travel-switch", { y: -32, opacity: 0, duration: 0.75, stagger: 0.06 }, 0.15)
        .from(".hero h1 span", { yPercent: 115, duration: 1.05, stagger: 0.1 }, 0.3)
        .from(".hero-copy-block, .hero-story", { y: 28, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.7)
        .from(".sun-door", { y: 90, opacity: 0, duration: 1.2 }, 0.48);

      gsap.to(".hero-background", { yPercent: 9, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".sun-door", { y: 130, scale: 0.96, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".site-header", { opacity: 0, y: -28, scrollTrigger: { trigger: ".hero", start: "8% top", end: "28% top", scrub: true } });

      gsap.from(".gems-intro > *", { y: 90, opacity: 0, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".hidden-gems", start: "top 74%", end: "top 22%", scrub: 1 } });
      gsap.from(".destination-card", { yPercent: 18, opacity: 0, stagger: 0.08, scrollTrigger: { trigger: ".destination-viewport", start: "top 92%", end: "top 58%", scrub: 1 } });

      gsap.from(".moments-heading h2", { y: 100, opacity: 0, scrollTrigger: { trigger: ".moments", start: "top 75%", end: "top 35%", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>(".moment-card").forEach((card, index) => {
        gsap.fromTo(card, { clipPath: "inset(18% 0 0 0)", y: 80 + index * 18 }, { clipPath: "inset(0% 0 0 0)", y: index % 2 ? -28 : 0, ease: "none", scrollTrigger: { trigger: card, start: "top 95%", end: "bottom 15%", scrub: true } });
      });
      gsap.from(".footer-grid > div, .footer-bottom > *", { y: 35, opacity: 0, stagger: 0.07, scrollTrigger: { trigger: ".footer", start: "top 82%", end: "top 45%", scrub: 1 } });

      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef}>
      <Hero />
      <HiddenGems />
      <Moments />
      <Footer />
    </main>
  );
}
