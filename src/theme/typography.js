/**
 * Centralised typography constants for the spider-date app.
 *
 * Each entry encodes only font-family, size, weight, style, leading, tracking,
 * and text-shadow — NOT colours, layout, or spacing. Compose with colour and
 * structural classes at the call site so the same scale token can be reused
 * in different colour contexts.
 *
 * Tailwind scans this file as a content source, so every full class name here
 * is included in the generated CSS even when used via template-literal imports.
 */

// ── Text-shadow values ──────────────────────────────────────────────────────
// Written in Tailwind arbitrary-value syntax so they drop straight into className.

export const shadows = {
  // 3-layer comic stack (hero headings on dark backgrounds)
  hero:    '[text-shadow:4px_4px_0_#e11b22,-2px_-2px_0_#2b59c3,6px_6px_0_#08080f]',
  // 3-layer comic stack (ticket celebration heading — slightly tighter)
  comic:   '[text-shadow:3px_3px_0_#e11b22,-2px_-2px_0_#2b59c3,5px_5px_0_#08080f]',
  // 2-layer comic stack (loading overlay caption)
  comicSm: '[text-shadow:3px_3px_0_#e11b22,-1px_-1px_0_#2b59c3]',
  // Solid dark outline (quote footer on dark background)
  outline: '[text-shadow:2px_2px_0_#08080f]',
  // Subtle inset tint (card headings on cream/paper backgrounds)
  card:    '[text-shadow:2px_2px_0_rgba(8,8,15,.15)]',
  // Soft glow (body copy on night-sky background)
  body:    '[text-shadow:0_2px_8px_rgba(0,0,0,.6)]',
};

// ── Semantic type-scale constants ───────────────────────────────────────────

export const type = {
  // ── Bangers (display) ────────────────────────────────────────────────────

  // Page hero heading — "Hey Amra... 🕷️❤️"
  heroHeading:
    `font-bangers text-[clamp(46px,11vw,104px)] leading-[0.96] tracking-[2px] ${shadows.hero}`,

  // Ticket celebration heading — "Date locked in! 🎟️🕷️💖"
  ticketTitle:
    `font-bangers text-[clamp(30px,7vw,58px)] leading-none tracking-[1.5px] ${shadows.comic}`,

  // Start screen CTA button
  startBtn: 'font-bangers text-[clamp(30px,7vw,46px)] tracking-[2.5px]',

  // Card main heading, large — ProposalCard question
  cardHeadingLg:
    `font-bangers text-[clamp(26px,5vw,40px)] leading-[1.05] tracking-[1px] ${shadows.card}`,

  // Card main heading, medium — MovieDateForm heading
  cardHeadingMd:
    `font-bangers text-[clamp(24px,5vw,34px)] leading-[1.05] tracking-[1px] ${shadows.card}`,

  // Ticket inner subtitle — "SPIDER-MAN TICKET"
  ticketSubtitle: 'font-bangers text-[clamp(24px,5.5vw,34px)] leading-none tracking-[1.5px]',

  // Form submit button
  sectionBtn: 'font-bangers text-[clamp(22px,5vw,28px)] tracking-[2px]',

  // Loading overlay caption (slightly taller max than sectionBtn)
  loadingCaption: 'font-bangers text-[clamp(22px,5vw,32px)] tracking-[2px]',

  // Print / Download action buttons
  actionBtnSm: 'font-bangers text-[22px] tracking-[1.5px]',

  // Movie title inside ticket body
  ticketMovieTitle: 'font-bangers text-[clamp(20px,5vw,28px)] leading-[1.05] tracking-[1px]',

  // Quote footer heading
  quoteHeading:
    `font-bangers text-[clamp(18px,3vw,24px)] leading-[1.25] tracking-[1px] ${shadows.outline}`,

  // In-form Spider-Man quote
  formQuote: 'font-bangers text-[clamp(17px,3.4vw,21px)] leading-[1.15] tracking-[0.5px]',

  // Ticket closing quote blurb
  ticketSmallBody: 'font-bangers text-[clamp(13px,3vw,16px)] leading-snug tracking-[0.5px]',

  // YES / NO action buttons
  actionBtnLg: 'font-bangers text-[30px] tracking-[2px]',

  // Form field section label ("1. Movie Theater 📍")
  fieldLabel: 'font-bangers text-[19px] tracking-[1.5px]',

  // Panel header badge ("THE BIG QUESTION", "BOOK OUR DATE")
  panelBadge: 'font-bangers text-[15px] tracking-[1.5px]',

  // Ticket serial number
  ticketSerial: 'font-bangers text-[16px] tracking-[1px]',

  // "ADMIT ONE" stamp (small rotated badge)
  ticketAdmit: 'font-bangers text-[12px] leading-[1.05] tracking-[1px]',

  // ── Nunito (body) ────────────────────────────────────────────────────────

  // Page sub-headline italic body copy
  bodyLg:
    `font-nunito text-[clamp(17px,2.6vw,23px)] font-bold italic ${shadows.body}`,

  // Card paragraph body text
  bodyMd: 'font-nunito text-[17px] font-bold leading-[1.5]',

  // Standard form text, labels, selects
  bodyBase: 'font-nunito text-[15px] font-bold',

  // Form inputs / textareas (includes placeholder variant)
  bodyInput:
    'font-nunito text-[15px] font-bold placeholder:font-normal placeholder:italic',

  // Selectable chip button label
  chip: 'font-nunito text-[15px] font-extrabold tracking-[0.3px]',

  // Ticket row value
  ticketValue: 'font-nunito text-[15.5px] font-extrabold leading-tight',

  // Speech / message bubble
  bubble: 'font-nunito text-[15.5px] font-extrabold leading-[1.4]',

  // Attribution / small quote text within cards
  bodyChip: 'font-nunito text-[13.5px] font-bold',

  // Footer byline
  byline: 'font-nunito text-[14px] font-bold italic',

  // Helper / hint text below form fields
  bodyHelper: 'font-nunito text-[12.5px] font-bold italic',

  // Ticket row label — uppercase stamp, standard spacing
  ticketLabel: 'font-nunito text-[11px] font-extrabold uppercase tracking-[1.5px]',

  // Ticket row label — wider tracking variant ("🎟️ Admit One")
  ticketLabelWide: 'font-nunito text-[11px] font-extrabold uppercase tracking-[2px]',

  // Smaller stub section labels ("Scan at entrance", "Ticket No.")
  ticketLabelSm: 'font-nunito text-[10px] font-extrabold uppercase tracking-[1.5px]',
};
