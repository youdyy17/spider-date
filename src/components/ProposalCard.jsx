import MessageBubble from './MessageBubble.jsx';
import DodgeButton from './DodgeButton.jsx';
import { type } from '../theme/typography.js';

/**
 * The "big question" panel: the ask, an optional taunt bubble, and the
 * YES / NO buttons.
 *
 * @param {object} props
 * @param {string} props.movieDate - date shown in the question.
 * @param {string|null} props.message - current taunt message, if any.
 * @param {{ x: number, y: number }} props.noOffset - "NO" button offset.
 * @param {() => void} props.onAccept - fired when YES is pressed.
 * @param {(e: React.SyntheticEvent) => void} props.onDodge - fired when NO is taunted.
 * @param {string} [props.enterDelay] - optional animation-delay for the entrance pop.
 */
export default function ProposalCard({ movieDate, message, noOffset, onAccept, onDodge, enterDelay }) {
  return (
    <div
      style={enterDelay ? { animationDelay: enterDelay } : undefined}
      className="relative mt-11 w-full max-w-[600px] -rotate-1 animate-panel-pop rounded-[20px] border-[5px] border-[#08080f] bg-[#fff8ef] bg-[radial-gradient(rgba(225,27,34,.07)_1.4px,transparent_1.5px)] bg-[length:16px_16px] px-[30px] pb-[34px] pt-[38px] shadow-[11px_11px_0_rgba(0,0,0,.45)]"
    >
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 -rotate-3 rounded-[8px] border-[3px] border-[#08080f] bg-[#2b59c3] px-[18px] py-[5px] ${type.panelBadge} text-white shadow-[3px_3px_0_rgba(0,0,0,.35)]`}>
        THE BIG QUESTION
      </div>

      <h2 className={`mt-3 ${type.cardHeadingLg} text-[#e11b22]`}>
        Will you be my movie date for
        <br />
        <span className="text-[#2b59c3]">Spider-Man: Brand New Day</span> on {movieDate}? 🍿🕸️
      </h2>

      <p className={`mx-auto mt-[18px] max-w-[460px] ${type.bodyMd} text-[#3a3320] [text-wrap:pretty]`}>
        Bong will pay snack and ticket 100% promise and all
        I need is my favorite person beside me, Amra!.
      </p>

      {message && <MessageBubble>{message}</MessageBubble>}

      <div className="relative mt-7 flex flex-wrap items-center justify-center gap-[18px] select-none">
        <button
          type="button"
          onClick={onAccept}
          className={`cursor-pointer rounded-2xl border-4 border-[#08080f] bg-[linear-gradient(160deg,#ff2d36,#c20f16)] px-[38px] py-[14px] ${type.actionBtnLg} text-white shadow-[6px_6px_0_#08080f] animate-pulse-btn transition-transform duration-[120ms] ease-linear hover:-translate-y-[3px] hover:scale-105 active:translate-y-[2px] active:scale-[0.97]`}
        >
          YES! ❤️
        </button>

        <DodgeButton offset={noOffset} onDodge={onDodge} />
      </div>
    </div>
  );
}
