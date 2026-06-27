import { useCallback, useEffect, useRef } from 'react';

const COLORS = ['#e11b22', '#2b59c3', '#ffffff', '#ffd23a', '#ff6b9d'];

/**
 * Drives a full-screen confetti burst on a <canvas>.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef - ref to the canvas to draw on.
 * @param {number} count - number of confetti pieces in the initial burst.
 * @returns {() => void} `launch` - call to fire the confetti.
 */
export function useConfetti(canvasRef, count = 240) {
  const rafRef = useRef(0);

  // Stop any in-flight animation when the component unmounts.
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = (canvas.width = window.innerWidth * dpr);
    const H = (canvas.height = window.innerHeight * dpr);

    let parts = [];
    const make = (n) => {
      for (let i = 0; i < n; i++) {
        parts.push({
          x: Math.random() * W,
          y: -20 * dpr - Math.random() * H * 0.35,
          vx: (Math.random() - 0.5) * 7 * dpr,
          vy: (Math.random() * 4 + 3) * dpr,
          s: (Math.random() * 8 + 5) * dpr,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 0.32,
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: Math.random() < 0.5 ? 0 : 1,
        });
      }
    };
    make(count);

    cancelAnimationFrame(rafRef.current);
    const start = performance.now();

    const tick = (t) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, W, H);

      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05 * dpr;
        p.vx *= 0.99;
        p.rot += p.vr;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        if (p.shape === 0) {
          ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.55);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.s * 0.42, 0, 7);
          ctx.fill();
        }
        ctx.restore();
      }

      parts = parts.filter((p) => p.y < H + 40 * dpr);

      // Keep topping up briefly for a fuller initial burst.
      if (elapsed < 600 && Math.random() < 0.35) make(24);

      if (parts.length > 0 && elapsed < 7000) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [canvasRef, count]);
}
