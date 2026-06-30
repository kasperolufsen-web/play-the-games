# Showdown — Google AI Studio master prompt

Paste everything in the box below into Google AI Studio's app builder (Build) as
your single prompt. It is self-contained and tuned to generate the same
prototype that lives in this folder.

---

You are a senior product designer and front-end engineer. Build a high-fidelity, screenshot-ready **product vision prototype** called **Showdown**.

This is a visual prototype for pitch-deck screenshots only. It does NOT need a real backend, multiplayer, authentication, or persistence. Use **React + TypeScript + Tailwind CSS + Framer Motion**, with local state and mock data only. Build it as a **single-page app** with a **left sidebar navigation** that jumps between screens, plus a **"Capture Mode" toggle** that hides all navigation chrome (sidebar + top bar) so I can take clean screenshots. Add a floating "Exit Capture" button while in Capture Mode.

## Product

Showdown is a **live in-stadium fan engagement platform**. During breaks in live sport, fans scan a QR code in the venue, join instantly via a lightweight web app, play short sporting mini-games and live predictions, compete on stadium-scale leaderboards, and win sponsor-funded rewards. **The venue controls the session; the phone is the controller; the stadium screen is the main experience.**

- Tagline: **"Turn dead time into live engagement."**
- Hero alt-tagline: **"The stadium becomes the game."**

This is a **premium sports-tech product** — NOT a quiz, NOT Kahoot, NOT a children's or casino app. It must feel like a polished SaaS / broadcast-grade product. **Venue-agnostic: do NOT use any Olympic rings, marks, or mascots.** All venue, sponsor, fixture, and player names are mock placeholders.

## Visual design

- Dark, premium, energetic. Near-black backgrounds (`#05060B`–`#141826`), soft ambient radial glows.
- Accent system: electric lime/volt green `#9CFF4F`, sky blue `#4FC3FF`, flame orange `#FF6B4A`, violet `#C792FF`. Use volt→sky gradients for primary CTAs and rank badges.
- Fonts: "Space Grotesk" for display/headlines, "Inter" for body, "JetBrains Mono" for codes/numbers.
- Rounded-2xl cards with hairline `white/6` borders and subtle blur. Generous spacing. Live indicators with a pulsing dot. Tasteful Framer Motion entrance animations (fade + rise, staggered), animated meter/progress bars, and `whileTap` on the phone controls.
- Include a reusable **phone frame** component (notch, rounded bezel) to show the in-hand experience, and a reusable **faux QR code** component (decorative grid, not a real scannable code).

## Screens (sidebar items)

1. **Overview (the pitch)** — Hero with both taglines, a "scan to join" card with the faux QR + session code, a 4-stat strip (fans joined, playing live now, avg round length, sponsor prize pool), and a 4-step "how a break plays out" flow: Scan → Play → Compete → Win. End with a positioning line: "Venue controls the session. The phone is the controller. The stadium screen is the main event." plus pills: Venue-agnostic, Sponsor-funded, Zero-install.

2. **Join (QR onboarding)** — 3-step join (Scan the QR / Tap a name / You're in), a "+2,140 fans joining this break" live stat, trust points (lightweight web app, guest-first, built for crowds). Beside it, a **phone mock** of the join screen: venue welcome, faux QR + session code, a selected guest name "@you · Block 207", and an "Enter the Showdown" CTA — "no download required".

3. **Play (mini-games + live predictions)** — A catalogue of 4 short mini-games as cards (e.g. Reflex Rush — Reaction 15s; Next Goal Caller — Prediction Live; Power Strike — Skill 20s; Rapid Recall — Trivia 30s), each with type chip, duration, live player count, accent glow. Then a **live in-play prediction** panel (big-screen style): question "Who scores the next goal?", match context "62' · 1–1", four options with animated share bars + odds and a closing countdown. Beside it a **phone mock** of the "Power Strike" skill game mid-play: a charge meter with a "perfect" sweet spot, "68% charge power", and a big "HOLD TO CHARGE" button.

4. **Leaderboard (stadium scale)** — A live top-10 ranking (rank badge, name, handle, section, streak flame, rank-change arrows, points), with the current user "You · Block 207" highlighted at rank 6. A right rail with a **Section Battle** (stand-vs-stand bars: North Stand, Kop End, East Wing, South Family) and a **live activity feed**. "18,342 ranked", "updating live".

5. **Rewards (sponsor-funded)** — A grid of 4 sponsor-funded rewards (concession, merch, experience, moment) with cost in points, "X left", a progress bar toward affordability, and Redeem / "N more points" states based on a mock balance of 8,755 pts. Beside it a **phone mock** of a redemption confirmation: "Reward unlocked", a ticket icon, a redemption code "VX-4417", and the points debited. Footer line on sponsor ROI: footfall to kiosks, opt-in data.

6. **Stadium Screen (the main event)** — A **16:9 big-screen render** designed to read from the back row: brand mark + "Half-time break" live tag + fixture; a giant headline "Turn dead time into live engagement."; a large faux QR + session code + "Next round starts in 0:22" countdown + "+2,140 joined this break"; a live **top-3 podium**; a **section battle** bar chart; and a sponsor footer "Reward pool presented by [Sponsor]". This screen should feel like the hero shot of the deck.

## Implementation notes

- Keep all mock content in a single `mock.ts` data module so names/numbers can be swapped to re-skin for any client (venue, sponsor, fixture, players, rewards).
- Use `AnimatePresence` for screen transitions and for showing/hiding the sidebar + top bar in Capture Mode.
- Mobile-friendly: collapse the sidebar into icon buttons in the top bar on small screens.
- No external image assets required — build the QR, phone frame, logo mark, and charts in code.
- Prioritize visual fidelity and clean composition over interactivity; every screen should look great as a still.

Deliver the complete, runnable app.
