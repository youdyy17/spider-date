/** Helpers for the cinema ticket: serial numbers and human-friendly dates. */

/**
 * Builds a random ticket serial like `SMD-2026-847291`.
 *
 * @returns {string}
 */
export function makeTicketSerial() {
  const digits = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0');
  return `SBN-D-${digits}`;
}

/**
 * Turns a native `<input type="date">` value (`YYYY-MM-DD`) into a friendly
 * label such as `July 30, 2026`. Falls back to the raw value if unparseable.
 *
 * @param {string} value
 * @returns {string}
 */
export function formatTicketDate(value) {
  if (!value) return '';
  // Append a time so the date is parsed in local (not UTC) time.
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
