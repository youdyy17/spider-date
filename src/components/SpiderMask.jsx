/**
 * Bouncing, glowing Spider-Man mask with a photo clipped inside it and a tiny
 * spider perched on the top-right edge.
 *
 * @param {{ faceSrc: string }} props - URL of the image shown inside the mask.
 */
export default function SpiderMask({ faceSrc }) {
  const maskOutline =
    'M90 6 C140 6 168 46 168 96 C168 152 134 194 90 194 C46 194 12 152 12 96 C12 46 40 6 90 6 Z';

  return (
    <div className="animate-mask-bounce">
      <svg viewBox="0 0 180 200" width="164" height="182" className="animate-mask-glow">
        <defs>
          <clipPath id="gfclip">
            <path d={maskOutline} />
          </clipPath>
        </defs>

        {/* Red base, photo, faint web, then the dark + red outlines. */}
        <path d={maskOutline} fill="#d6181f" />
        <g clipPath="url(#gfclip)">
          <image
            href={faceSrc}
            x="7"
            y="-5-12"
            width="180"
            height="240"
            preserveAspectRatio="xMidYMid slice"
            transform="translate(90 100) rotate(45) scale(2.3) translate(-79 -94)"
          />
        </g>
        <g clipPath="url(#gfclip)" stroke="#ff0000" fill="none" strokeWidth="1" opacity="0.5">
          <line x1="90" y1="100" x2="90" y2="4" />
          <line x1="90" y1="100" x2="170" y2="40" />
          <line x1="90" y1="100" x2="180" y2="104" />
          <line x1="90" y1="100" x2="150" y2="184" />
          <line x1="90" y1="100" x2="30" y2="184" />
          <line x1="90" y1="100" x2="0" y2="104" />
          <line x1="90" y1="100" x2="10" y2="40" />
          <circle cx="90" cy="100" r="78" />
          <circle cx="90" cy="100" r="50" />
        </g>
        <path d={maskOutline} fill="none" stroke="#08080f" strokeWidth="9" />
        <path d={maskOutline} fill="none" stroke="#e11b22" strokeWidth="3.5" />

        {/* Tiny spider clinging to the top-right rim. */}
        <g transform="translate(150,26)">
          <g stroke="#08080f" strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path d="M0 2 C-5 -2 -9 -2 -13 -7" />
            <path d="M0 2 C-5 0 -10 1 -15 1" />
            <path d="M0 2 C-5 4 -10 7 -13 12" />
            <path d="M0 2 C-3 6 -3 9 -5 14" />
            <path d="M0 2 C5 -2 9 -2 13 -7" />
            <path d="M0 2 C5 0 10 1 15 1" />
            <path d="M0 2 C5 4 10 7 13 12" />
            <path d="M0 2 C3 6 3 9 5 14" />
          </g>
          <ellipse cx="0" cy="3" rx="5" ry="6.5" fill="#08080f" />
          <circle cx="0" cy="-5" r="3.6" fill="#08080f" />
          <circle cx="-1.4" cy="-5.4" r=".9" fill="#e11b22" />
          <circle cx="1.4" cy="-5.4" r=".9" fill="#e11b22" />
        </g>
      </svg>
    </div>
  );
}
