# Showdown — product vision prototype

**Turn dead time into live engagement.** &nbsp;·&nbsp; _The stadium becomes the game._

A high-fidelity, screenshot-ready prototype for pitching **Showdown**, a live
in-stadium fan engagement platform. During breaks in live sport, fans scan a QR
code in the venue, join instantly via a lightweight web app, play short sporting
mini-games and live predictions, compete on stadium-scale leaderboards, and win
sponsor-funded rewards.

This is a **visual prototype for pitch-deck screenshots only**. There is no
backend, multiplayer, auth, or persistence — just local state and mock data.

## Stack

React + TypeScript + Tailwind CSS + Framer Motion, built with Vite. Single-page
app with sidebar navigation and a **Capture Mode** toggle that hides all nav
chrome for clean screenshots.

## Run it

```bash
cd Showdown
npm install
npm run dev
```

Open the printed local URL. Use the sidebar to jump between screens. Click
**Capture Mode** (top right) to hide the sidebar + top bar for screenshots; the
floating **Exit Capture** button (bottom right) brings the chrome back.

```bash
npm run build      # type-check + production build
npm run preview    # preview the production build
```

## Screens

| Screen | What it shows |
| --- | --- |
| **Overview** | The pitch hero — taglines, the scan-to-join card, headline metrics, and the four-step "how a break plays out" flow. |
| **Join** | Friction-free QR onboarding, a phone mock of the join flow, and the "phone is the controller" framing. |
| **Play** | Mini-game catalogue plus a live in-play prediction (big-screen view) and a skill mini-game running in-hand on a phone. |
| **Leaderboard** | Stadium-scale ranking, section-vs-section battle, and a live activity feed. |
| **Stadium Screen** | The 16:9 big-screen "main event" render: headline, scan-to-play QR + countdown, live podium, section battle, sponsor footer. |

## Notes for screenshots

- Designed dark, premium, sports-tech — **not** a quiz, not Kahoot, not a kids' or casino app.
- **Venue-agnostic**: no Olympic marks, rings, or mascots. Venue/sponsor names are placeholder mock data in `src/data/mock.ts` — swap them to re-skin for any client.
- The QR codes are decorative (`FauxQR`) and intentionally not scannable.
- Best captured at a wide desktop viewport so the sidebar layout and the 16:9 stadium board render at full fidelity.

## Structure

```
Showdown/
├── index.html
├── src/
│   ├── App.tsx              # shell: sidebar, top bar, Capture Mode, router
│   ├── components/ui.tsx    # design-system primitives (Card, Pill, PhoneFrame, FauxQR…)
│   ├── data/mock.ts         # all mock content — edit here to re-skin
│   └── screens/             # Overview, Join, Play, Leaderboard, Rewards, StadiumScreen
└── tailwind.config.js       # brand tokens (ink / volt / sky / flame)
```
