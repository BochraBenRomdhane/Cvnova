"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 100; // try for ~10s total to be robust on prod

    const tryScroll = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      const id = hash ? decodeURIComponent(hash.replace(/^#/, "")) : "";
      if (!id) return true; // nothing to do

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    // initial attempt and retry until the target exists (for dynamically loaded sections)
    let interval: ReturnType<typeof setInterval> | null = null;
    if (!tryScroll()) {
      interval = setInterval(() => {
        attempts += 1;
        if (tryScroll() || attempts >= maxAttempts) {
          if (interval) clearInterval(interval);
        }
      }, 100);
    }

    // Use a MutationObserver as a fallback to catch late DOM insertions
    const observer = new MutationObserver(() => {
      if (tryScroll()) {
        observer.disconnect();
        if (interval) clearInterval(interval);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (interval) clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // also handle in-page hash changes without navigation
  useEffect(() => {
    const onHashChange = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}


