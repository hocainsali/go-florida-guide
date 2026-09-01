"use client";

/* eslint-disable @next/next/no-img-element -- layered editorial slides need native image positioning */

import { useEffect, useState } from "react";

const stories = [
  {
    image: "/images/contact-springs-kayak.webp",
    alt: "A family paddling through bright turquoise water in a Florida spring",
    label: "SPRING DAYS",
    quote: "Go Florida Guide turned our scattered ideas into a trip the whole family could enjoy.",
    note: "PRACTICAL PLANNING",
  },
  {
    image: "/images/contact-fan-keys.webp",
    alt: "A boat travelling between turquoise mangrove islands in the Florida Keys",
    label: "THE KEYS",
    quote: "Go Florida Guide helped us look beyond Orlando and find the Florida we really wanted.",
    note: "BEYOND ORLANDO",
  },
  {
    image: "/images/contact-fan-sunset.webp",
    alt: "A fully dressed family enjoying a colourful sunset picnic on Florida's Gulf Coast",
    label: "GULF COAST",
    quote: "The honest advice from Go Florida Guide made every beach day feel wonderfully easy.",
    note: "BEACH DAYS",
  },
  {
    image: "/images/florida-popup-family-beach.webp",
    alt: "A fully dressed family walking together towards a bright Florida beach",
    label: "BEACH MORNING",
    quote: "Go Florida Guide told us what to book, what to pack and what was worth skipping.",
    note: "FIRST-TIME FLORIDA",
  },
  {
    image: "/images/beyond-the-parks.webp",
    alt: "A scenic coastal Florida road curving beside a bright blue beach",
    label: "COASTAL ROAD",
    quote: "Go Florida Guide gave us a route that felt exciting, realistic and completely ours.",
    note: "ROAD TRIPS",
  },
  {
    image: "/images/about-family-planning.webp",
    alt: "A casually dressed family planning their Florida route together by the beach",
    label: "PLAN TOGETHER",
    quote: "Clear budgets, useful tips and less guesswork—Go Florida Guide made planning simple.",
    note: "BUDGETS & ROUTES",
  },
];

export default function ContactJourneyCard() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % stories.length), 5600);
    return () => window.clearInterval(timer);
  }, [paused]);

  const story = stories[active];

  return (
    <figure className="contact-journey-card" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="contact-journey-slides">
        {stories.map((item, index) => (
          <img className={index === active ? "is-active" : ""} src={item.image} alt={index === active ? item.alt : ""} width="1122" height="1402" aria-hidden={index !== active} key={item.image} />
        ))}
      </div>
      <figcaption className="type-body">
        <span className="contact-journey-label">{story.label}</span>
        <div className="contact-journey-copy" key={story.image}>
          <svg className="contact-journey-quote-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 6.5H6.8c.4-1.3 1.4-2.2 3-3L8.2 1.2C4.2 3 2.5 5.8 2.5 10v7h8v-7h-4c0-1.8 1.2-3 4-3.5Zm11 0h-3.7c.4-1.3 1.4-2.2 3-3l-1.6-2.3c-4 1.8-5.7 4.6-5.7 8.8v7h8v-7h-4c0-1.8 1.2-3 4-3.5Z" /></svg>
          <blockquote>
            <p>{story.quote}</p>
            <footer>GO FLORIDA GUIDE · {story.note}</footer>
          </blockquote>
        </div>
      </figcaption>
      <div className="contact-journey-progress" aria-hidden="true"><span key={active} /></div>
    </figure>
  );
}
