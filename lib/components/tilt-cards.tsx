"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 3D hover-tilt for cards — ports the "On the job" bento feel from the AAS site.
 *
 * Pure DOM, no state, no library: on mousemove over a target card it applies a
 * subtle perspective rotateX/rotateY toward the cursor plus a small lift; on
 * mouseleave it springs back. Renders nothing — it wires listeners to the
 * server-rendered card markup after hydration, so the cards stay in Server
 * Components with zero markup change.
 *
 * Safe by construction: skips under prefers-reduced-motion and only binds on
 * real hover / fine-pointer devices (touch is left completely untouched).
 * Re-runs on route change and cleans up its own listeners each time.
 *
 * The default selector covers every interior card set; the homepage mounts a
 * second instance with its own selector (its cards live outside this layout).
 */
const DEFAULT_SELECTOR = [
  ".pi-card", // /products catalog cards
  ".aa-card", // /industries (and /application-areas) index cards
  ".apx-feat", // /applications featured "most requested" bento
  ".apx-area", // /applications "browse by equipment area" cards
  ".apx-allcard", // /applications full application list
].join(",");

export default function TiltCards({ selector = DEFAULT_SELECTOR }: { selector?: string }) {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !canHover) return;

    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>(selector).forEach((c) => {
      const move = (ev: Event) => {
        const e = ev as MouseEvent;
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        // Several of these cards carry a staggered scroll-reveal transition-delay
        // plus a slow 0.8s transform transition; force a snappy transition while
        // hovering so the tilt tracks the cursor instead of lagging behind it.
        c.style.transitionDelay = "0ms";
        c.style.transition = "transform 0.12s ease-out";
        c.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${
          (px - 0.5) * 7
        }deg) translateY(-5px)`;
      };
      const leave = () => {
        c.style.transition = "transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)";
        c.style.transform = "";
      };
      c.addEventListener("mousemove", move);
      c.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        c.removeEventListener("mousemove", move);
        c.removeEventListener("mouseleave", leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [pathname, selector]);

  return null;
}
