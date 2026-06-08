"use client";

// Click-to-open photo gallery. Renders a responsive grid of real job photos;
// clicking one opens a full-screen lightbox (portal) with prev/next + keyboard
// nav + Esc/click-out close. Used on the Projects page so "the field of real
// work" photos open like a lightpop instead of being static tiles.
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export type LightboxItem = { src: string; alt: string; caption?: string; objPos?: string };

export function LightboxGallery({ items }: { items: LightboxItem[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setIdx(null), []);
  const go = useCallback(
    (dir: number) => setIdx((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (idx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, close, go]);

  const active = idx === null ? null : items[idx];

  return (
    <>
      <div className="lb-grid">
        {items.map((it, i) => (
          <button
            key={it.src + i}
            type="button"
            className="lb-cell"
            onClick={() => setIdx(i)}
            aria-label={`Open photo: ${it.alt}`}
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              loading="lazy"
              quality={45}
              sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
              style={{ objectFit: "cover", objectPosition: it.objPos ?? "center" }}
            />
            <span className="lb-cell-zoom" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
              </svg>
            </span>
            {it.caption ? <span className="lb-cell-cap">{it.caption}</span> : null}
          </button>
        ))}
      </div>

      {mounted && active
        ? createPortal(
            <div className="lb-ov" onClick={close} role="dialog" aria-modal="true" aria-label="Photo viewer">
              <button type="button" className="lb-x" onClick={close} aria-label="Close">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
                {items.length > 1 ? (
                  <button type="button" className="lb-nav lb-prev" onClick={() => go(-1)} aria-label="Previous photo">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.src} alt={active.alt} />
                {items.length > 1 ? (
                  <button type="button" className="lb-nav lb-next" onClick={() => go(1)} aria-label="Next photo">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : null}
                {active.caption ? <p className="lb-cap">{active.caption}</p> : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
