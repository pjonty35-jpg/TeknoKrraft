# Tekno Krraft 2026

Single-page event frontend based on the approved design in `design/tekno-krraft-ui-v2.png`, with subtle clay surfaces and spatial artwork.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Deploy to Vercel

Import this repository into Vercel. The framework is Vite, the build command is `npm run build`, and the output directory is `dist`. These are also declared in `vercel.json`. Deploy the project root, not the `src` folder.

## Features

- Countdown to October 16, 2026 at 09:00 India Standard Time; zero-clamped when the start time has passed.
- Three-day searchable programme, category and track filters, and expandable session information.
- Personal agenda stored locally, overlap warnings, and downloadable calendar file with UTC event times.
- Preparation checklist based on selected workshops, with locally saved progress.
- Track syllabuses, speaker-to-session navigation, venue information, FAQs and event dialogs.
- Accessible native dialogs, keyboard focus states, mobile navigation, reduced-motion support, and responsive layouts.
- Registration draft demonstration. No backend request, official booking, or real ticket is created.

## Content

The event dates, schedule, speaker names, sponsor brands, contact address, and participation details originate from the challenge reference at https://uisphere-theme1.netlify.app/. They are supplied theme content, not independently verified event facts. Confirm them with organisers before a real event launch. Software prerequisites added for the prototype are illustrative preparation guidance and should be checked against the final workshop instructions. Registration information remains in the visitor's browser. An official registration endpoint is required for actual bookings.

Typography loads Inter and Space Grotesk from Google Fonts with local system fallbacks. Artwork and UI icons are SVG, so they remain sharp at any resolution.
