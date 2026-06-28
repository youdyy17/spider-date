import { type } from '../theme/typography.js';

/** Closing tongue-in-cheek "with great power..." quote. */
export default function QuoteFooter() {
  return (
    <div className="mt-16 max-w-[540px]">
      <p className={`${type.quoteHeading} text-[#ffd23a]`}>
        &ldquo;Waves of wonder are woven by those who dare to love someone but cannot handle and it seem like a shadow around them.&rdquo;
      </p>
      <p className={`mt-2.5 ${type.byline} text-[#aeb8e6]`}>
        —A quote from your friendly neighborhood Boyfriend, Youdy 😂🕸️❤️
      </p>
    </div>
  );
}
