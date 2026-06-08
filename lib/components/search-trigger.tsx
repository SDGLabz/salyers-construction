"use client";

// Opens the site search (handled by <SiteSearch> on interior pages, or the
// homepage's inline search) by dispatching a global event. Used in the nav and
// footer so search is reachable everywhere.
function openSearch() {
  window.dispatchEvent(new CustomEvent("belzona:open-search"));
}

export function SearchTrigger({ variant = "pill" }: { variant?: "pill" | "footer" }) {
  if (variant === "footer") {
    return (
      <button type="button" className="sf-search" onClick={openSearch} aria-label="Search the site">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span>Search products, specs, problems…</span>
        <span className="kbd" aria-hidden="true">⌘K</span>
      </button>
    );
  }
  return (
    <button type="button" className="site-search-pill" onClick={openSearch} aria-label="Search products, specs, or problems">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span>Search…</span>
      <span className="kbd" aria-hidden="true">⌘K</span>
    </button>
  );
}
