/**
 * Centered, on-theme loading indicator shown over the night sky while the
 * scene's images are still being fetched and decoded. A comic-outlined red
 * ring spinner with a Bangers caption to match the rest of the app.
 */
export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-6">
      <div className="h-20 w-20 animate-spin rounded-full border-[6px] border-[#08080f] border-t-[#e11b22] border-r-[#e11b22] [filter:drop-shadow(0_0_18px_rgba(225,27,34,.55))]" />

      <p className="animate-pulse font-bangers text-[clamp(22px,5vw,32px)] tracking-[2px] text-white [text-shadow:3px_3px_0_#e11b22,-1px_-1px_0_#2b59c3]">
        Loading…
      </p>
    </div>
  );
}
