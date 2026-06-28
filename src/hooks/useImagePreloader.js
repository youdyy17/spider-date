import { useEffect, useState } from 'react';

/**
 * Fully fetches *and* decodes a set of images before reporting ready, so the
 * scene can be held back behind a loading state until every asset is paintable.
 *
 * @param {string[]} sources - image URLs to preload.
 * @returns {boolean} `ready` - true once every image has settled (decoded or failed).
 */
export function useImagePreloader(sources) {
  const [ready, setReady] = useState(false);

  // A stable key so the effect only re-runs when the actual list changes.
  const key = sources.join('|');

  useEffect(() => {
    let cancelled = false;

    // Resolve once the image is decoded; fall back to load/error events for
    // browsers without Image.decode(). Never reject — a failed asset shouldn't
    // trap the user on the spinner forever.
    const load = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        if (typeof img.decode === 'function') {
          img.decode().then(resolve, resolve);
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });

    Promise.allSettled(sources.map(load)).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return ready;
}
