"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function hasScrollableParent(target: EventTarget | null, delta: number) {
  let element = target instanceof HTMLElement ? target : null;
  while (element && element !== document.body) {
    const style = window.getComputedStyle(element);
    const scrollable = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight;
    if (scrollable) {
      const canMoveDown = delta > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 1;
      const canMoveUp = delta < 0 && element.scrollTop > 1;
      if (canMoveDown || canMoveUp) return true;
    }
    element = element.parentElement;
  }
  return false;
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reduced.matches || !finePointer.matches) return;

    let current = window.scrollY;
    let target = current;
    let frame = 0;

    const limit = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      current = window.scrollY;
      target = current;
    };
    const animate = () => {
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.45) current = target;
      window.scrollTo(0, current);
      if (current !== target) frame = window.requestAnimationFrame(animate);
      else frame = 0;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (hasScrollableParent(event.target, event.deltaY)) {
        stop();
        return;
      }
      event.preventDefault();
      const multiplier = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
      if (!frame) current = window.scrollY;
      target = Math.max(0, Math.min(limit(), target + event.deltaY * multiplier));
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const sync = () => {
      if (frame) return;
      current = window.scrollY;
      target = current;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("pointerdown", stop, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("pointerdown", stop);
      stop();
    };
  }, [pathname]);

  return null;
}
