/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        bangers: ["'Bangers'", 'cursive'],
        nunito: ["'Nunito'", 'sans-serif'],
      },
      backgroundImage: {
        // Radial sky behind the whole scene.
        'night-sky':
          'radial-gradient(120% 90% at 50% 0%, #1a2456 0%, #0d1130 45%, #06070f 100%)',
        // Twinkling star dots (tiled via bg-[length:420px_260px]).
        'star-field':
          'radial-gradient(1.5px 1.5px at 20px 30px, #fff, transparent), radial-gradient(1.5px 1.5px at 140px 80px, #cdd8ff, transparent), radial-gradient(1px 1px at 80px 160px, #fff, transparent), radial-gradient(1.5px 1.5px at 230px 50px, #fff, transparent), radial-gradient(1px 1px at 300px 200px, #b9c6ff, transparent), radial-gradient(1.5px 1.5px at 380px 120px, #fff, transparent)',
        // City-skyline "lit window" patterns. Blue + amber tints at a few opacities.
        'bldg-blue-a':
          'repeating-linear-gradient(0deg, transparent 0 8px, rgba(150,180,255,.13) 8px 13px), repeating-linear-gradient(90deg, transparent 0 6px, rgba(150,180,255,.13) 6px 10px)',
        'bldg-blue-b':
          'repeating-linear-gradient(0deg, transparent 0 8px, rgba(150,180,255,.12) 8px 13px), repeating-linear-gradient(90deg, transparent 0 7px, rgba(150,180,255,.12) 7px 12px)',
        'bldg-blue-c':
          'repeating-linear-gradient(0deg, transparent 0 9px, rgba(150,180,255,.14) 9px 14px), repeating-linear-gradient(90deg, transparent 0 7px, rgba(150,180,255,.14) 7px 12px)',
        'bldg-amber-a':
          'repeating-linear-gradient(0deg, transparent 0 8px, rgba(255,200,120,.18) 8px 13px), repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,200,120,.10) 6px 10px)',
        'bldg-amber-b':
          'repeating-linear-gradient(0deg, transparent 0 8px, rgba(255,200,120,.16) 8px 13px), repeating-linear-gradient(90deg, transparent 0 6px, rgba(150,180,255,.10) 6px 10px)',
        'bldg-amber-c':
          'repeating-linear-gradient(0deg, transparent 0 8px, rgba(255,200,120,.15) 8px 13px), repeating-linear-gradient(90deg, transparent 0 6px, rgba(150,180,255,.10) 6px 10px)',
        'bldg-amber-d':
          'repeating-linear-gradient(0deg, transparent 0 9px, rgba(255,200,120,.16) 9px 14px), repeating-linear-gradient(90deg, transparent 0 7px, rgba(150,180,255,.10) 7px 12px)',
      },
      keyframes: {
        maskBounce: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-22px) rotate(2deg)' },
        },
        maskGlow: {
          '0%, 100%': {
            filter:
              'drop-shadow(0 14px 26px rgba(0,0,0,.55)) drop-shadow(0 0 22px rgba(225,27,34,.35))',
          },
          '50%': {
            filter:
              'drop-shadow(0 14px 26px rgba(0,0,0,.55)) drop-shadow(0 0 38px rgba(225,27,34,.6))',
          },
        },
        spiderSway: {
          '0%, 100%': { transform: 'rotate(-7deg)' },
          '50%': { transform: 'rotate(7deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '.55' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        panelPop: {
          '0%': { transform: 'scale(.85) rotate(-3deg)', opacity: '0' },
          '60%': { transform: 'scale(1.04) rotate(-1deg)' },
          '100%': { transform: 'scale(1) rotate(-1deg)', opacity: '1' },
        },
        floatUp: {
          '0%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bubblePop: {
          '0%': { transform: 'scale(.4) translateY(8px)', opacity: '0' },
          '70%': { transform: 'scale(1.08) translateY(0)' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        pulseBtn: {
          '0%, 100%': {
            boxShadow: '6px 6px 0 #0a0a14, 0 0 0 rgba(225,27,34,0)',
          },
          '50%': {
            boxShadow: '6px 6px 0 #0a0a14, 0 0 30px rgba(225,27,34,.55)',
          },
        },
        ticketReveal: {
          '0%': {
            transform: 'scale(.9) translateY(18px) rotate(-1.5deg)',
            opacity: '0',
          },
          '60%': { transform: 'scale(1.02) translateY(0) rotate(.5deg)' },
          '100%': {
            transform: 'scale(1) translateY(0) rotate(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        'mask-bounce': 'maskBounce 2.6s ease-in-out infinite',
        'mask-glow': 'maskGlow 2.6s ease-in-out infinite',
        'spider-sway': 'spiderSway 5.5s ease-in-out infinite',
        'spider-sway-slow': 'spiderSway 7s ease-in-out 0.8s infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease both',
        'fade-in-slow': 'fadeIn 1.4s ease both',
        'panel-pop': 'panelPop 0.55s cubic-bezier(0.2,1.2,0.4,1) both',
        'panel-pop-lg': 'panelPop 0.5s cubic-bezier(0.2,1.3,0.4,1) both',
        'float-up': 'floatUp 0.55s ease 0.15s both',
        'bubble-pop': 'bubblePop 0.35s cubic-bezier(0.2,1.4,0.4,1) both',
        'pulse-btn': 'pulseBtn 2s ease-in-out infinite',
        'ticket-reveal': 'ticketReveal 0.6s cubic-bezier(0.2,1.2,0.4,1) both',
      },
    },
  },
  plugins: [],
};
