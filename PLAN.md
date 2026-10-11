# Tekno Krraft 2026: proposed redesign

Status: the landing page is implemented in React, TypeScript, and Vite. The approved mockup is the design reference, with the requested subtle claymorphism and spatial UI adaptation. Production build and key desktop/mobile interaction checks have passed. The project is ready to import into Vercel; it has not been published.

## Reference and problem

Use the user's second link, https://uisphere-theme1.netlify.app/, as the reference. Refer to it as the Tekno Krraft event reference to avoid confusion between link order and URL numbering. The community reference is https://uisphere-theme2.vercel.app/.

The reference has useful schedule day controls, category filters, search, registration fields, and workshop content. The design gives similar visual weight to many controls and sections. Large shadows, glows, rounded panels, and dense copy obscure the visitor's next step.

Primary visitor task: choose suitable sessions, prepare for them, and attend with a clear personal plan. Product concept: an event website with an attendee companion.

## Findings from direct interaction

- Day tabs update the programme. Track syllabus dialogs expose curriculum and prerequisites.
- Registration opened from a programme row retains the selected session title and time. It also asks for a broad primary track: the coding finals mapped to Open Source & DevOps in the inspected flow. Improve this relationship and avoid irrelevant fields.
- Day 3 coding finals run from 09:30 to 12:30 while hack sprint pitching runs from 10:00 to 13:00. A personal plan needs conflict warnings.
- Workshop prerequisites exist, but preparation guidance is divided between schedule rows, track dialogs, and FAQs. The FAQ says software guides will be emailed later. Put readiness information alongside the selected sessions.
- The hackathon FAQ mentions solo participation and team matchmaking, but the displayed programme does not identify a matchmaking session. Do not invent its time or venue.
- The footer Hackathon Rules link navigates to # rather than a rules document. Speaker social links lead to generic platform homepages. Replace these with valid destinations when supplied or omit inactive links.
- The site displays session venues as text and a campus address in the footer. There is no observed consolidated participant logistics view.

## Visual direction

A contemporary technical festival programme following design/tekno-krraft-ui-v2.png, with dark and warm ivory sections, near-black typography, a strong blue accent, and restrained Google colour details. Use an oversized Tekno Krraft wordmark, a disciplined grid, thin rules, rectangular controls, and original geometric artwork constructed in SVG/CSS.

Latest user direction: slightly adapt the mockup with a combination of claymorphism and spatial UI. Use matte, softly sculpted surfaces, subtle inset highlights, and soft contact shadows for countdown tiles, track panels, and selected controls. Keep buttons rectangular with modest corner radii, never pill-shaped. Add spatial depth through layered hero geometry and restrained hover lift or tilt on pointer devices. Maintain flat readable content planes, clear contrast, and restrained motion. Disable pointer tilt and nonessential motion for reduced-motion preferences; touch layouts must not depend on hover. Preserve the professional festival identity instead of turning the interface into a toy-like collection of inflated components.

Pair expressive display typography with a highly readable body font. Vary composition between sections rather than repeating a card grid. Use dark sections selectively for contrast. Motion should communicate hover, selection, expansion, and progress, with reduced-motion support.

Constraints: no pill-shaped buttons, em dashes, emoji icons, invented metrics, testimonials, or unsupported affiliations. Use simple SVG icons where they help understanding.

## Page structure

1. Compact navigation: Programme, Tracks, Event info, FAQ, Register.
2. Hero: title, concise event purpose, date/location from supplied event content, primary registration action, and programme link. Geometric festival artwork forms the second half of the composition.
3. Programme: day tabs, track/category filtering, session search, compact time-first rows, and expandable session details.
4. My event plan: saved sessions, remove controls, overlap notices, calendar export, and a personal preparation checklist.
5. Tracks: four distinct subject areas with practical outcomes and prerequisites. Selecting a track filters the programme.
6. Event information: venue, preparation guidance, event rules, and help contacts. Show room names supplied by the reference; campus directions or maps require actual location information. Speakers and sponsors appear only when their supplied details are approved for use.
7. FAQ and a restrained footer.

## Interaction workflow

Explore programme -> select day or track -> inspect outcomes and prerequisites -> save sessions -> resolve conflicts -> review the preparation checklist -> register.

Saved sessions persist in browser localStorage. Filters provide a useful empty state and a clear reset action. Calendar export generates a real .ics file from the selected sessions. Conflicting saved sessions are visibly flagged.

The preparation checklist combines requirements for selected sessions, removes duplicates, and remembers completed items locally. Display concrete learning outcomes and tools in each session detail. Connect speaker profiles to their sessions where supplied.

Registration retains the selected session or session list and uses labelled fields, inline validation, keyboard focus management, and a clear review step. Only hackathon choices ask for solo/team participation and relevant team details. Until an official endpoint or form is provided, it is explicitly a frontend demonstration and must not claim that a real registration has been submitted.

Scope priority: programme discovery, personal agenda, readiness checklist, and a coherent registration demonstration. Live announcements, shared team matching, real capacity tracking, ticket validation, and participant networking need organizer data and shared storage; defer these beyond the first-hour prototype.

## Content integrity

The reference displays October 16 to 18, 2026 and ITER Campus as event details. Treat these as supplied theme content rather than independently verified facts. Speaker biographies, corporate sponsorships, attendance estimates, prizes, certificates, and free admission require confirmation before being presented as real claims. Omit unsupported statistics. Never invent replacements.

## Proposed architecture

React + TypeScript + Vite, with plain CSS and reusable components. A static frontend is sufficient for the challenge and can deploy on Vercel.

- Typed event content in one data module.
- Components for navigation, hero, programme, session details, agenda, tracks, registration, FAQ, and footer.
- One shared state layer for active day, category, search, saved sessions, and modal state.
- Small utilities for calendar export and session overlap detection.
- CSS variables for colour, type, spacing, and borders.
- Semantic HTML, visible keyboard focus, accessible dialogs, and responsive layouts.

Vercel deployment: Vite framework preset, npm run build, dist output. No backend or secrets are necessary for the proposed frontend prototype.

## First-hour build allocation

- 0 to 5 minutes: settle scope, content, and design tokens.
- 5 to 20 minutes: scaffold, header, hero, typography, layout, and mobile foundation.
- 20 to 40 minutes: programme, filters, session details, saved agenda, conflict warnings, and calendar export.
- 40 to 50 minutes: preparation checklist, registration demonstration, concise tracks, FAQ, and event information.
- 50 to 60 minutes: verify key interactions, keyboard access, mobile layout, production build, and Vercel readiness.

Use any remaining event build time for observed fixes and visual refinement. Keep screen recording active throughout implementation.
