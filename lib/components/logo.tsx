// Salyers Construction logo lockup — the Golden Gate bridge mark (twin towers +
// cables, per the official brand kit) plus the Archivo Black wordmark. Uses
// currentColor so it inherits navy on light chrome and white on dark surfaces.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`sc-logo${light ? " sc-logo--light" : ""}`} aria-hidden="true">
      <svg className="sc-logo-mark" viewBox="100 80 200 150" fill="none" focusable="false">
        <path d="M115 105 Q160 145 200 175 Q240 145 285 105" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <path d="M127 175 Q165 180 200 180 Q235 180 273 175" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <rect x="110" y="90" width="22" height="140" rx="2" fill="currentColor" />
        <rect x="268" y="90" width="22" height="140" rx="2" fill="currentColor" />
      </svg>
      <span className="sc-logo-wm">
        <b>SALYERS</b>
        <span>CONSTRUCTION</span>
      </span>
    </span>
  );
}
