/**
 * Decorative spider web tucked into a top corner.
 *
 * @param {{ side?: 'left' | 'right' }} props - which corner to anchor to;
 *   the right-hand web is mirrored horizontally.
 */
export default function SpiderWeb({ side = 'left' }) {
  const corner = side === 'left' ? '-left-1.5' : '-right-1.5 scale-x-[-1]';

  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={`absolute -top-1.5 z-[1] h-[220px] w-[220px] opacity-[0.35] ${corner}`}
    >
      <g stroke="#dfe6ff" fill="none" strokeWidth="1.4">
        <line x1="0" y1="0" x2="210" y2="0" />
        <line x1="0" y1="0" x2="200" y2="80" />
        <line x1="0" y1="0" x2="150" y2="150" />
        <line x1="0" y1="0" x2="80" y2="200" />
        <line x1="0" y1="0" x2="0" y2="210" />
        <path d="M48 0 A48 48 0 0 1 0 48" />
        <path d="M92 0 A92 92 0 0 1 0 92" />
        <path d="M138 0 A138 138 0 0 1 0 138" />
        <path d="M184 0 A184 184 0 0 1 0 184" />
      </g>
    </svg>
  );
}
