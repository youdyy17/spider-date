import { type } from '../theme/typography.js';

/**
 * Playful speech bubble shown when the user taunts the "NO" button.
 *
 * @param {{ children: React.ReactNode }} props
 */
export default function MessageBubble({ children }) {
  return (
    <div className={`relative mx-auto mt-[26px] max-w-[420px] animate-bubble-pop rounded-2xl border-4 border-[#08080f] bg-[#2b59c3] px-[18px] py-[14px] ${type.bubble} text-white shadow-[4px_4px_0_rgba(0,0,0,.35)]`}>
      {children}
    </div>
  );
}
