/**
 * The evasive "NO" button. It re-fires `onDodge` on both click and hover so it
 * scoots away (when run-away mode is on) before it can ever be pressed. Its
 * live position comes from state, so the transform is applied as a bound style.
 *
 * @param {object} props
 * @param {{ x: number, y: number }} props.offset - current pixel offset.
 * @param {(e: React.SyntheticEvent) => void} props.onDodge - dodge handler.
 */
export default function DodgeButton({ offset, onDodge }) {
  return (
    <button
      type="button"
      onClick={onDodge}
      onMouseEnter={onDodge}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      className="relative z-[6] cursor-pointer select-none rounded-2xl border-4 border-[#08080f] bg-[linear-gradient(160deg,#3a6ee0,#1f3f9e)] px-[38px] py-[14px] font-bangers text-[30px] tracking-[2px] text-white shadow-[6px_6px_0_#08080f] transition-transform duration-[220ms] ease-[cubic-bezier(0.3,1.4,0.5,1)]"
    >
      NO 🙈
    </button>
  );
}
