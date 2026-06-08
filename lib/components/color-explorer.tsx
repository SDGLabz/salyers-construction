"use client";

// Tabbed color/finish picker for the coatings page — the Polymer Nation resinous
// floor color line Salyers installs, grouped like a manufacturer chart so it's
// easy to navigate. Data comes from data/coating-colors.json (passed in by the
// server page); swatch images are localized under /public/images/colors.
import { useState } from "react";
import Image from "next/image";

export type ColorCategory = {
  tab: string;
  slug: string;
  note: string;
  colors: { name: string; code: string; file: string }[];
};

export function ColorExplorer({ categories }: { categories: ColorCategory[] }) {
  const [active, setActive] = useState(0);
  const cat = categories[active];
  if (!cat) return null;

  return (
    <div className="colx">
      <div className="colx-tabs" role="tablist" aria-label="Color categories">
        {categories.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`colx-tab${i === active ? " is-on" : ""}`}
            onClick={() => setActive(i)}
          >
            {c.tab}
          </button>
        ))}
      </div>
      <p className="colx-note">{cat.note}</p>
      <div className="colx-grid" role="tabpanel">
        {cat.colors.map((c) => (
          <figure key={c.code + c.name} className="colx-chip">
            <div className="colx-sw">
              <Image
                src={c.file}
                alt={`${c.name} (${c.code}) ${cat.tab} floor finish`}
                fill
                loading="lazy"
                quality={55}
                sizes="(max-width: 640px) 50vw, 160px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="colx-meta">
              <span className="colx-name">{c.name}</span>
              <span className="colx-code">{c.code}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
