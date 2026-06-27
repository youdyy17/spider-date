/** Tiled, slowly twinkling starscape behind the whole scene. */
export default function StarField() {
  return (
    <div className="absolute inset-0 z-0 bg-star-field bg-[length:420px_260px] opacity-60 animate-twinkle" />
  );
}
