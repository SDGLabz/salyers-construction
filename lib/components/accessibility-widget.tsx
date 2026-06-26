"use client";
// Accessibility widget for Salyers Construction.
//
// A fixed launcher button + a focus-trapped slide-in panel (branded header →
// one-click profiles → icon-tile adjustment grids → footer). The settings store
// + effect-applier live here; a single effect reflects the current settings onto
// <html> as classes + CSS vars, and the page-level visual overrides live in
// globals.css (the `a11y-*` rules). The widget's OWN chrome is styled with a
// dedicated, self-contained `.aw-*` stylesheet (also in globals.css) rather than
// Tailwind utilities — this codebase's unlayered base/reset rules override the
// utilities layer, so the widget owns its styling outright. Choices persist to
// localStorage under `salyers:a11y`.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Link from "next/link";
import {
  Accessibility,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Baseline,
  BookOpen,
  Brain,
  Check,
  Columns,
  Contrast,
  Droplet,
  Droplets,
  Ear,
  Eye,
  EyeOff,
  Focus,
  Globe,
  Heading,
  ImageOff,
  Keyboard,
  Link2,
  Minus,
  Moon,
  MousePointer2,
  MousePointerClick,
  MoveHorizontal,
  MoveVertical,
  PaintBucket,
  Palette,
  PanelTopClose,
  PauseCircle,
  Plus,
  RotateCcw,
  Sun,
  Type,
  Users,
  VolumeX,
  X,
  Zap,
  ZoomIn,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/lib/components/logo";

// Tiny conditional-classname helper (no clsx dependency).
function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ============================================================
   State store — settings shape, defaults, profiles, context.
   ============================================================ */

export type TextAlign = "default" | "left" | "center" | "right";
export type Contrast = "default" | "dark" | "light" | "high";
export type Saturation = "default" | "high" | "low" | "mono";
export type BigCursor = "default" | "black" | "white";

export interface A11ySettings {
  fontScale: number; // -2..+5; 0 = default
  lineHeight: number; // 0..3; 0 = default
  letterSpacing: number; // 0..3; 0 = default
  readableFont: boolean;
  highlightLinks: boolean;
  highlightTitles: boolean;
  textAlign: TextAlign;
  textMagnifier: boolean;
  contrast: Contrast;
  saturation: Saturation;
  recolorText: string | null;
  recolorTitle: string | null;
  recolorBg: string | null;
  stopAnimations: boolean;
  hideImages: boolean;
  bigCursor: BigCursor;
  highlightFocus: boolean;
  highlightHover: boolean;
  muteSounds: boolean;
  readingGuide: boolean;
  readingMask: boolean;
  readMode: boolean;
}

// One-click profiles. Each bundles a set of the settings above; turning one ON
// merges its `apply`, turning it OFF reverts exactly those keys to DEFAULTS.
export type ProfileKey =
  | "seizureSafe"
  | "visionImpaired"
  | "adhdFriendly"
  | "cognitive"
  | "keyboardNav"
  | "blindUsers"
  | "olderAdults";

const PROFILE_APPLY: Record<ProfileKey, Partial<A11ySettings>> = {
  seizureSafe: { stopAnimations: true, saturation: "low" },
  visionImpaired: {
    fontScale: 2,
    contrast: "high",
    highlightLinks: true,
    lineHeight: 1,
  },
  adhdFriendly: { readingMask: true, saturation: "low", highlightLinks: true },
  cognitive: {
    readableFont: true,
    highlightTitles: true,
    highlightLinks: true,
    readingGuide: true,
  },
  keyboardNav: { highlightFocus: true },
  blindUsers: { highlightLinks: true, highlightFocus: true, readableFont: true },
  olderAdults: {
    fontScale: 2,
    lineHeight: 1,
    readableFont: true,
    highlightLinks: true,
    bigCursor: "black",
  },
};

const PROFILE_ORDER: ProfileKey[] = [
  "seizureSafe",
  "visionImpaired",
  "adhdFriendly",
  "cognitive",
  "keyboardNav",
  "blindUsers",
  "olderAdults",
];

const DEFAULTS: A11ySettings = {
  fontScale: 0,
  lineHeight: 0,
  letterSpacing: 0,
  readableFont: false,
  highlightLinks: false,
  highlightTitles: false,
  textAlign: "default",
  textMagnifier: false,
  contrast: "default",
  saturation: "default",
  recolorText: null,
  recolorTitle: null,
  recolorBg: null,
  stopAnimations: false,
  hideImages: false,
  bigCursor: "default",
  highlightFocus: false,
  highlightHover: false,
  muteSounds: false,
  readingGuide: false,
  readingMask: false,
  readMode: false,
};

const STORAGE_KEY = "salyers:a11y";
const FONT_STEP = 0.1; // 10% per step
const LINE_HEIGHTS = ["", "1.5", "1.75", "2"]; // indexed by step (0 = default)
const LETTER_SPACINGS = ["", "0.05em", "0.1em", "0.15em"];

type StepKey = "fontScale" | "lineHeight" | "letterSpacing";
const STEP_RANGE: Record<StepKey, [number, number]> = {
  fontScale: [-2, 5],
  lineHeight: [0, 3],
  letterSpacing: [0, 3],
};

interface A11yContextValue {
  settings: A11ySettings;
  set: <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => void;
  step: (key: StepKey, dir: 1 | -1) => void;
  reset: () => void;
  activeProfiles: Set<ProfileKey>;
  applyProfile: (key: ProfileKey, on: boolean) => void;
  activeCount: number;
}

const Ctx = createContext<A11yContextValue | null>(null);

function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const [activeProfiles, setActiveProfiles] = useState<Set<ProfileKey>>(
    () => new Set(),
  );
  const [hydrated, setHydrated] = useState(false);

  // Load any persisted choices once on mount. Active profiles ride the same
  // serialized object under a reserved `_profiles` array.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<A11ySettings> & {
          _profiles?: ProfileKey[];
        };
        const { _profiles, ...rest } = parsed;
        setSettings({ ...DEFAULTS, ...rest });
        if (Array.isArray(_profiles)) {
          setActiveProfiles(
            new Set(_profiles.filter((p) => p in PROFILE_APPLY)),
          );
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Persist + apply to <html> whenever settings change.
  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...settings, _profiles: [...activeProfiles] }),
        );
      } catch {}
    }
    const html = document.documentElement;

    html.style.setProperty(
      "--a11y-font-scale",
      String(1 + settings.fontScale * FONT_STEP),
    );
    html.classList.toggle("a11y-font-scaled", settings.fontScale !== 0);

    if (settings.lineHeight > 0) {
      html.style.setProperty(
        "--a11y-line-height",
        LINE_HEIGHTS[settings.lineHeight],
      );
    }
    html.classList.toggle("a11y-line-height", settings.lineHeight > 0);

    if (settings.letterSpacing > 0) {
      html.style.setProperty(
        "--a11y-letter-spacing",
        LETTER_SPACINGS[settings.letterSpacing],
      );
    }
    html.classList.toggle("a11y-letter-spacing", settings.letterSpacing > 0);

    html.classList.toggle("a11y-readable-font", settings.readableFont);
    html.classList.toggle("a11y-highlight-links", settings.highlightLinks);
    html.classList.toggle("a11y-highlight-titles", settings.highlightTitles);

    html.classList.toggle("a11y-align-left", settings.textAlign === "left");
    html.classList.toggle("a11y-align-center", settings.textAlign === "center");
    html.classList.toggle("a11y-align-right", settings.textAlign === "right");

    html.classList.toggle("a11y-contrast-dark", settings.contrast === "dark");
    html.classList.toggle("a11y-contrast-light", settings.contrast === "light");
    html.classList.toggle("a11y-contrast-high", settings.contrast === "high");

    html.classList.toggle("a11y-saturate-high", settings.saturation === "high");
    html.classList.toggle("a11y-saturate-low", settings.saturation === "low");
    html.classList.toggle("a11y-saturate-mono", settings.saturation === "mono");

    if (settings.recolorText) {
      html.style.setProperty("--a11y-recolor-text", settings.recolorText);
    }
    html.classList.toggle("a11y-recolor-text", settings.recolorText !== null);
    if (settings.recolorTitle) {
      html.style.setProperty("--a11y-recolor-title", settings.recolorTitle);
    }
    html.classList.toggle("a11y-recolor-title", settings.recolorTitle !== null);
    if (settings.recolorBg) {
      html.style.setProperty("--a11y-recolor-bg", settings.recolorBg);
    }
    html.classList.toggle("a11y-recolor-bg", settings.recolorBg !== null);

    html.classList.toggle("a11y-stop-motion", settings.stopAnimations);
    html.classList.toggle("a11y-hide-images", settings.hideImages);
    html.classList.toggle("a11y-cursor-black", settings.bigCursor === "black");
    html.classList.toggle("a11y-cursor-white", settings.bigCursor === "white");
    html.classList.toggle("a11y-highlight-focus", settings.highlightFocus);
    html.classList.toggle("a11y-highlight-hover", settings.highlightHover);
    html.classList.toggle("a11y-read-mode", settings.readMode);
  }, [settings, activeProfiles, hydrated]);

  const set = useCallback(
    <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
      setSettings((s) => ({ ...s, [key]: value }));
    },
    [],
  );

  const step = useCallback((key: StepKey, dir: 1 | -1) => {
    setSettings((s) => {
      const [min, max] = STEP_RANGE[key];
      return { ...s, [key]: Math.max(min, Math.min(max, s[key] + dir)) };
    });
  }, []);

  const applyProfile = useCallback((key: ProfileKey, on: boolean) => {
    const bundle = PROFILE_APPLY[key];
    setSettings((s) => {
      if (on) return { ...s, ...bundle };
      const next = { ...s };
      (Object.keys(bundle) as (keyof A11ySettings)[]).forEach((k) => {
        (next[k] as A11ySettings[typeof k]) = DEFAULTS[k];
      });
      return next;
    });
    setActiveProfiles((prev) => {
      const next = new Set(prev);
      if (on) next.add(key);
      else next.delete(key);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULTS);
    setActiveProfiles(new Set());
  }, []);

  const activeCount =
    (settings.fontScale !== 0 ? 1 : 0) +
    (settings.lineHeight !== 0 ? 1 : 0) +
    (settings.letterSpacing !== 0 ? 1 : 0) +
    (settings.readableFont ? 1 : 0) +
    (settings.highlightLinks ? 1 : 0) +
    (settings.highlightTitles ? 1 : 0) +
    (settings.textAlign !== "default" ? 1 : 0) +
    (settings.textMagnifier ? 1 : 0) +
    (settings.contrast !== "default" ? 1 : 0) +
    (settings.saturation !== "default" ? 1 : 0) +
    (settings.recolorText !== null ? 1 : 0) +
    (settings.recolorTitle !== null ? 1 : 0) +
    (settings.recolorBg !== null ? 1 : 0) +
    (settings.stopAnimations ? 1 : 0) +
    (settings.hideImages ? 1 : 0) +
    (settings.bigCursor !== "default" ? 1 : 0) +
    (settings.highlightFocus ? 1 : 0) +
    (settings.highlightHover ? 1 : 0) +
    (settings.muteSounds ? 1 : 0) +
    (settings.readingGuide ? 1 : 0) +
    (settings.readingMask ? 1 : 0) +
    (settings.readMode ? 1 : 0);

  return (
    <Ctx.Provider
      value={{ settings, set, step, reset, activeProfiles, applyProfile, activeCount }}
    >
      {children}
    </Ctx.Provider>
  );
}

function useA11y(): A11yContextValue {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useA11y must be used within <AccessibilityProvider>");
  return ctx;
}

/* ============================================================
   Widget — launcher + panel.
   ============================================================ */

export function AccessibilityWidget() {
  return (
    <AccessibilityProvider>
      <Widget />
    </AccessibilityProvider>
  );
}

function Widget() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { settings, activeCount } = useA11y();
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Close with the genie-out animation before unmounting the panel (timeout
  // matches the .aw-panel-out animation duration in globals.css).
  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 560);
  }, []);

  // "Hide Interface" removes the widget for this page session; a reload
  // restores it (deliberately not persisted, so it can't be lost for good).
  if (hidden) return null;

  return (
    <>
      <button
        ref={launcherRef}
        data-a11y-launcher
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open accessibility menu"
        onClick={() => setOpen(true)}
        className="aw-fab"
      >
        <Accessibility aria-hidden className="aw-fab__icon" />
        {activeCount > 0 && (
          <span aria-hidden className="aw-fab__badge">
            {activeCount}
          </span>
        )}
      </button>

      {settings.textMagnifier && <TextMagnifier />}
      {settings.muteSounds && <MuteSounds />}
      {settings.readingGuide && <ReadingGuide />}
      {settings.readingMask && <ReadingMask />}

      {open && (
        <Panel
          closing={closing}
          onClose={close}
          onHide={() => {
            setOpen(false);
            setClosing(false);
            setHidden(true);
          }}
          launcherRef={launcherRef}
        />
      )}
    </>
  );
}

function Panel({
  closing,
  onClose,
  onHide,
  launcherRef,
}: {
  closing: boolean;
  onClose: () => void;
  onHide: () => void;
  launcherRef: RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { settings, set, step, reset, activeCount, activeProfiles, applyProfile } =
    useA11y();

  // Focus the close button on open; restore focus to the launcher on close.
  // The launcher button is stable for the widget's lifetime, so capturing it
  // here and focusing it on cleanup restores focus correctly.
  useEffect(() => {
    const launcher = launcherRef.current;
    const id = window.requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(id);
      launcher?.focus?.();
    };
  }, [launcherRef]);

  // Escape to close + Tab focus trap within the dialog.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const nodes = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const stepLabel = (n: number, plus = false) =>
    n === 0 ? "Default" : `${plus && n > 0 ? "+" : ""}${n}`;

  return (
    <div className="aw-overlay">
      <div
        className={cx("aw-backdrop", closing ? "aw-fade-out" : "aw-fade-in")}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility menu"
        className={cx("aw-panel", closing ? "aw-panel-out" : "aw-panel-in")}
      >
        {/* Header */}
        <div className="aw-head">
          <div className="aw-head__bar">
            <Logo light />
            <div className="aw-head__controls">
              <HeaderBtn
                onClick={reset}
                disabled={activeCount === 0}
                label="Reset all settings"
                icon={<RotateCcw aria-hidden />}
              />
              <HeaderBtn
                onClick={onHide}
                label="Hide accessibility interface"
                icon={<EyeOff aria-hidden />}
              />
              <HeaderBtn
                ref={closeBtnRef}
                onClick={onClose}
                label="Close accessibility menu"
                icon={<X aria-hidden />}
              />
            </div>
          </div>
          <div className="aw-head__title">
            <span className="aw-head__badge">
              <Accessibility aria-hidden />
            </span>
            <div>
              <h2>Accessibility Adjustments</h2>
              <p>Make this site work for you</p>
            </div>
          </div>
          {activeCount > 0 && (
            <div className="aw-head__count">
              <span>{activeCount}</span> active adjustment
              {activeCount === 1 ? "" : "s"}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="aw-body">
          {/* Profiles */}
          <SectionBlock title="Accessibility profiles">
            <div role="group" aria-label="Accessibility profiles" className="aw-profiles">
              {PROFILE_ORDER.map((key) => {
                const p = PROFILE_META[key];
                return (
                  <ProfileRow
                    key={key}
                    title={p.title}
                    desc={p.desc}
                    icon={<p.icon aria-hidden />}
                    checked={activeProfiles.has(key)}
                    onChange={(v) => applyProfile(key, v)}
                  />
                );
              })}
            </div>
          </SectionBlock>

          {/* Content adjustments */}
          <SectionBlock title="Content adjustments">
            <div className="aw-grid">
              <StepTile
                label="Bigger Text"
                icon={<Type aria-hidden />}
                display={stepLabel(settings.fontScale, true)}
                active={settings.fontScale !== 0}
                onDec={() => step("fontScale", -1)}
                onInc={() => step("fontScale", 1)}
              />
              <StepTile
                label="Line Height"
                icon={<MoveVertical aria-hidden />}
                display={stepLabel(settings.lineHeight)}
                active={settings.lineHeight !== 0}
                onDec={() => step("lineHeight", -1)}
                onInc={() => step("lineHeight", 1)}
              />
              <StepTile
                label="Letter Spacing"
                icon={<MoveHorizontal aria-hidden />}
                display={stepLabel(settings.letterSpacing)}
                active={settings.letterSpacing !== 0}
                onDec={() => step("letterSpacing", -1)}
                onInc={() => step("letterSpacing", 1)}
              />
              <Tile
                label="Readable Font"
                icon={<Baseline aria-hidden />}
                active={settings.readableFont}
                onClick={() => set("readableFont", !settings.readableFont)}
              />
              <Tile
                label="Highlight Links"
                icon={<Link2 aria-hidden />}
                active={settings.highlightLinks}
                onClick={() => set("highlightLinks", !settings.highlightLinks)}
              />
              <Tile
                label="Highlight Titles"
                icon={<Heading aria-hidden />}
                active={settings.highlightTitles}
                onClick={() => set("highlightTitles", !settings.highlightTitles)}
              />
              <Tile
                label="Text Magnifier"
                icon={<ZoomIn aria-hidden />}
                active={settings.textMagnifier}
                onClick={() => set("textMagnifier", !settings.textMagnifier)}
              />
              <Tile
                label="Align Left"
                icon={<AlignLeft aria-hidden />}
                active={settings.textAlign === "left"}
                onClick={() => toggleAlign(set, settings.textAlign, "left")}
              />
              <Tile
                label="Align Center"
                icon={<AlignCenter aria-hidden />}
                active={settings.textAlign === "center"}
                onClick={() => toggleAlign(set, settings.textAlign, "center")}
              />
              <Tile
                label="Align Right"
                icon={<AlignRight aria-hidden />}
                active={settings.textAlign === "right"}
                onClick={() => toggleAlign(set, settings.textAlign, "right")}
              />
            </div>
          </SectionBlock>

          {/* Color adjustments */}
          <SectionBlock title="Color adjustments">
            <div className="aw-grid">
              <Tile
                label="Dark Contrast"
                icon={<Moon aria-hidden />}
                active={settings.contrast === "dark"}
                onClick={() => toggleContrast(set, settings.contrast, "dark")}
              />
              <Tile
                label="Light Contrast"
                icon={<Sun aria-hidden />}
                active={settings.contrast === "light"}
                onClick={() => toggleContrast(set, settings.contrast, "light")}
              />
              <Tile
                label="High Contrast"
                icon={<Contrast aria-hidden />}
                active={settings.contrast === "high"}
                onClick={() => toggleContrast(set, settings.contrast, "high")}
              />
              <Tile
                label="High Saturation"
                icon={<Droplets aria-hidden />}
                active={settings.saturation === "high"}
                onClick={() => toggleSaturation(set, settings.saturation, "high")}
              />
              <Tile
                label="Low Saturation"
                icon={<Droplet aria-hidden />}
                active={settings.saturation === "low"}
                onClick={() => toggleSaturation(set, settings.saturation, "low")}
              />
              <Tile
                label="Monochrome"
                icon={<Palette aria-hidden />}
                active={settings.saturation === "mono"}
                onClick={() => toggleSaturation(set, settings.saturation, "mono")}
              />
            </div>
            <div className="aw-swatches">
              <SwatchRow
                label="Text Color"
                icon={<Type aria-hidden />}
                value={settings.recolorText}
                onChange={(v) => set("recolorText", v)}
              />
              <SwatchRow
                label="Title Color"
                icon={<Heading aria-hidden />}
                value={settings.recolorTitle}
                onChange={(v) => set("recolorTitle", v)}
              />
              <SwatchRow
                label="Background"
                icon={<PaintBucket aria-hidden />}
                value={settings.recolorBg}
                onChange={(v) => set("recolorBg", v)}
              />
            </div>
          </SectionBlock>

          {/* Orientation adjustments */}
          <SectionBlock title="Orientation adjustments">
            <div className="aw-grid">
              <Tile
                label="Mute Sounds"
                icon={<VolumeX aria-hidden />}
                active={settings.muteSounds}
                onClick={() => set("muteSounds", !settings.muteSounds)}
              />
              <Tile
                label="Hide Images"
                icon={<ImageOff aria-hidden />}
                active={settings.hideImages}
                onClick={() => set("hideImages", !settings.hideImages)}
              />
              <Tile
                label="Read Mode"
                icon={<BookOpen aria-hidden />}
                active={settings.readMode}
                onClick={() => set("readMode", !settings.readMode)}
              />
              <Tile
                label="Reading Guide"
                icon={<Columns aria-hidden />}
                active={settings.readingGuide}
                onClick={() => set("readingGuide", !settings.readingGuide)}
              />
              <Tile
                label="Reading Mask"
                icon={<PanelTopClose aria-hidden />}
                active={settings.readingMask}
                onClick={() => set("readingMask", !settings.readingMask)}
              />
              <Tile
                label="Stop Animations"
                icon={<PauseCircle aria-hidden />}
                active={settings.stopAnimations}
                onClick={() => set("stopAnimations", !settings.stopAnimations)}
              />
              <Tile
                label="Highlight Focus"
                icon={<Focus aria-hidden />}
                active={settings.highlightFocus}
                onClick={() => set("highlightFocus", !settings.highlightFocus)}
              />
              <Tile
                label="Highlight Hover"
                icon={<MousePointerClick aria-hidden />}
                active={settings.highlightHover}
                onClick={() => set("highlightHover", !settings.highlightHover)}
              />
              <Tile
                label="Big Black Cursor"
                icon={<MousePointer2 aria-hidden />}
                active={settings.bigCursor === "black"}
                onClick={() => toggleCursor(set, settings.bigCursor, "black")}
              />
              <Tile
                label="Big White Cursor"
                icon={<MousePointer2 aria-hidden />}
                active={settings.bigCursor === "white"}
                onClick={() => toggleCursor(set, settings.bigCursor, "white")}
              />
            </div>
          </SectionBlock>
        </div>

        {/* Footer */}
        <div className="aw-foot">
          <button
            type="button"
            onClick={reset}
            disabled={activeCount === 0}
            className="aw-foot__reset"
          >
            <RotateCcw aria-hidden />
            Reset all settings
          </button>
          <div className="aw-foot__row">
            <Link href="/accessibility" onClick={onClose} className="aw-foot__link">
              Accessibility Statement
            </Link>
            <span className="aw-foot__lang">
              <Globe aria-hidden /> English
            </span>
          </div>
          <p className="aw-foot__by">
            Accessibility tools by <span>Salyers Construction</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- single-select group helpers (flattened to tiles) ---------- */

type SetFn = A11yContextValue["set"];

function toggleAlign(set: SetFn, current: TextAlign, value: TextAlign) {
  set("textAlign", current === value ? "default" : value);
}
function toggleContrast(set: SetFn, current: Contrast, value: Contrast) {
  set("contrast", current === value ? "default" : value);
}
function toggleSaturation(set: SetFn, current: Saturation, value: Saturation) {
  set("saturation", current === value ? "default" : value);
}
function toggleCursor(set: SetFn, current: BigCursor, value: BigCursor) {
  set("bigCursor", current === value ? "default" : value);
}

/* ---------- header button ---------- */

function HeaderBtn({
  onClick,
  label,
  icon,
  disabled,
  ref,
}: {
  onClick: () => void;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="aw-ctrl"
    >
      {icon}
    </button>
  );
}

/* ---------- section ---------- */

function SectionBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="aw-section">
      <h3 className="aw-section__label">
        <span className="aw-section__tick" aria-hidden />
        {title}
      </h3>
      {children}
    </section>
  );
}

/* ---------- profiles ---------- */

const PROFILE_META: Record<
  ProfileKey,
  { title: string; desc: string; icon: LucideIcon }
> = {
  seizureSafe: {
    title: "Seizure Safe",
    desc: "Clear flashes & reduce color",
    icon: Zap,
  },
  visionImpaired: {
    title: "Vision Impaired",
    desc: "Enhances the site's visuals",
    icon: Eye,
  },
  adhdFriendly: {
    title: "ADHD Friendly",
    desc: "Reduce distractions & improve focus",
    icon: Brain,
  },
  cognitive: {
    title: "Cognitive Disability",
    desc: "Assists with reading & focusing",
    icon: BookOpen,
  },
  keyboardNav: {
    title: "Keyboard Navigation",
    desc: "Use the site with the keyboard",
    icon: Keyboard,
  },
  blindUsers: {
    title: "Blind Users",
    desc: "Optimize for screen readers",
    icon: Ear,
  },
  olderAdults: {
    title: "Older Adults",
    desc: "Larger text & easier reading",
    icon: Users,
  },
};

function ProfileRow({
  title,
  desc,
  icon,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  icon: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const descId = useId();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-describedby={descId}
      onClick={() => onChange(!checked)}
      className={cx("aw-profile", checked && "aw-profile--on")}
    >
      <span className="aw-profile__icon">{icon}</span>
      <span className="aw-profile__text">
        <span className="aw-profile__title">{title}</span>
        <span id={descId} className="aw-profile__desc">
          {desc}
        </span>
      </span>
      <Switch checked={checked} />
    </button>
  );
}

/* ---------- shared switch knob ---------- */

function Switch({ checked }: { checked: boolean }) {
  return (
    <span aria-hidden className={cx("aw-switch", checked && "aw-switch--on")}>
      <span className="aw-switch__knob" />
    </span>
  );
}

/* ---------- adjustment tiles ---------- */

function Tile({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={label}
      onClick={onClick}
      className={cx("aw-tile", active && "aw-tile--on")}
    >
      {active && (
        <span className="aw-tile__check" aria-hidden>
          <Check strokeWidth={3} />
        </span>
      )}
      <span className="aw-tile__icon">{icon}</span>
      <span className="aw-tile__label">{label}</span>
    </button>
  );
}

function StepTile({
  label,
  icon,
  display,
  active,
  onDec,
  onInc,
}: {
  label: string;
  icon: ReactNode;
  display: string;
  active: boolean;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className={cx("aw-step", active && "aw-step--on")}>
      <span className="aw-step__icon">{icon}</span>
      <span className="aw-step__label">{label}</span>
      <span className="aw-step__ctrl">
        <button
          type="button"
          onClick={onDec}
          aria-label={`Decrease ${label}`}
          className="aw-step__btn"
        >
          <Minus aria-hidden />
        </button>
        <span aria-live="polite" className="aw-step__val">
          {display}
        </span>
        <button
          type="button"
          onClick={onInc}
          aria-label={`Increase ${label}`}
          className="aw-step__btn"
        >
          <Plus aria-hidden />
        </button>
      </span>
    </div>
  );
}

/* ---------- recolor swatches ---------- */

const RECOLOR_SWATCHES = [
  "#7c1f1f",
  "#15263f",
  "#0f1d31",
  "#15803d",
  "#ffffff",
  "#000000",
];

function SwatchRow({
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: ReactNode;
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="aw-swatch">
      <div className="aw-swatch__head">
        {icon}
        {label}
      </div>
      <div role="group" aria-label={`${label} color`} className="aw-swatch__dots">
        {RECOLOR_SWATCHES.map((hex) => {
          const sel = value?.toLowerCase() === hex.toLowerCase();
          return (
            <button
              key={hex}
              type="button"
              aria-pressed={sel}
              aria-label={`${label} ${hex}`}
              onClick={() => onChange(sel ? null : hex)}
              className={cx("aw-swatch__dot", sel && "aw-swatch__dot--on")}
              style={{ backgroundColor: hex }}
            />
          );
        })}
        <button
          type="button"
          aria-pressed={value === null}
          onClick={() => onChange(null)}
          className={cx("aw-swatch__none", value === null && "aw-swatch__none--on")}
        >
          None
        </button>
      </div>
    </div>
  );
}

/* ---------- text magnifier ---------- */

function directText(el: Element): string {
  const target =
    (el.closest(
      "p,a,li,span,h1,h2,h3,h4,h5,h6,button,label,td,th,blockquote,figcaption,dt,dd",
    ) as HTMLElement | null) ?? (el as HTMLElement);
  const t = target.innerText?.replace(/\s+/g, " ").trim() ?? "";
  return t.length > 220 ? `${t.slice(0, 220)}…` : t;
}

function TextMagnifier() {
  const [box, setBox] = useState<{ x: number; y: number; text: string } | null>(
    null,
  );

  useEffect(() => {
    let raf = 0;
    function onMove(e: MouseEvent) {
      window.cancelAnimationFrame(raf);
      const cx = e.clientX;
      const cy = e.clientY;
      raf = window.requestAnimationFrame(() => {
        const el = document.elementFromPoint(cx, cy);
        if (
          !el ||
          el.closest("[data-a11y-magnifier]") ||
          el.closest('[role="dialog"]') ||
          el.closest("[data-a11y-launcher]")
        ) {
          setBox(null);
          return;
        }
        const text = directText(el);
        if (text) setBox({ x: cx, y: cy, text });
        else setBox(null);
      });
    }
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  if (!box) return null;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const left = Math.min(Math.max(12, box.x - 24), vw - 360);
  const top = Math.max(12, box.y - 96);
  return (
    <div
      data-a11y-magnifier
      aria-hidden
      className="aw-magnifier"
      style={{ left, top }}
    >
      {box.text}
    </div>
  );
}

/* ---------- mute sounds ---------- */

function MuteSounds() {
  useEffect(() => {
    const silence = (root: ParentNode | Document) => {
      root.querySelectorAll<HTMLMediaElement>("audio, video").forEach((m) => {
        m.muted = true;
        if (!m.paused) {
          try {
            m.pause();
          } catch {}
        }
      });
    };
    silence(document);
    const onPlay = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t && (t instanceof HTMLAudioElement || t instanceof HTMLVideoElement)) {
        t.muted = true;
      }
    };
    document.addEventListener("play", onPlay, true);
    return () => document.removeEventListener("play", onPlay, true);
  }, []);

  return null;
}

/* ---------- reading guide ---------- */

function ReadingGuide() {
  const [y, setY] = useState<number | null>(null);

  useEffect(() => {
    let raf = 0;
    function onMove(e: MouseEvent) {
      const cy = e.clientY;
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => setY(cy));
    }
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  if (y === null) return null;
  return (
    <div data-a11y-reading-guide aria-hidden className="aw-guide" style={{ top: y - 2 }} />
  );
}

/* ---------- reading mask ---------- */

function ReadingMask() {
  const [y, setY] = useState<number | null>(null);

  useEffect(() => {
    let raf = 0;
    function onMove(e: MouseEvent) {
      const cy = e.clientY;
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => setY(cy));
    }
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  if (y === null) return null;
  const half = 60; // ~120px clear strip
  return (
    <div data-a11y-reading-mask aria-hidden className="aw-mask">
      <div className="aw-mask__band" style={{ height: Math.max(0, y - half) }} />
      <div className="aw-mask__band aw-mask__band--bottom" style={{ top: y + half }} />
    </div>
  );
}
