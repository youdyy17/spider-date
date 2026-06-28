import { useCallback, useEffect, useRef, useState } from 'react';

import { config, DODGE_MESSAGES } from './config.js';
import gfFace from './assets/amra_face.jpg';
import dayLight from './assets/dayLight.mp3';
import { useConfetti } from './hooks/useConfetti.js';
import { useImagePreloader } from './hooks/useImagePreloader.js';
import { makeTicketSerial } from './lib/ticket.js';

import LoadingSpinner from './components/LoadingSpinner.jsx';
import { type } from './theme/typography.js';
import StartScreen from './components/StartScreen.jsx';
import StarField from './components/StarField.jsx';
import SpiderWeb from './components/SpiderWeb.jsx';
import HangingSpider from './components/HangingSpider.jsx';
import CitySkyline from './components/CitySkyline.jsx';
import SpiderMask from './components/SpiderMask.jsx';
import ProposalCard from './components/ProposalCard.jsx';
import MovieDateForm from './components/MovieDateForm.jsx';
import MovieTicket from './components/MovieTicket.jsx';
import QuoteFooter from './components/QuoteFooter.jsx';
import ConfettiCanvas from './components/ConfettiCanvas.jsx';

/** Every image that must be fully decoded before the scene is revealed. */
const PRELOAD_IMAGES = [gfFace];

/** Ramp an audio element's volume from 0 to 1 over ~1.2s for a smooth start. */
function fadeInVolume(audio) {
  const steps = 24;
  const stepMs = 50;
  let i = 0;
  const id = setInterval(() => {
    i += 1;
    audio.volume = Math.min(1, i / steps);
    if (i >= steps) clearInterval(id);
  }, stepMs);
}

export default function App() {
  const { petName, movieDate, movieTitle, guestName, runawayNo, confettiCount } = config;

  // The intro Start screen is shown until the user presses Start.
  const [started, setStarted] = useState(false);
  // 'proposal' → 'form' → 'ticket'
  const [step, setStep] = useState('proposal');
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState(null);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });

  // Hold the scene back until every required image is fetched and decoded.
  const imagesReady = useImagePreloader(PRELOAD_IMAGES);

  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const launchConfetti = useConfetti(canvasRef, confettiCount);

  // Prepare the (silent) audio up front; it starts on the Start gesture.
  useEffect(() => {
    const audio = new Audio(dayLight);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleStart = useCallback(() => {
    setStarted(true);
    if (!config.music) return;
    const audio = audioRef.current;
    if (!audio) return;
    // Start shortly after the reveal begins, then fade the volume in.
    setTimeout(() => {
      audio.play().then(() => fadeInVolume(audio)).catch(() => {});
    }, 600);
  }, []);

  const handleAccept = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep('form');
    setMessage(null);
  }, []);

  const handleSubmit = useCallback(
    (data) => {
      setTicket({
        ...data,
        movie: movieTitle,
        guest: guestName,
        serial: makeTicketSerial(),
      });
      setStep('ticket');
    },
    [movieTitle, guestName],
  );

  const handleDodge = useCallback(
    (e) => {
      e?.preventDefault?.();
      const next = DODGE_MESSAGES[Math.floor(Math.random() * DODGE_MESSAGES.length)];
      if (runawayNo) {
        setNoOffset({
          x: (Math.random() * 2 - 1) * 190,
          y: (Math.random() * 2 - 1) * 120,
        });
      }
      setMessage(next);
    },
    [runawayNo],
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-night-sky font-nunito">
      {/* Background ambiance — always present, even while loading. */}
      <StarField />

      {!started && <StartScreen onStart={handleStart} />}

      {/* After Start is clicked, hold the scene until all images are decoded. */}
      {started && !imagesReady && <LoadingSpinner />}

      {started && imagesReady && (
        <>
          {/* Atmosphere — fades in as a group once the scene is revealed. */}
          <div className="animate-fade-in-slow">
            <SpiderWeb side="left" />
            <SpiderWeb side="right" />
            <HangingSpider
              positionClass="left-[16%]"
              swayClass="animate-spider-sway"
              threadClass="h-[120px]"
              width={34}
              height={30}
              eyes
            />
            <HangingSpider
              positionClass="right-[22%]"
              swayClass="animate-spider-sway-slow"
              threadClass="h-[78px]"
              width={26}
              height={22}
            />
            <CitySkyline />
          </div>

          {/* Content — sections slide up + fade in with staggered delays. */}
          <div className="relative z-[5] mx-auto flex max-w-[760px] flex-col items-center px-[22px] pb-[90px] pt-[54px] text-center">
            {step === 'proposal' && (
              <div className="animate-float-up [animation-delay:100ms]">
                <SpiderMask faceSrc={gfFace} />
              </div>
            )}

            {step === 'proposal' && (
              <>
                <h1 className={`mt-[18px] animate-float-up ${type.heroHeading} text-white [animation-delay:250ms]`}>
                  Hey {petName}... 🕷️❤️
                </h1>

                <p className={`mt-5 max-w-[560px] animate-float-up ${type.bodyLg} text-[#e7ecff] [animation-delay:400ms] [text-wrap:pretty]`}>
                  There's a brand new day coming on {movieDate}... and I can go with thyrak, panha but if i can go with you 🥹.
                </p>

                <ProposalCard
                  movieDate={movieDate}
                  message={message}
                  noOffset={noOffset}
                  onAccept={handleAccept}
                  onDodge={handleDodge}
                  enterDelay="550ms"
                />
              </>
            )}

            {step === 'form' && <MovieDateForm onSubmit={handleSubmit} />}

            {step === 'ticket' && ticket && (
              <MovieTicket ticket={ticket} launchConfetti={launchConfetti} />
            )}

            <div className="animate-float-up select-none [animation-delay:700ms] pointer-events-none">
              <QuoteFooter />
            </div>
          </div>

          <ConfettiCanvas ref={canvasRef} />
        </>
      )}
    </div>
  );
}
