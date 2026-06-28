
import { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import QRCode from 'react-qr-code';

import { playVictorySound } from '../lib/sound.js';
import { type } from '../theme/typography.js';

/** Quarter spider-web tucked into a ticket corner. */
function WebCorner({ className }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <g stroke="#e11b22" fill="none" strokeWidth="1.3" opacity="0.4">
        <line x1="0" y1="0" x2="120" y2="0" />
        <line x1="0" y1="0" x2="110" y2="55" />
        <line x1="0" y1="0" x2="80" y2="80" />
        <line x1="0" y1="0" x2="55" y2="110" />
        <line x1="0" y1="0" x2="0" y2="120" />
        <path d="M30 0 A30 30 0 0 1 0 30" />
        <path d="M58 0 A58 58 0 0 1 0 58" />
        <path d="M88 0 A88 88 0 0 1 0 88" />
      </g>
    </svg>
  );
}

/** One label/value row in the ticket body. */
function TicketRow({ label, value }) {
  return (
    <div className="flex flex-col border-b-2 border-dotted border-[rgba(8,8,15,.2)] pb-2">
      <span className={`${type.ticketLabel} text-[#e11b22]`}>
        {label}
      </span>
      <span className={`${type.ticketValue} text-[#2a2516] [text-wrap:pretty]`}>
        {value}
      </span>
    </div>
  );
}

/**
 * The cinema-style ticket receipt shown after the form is submitted. Fires the
 * celebratory confetti + sound on appear, and supports print + image download.
 *
 * @param {object} props
 * @param {{ movie: string, guest: string, theater: string, date: string, time: string, snack: string, message: string, serial: string }} props.ticket
 * @param {() => void} props.launchConfetti
 */
export default function MovieTicket({ ticket, launchConfetti }) {
  const { movie, guest, theater, date, time, snack, message, serial } = ticket;
  const ticketRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Celebrate the moment the ticket appears.
  useEffect(() => {
    launchConfetti();
    playVictorySound();
  }, [launchConfetti]);

  const handleDownload = async () => {
    if (!ticketRef.current || downloading) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(ticketRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#fff8ef',
      });
      const link = document.createElement('a');
      link.download = `${serial}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Ticket download failed', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mt-10 flex w-full flex-col items-center gap-6">
      <h2 className={`animate-panel-pop-lg text-center ${type.ticketTitle} text-white`}>
        Date locked in! 🎟️🕷️💖
      </h2>

      {/* Glassmorphism frame holding the paper ticket. */}
      <div className="w-full max-w-[600px] rounded-[26px] border border-white/25 bg-white/10 p-3 shadow-[0_18px_50px_rgba(0,0,0,.5)] backdrop-blur-md sm:p-4">
        <div
          ref={ticketRef}
          className="ticket-printable relative flex animate-ticket-reveal flex-col overflow-hidden rounded-[18px] border-[4px] border-[#08080f] bg-[#fff8ef] bg-[radial-gradient(rgba(225,27,34,.06)_1.4px,transparent_1.5px)] bg-[length:15px_15px] shadow-[8px_8px_0_rgba(0,0,0,.4)] sm:flex-row"
        >
          <WebCorner className="-left-1 -top-1 h-[80px] w-[80px]" />
          <WebCorner className="-right-1 -top-1 h-[80px] w-[80px] scale-x-[-1]" />

          {/* Main stub */}
          <div className="relative flex-1 px-[22px] py-6 sm:px-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`${type.ticketLabelWide} text-[#2b59c3]`}>
                  🎟️ Admit One
                </p>
                <h3 className={`${type.ticketSubtitle} text-[#e11b22]`}>
                  SPIDER-MAN TICKET
                </h3>
              </div>
              <span className={`shrink-0 -rotate-[8deg] rounded-md border-[2.5px] border-[#e11b22] px-2 py-[3px] text-center ${type.ticketAdmit} text-[#e11b22]`}>
                ADMIT
                <br />
                ONE
              </span>
            </div>

            <div className="mt-4 rounded-[10px] border-[2.5px] border-[#08080f] bg-[#2b59c3]/10 px-3 py-2.5">
              <span className={`${type.ticketLabel} text-[#e11b22]`}>
                Coming Soon
              </span>
              <p className={`${type.ticketMovieTitle} text-[#08080f]`}>
                {movie}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TicketRow label="Guest" value={guest} />
              <TicketRow label="Theater" value={theater} />
              <TicketRow label="Date" value={date} />
              <TicketRow label="Time" value={time} />
              <TicketRow label="Snack Combo" value={snack} />
              <TicketRow label="Special Message" value={message || 'No secret message submitted'} />
            </div>

            <p className={`mt-4 text-center ${type.ticketSmallBody} text-[#2b59c3]`}>
              &ldquo;Download the ticket and send me. 🕸️❤️&rdquo;
            </p>
          </div>

          {/* Perforation: horizontal divider on mobile, vertical on sm+. */}
          <div className="relative shrink-0 border-t-[3px] border-dashed border-[#08080f] sm:border-l-[3px] sm:border-t-0">
            {/* Mobile notches (ends of the horizontal seam). */}
            <span className="absolute -left-[9px] -top-[9px] h-[18px] w-[18px] rounded-full bg-[#0d1130] sm:hidden" />
            <span className="absolute -right-[9px] -top-[9px] h-[18px] w-[18px] rounded-full bg-[#0d1130] sm:hidden" />
            {/* Desktop notches (ends of the vertical seam). */}
            <span className="absolute -left-[9px] -top-[9px] hidden h-[18px] w-[18px] rounded-full bg-[#0d1130] sm:block" />
            <span className="absolute -bottom-[9px] -left-[9px] hidden h-[18px] w-[18px] rounded-full bg-[#0d1130] sm:block" />
          </div>

          {/* Side stub: QR + serial. */}
          <div className="relative flex flex-row items-center justify-between gap-4 px-[22px] py-5 sm:w-[150px] sm:flex-col sm:justify-center sm:px-4">
            <div className="text-center">
              <p className={`mb-1 ${type.ticketLabelSm} text-[#2b59c3]`}>
                Scan at entrance
              </p>
              <QRCode
                value="https://www.legend.com.kh/movies/HO00000207?hasSession=true"
                size={104}
                fgColor="#08080f"
                bgColor="#ffffff"
                style={{ borderRadius: 6, border: '2.5px solid #08080f', padding: 3 }}
              />
            </div>
            <div className="text-center">
              <p className={`${type.ticketLabelSm} text-[#e11b22]`}>
                Ticket No.
              </p>
              <p className={`${type.ticketSerial} text-[#08080f]`}>{serial}</p>
              <p className="mt-1 text-[18px]">🕷️🕸️</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions — hidden from print + image capture. */}
      <div className="no-print flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => window.print()}
          className={`cursor-pointer rounded-2xl border-4 border-[#08080f] bg-[linear-gradient(160deg,#2b59c3,#1a3c8f)] px-[26px] py-3 ${type.actionBtnSm} text-white shadow-[5px_5px_0_#08080f] transition-transform duration-[120ms] ease-linear hover:-translate-y-[3px] hover:scale-105 active:translate-y-[2px] active:scale-[0.97]`}
        >
          🖨️ Print Ticket
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className={`cursor-pointer rounded-2xl border-4 border-[#08080f] bg-[linear-gradient(160deg,#ff2d36,#c20f16)] px-[26px] py-3 ${type.actionBtnSm} text-white shadow-[5px_5px_0_#08080f] transition-transform duration-[120ms] ease-linear hover:-translate-y-[3px] hover:scale-105 active:translate-y-[2px] active:scale-[0.97] disabled:cursor-wait disabled:opacity-60`}
        >
          {downloading ? 'Saving…' : '⬇️ Download as Image'}
        </button>
      </div>
    </div>
  );
}
