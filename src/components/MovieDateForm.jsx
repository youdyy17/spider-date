import { useMemo, useState } from 'react';

import { config } from '../config.js';
import { formatTicketDate } from '../lib/ticket.js';
import { type } from '../theme/typography.js';

/** Sentinel option that reveals the free-text snack input. */
const SNACK_OTHER = 'Other (type your own)';

/**
 * A single selectable chip used for time slots and snack combos.
 *
 * @param {{ active: boolean, onClick: () => void, children: React.ReactNode }} props
 */
function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full border-[3px] border-[#08080f] px-[18px] py-[9px] ${type.chip} transition-all duration-150 ease-out hover:-translate-y-[2px] active:translate-y-[1px] ${
        active
          ? 'bg-[linear-gradient(160deg,#ff2d36,#c20f16)] text-white shadow-[4px_4px_0_#08080f] ring-2 ring-[#2b59c3] ring-offset-2 ring-offset-[#fff8ef]'
          : 'bg-white text-[#2a2516] shadow-[3px_3px_0_rgba(8,8,15,.35)] hover:bg-[#fff3df]'
      }`}
    >
      {children}
    </button>
  );
}

/** Small uppercase section heading inside the form card. */
function FieldLabel({ children }) {
  return (
    <span className={`mb-2 block ${type.fieldLabel} text-[#2b59c3]`}>
      {children}
    </span>
  );
}

/**
 * The booking form shown after "YES" — collects theater, time, date, snack and
 * an optional message, then hands the result to `onSubmit`.
 *
 * @param {{ onSubmit: (data: { theater: string, time: string, date: string, snack: string, message: string }) => void }} props
 */
export default function MovieDateForm({ onSubmit }) {
  const { theaters, timeSlots, snackCombos, minDate, movieTitle } = config;

  const [theater, setTheater] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [snackChoice, setSnackChoice] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [message, setMessage] = useState('');

  // Snack is a predefined option, or the free-typed value when "Other" is picked.
  const isOtherSnack = snackChoice === SNACK_OTHER;
  const snack = isOtherSnack ? customSnack.trim() : snackChoice;

  const ready = useMemo(
    () => Boolean(theater && time && date && snack),
    [theater, time, date, snack],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ready) return;
    onSubmit({
      theater,
      time,
      date: formatTicketDate(date),
      snack,
      message: message.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-11 w-full max-w-[600px] -rotate-1 animate-panel-pop rounded-[20px] border-[5px] border-[#08080f] bg-[#fff8ef] bg-[radial-gradient(rgba(225,27,34,.07)_1.4px,transparent_1.5px)] bg-[length:16px_16px] px-[26px] pb-[34px] pt-[40px] text-left shadow-[11px_11px_0_rgba(0,0,0,.45)] sm:px-[30px]"
    >
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 -rotate-3 rounded-[8px] border-[3px] border-[#08080f] bg-[#2b59c3] px-[18px] py-[5px] ${type.panelBadge} text-white shadow-[3px_3px_0_rgba(0,0,0,.35)]`}>
        BOOK OUR DATE
      </div>

      {/* Spider-Man quote */}
      <div className="mb-7 rounded-[14px] border-[3px] border-dashed border-[#e11b22]/50 bg-white/60 px-[18px] py-4 text-center">
        <p className={`${type.bodyChip} text-[#7a2b2f]`}>
          🕷️ Spider-Man: <span className="italic">With great power comes great responsibility…</span>
        </p>
        <p className={`mt-1 ${type.bodyChip} text-[#2b59c3]`}>
          Youdy: And great responsibility includes taking you to the movies 😂
        </p>
        <p className={`mt-2.5 ${type.formQuote} text-[#e11b22]`}>
          &ldquo;With great power comes great responsibility… and great responsibility includes
          taking you to the movies.&rdquo;
        </p>
      </div>

      <h2 className={`mb-6 ${type.cardHeadingMd} text-[#e11b22]`}>
        Plan our day for <span className="text-[#2b59c3]">{movieTitle}</span> 🍿🕸️
      </h2>

      {/* Theater */}
      <div className="mb-6">
        <FieldLabel>1. Movie Theater 📍</FieldLabel>
        <select
          value={theater}
          onChange={(e) => setTheater(e.target.value)}
          required
          className={`w-full cursor-pointer rounded-[12px] border-[3px] border-[#08080f] bg-white px-[14px] py-[12px] ${type.bodyBase} text-[#2a2516] shadow-[3px_3px_0_rgba(8,8,15,.25)] outline-none focus:border-[#2b59c3]`}
        >
          <option value="" disabled>
            Choose a cinema…
          </option>
          {theaters.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Time slot */}
      <div className="mb-6">
        <FieldLabel>2. Showtime ⏰</FieldLabel>
        <div className="flex flex-wrap gap-[10px]">
          {timeSlots.map((slot) => (
            <Chip key={slot} active={time === slot} onClick={() => setTime(slot)}>
              {slot}
            </Chip>
          ))}
        </div>
        <p className={`mt-1.5 ${type.bodyHelper} text-[#7a6f57]`}>
          Exact showtimes TBD — we'll lock in the time once we get into cinemas! 🕸️
        </p>
      </div>

      {/* Date */}
      <div className="mb-6">
        <FieldLabel>3. Date 📅</FieldLabel>
        <input
          type="date"
          value={date}
          min={minDate}
          onChange={(e) => setDate(e.target.value)}
          required
          className={`w-full cursor-pointer rounded-[12px] border-[3px] border-[#08080f] bg-white px-[14px] py-[11px] ${type.bodyBase} text-[#2a2516] shadow-[3px_3px_0_rgba(8,8,15,.25)] outline-none focus:border-[#2b59c3]`}
        />
        <p className={`mt-1.5 ${type.bodyHelper} text-[#7a6f57]`}>
          Showings start July 30 — earlier dates are sealed by Petter Parker. 🕸️
        </p>
      </div>

      {/* Snack combo */}
      <div className="mb-6">
        <FieldLabel>4. Snack Combo 🍿</FieldLabel>
        <select
          value={snackChoice}
          onChange={(e) => setSnackChoice(e.target.value)}
          required
          className={`w-full cursor-pointer rounded-[12px] border-[3px] border-[#08080f] bg-white px-[14px] py-[12px] ${type.bodyBase} text-[#2a2516] shadow-[3px_3px_0_rgba(8,8,15,.25)] outline-none focus:border-[#2b59c3]`}
        >
          <option value="" disabled>
            Choose a snack combo…
          </option>
          {snackCombos.map((combo) => (
            <option key={combo} value={combo}>
              {combo}
            </option>
          ))}
          <option value={SNACK_OTHER}>{SNACK_OTHER}</option>
        </select>

        {/* Free-text input revealed (with a smooth height/opacity transition) when "Other" is chosen. */}
        <div
          className={`grid transition-all duration-300 ease-out ${
            isOtherSnack ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <input
              type="text"
              value={customSnack}
              onChange={(e) => setCustomSnack(e.target.value)}
              placeholder="Type your own snack combo..."
              maxLength={60}
              required={isOtherSnack}
              aria-hidden={!isOtherSnack}
              tabIndex={isOtherSnack ? 0 : -1}
              className={`w-full rounded-[12px] border-[3px] border-dashed border-[#e11b22] bg-white px-[14px] py-[11px] ${type.bodyInput} text-[#2a2516] shadow-[3px_3px_0_rgba(8,8,15,.25)] outline-none placeholder:text-[#b4a98c] focus:border-[#2b59c3]`}
            />
          </div>
        </div>
      </div>

      {/* Optional message */}
      <div className="mb-8">
        <FieldLabel>5. Any Message? 💌 (optional)</FieldLabel>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          maxLength={220}
          placeholder="Whisper something for the ticket…"
          className={`w-full resize-none rounded-[12px] border-[3px] border-[#08080f] bg-white px-[14px] py-[11px] ${type.bodyInput} text-[#2a2516] shadow-[3px_3px_0_rgba(8,8,15,.25)] outline-none placeholder:text-[#b4a98c] focus:border-[#2b59c3]`}
        />
      </div>

      <button
        type="submit"
        disabled={!ready}
        className={`mx-auto block cursor-pointer rounded-2xl border-4 border-[#08080f] bg-[linear-gradient(160deg,#ff2d36,#c20f16)] px-[30px] py-[14px] ${type.sectionBtn} text-white shadow-[6px_6px_0_#08080f] transition-transform duration-[120ms] ease-linear hover:-translate-y-[3px] hover:scale-105 active:translate-y-[2px] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100 enabled:animate-pulse-btn`}
      >
        Confirm Our Adventure 🕷️❤️
      </button>

      {!ready && (
        <p className={`mt-3 text-center ${type.bodyHelper} text-[#7a6f57]`}>
          Pick a theater, time, date &amp; snack to unlock your ticket.
        </p>
      )}
    </form>
  );
}
