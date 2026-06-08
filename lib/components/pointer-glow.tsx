"use client";

// Mount once per page. Gives every [data-glow] section a soft highlight that
// follows the cursor — a little bit of "alive" feedback on otherwise static
// info sections, WITHOUT making anything look clickable (no cursor change, no
// button affordance). Pure DOM, renders nothing. Skips touch + reduced-motion.
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PointerGlow() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !canHover) return;

    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-glow]").forEach((el) => {
      const move = (ev: Event) => {
        const e = ev as MouseEvent;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
        el.style.setProperty("--glow-on", "1");
      };
      const leave = () => el.style.setProperty("--glow-on", "0");
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
