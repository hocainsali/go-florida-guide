"use client";
/* eslint-disable @next/next/no-img-element -- preserve the existing footer logo */
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function SiteFooter() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from(".footer-grid > *, .footer-bottom > *", {
        y: 35, opacity: 0, stagger: 0.07,
        scrollTrigger: { trigger: ".footer", start: "top 82%", end: "top 45%", scrub: 1 },
      });
    }, root);
    return () => context.revert();
  }, [pathname]);

  return (
    <div ref={rootRef} className="site-footer-shell">
      {pathname !== "/contact" && <PreFooterCta isHome={pathname === "/"} />}
      <Footer isHome={pathname === "/"} />
    </div>
  );
}

function PreFooterCta({ isHome }: { isHome: boolean }) {
  return (
    <div className={`pre-footer-cta-shell${isHome ? "" : " pre-footer-cta-shell--page"}`}>
      <section className="pre-footer-cta" aria-labelledby="pre-footer-cta-title">
        <div className="pre-footer-cta-content">
          <h2 id="pre-footer-cta-title">Ready to Plan Your<br />Florida Holiday?</h2>
          <p>Get practical, honest advice made for UK families — from flights and theme parks to budgets, packing and where to stay.</p>
          <Link className="site-cta" href={isHome ? "#top" : "/#top"}>Get Your Free Florida Starter Kit</Link>
        </div>
      </section>
    </div>
  );
}

function Footer({ isHome }: { isHome: boolean }) {
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
          <Link href={isHome ? "#top" : "/#top"}>Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/guide">Florida Guides</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-newsletter">
          <h3>NEWSLETTER</h3>
          <p>Join our weekly newsletter for Florida tips and early access to guides.</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="footer-email">Email address</label>
            <input id="footer-email" name="email" type="email" placeholder="Enter your e-mail address" required />
            <button className="site-cta" type="submit">SUBSCRIBE</button>
          </form>
        </div>
        <div className="footer-socials">
          <h3>SOCIALS</h3>
          <div className="social-icons" aria-label="Future social channels">
            <Link className="social-row" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <span className="social-icon social-icon-youtube" aria-hidden="true"><i /></span>
              <span>YouTube</span>
            </Link>
            <Link className="social-row" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <span className="social-icon social-icon-instagram" aria-hidden="true"><i /></span>
              <span>Instagram</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 GO FLORIDA</span>
        <div className="footer-legal" aria-label="Legal information">
          <Link href="/privacy-policy">PRIVACY POLICY</Link>
          <Link href="/terms-and-conditions">TERMS &amp; CONDITIONS</Link>
        </div>
      </div>
    </footer>
  );
}
