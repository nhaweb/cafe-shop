"use client";

import { useEffect, useRef } from "react";

type FitTextProps = {
  text: string;
  /** Upper bound for the font size in px. */
  max?: number;
  className?: string;
};

/**
 * Scales a single line of text so it spans its container's full width
 * (capped at `max`). Works for any brand name length.
 */
export function FitText({ text, max = 260, className = "" }: FitTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const span = textRef.current;
    if (!wrap || !span) return;

    const fit = () => {
      span.style.fontSize = "100px";
      const ratio = wrap.clientWidth / span.scrollWidth;
      span.style.fontSize = `${Math.min(100 * ratio, max)}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [max, text]);

  return (
    // overflow-x-clip only: keeps Vietnamese diacritics above the tight line box visible.
    <div ref={wrapRef} className="w-full overflow-x-clip">
      <span
        ref={textRef}
        className={`inline-block whitespace-nowrap text-4xl! ${className}`}
      >
        {text}
      </span>
    </div>
  );
}
