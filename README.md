# 🕷️ Spider-Man Movie Date

A playful, Spider-Man-themed "will you be my movie date?" proposal page — rebuilt
from a single bundled HTML file into a clean **React + Vite + Tailwind CSS** project.

Click **YES!** for a confetti burst, a victory jingle and the mission-details
reveal. Try to click **NO** and it will dodge away with a different comeback every
time. 🙈

## Features

- Animated mask, swaying spiders, twinkling stars and a city skyline — all in CSS.
- A photo clipped inside the Spider-Man mask.
- A run-away "NO" button with rotating taunts.
- Canvas confetti + a Web Audio victory jingle on acceptance.
- Fully responsive (uses `clamp()` typography and `%`-based layout).

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

Requires Node.js 18+.

## Customizing

Open [`src/config.js`](src/config.js) to personalize the page:

| Setting        | Default                | Description                                      |
| -------------- | ---------------------- | ------------------------------------------------ |
| `petName`      | `'Amra'`               | Name shown in the headline.                      |
| `movieDate`    | `'July 30'`            | Date shown throughout the page.                  |
| `runawayNo`    | `true`                 | Whether the "NO" button dodges on hover/click.   |
| `confettiCount`| `300`                  | Number of confetti pieces on acceptance (80–500).|

`DODGE_MESSAGES` in the same file holds the taunts shown when teasing the NO button.

To swap the photo inside the mask, replace [`src/assets/gf-face.png`](src/assets/gf-face.png).

## Project structure

```
spider-date/
├── index.html              # HTML shell + Google Fonts (Bangers, Nunito)
├── package.json
├── vite.config.js
├── tailwind.config.js       # Fonts, keyframes, animations & gradient tokens
├── postcss.config.js
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # State, handlers & page composition
    ├── index.css            # Tailwind directives + base styles
    ├── config.js            # Editable settings + dodge messages
    ├── assets/
    │   └── gf-face.png      # Photo shown inside the mask
    ├── hooks/
    │   └── useConfetti.js    # Canvas confetti animation
    ├── lib/
    │   └── sound.js          # Web Audio victory jingle
    └── components/
        ├── StarField.jsx     # Twinkling star background
        ├── SpiderWeb.jsx     # Corner webs (left/right mirrored)
        ├── HangingSpider.jsx # Dangling, swaying spiders
        ├── CitySkyline.jsx   # Building silhouettes + fade
        ├── SpiderMask.jsx    # Bouncing mask with the clipped photo
        ├── ProposalCard.jsx  # The question + YES / NO buttons
        ├── MessageBubble.jsx # Taunt speech bubble
        ├── DodgeButton.jsx   # The evasive "NO" button
        ├── SuccessCard.jsx   # Celebration + mission details
        ├── QuoteFooter.jsx   # Closing quote
        └── ConfettiCanvas.jsx# Full-screen confetti canvas
```

## How it differs from the original

The source was a self-unpacking bundle driven by a tiny custom `DCLogic`
framework (template interpolation, `sc-if`, `ref` callbacks). That has been
reimplemented with idiomatic React:

- Template placeholders → component props.
- `sc-if` blocks → conditional rendering.
- `ref="{{ ... }}"` DOM wiring and the bundler's blob-URL re-apply hack → a plain
  imported image (`href={faceSrc}`).
- Imperative `setState` mutations → React `useState`/`useCallback`.
- Inline styles & `<style>` blocks → Tailwind utility classes, with keyframes,
  fonts and complex gradients defined as design tokens in `tailwind.config.js`.

The bundled `.woff2` fonts are loaded from Google Fonts (identical families:
Bangers + Nunito), keeping the look pixel-identical with far less weight.
