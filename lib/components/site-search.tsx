"use client";

// Site-wide ⌘K search for interior pages (the homepage has its own inline copy).
// Opens on ⌘K or the custom "belzona:open-search" event (dispatched by
// <SearchTrigger>). Reuses the overlay CSS (.ov/.sbox/.sres/.sg/.sres-opt) and
// the prebuilt /search-index.json (Fuse lazy-loaded on first open).
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Rec = { type: string; title: string; sub: string; href: string; kw: string };
type FuseLike = { search: (q: string) => Array<{ item: Rec }> };

const TYPE_ORDER = ["product", "application", "industry", "case-study", "certification"];
const TYPE_LABEL: Record<string, string> = {
  product: "Products",
  application: "Applications",
  industry: "Industries",
  "case-study": "Case Studies",
  certification: "Certifications",
};

export function SiteSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Rec[]>([]);
  const [active, setActive] = useState(0);
  const fuseRef = useRef<FuseLike | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback((val: string) => {
    setQuery(val);
    setActive(0);
    const f = fuseRef.current;
    if (!val.trim() || !f) {
      setResults([]);
      return;
    }
    setResults(f.search(val).slice(0, 24).map((r) => r.item));
  }, []);

  // open via the global trigger event + ⌘K; close via Esc
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("belzona:open-search", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("belzona:open-search", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // on open: focus the input + lazy-load Fuse and the index once
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (fuseRef.current) return;
    let cancelled = false;
    (async () => {
      const [fuseMod, idx] = await Promise.all([
        import("fuse.js"),
        fetch("/search-index.json").then((r) => r.json()),
      ]);
      if (cancelled) return;
      const Fuse = fuseMod.default;
      fuseRef.current = new Fuse(idx as Rec[], {
        keys: [
          { name: "title", weight: 3 },
          { name: "kw", weight: 1 },
          { name: "sub", weight: 0.5 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }) as unknown as FuseLike;
      if (inputRef.current?.value) search(inputRef.current.value);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, search]);

  // group by type (in TYPE_ORDER) + flatten for keyboard nav
  const { groups, flat } = useMemo(() => {
    const by: Record<string, Rec[]> = {};
    for (const r of results) (by[r.type] = by[r.type] || []).push(r);
    const order = TYPE_ORDER.filter((t) => by[t]?.length);
    const flatList: Rec[] = [];
    for (const t of order) flatList.push(...by[t]);
    return { groups: order.map((t) => ({ type: t, items: by[t] })), flat: flatList };
  }, [results]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (!flat.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active].href);
    }
  };

  if (!open) return null;
  return (
    <div
      className="ov open"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="sbox" role="dialog" aria-modal="true" aria-label="Search">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products, specs, or describe your problem..."
          value={query}
          onChange={(e) => search(e.target.value)}
          onKeyDown={onInputKey}
          autoComplete="off"
          role="combobox"
          aria-expanded={flat.length > 0}
          aria-controls="ss-results"
          aria-autocomplete="list"
          aria-label="Search products, applications, industries, and certifications"
        />
        <div className="sres" id="ss-results" role="listbox" aria-label="Search results">
          {query && !flat.length ? (
            <div className="sempty">
              No matches for &ldquo;{query}&rdquo;. Try a product number or a problem like
              &ldquo;corrosion&rdquo;.
              <br />
              <br />
              <a href="/contact" onClick={(e) => { e.preventDefault(); go("/contact"); }}>
                Talk to a specialist →
              </a>
            </div>
          ) : null}
          {groups.map((g) => (
            <div key={g.type} role="group" aria-label={TYPE_LABEL[g.type]}>
              <div className="sg" role="presentation">
                {TYPE_LABEL[g.type]}
              </div>
              {g.items.map((r) => {
                const i = flat.indexOf(r);
                return (
                  <a
                    key={r.href}
                    href={r.href}
                    className={`sres-opt si ${r.type}${i === active ? " active" : ""}`}
                    role="option"
                    aria-selected={i === active}
                    onClick={(e) => {
                      e.preventDefault();
                      go(r.href);
                    }}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className="pill">{r.type}</span>
                    <span className="si-txt">
                      <b>{r.title}</b>
                      <span>{r.sub}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
        <div className="sfoot">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
