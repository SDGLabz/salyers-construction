"use client";

// Fluid accordion — replaces the rigid native <details> with a smoothly
// animated open/close (grid-template-rows 0fr→1fr, so it eases to the real
// content height) plus a hover state and a morphing +/− icon. Reduced-motion
// safe (CSS drops the transitions). Each item toggles independently.
import { useId, useState, type ReactNode } from "react";

export type AccordionItem = { q: ReactNode; a: ReactNode };

export function Accordion({
  items,
  defaultOpen = -1,
}: {
  items: AccordionItem[];
  /** Index to open on first render, or -1 for all closed. */
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(defaultOpen >= 0 ? [defaultOpen] : []),
  );
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-p${i}`;
        const btnId = `${baseId}-b${i}`;
        return (
          <div key={i} className={`acc-item${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              id={btnId}
              className="acc-q"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
            >
              <span>{item.q}</span>
              <span className="acc-ic" aria-hidden="true" />
            </button>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acc-panel">
              <div className="acc-panel-in">
                <div className="acc-a">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
