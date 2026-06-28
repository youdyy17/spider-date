/**
 * Editable settings for the proposal page. These mirror the configurable
 * props from the original page — tweak them to personalize the experience.
 */
export const config = {
  /** Name shown in the headline ("Hey {petName}..."). */
  petName: 'Amra',
  /** Date used in the headline, question and mission details. */
  movieDate: 'July 30',
  /** When true, the "NO" button dodges away on hover/click. */
  runawayNo: true,
  /** How many confetti pieces burst when the date is accepted (80–500). */
  confettiCount: 300,
  /** Play looping background music after the intro. */
  music: true,

  /** Movie title printed on the form question and the final ticket. */
  movieTitle: 'Spider-Man: Brand New Day',
  /** Guest name printed on the ticket. */
  guestName: 'Amarino❤️',
  /** Earliest selectable date (YYYY-MM-DD). Anything before this is disabled. */
  minDate: '2026-07-30',
  /** Cinemas offered in the booking dropdown. */
  theaters: [
    'Sabay Cineplex (AEON Mall Phnom Penh)',
    'Sabay Cineplex (AEON Mall Mean Chey)',
    'Sabay Cineplex (Sen Sok)',
    'Legend Premium Exchange Square',
    'Legend Cinema Sen Sok',
    'Legend Cinema Toul Kork',
    'Legend Cinema Olympia Mall',
    'Legend Cinema Eden Garden',
    'Legend Cinema K Mall',
    'Legend Cinema Meanchey',
    'Legend Cinema Midtown',
    'Legend Cinema Noro Lane',
    'Prime Cineplex Samai Square',
    'Prime Cineplex Choam Chao',
  ],
  /** Showtime chips (single-select). */
  timeSlots: ['Morning Show', 'Afternoon Show', 'Evening Show', 'Late Night'],
  /** Snack combo chips (single-select). */
  snackCombos: ['Popcorn & Coke', 'Late Coconut Cream', 'Matcha', 'Tiramisu'],
};

/** Playful comebacks shown when the "NO" button is taunted. */
export const DODGE_MESSAGES = [
  'Even Spider-Man believes in second chances! 🕸️',
  "Dach jit mes 🥹",
  'Kom jg chneas. 😎',
  "I miss You🥹, Pleaseeeeeee!!!!! 🕸️",
  'Kom tha jam merl muy CL tt ha',
];
