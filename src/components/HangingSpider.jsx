/**
 * A little spider dangling from a silk thread, gently swaying.
 *
 * Class-name props are passed as complete strings so Tailwind's JIT compiler
 * can detect them (it cannot see dynamically-built class names).
 *
 * @param {object} props
 * @param {string} props.positionClass - horizontal anchor, e.g. `left-[16%]`.
 * @param {string} props.swayClass - sway animation utility.
 * @param {string} props.threadClass - thread height utility, e.g. `h-[120px]`.
 * @param {number} props.width - rendered spider width in px.
 * @param {number} props.height - rendered spider height in px.
 * @param {boolean} [props.eyes] - render glowing red eyes.
 */
export default function HangingSpider({
  positionClass,
  swayClass,
  threadClass,
  width,
  height,
  eyes = false,
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute top-0 z-[1] flex origin-top flex-col items-center ${positionClass} ${swayClass}`}
    >
      <div
        className={`w-[1.5px] bg-[linear-gradient(#dfe6ff,rgba(223,230,255,.2))] ${threadClass}`}
      />
      <svg viewBox="0 0 60 52" width={width} height={height}>
        <g stroke="#08080f" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M30 30 C20 24 14 24 6 16" />
          <path d="M30 30 C20 28 12 30 4 30" />
          <path d="M30 30 C20 32 12 38 6 46" />
          <path d="M30 30 C22 36 18 40 14 50" />
          <path d="M30 30 C40 24 46 24 54 16" />
          <path d="M30 30 C40 28 48 30 56 30" />
          <path d="M30 30 C40 32 48 38 54 46" />
          <path d="M30 30 C38 36 42 40 46 50" />
        </g>
        <ellipse cx="30" cy="32" rx="9" ry="12" fill="#08080f" />
        <circle cx="30" cy="17" r="6.5" fill="#08080f" />
        {eyes && (
          <>
            <circle cx="27.5" cy="16" r="1.4" fill="#e11b22" />
            <circle cx="32.5" cy="16" r="1.4" fill="#e11b22" />
          </>
        )}
      </svg>
    </div>
  );
}
