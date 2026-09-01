"use client";
/* eslint-disable @next/next/no-img-element -- reuse the existing Go Florida header assets */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./inner-header.css";

export default function InnerHeader({ activePage = "about" }: { activePage?: "about" | "contact" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSearchOpen(false);
      setMenuOpen(false);
      if (menuOpen) menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

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
        <Link className="brand" href="/" aria-label="Go Florida home">
          <img src="/images/go-florida-logo.svg" alt="Go Florida" width="482" height="223" />
        </Link>
        <nav className="nav-cluster" aria-label="Primary navigation">
          <Link href="/">HOME</Link>
          <Link href="/about" aria-current={activePage === "about" ? "page" : undefined}>ABOUT US</Link>
          <Link href="/#hidden-gems">ALL GUIDES</Link>
          <Link href="/contact" aria-current={activePage === "contact" ? "page" : undefined}>CONTACT</Link>
        </nav>
        <div className="header-utilities">
          <div ref={searchRef} className={`header-search ${searchOpen ? "is-open" : ""}`}>
            <button className="search-link" type="button" aria-label="Open search" onClick={() => setSearchOpen(true)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
              <span>SEARCH</span>
            </button>
            <form className="header-search-form" role="search" inert={!searchOpen} onSubmit={(event) => { event.preventDefault(); window.location.assign("/#hidden-gems"); }}>
              <label className="sr-only" htmlFor="site-search">Search guides</label>
              <input id="site-search" type="search" placeholder="Search guides" />
              <button type="submit" aria-label="Submit search"><img src="/images/search.svg" alt="" aria-hidden="true" /></button>
            </form>
          </div>
          <Link className="trip-button site-cta" href="/#hidden-gems">GOING TO FLORIDA TRIP</Link>
        </div>
        <button className="menu-button" ref={menuButtonRef} type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </header>
      <nav id="mobile-menu" inert={!menuOpen} className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
        <Link href="/" onClick={() => setMenuOpen(false)}>HOME</Link>
        <Link href="/about" aria-current={activePage === "about" ? "page" : undefined} onClick={() => setMenuOpen(false)}>ABOUT US</Link>
        <Link href="/#hidden-gems" onClick={() => setMenuOpen(false)}>ALL GUIDES</Link>
        <Link href="/contact" aria-current={activePage === "contact" ? "page" : undefined} onClick={() => setMenuOpen(false)}>CONTACT</Link>
      </nav>
    </>
  );
}
