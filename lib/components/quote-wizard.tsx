"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import { Logo } from "@/lib/components/logo";

/**
 * Multi-path "Request a Bid / Contact" flow for Salyers Construction. A starter
 * screen routes the visitor into one of four paths — request a written bid, send
 * project drawings, request a coatings spec / samples, or a general/technical
 * inquiry — each with its own questions, then a shared contact step. Renders as a
 * full-screen modal (portal) or, with `inline`, embedded in the page (contact).
 * Submits to /api/quote (Resend).
 */

type Field =
  | { kind: "single"; id: string; q: string; help?: string; options: string[] }
  | { kind: "text"; id: string; q: string; help?: string; placeholder?: string }
  | { kind: "textarea"; id: string; q: string; help?: string; placeholder?: string }
  | { kind: "file"; id: string; q: string; help?: string }
  | { kind: "contact" };

// Attachments are emailed inline via Resend, which travels in the API request
// body — Vercel caps that at ~4.5 MB, so base64 has to stay under it. Cap raw
// uploads at 3 MB total and steer larger drawing sets to an emailed share link.
const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;
type Upload = { name: string; type: string; size: number; content: string };

type PathId = "bid" | "drawings" | "samples" | "inquiry";

// Salyers' two lines of work — used across paths.
const SERVICE_LINE = ["Seismic FRP retrofit", "Industrial epoxy / resinous coatings"];
const ROLE = [
  "Structural Engineer of Record",
  "General Contractor",
  "Building owner or manager",
  "Public agency",
  "Other",
];
const BID_PROJECT = [
  "Seismic / structural strengthening",
  "Parking structure or deck",
  "Concrete repair",
  "New epoxy or resinous floor",
  "Re-coat or repair an existing floor",
  "Containment or secondary containment",
  "Something else",
];
const DRAWING_STAGE = [
  "EOR design intent",
  "Issued-for-construction",
  "Conceptual",
  "Not sure",
];
const COATINGS_MARKET = [
  "Manufacturing / industrial",
  "Warehouse / distribution",
  "Food & beverage",
  "Healthcare / lab",
  "Commercial / retail",
  "Public / institutional",
  "Other",
];
const COATINGS_SYSTEM = [
  "Epoxy floor coating",
  "Flake / decorative system",
  "Polyaspartic / urethane topcoat",
  "Chemical-resistant lining",
  "Secondary containment",
  "Not sure — recommend a system",
];
const SQUARE_FOOTAGE = [
  "Under 2,000 sq ft",
  "2,000 – 10,000 sq ft",
  "10,000 – 50,000 sq ft",
  "Over 50,000 sq ft",
  "Not sure yet",
];
const FACILITY_TYPE = [
  "New construction",
  "Existing facility (occupied)",
  "Existing facility (vacant)",
  "Tenant improvement",
  "Other",
];
const INQUIRY_TOPIC = [
  "A seismic standard",
  "A coating system",
  "Service area",
  "Something else",
];

const PATHS: Record<PathId, { label: string; blurb: string; icon: string; steps: Field[] }> = {
  bid: {
    label: "Request a bid",
    blurb: "Get a written, itemized bid for seismic FRP retrofit or an industrial floor coating.",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M9 13h6M9 17h6M9 9h1",
    steps: [
      { kind: "single", id: "serviceLine", q: "Which line of work?", help: "We bid both — pick the closer fit and we'll sort the details.", options: SERVICE_LINE },
      { kind: "single", id: "projectType", q: "What's the project?", help: "Pick the closest match — the scope step is where you add specifics.", options: BID_PROJECT },
      { kind: "text", id: "company", q: "What's your company?", placeholder: "Company or firm name" },
      { kind: "text", id: "location", q: "Where is the project?", help: "City and county in California — it drives crew routing and lead time.", placeholder: "e.g. Sacramento, Sacramento County" },
      { kind: "textarea", id: "details", q: "Scope and timeline", help: "Structure, square footage, conditions, and when you need a bid or a start date.", placeholder: "e.g. two-story tilt-up, ~14,000 sq ft warehouse floor, need a bid in two weeks and a start in Q3…" },
      { kind: "contact" },
    ],
  },
  drawings: {
    label: "Send project drawings",
    blurb: "Pass us EOR drawings or a construction set and we'll bid to the documents.",
    icon: "M21 15V6a2 2 0 0 0-2-2H9.5L7 2H3a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h6M14 13l3 3 5-6",
    steps: [
      { kind: "text", id: "company", q: "What's your company?", placeholder: "Company or firm name" },
      { kind: "single", id: "role", q: "What's your role on this project?", options: ROLE },
      { kind: "single", id: "serviceLine", q: "Which line of work do the drawings cover?", options: SERVICE_LINE },
      { kind: "single", id: "drawingStage", q: "What stage are the drawings?", help: "It tells us how firm the scope is when we price it.", options: DRAWING_STAGE },
      { kind: "textarea", id: "details", q: "Describe the structure", help: "Building type, size, and what the documents call for.", placeholder: "e.g. 1970s concrete parking deck, Tyfo column wraps per EOR, four levels…" },
      { kind: "file", id: "drawings", q: "Attach your drawings", help: "Optional — PDF, images, DWG/DXF or a ZIP, up to 3 MB total here. Larger set? Submit this and reply to our email with the files or a share link." },
      { kind: "contact" },
    ],
  },
  samples: {
    label: "Coatings spec or samples",
    blurb: "Spec an American-made resinous floor, or get sample chips and a system recommendation.",
    icon: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    steps: [
      { kind: "single", id: "market", q: "What kind of facility?", options: COATINGS_MARKET },
      { kind: "single", id: "system", q: "Which system are you after?", help: "Not sure? Pick the last option and we'll match one to your conditions.", options: COATINGS_SYSTEM },
      { kind: "single", id: "squareFootage", q: "Roughly how much floor area?", options: SQUARE_FOOTAGE },
      { kind: "single", id: "facilityType", q: "What's the situation on site?", options: FACILITY_TYPE },
      { kind: "textarea", id: "details", q: "Anything else we should know?", help: "Service conditions, chemical exposure, traffic, slip needs, color or finish, and timeline.", placeholder: "e.g. forklift traffic, occasional caustic spills, want a flake finish, occupied plant so weekend work only…" },
      { kind: "contact" },
    ],
  },
  inquiry: {
    label: "General / technical inquiry",
    blurb: "Ask about a seismic standard, a coating system, our service area, or anything else.",
    icon: "M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
    steps: [
      { kind: "single", id: "topic", q: "What's your question about?", options: INQUIRY_TOPIC },
      { kind: "single", id: "role", q: "What best describes you?", options: ROLE },
      { kind: "textarea", id: "details", q: "What would you like to know?", help: "Give us enough to answer accurately — the more specific, the better.", placeholder: "e.g. does your Tyfo FRP work carry an ICC-ES report we can reference in our submittal?" },
      { kind: "contact" },
    ],
  },
};

const PATH_ORDER: PathId[] = ["bid", "drawings", "samples", "inquiry"];
// Every non-contact answer id used across all paths (for the submit payload).
const ANSWER_IDS = [
  "serviceLine",
  "projectType",
  "company",
  "location",
  "role",
  "drawingStage",
  "market",
  "system",
  "squareFootage",
  "facilityType",
  "topic",
  "details",
];
const isOther = (v: unknown) => v === "Other" || v === "Something else";

type Answers = Record<string, string>;
type Contact = { name: string; company: string; role: string; email: string; phone: string; message: string };
type Status = "idle" | "sending" | "success" | "error";

export function QuoteWizard({
  label = "Request a Bid",
  triggerClassName = "btn btn-primary",
  withArrow = true,
  children,
  context,
  inline = false,
  initialPath,
}: {
  label?: string;
  triggerClassName?: string;
  withArrow?: boolean;
  children?: React.ReactNode;
  context?: string;
  inline?: boolean;
  /** Skip the intro + chooser and open straight into one path (e.g. "Send Drawings"). */
  initialPath?: PathId;
}) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<PathId | null>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [others, setOthers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Contact>({ name: "", company: "", role: "", email: "", phone: "", message: "" });
  const [website, setWebsite] = useState(""); // honeypot
  const [files, setFiles] = useState<Upload[]>([]);
  const [fileNote, setFileNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  };

  const reset = useCallback(() => {
    setPath(null);
    setStarted(false);
    setStep(0);
    setAnswers({});
    setOthers({});
    setContact({ name: "", company: "", role: "", email: "", phone: "", message: "" });
    setWebsite("");
    setFiles([]);
    setFileNote("");
    setStatus("idle");
    setTouched(false);
    setConfirmExit(false);
  }, []);

  // Read picked files → base64, enforcing the total-size cap (Vercel body limit).
  const addFiles = (list: FileList | null) => {
    if (!list?.length) return;
    setFileNote("");
    let total = files.reduce((n, f) => n + f.size, 0);
    for (const f of Array.from(list)) {
      if (total + f.size > MAX_UPLOAD_BYTES) {
        setFileNote(
          "That would go over 3 MB. Submit what fits and reply to our email with the rest, or send a share link.",
        );
        continue;
      }
      total += f.size;
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const content = result.includes(",") ? result.split(",")[1] : result;
        setFiles((cur) =>
          cur.some((c) => c.name === f.name && c.size === f.size)
            ? cur
            : [...cur, { name: f.name, type: f.type || "application/octet-stream", size: f.size, content }],
        );
      };
      reader.readAsDataURL(f);
    }
  };
  const removeFile = (name: string, size: number) =>
    setFiles((cur) => cur.filter((f) => !(f.name === name && f.size === size)));

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

  // Mark as mounted after hydration so the portal only renders client-side.
  // Queued (not a synchronous effect-body setState) to avoid cascading renders.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
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

  const choosePath = (id: PathId) => {
    setPath(id);
    setStep(0);
    setTouched(false);
  };

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
    if (current.kind === "single") {
      const v = answers[current.id];
      if (!v) return false;
      if (isOther(v)) return !!others[current.id]?.trim();
      return true;
    }
    if (current.kind === "text") return !!answers[current.id]?.trim();
    if (current.kind === "textarea") return true; // optional
    if (current.kind === "file") return true; // optional
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
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path,
          pathLabel: PATHS[path].label,
          ...resolved,
          ...contact,
          website,
          context,
          attachments: files.map((f) => ({ filename: f.name, content: f.content, type: f.type })),
          attachmentNames: files.map((f) => f.name).join(", "),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      setStatus(res.ok && json.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && current?.kind !== "textarea") {
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
          Thanks{contact.name ? `, ${contact.name.split(" ")[0]}` : ""} — we&rsquo;ll review your request and reply with
          a written, itemized response, usually inside 1 to 2 business days.
          {path === "drawings" ? (
            <>
              {" "}
              {files.length
                ? "We've got your drawings. "
                : ""}
              Need to add more or send a larger set? Just reply to our email at{" "}
              <a href={CONTACT.emailHref}>{CONTACT.email}</a>.
            </>
          ) : (
            <>
              {" "}
              Need to talk it through sooner? Call us at <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
            </>
          )}
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
          Please reach us directly — call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> or email{" "}
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
        <div className="qw-eyebrow">{context ? `Request a bid · ${context}` : "Get started"}</div>
        <h2>{context ? `Let's scope ${context}.` : "How can we help?"}</h2>
        <p>
          Tell us about the building and we&rsquo;ll send back a written, itemized bid — usually inside 1 to 2 business
          days. It takes about a minute.
        </p>
        <button type="button" className="btn btn-primary qw-start" onClick={() => setStarted(true)}>
          Start <span className="ar" aria-hidden="true">→</span>
        </button>
        <ul className="qw-trust">
          <li>California B1 #{CONTACT.license.replace(/\D/g, "")}</li>
          <li>Seismic FRP &amp; industrial coatings since {CONTACT.since}</li>
          <li>Statewide California</li>
        </ul>
        <div className="qw-choose-foot">
          <Link href="/contact" className="qw-choose-link" onClick={doClose}>
            Prefer another way to reach us? Contact us →
          </Link>
          <span className="qw-choose-911">
            Or call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> directly.
          </span>
        </div>
      </div>
    ) : path === null ? (
      /* ───── 4-direction split (first question) ───── */
      <div className="qw-welcome qw-choose">
        <div className="qw-eyebrow">What do you need?</div>
        <h2>Pick the path that fits.</h2>
        <p>Every request reaches us directly. No obligation.</p>
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
    ) : current?.kind === "file" ? (
      <div className="qw-q">
        <div className="qw-q-head">
          <span className="qw-path-tag">{PATHS[path].label}</span>
          <span className="qw-q-no">
            {stepNo} <span>/ {total}</span>
          </span>
        </div>
        <h2>{current.q}</h2>
        {current.help ? <p className="qw-q-help">{current.help}</p> : null}
        <label
          className="qw-file-drop"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp,.zip,.dwg,.dxf,image/*,application/pdf"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <span className="qw-file-ic" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M12 16V4M7 9l5-5 5 5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="qw-file-cta">
            <b>Choose files</b> or drag them here
          </span>
          <span className="qw-file-hint">PDF, images, DWG/DXF or ZIP · up to 3 MB total</span>
        </label>
        {files.length ? (
          <ul className="qw-file-list">
            {files.map((f) => (
              <li key={f.name + f.size}>
                <span className="qw-file-name">{f.name}</span>
                <span className="qw-file-size">
                  {f.size < 1048576 ? `${Math.max(1, Math.round(f.size / 1024))} KB` : `${(f.size / 1048576).toFixed(1)} MB`}
                </span>
                <button type="button" className="qw-file-rm" onClick={() => removeFile(f.name, f.size)} aria-label={`Remove ${f.name}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {fileNote ? <p className="qw-err">{fileNote}</p> : null}
        <div className="qw-nav-row">
          <button type="button" className="btn btn-outline" onClick={back}>
            Back
          </button>
          <button type="button" className="btn btn-primary" onClick={next}>
            {files.length ? "Next" : "Skip"} <span className="ar" aria-hidden="true">→</span>
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
        <h2>Where should we send your bid?</h2>
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
            <input value={contact.role} onChange={(e) => setContact((c) => ({ ...c, role: e.target.value }))} placeholder="e.g. Structural Engineer, GC, Owner, Facilities" />
          </label>
          <label className="qw-field qw-field--wide">
            <span>Message</span>
            <textarea
              className="qw-textarea"
              rows={3}
              style={{ marginTop: 0 }}
              value={contact.message}
              onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
              placeholder="Anything else we should know? (optional)"
            />
          </label>
        </div>
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
      <div className="qw-modal" role="dialog" aria-modal="true" aria-label="Request a bid from Salyers Construction" onClick={(e) => e.stopPropagation()}>
        {/* header */}
        <div className="qw-head">
          <div className="qw-brand">
            <Logo light />
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
            <span className="qw-foot-trust">California B1 #{CONTACT.license.replace(/\D/g, "")} · No obligation</span>
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
          if (initialPath) {
            setStarted(true);
            setPath(initialPath);
          }
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
