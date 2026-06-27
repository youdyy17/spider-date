import { forwardRef } from 'react';

/** Full-screen, click-through canvas used by `useConfetti` for the burst. */
const ConfettiCanvas = forwardRef(function ConfettiCanvas(_props, ref) {
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[999] h-full w-full"
    />
  );
});

export default ConfettiCanvas;
