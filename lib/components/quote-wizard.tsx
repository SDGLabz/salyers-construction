"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import PRODUCTS from "@/lib/catalog/quote-products.json";

/**
 * Multi-path "Contact / Request" flow. A starter screen routes the visitor into
 * one of four paths — product/kit quote, site survey, Lunch & Learn, or a general
 * inquiry — each with its own questions, then a shared contact step. Renders as a
 * full-screen modal (portal) or, with `inline`, embedded in the page (contact).
 * Submits to /api/quote (Resend).
 */

type SlimProduct = { name: string; slug: string; series: string; subtitle: string; fn: string };
const ALL_PRODUCTS = PRODUCTS as SlimProduct[];
const seriesLabel = (s: string) => s.replace("belzona-", "").replace("-series", "") + " Series";

type Field =
  | { kind: "single"; id: string; q: string; help?: string; options: string[] }
  | { kind: "text"; id: string; q: string; help?: string; placeholder?: string }
  | { kind: "textarea"; id: string; q: string; help?: string; placeholder?: string }
  | { kind: "products" }
  | { kind: "contact" };

type PathId = "product" | "survey" | "lunch" | "inquiry";

const INDUSTRY = ["Oil & gas", "Petrochemical", "Chemical", "Water & wastewater", "Power", "Marine", "Food & beverage", "Pulp & paper", "Steel", "Other"];
const PROBLEM = ["Corrosion", "Active leak", "Erosion or abrasion", "Chemical attack", "Cracks or structural damage", "Coating or lining failure", "Worn or damaged part", "Floor or surface problem", "Something else"];
const ASSET = ["Tank", "Pipe or pipeline", "Pump or impeller", "Valve or fitting", "Heat exchanger", "Process vessel", "Floor", "Roof", "Wall", "Structural steel", "Other"];
const WORKED = ["Yes — we use Belzona", "No — new to Belzona", "Not sure"];

const PATHS: Record<PathId, { label: string; blurb: string; icon: string; steps: Field[] }> = {
  product: {
    label: "Quote on kits or products",
    blurb: "Pick the Belzona products or repair kits you need, set quantities, and send a quote request.",
    icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Zm-9 5.5V12M3.3 7 12 12l8.7-5",
    steps: [
      { kind: "products" },
      { kind: "single", id: "use", q: "What's this for?", help: "Helps us confirm pack sizes and lead time.", options: ["A specific repair", "Routine maintenance / stock", "A project or turnaround", "Not sure yet"] },
      { kind: "textarea", id: "details", q: "Anything else we should know?", help: "Substrate, service conditions, temperatures, timeline, or questions about quantities.", placeholder: "e.g. need this for a pump rebuild before the May turnaround…" },
      { kind: "contact" },
    ],
  },
  survey: {
    label: "Plan a site survey",
    blurb: "Have a local Belzona engineer come assess the asset and recommend the right system.",
    icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m-6 9 2 2 4-4",
    steps: [
      { kind: "text", id: "company", q: "What's your company?", placeholder: "Company name" },
      { kind: "single", id: "industry", q: "What's your industry?", options: INDUSTRY },
      { kind: "single", id: "worked", q: "Have you worked with Belzona before?", options: WORKED },
      { kind: "single", id: "problem", q: "What are you dealing with?", help: "Pick the closest match — our engineers refine it on-site.", options: PROBLEM },
      { kind: "single", id: "asset", q: "Which equipment or surface?", options: ASSET },
      { kind: "textarea", id: "details", q: "Describe the problem", help: "Dimensions, temperatures, access, and how soon you need it back in service.", placeholder: "e.g. 24-inch carbon-steel line, ~180°F, sulfuric service, needs to hold until the spring turnaround…" },
      { kind: "contact" },
    ],
  },
  lunch: {
    label: "Schedule a Lunch & Learn",
    blurb: "Bring your team a no-cost session on the Belzona solutions that fit your plant.",
    icon: "M2 3h20M3 3v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V3M12 15v6M8 21h8",
    steps: [
      { kind: "text", id: "company", q: "What's your company?", placeholder: "Company name" },
      { kind: "single", id: "industry", q: "What's your industry?", options: INDUSTRY },
      { kind: "single", id: "worked", q: "Have you worked with Belzona before?", options: WORKED },
      { kind: "single", id: "learn", q: "What would your team like to learn about?", options: ["Corrosion protection & coatings", "Leak sealing (live or static)", "Tank linings & containment", "Concrete repair & flooring", "Pump & equipment repair", "General Belzona overview", "Something specific"] },
      { kind: "single", id: "audience", q: "Roughly how many will attend?", options: ["Under 10", "10–25", "25+", "Not sure yet"] },
      { kind: "textarea", id: "goals", q: "What would make this worth your team's time?", help: "Tell us the maintenance challenges you're facing or anything specific you'd like us to cover.", placeholder: "e.g. recurring tank-bottom corrosion and pump erosion — want options that avoid hot work…" },
      { kind: "contact" },
    ],
  },
  inquiry: {
    label: "General inquiry",
    blurb: "Ask about a product, a spec, or a problem you're seeing in the field.",
    icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z",
    steps: [
      { kind: "single", id: "problem", q: "What are you dealing with?", help: "Pick the closest match — our engineers refine it from there.", options: PROBLEM },
      { kind: "single", id: "asset", q: "Which equipment or surface?", options: ASSET },
      { kind: "single", id: "industry", q: "What's your industry?", options: INDUSTRY },
      { kind: "single", id: "scope", q: "What do you need?", options: ["Material", "Material plus training", "Material plus application", "Not sure"] },
      { kind: "textarea", id: "details", q: "Anything else we should know?", help: "Optional — dimensions, temperatures, timeline, or photos you can send.", placeholder: "e.g. 24-inch carbon-steel line, ~180°F, sulfuric service…" },
      { kind: "contact" },
    ],
  },
};

const PATH_ORDER: PathId[] = ["product", "survey", "lunch", "inquiry"];
const ANSWER_IDS = ["company", "industry", "worked", "problem", "asset", "scope", "learn", "audience", "goals", "use", "details"];
const isOther = (v: unknown) => v === "Other" || v === "Something else" || v === "Something specific";

type Answers = Record<string, string>;
type Contact = { name: string; company: string; role: string; email: string; phone: string };
type CartItem = { slug: string; name: string; subtitle: string; qty: number };
type Status = "idle" | "sending" | "success" | "error";

export function QuoteWizard({
  label = "Contact Us",
  triggerClassName = "btn btn-primary",
  withArrow = true,
  children,
  context,
  inline = false,
}: {
  label?: string;
  triggerClassName?: string;
  withArrow?: boolean;
  children?: React.ReactNode;
  context?: string;
  inline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<PathId | null>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [others, setOthers] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState("");
  const [contact, setContact] = useState<Contact>({ name: "", company: "", role: "", email: "", phone: "" });
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  };

  const seedFromContext = useCallback((): { path: PathId | null; cart: CartItem[] } => {
    if (!context) return { path: null, cart: [] };
    const hit = ALL_PRODUCTS.find((p) => p.name.toLowerCase() === context.toLowerCase());
    if (hit) return { path: "product", cart: [{ slug: hit.slug, name: hit.name, subtitle: hit.subtitle, qty: 1 }] };
    return { path: null, cart: [] };
  }, [context]);

  const reset = useCallback(() => {
    const seed = seedFromContext();
    setPath(seed.path);
    setStarted(Boolean(seed.path));
    setStep(0);
    setAnswers({});
    setOthers({});
    setCart(seed.cart);
    setQuery("");
    setContact({ name: "", company: "", role: "", email: "", phone: "" });
    setMarketingOptIn(true);
    setWebsite("");
    setStatus("idle");
    setTouched(false);
    setConfirmExit(false);
  }, [seedFromContext]);

  const doClose = useCallback(() => {
    clearTimer();
    setOpen(false);
    setConfirmExit(false);
    reset();
    triggerRef.current?.focus();
  }, [reset]);

  const requestClose = useCallback(() => {
    // On the intro / chooser (or after success) → just close. Mid-flow → confirm.
    if (status === "success" || !started || path === null) doClose();
    else setConfirmExit(true);
  }, [status, started, path, doClose]);

  useEffect(() => setMounted(true), []);
  // inline lives on the page — seed it once on mount (e.g. a product context)
  useEffect(() => {
    if (inline) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // body scroll lock + Esc (modal only)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (confirmExit) setConfirmExit(false);
        else requestClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, confirmExit, requestClose]);

  const steps = path ? PATHS[path].steps : [];
  const total = steps.length;
  const current = path ? steps[step] : null;
  const stepNo = step + 1;
  const progress = path ? (stepNo / total) * 100 : 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.fn.toLowerCase().includes(q) ||
        seriesLabel(p.series).toLowerCase().includes(q),
    );
  }, [query]);

  const choosePath = (id: PathId) => {
    setPath(id);
    setStep(0);
    setTouched(false);
  };

  const addItem = (p: SlimProduct) => {
    setTouched(true);
    setCart((c) => (c.some((i) => i.slug === p.slug) ? c : [...c, { slug: p.slug, name: p.name, subtitle: p.subtitle, qty: 1 }]));
  };
  const removeItem = (slug: string) => setCart((c) => c.filter((i) => i.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setCart((c) => c.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)));

  const setSingle = (id: string, value: string) => {
    setTouched(true);
    setAnswers((a) => ({ ...a, [id]: value }));
    clearTimer();
    if (!isOther(value)) {
      advanceTimer.current = setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 260);
    }
  };

  const canAdvance = (): boolean => {
    if (!current) return false;
    if (current.kind === "products") return cart.length > 0;
    if (current.kind === "single") {
      const v = answers[current.id];
      if (!v) return false;
      if (isOther(v)) return !!others[current.id]?.trim();
      return true;
    }
    if (current.kind === "text") return !!answers[current.id]?.trim();
    if (current.kind === "textarea") return true; // optional
    if (current.kind === "contact")
      return (
        contact.name.trim() !== "" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) &&
        contact.phone.trim() !== ""
      );
    return true;
  };

  const next = () => {
    clearTimer();
    if (!canAdvance()) {
      setTouched(true);
      return;
    }
    if (current?.kind === "contact") {
      void submit();
      return;
    }
    // carry the company answer into the contact step
    if (steps[step + 1]?.kind === "contact" && answers.company && !contact.company) {
      setContact((c) => ({ ...c, company: answers.company }));
    }
    setStep((s) => Math.min(s + 1, total - 1));
    setTouched(false);
  };

  const back = () => {
    clearTimer();
    setTouched(false);
    if (step === 0) {
      setPath(null);
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    if (!path) return;
    setStatus("sending");
    const resolved: Record<string, string> = {};
    ANSWER_IDS.forEach((id) => {
      const v = answers[id];
      if (isOther(v) && others[id]?.trim()) resolved[id] = others[id].trim();
      else if (v) resolved[id] = v;
    });
    const products =
      cart.length > 0
        ? cart.map((i) => `${i.qty}× ${i.name}${i.subtitle ? ` (${i.subtitle})` : ""}`).join("; ")
        : undefined;
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          pathLabel: PATHS[path].label,
          ...resolved,
          products,
          ...contact,
          marketingOptIn,
          website,
          product: context,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      setStatus(res.ok && json.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && current?.kind !== "textarea" && current?.kind !== "products") {
      e.preventDefault();
      next();
    }
  };

  const stageBody =
    status === "success" ? (
      <div className="qw-end">
        <div className="qw-end-ic" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2>Request received.</h2>
        <p>
          Thanks{contact.name ? `, ${contact.name.split(" ")[0]}` : ""} — a local, authorized Belzona engineer will
          review your request and reach out within one business day. For an active failure, call us now at{" "}
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
        </p>
        <button type="button" className="btn btn-primary" onClick={doClose}>
          Done
        </button>
      </div>
    ) : status === "error" ? (
      <div className="qw-end">
        <div className="qw-end-ic qw-end-ic--warn" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          </svg>
        </div>
        <h2>We couldn&rsquo;t submit that online.</h2>
        <p>
          Please reach our team directly — call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> or email{" "}
          <a href={CONTACT.emailHref}>{CONTACT.email}</a>.
        </p>
        <div className="qw-nav-row">
          <button type="button" className="btn btn-outline" onClick={() => setStatus("idle")}>
            Try again
          </button>
          <button type="button" className="btn btn-primary" onClick={doClose}>
            Close
          </button>
        </div>
      </div>
    ) : !started ? (
      /* ───── intro / welcome (first screen) ───── */
      <div className="qw-welcome qw-intro">
        <div className="qw-eyebrow">{context ? `Quote · ${context}` : "Get started"}</div>
        <h2>{context ? `Let's scope ${context} for your asset.` : "How can we help?"}</h2>
        <p>
          Tell us what you need and a local, authorized Belzona team follows up — usually the same
          business day. It takes about a minute.
        </p>
        <button type="button" className="btn btn-primary qw-start" onClick={() => setStarted(true)}>
          Start <span className="ar" aria-hidden="true">→</span>
        </button>
        <ul className="qw-trust">
          <li>Authorized Belzona distributor since 1991</li>
          <li>Supply &amp; apply, with 24-hour support</li>
          <li>Serving South &amp; Central Louisiana</li>
        </ul>
        <div className="qw-choose-foot">
          <Link href="/contact" className="qw-choose-link" onClick={doClose}>
            Prefer another way to reach us? Contact us →
          </Link>
          <span className="qw-choose-911">
            Active leak or emergency? Call <a href={CONTACT.phone247Href}>{CONTACT.phone247}</a> — 24/7.
          </span>
        </div>
      </div>
    ) : path === null ? (
      /* ───── 4-direction split (first question) ───── */
      <div className="qw-welcome qw-choose">
        <div className="qw-eyebrow">What do you need?</div>
        <h2>Pick the path that fits.</h2>
        <p>Every request reaches a local, authorized Belzona team. No obligation.</p>
        <div className="qw-paths">
          {PATH_ORDER.map((id) => (
            <button type="button" key={id} className="qw-path" onClick={() => choosePath(id)}>
              <span className="qw-path-ic" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d={PATHS[id].icon} />
                </svg>
              </span>
              <span className="qw-path-tx">
                <span className="qw-path-label">{PATHS[id].label}</span>
                <span className="qw-path-blurb">{PATHS[id].blurb}</span>
              </span>
              <span className="qw-path-go" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-outline qw-choose-back" onClick={() => setStarted(false)}>
          <span className="ar" aria-hidden="true">←</span> Back
        </button>
      </div>
    ) : current?.kind === "products" ? (
      /* ───── product / kit picker ───── */
      <div className="qw-q qw-prod">
        <div className="qw-q-head">
          <span className="qw-path-tag">{PATHS[path].label}</span>
          <span className="qw-q-no">
            {stepNo} <span>/ {total}</span>
          </span>
        </div>
        <h2>Build your quote</h2>
        <p className="qw-q-help">Add the Belzona products or repair kits you need and set quantities — we&rsquo;ll price them and confirm pack sizes.</p>

        {cart.length > 0 ? (
          <div className="qw-cart">
            {cart.map((item) => (
              <div className="qw-cart-row" key={item.slug}>
                <span className="qw-cart-tx">
                  <span className="qw-cart-name">{item.name}</span>
                  {item.subtitle ? <span className="qw-cart-sub">{item.subtitle}</span> : null}
                </span>
                <span className="qw-qty">
                  <button type="button" onClick={() => setQty(item.slug, item.qty - 1)} aria-label={`Decrease ${item.name}`}>
                    −
                  </button>
                  <span className="qw-qty-n">{item.qty}</span>
                  <button type="button" onClick={() => setQty(item.slug, item.qty + 1)} aria-label={`Increase ${item.name}`}>
                    +
                  </button>
                </span>
                <button type="button" className="qw-cart-x" onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.name}`}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="qw-prod-search">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or kits — e.g. 1111, Super Metal, tank lining…"
            aria-label="Search products"
          />
        </div>

        <div className="qw-prod-list">
          {filtered.length === 0 ? (
            <p className="qw-prod-empty">No matches. Try a product number (e.g. 1111) or a name.</p>
          ) : (
            filtered.map((p) => {
              const inCart = cart.some((c) => c.slug === p.slug);
              return (
                <button
                  type="button"
                  key={p.slug}
                  className={`qw-prod-item${inCart ? " is-in" : ""}`}
                  onClick={() => (inCart ? removeItem(p.slug) : addItem(p))}
                >
                  <span className="qw-prod-tx">
                    <span className="qw-prod-name">
                      {p.name}
                      {p.subtitle ? <span className="qw-prod-sub"> · {p.subtitle}</span> : null}
                    </span>
                    <span className="qw-prod-series">
                      {seriesLabel(p.series)}
                      {p.fn ? ` · ${p.fn}` : ""}
                    </span>
                  </span>
                  <span className="qw-prod-add">{inCart ? "Added ✓" : "Add +"}</span>
                </button>
              );
            })
          )}
        </div>

        {touched && cart.length === 0 ? <p className="qw-err">Add at least one product to continue.</p> : null}
        <div className="qw-nav-row">
          <button type="button" className="btn btn-outline" onClick={back}>
            Back
          </button>
          <button type="button" className="btn btn-primary" onClick={next} disabled={cart.length === 0}>
            Next <span className="ar" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    ) : current?.kind === "single" ? (
      <div className="qw-q">
        <div className="qw-q-head">
          <span className="qw-path-tag">{PATHS[path].label}</span>
          <span className="qw-q-no">
            {stepNo} <span>/ {total}</span>
          </span>
        </div>
        <h2>{current.q}</h2>
        {current.help ? <p className="qw-q-help">{current.help}</p> : null}
        <div className="qw-options">
          {current.options.map((opt) => {
            const selected = answers[current.id] === opt;
            return (
              <button
                type="button"
                key={opt}
                className={`qw-opt${selected ? " is-on" : ""}`}
                aria-pressed={selected}
                onClick={() => setSingle(current.id, opt)}
              >
                <span className="qw-opt-mark" aria-hidden="true" />
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
        {isOther(answers[current.id]) ? (
          <input
            className="qw-other"
            type="text"
            placeholder="Tell us a bit more…"
            value={others[current.id] || ""}
            onChange={(e) => setOthers((o) => ({ ...o, [current.id]: e.target.value }))}
            autoFocus
          />
        ) : null}
        <div className="qw-nav-row">
          <button type="button" className="btn btn-outline" onClick={back}>
            Back
          </button>
          <button type="button" className="btn btn-primary" onClick={next} disabled={!canAdvance()}>
            Next <span className="ar" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    ) : current?.kind === "text" ? (
      <div className="qw-q">
        <div className="qw-q-head">
          <span className="qw-path-tag">{PATHS[path].label}</span>
          <span className="qw-q-no">
            {stepNo} <span>/ {total}</span>
          </span>
        </div>
        <h2>{current.q}</h2>
        {current.help ? <p className="qw-q-help">{current.help}</p> : null}
        <input
          className="qw-text"
          type="text"
          placeholder={current.placeholder}
          value={answers[current.id] || ""}
          onChange={(e) => setAnswers((a) => ({ ...a, [current.id]: e.target.value }))}
          autoFocus
        />
        <div className="qw-nav-row">
          <button type="button" className="btn btn-outline" onClick={back}>
            Back
          </button>
          <button type="button" className="btn btn-primary" onClick={next} disabled={!canAdvance()}>
            Next <span className="ar" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    ) : current?.kind === "textarea" ? (
      <div className="qw-q">
        <div className="qw-q-head">
          <span className="qw-path-tag">{PATHS[path].label}</span>
          <span className="qw-q-no">
            {stepNo} <span>/ {total}</span>
          </span>
        </div>
        <h2>{current.q}</h2>
        {current.help ? <p className="qw-q-help">{current.help}</p> : null}
        <textarea
          className="qw-textarea"
          rows={5}
          placeholder={current.placeholder}
          value={answers[current.id] || ""}
          onChange={(e) => setAnswers((a) => ({ ...a, [current.id]: e.target.value }))}
          autoFocus
        />
        <div className="qw-nav-row">
          <button type="button" className="btn btn-outline" onClick={back}>
            Back
          </button>
          <button type="button" className="btn btn-primary" onClick={next}>
            Next <span className="ar" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    ) : (
      /* contact */
      <div className="qw-q">
        <div className="qw-q-head">
          <span className="qw-path-tag">{PATHS[path].label}</span>
          <span className="qw-q-no">Almost done</span>
        </div>
        <h2>Where should we send your response?</h2>
        <p className="qw-q-help">We&rsquo;ll only use this to follow up on your request.</p>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
          aria-hidden="true"
        />
        <div className="qw-fields">
          <label className="qw-field">
            <span>Name *</span>
            <input value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} autoComplete="name" autoFocus />
          </label>
          <label className="qw-field">
            <span>Company</span>
            <input value={contact.company} onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))} autoComplete="organization" />
          </label>
          <label className="qw-field">
            <span>Email *</span>
            <input type="email" value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} autoComplete="email" />
          </label>
          <label className="qw-field">
            <span>Phone *</span>
            <input type="tel" value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} autoComplete="tel" />
          </label>
          <label className="qw-field qw-field--wide">
            <span>Role</span>
            <input value={contact.role} onChange={(e) => setContact((c) => ({ ...c, role: e.target.value }))} placeholder="e.g. Maintenance Manager, Engineer, Contractor" />
          </label>
        </div>
        <label className="qw-optin">
          <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} />
          <span>Keep me posted with Belzona tips, case studies, and the occasional offer. You can unsubscribe anytime.</span>
        </label>
        {touched && !canAdvance() ? <p className="qw-err">Please add your name, a valid email, and a phone number.</p> : null}
        <div className="qw-nav-row">
          <button type="button" className="btn btn-outline" onClick={back}>
            Back
          </button>
          <button type="button" className="btn btn-primary" onClick={next} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Submit request"}
            {status !== "sending" ? <span className="ar" aria-hidden="true">→</span> : null}
          </button>
        </div>
      </div>
    );

  if (inline) {
    return (
      <div className="qw-inline" onKeyDown={onEnter}>
        {path !== null && status !== "success" && status !== "error" ? (
          <div className="qw-inline-bar">
            <span className="qw-inline-step">
              Step {stepNo} of {total}
            </span>
            <span className="qw-progress qw-progress--inline" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </span>
          </div>
        ) : null}
        <div className="qw-stage" key={status === "idle" ? `${path}-${step}` : status}>
          {stageBody}
        </div>
      </div>
    );
  }

  const overlay = (
    <div
      className="qw"
      onKeyDown={onEnter}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div className="qw-modal" role="dialog" aria-modal="true" aria-label="Contact Belzona of Baton Rouge" onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div className="qw-head">
          <div className="qw-brand">
            <Image src="/assets/brand/br-logo-white.png" alt="Belzona of Baton Rouge" width={330} height={80} priority />
          </div>
          <button type="button" className="qw-x" onClick={requestClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div className="qw-progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* body */}
        <div className="qw-body">
          <div className="qw-stage" key={status === "idle" ? `${path}-${step}` : status}>
            {stageBody}
          </div>
        </div>

        {/* footer */}
        {status !== "success" ? (
          <div className="qw-foot">
            <button type="button" className="qw-close-link" onClick={requestClose}>
              Close
            </button>
            <span className="qw-foot-trust">Authorized Belzona distributor · No obligation</span>
          </div>
        ) : null}
      </div>

      {/* discard confirm */}
      {confirmExit ? (
        <div className="qw-confirm" role="alertdialog" aria-label="Discard request?">
          <div className="qw-confirm-card">
            <h3>Leave without sending?</h3>
            <p>Your answers won&rsquo;t be saved.</p>
            <div className="qw-nav-row">
              <button type="button" className="btn btn-outline" onClick={() => setConfirmExit(false)}>
                Keep editing
              </button>
              <button type="button" className="btn btn-primary" onClick={doClose}>
                Discard &amp; close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${triggerClassName} qw-trigger`}
        onClick={() => {
          reset();
          setOpen(true);
        }}
      >
        {children ?? (
          <>
            {label}
            {withArrow ? (
              <span className="ar" aria-hidden="true">
                →
              </span>
            ) : null}
          </>
        )}
      </button>
      {mounted && open ? createPortal(overlay, document.body) : null}
    </>
  );
}
