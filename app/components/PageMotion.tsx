"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

type RevealMode = "up" | "wipe";

const easing = "cubic-bezier(.2,.75,.2,1)";

export default function PageMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname === "/" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.querySelector<HTMLElement>("main.inner-page");
    if (!root) return;

    const animations: Animation[] = [];
    const touched = new Set<HTMLElement>();
    const observers: IntersectionObserver[] = [];

    const run = (element: HTMLElement, mode: RevealMode, delay = 0, duration = 820) => {
      const from = mode === "wipe"
        ? { opacity: 0, clipPath: "inset(0 6% 0 6%)" }
        : { opacity: 0, transform: "translate3d(0,24px,0)" };
      const to = mode === "wipe"
        ? { opacity: 1, clipPath: "inset(0 0 0 0)" }
        : { opacity: 1, transform: "translate3d(0,0,0)" };
      const animation = element.animate([from, to], { duration, delay, easing, fill: "both" });
      animations.push(animation);
    };

    const revealGroups: Array<{ selector: string; mode: RevealMode }> = pathname === "/about"
      ? [
          { selector: ".about-story-image", mode: "wipe" },
          { selector: ".about-story-content > *", mode: "up" },
          { selector: ".about-follow-image", mode: "wipe" },
          { selector: ".about-follow h2, .about-follow > p, .about-follow-links", mode: "up" },
          { selector: ".about-principle", mode: "up" },
        ]
      : [
          { selector: ".contact-methods-heading > *", mode: "up" },
          { selector: ".contact-method", mode: "up" },
        ];

    revealGroups.forEach(({ selector, mode }) => {
      const elements = [...root.querySelectorAll<HTMLElement>(selector)];
      elements.forEach((element) => {
        touched.add(element);
        element.style.opacity = "0";
        if (mode === "wipe") {
          element.style.clipPath = "inset(0 6% 0 6%)";
        } else {
          element.style.transform = "translate3d(0,24px,0)";
        }
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const index = elements.indexOf(element);
          run(element, mode, Math.min(index, 3) * 80, mode === "wipe" ? 980 : 820);
          observer.unobserve(element);
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

      elements.forEach((element) => observer.observe(element));
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      animations.forEach((animation) => animation.cancel());
      touched.forEach((element) => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
        element.style.removeProperty("clip-path");
      });
    };
  }, [pathname]);

  return null;
}
