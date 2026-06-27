/**
 * The opening screen: a single Start button centered over the night sky.
 * Pressing it (a real user gesture) reveals the scene and kicks off music.
 *
 * @param {object} props
 * @param {() => void} props.onStart - fired when Start is pressed.
 */
export default function StartScreen({ onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <button
        type="button"
        onClick={onStart}
        className="cursor-pointer animate-panel-pop-lg rounded-2xl border-4 border-[#08080f] bg-[linear-gradient(160deg,#ff2d36,#c20f16)] px-[46px] py-[18px] font-bangers text-[clamp(30px,7vw,46px)] tracking-[2.5px] text-white shadow-[7px_7px_0_#08080f] animate-pulse-btn transition-transform duration-[120ms] ease-linear hover:-translate-y-[3px] hover:scale-105 active:translate-y-[2px] active:scale-[0.97]"
      >
        click to start
      </button>
    </div>
  );
}
