"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Lightweight click-to-play YouTube facade. Shows the video thumbnail + a play
 * button; only loads the (privacy-friendly, no-cookie) iframe after a click — so
 * pages with a video carry ~0 third-party weight until the user opts in.
 */
export function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <div className="yt-lite yt-lite--playing">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="yt-lite" onClick={() => setPlay(true)} aria-label={`Play video: ${title}`}>
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 860px"
        style={{ objectFit: "cover" }}
      />
      <span className="yt-lite-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
