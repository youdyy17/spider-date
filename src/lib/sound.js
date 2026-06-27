/**
 * Plays a short, celebratory arpeggio + sparkle using the Web Audio API.
 * Self-contained: builds its own AudioContext on each call and fails silently
 * if audio is unavailable (e.g. before any user gesture).
 */
export function playVictorySound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ac = new AudioCtx();
    const now = ac.currentTime;

    // Rising C-major arpeggio.
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const t = now + i * 0.12;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.26, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    });

    // Sparkle sweep on top.
    const sweep = ac.createOscillator();
    const sweepGain = ac.createGain();
    sweep.type = 'sine';
    const ts = now + 0.5;
    sweep.frequency.setValueAtTime(1200, ts);
    sweep.frequency.exponentialRampToValueAtTime(2600, ts + 0.3);
    sweepGain.gain.setValueAtTime(0.0001, ts);
    sweepGain.gain.linearRampToValueAtTime(0.16, ts + 0.05);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, ts + 0.45);
    sweep.connect(sweepGain);
    sweepGain.connect(ac.destination);
    sweep.start(ts);
    sweep.stop(ts + 0.5);
  } catch {
    /* Audio not supported — silently ignore. */
  }
}
