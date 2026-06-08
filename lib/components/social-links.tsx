import { SOCIAL } from "@/lib/contact";

/** Footer social icons (Facebook + LinkedIn). Renders nothing if no URLs are set. */
export function SocialLinks({ className = "" }: { className?: string }) {
  if (!SOCIAL.facebook && !SOCIAL.linkedin) return null;
  return (
    <div className={`social-links ${className}`.trim()}>
      {SOCIAL.facebook ? (
        <a
          href={SOCIAL.facebook}
          aria-label="Belzona of Baton Rouge on Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
          </svg>
        </a>
      ) : null}
      {SOCIAL.linkedin ? (
        <a
          href={SOCIAL.linkedin}
          aria-label="Belzona of Baton Rouge on LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
        </a>
      ) : null}
    </div>
  );
}
