# AI Studio — audit & fix pass (paste after the first update)

Do a full consistency audit of the whole app and FIX anything that still
disagrees with the canonical data set. Change data/labels only — not the design.

CANONICAL (must be identical everywhere it appears):
- Crowd 40,000 · Joined 18,342 (46% join) · Peak active players 14,108 (35%) · Avg engagement 41 min · Opt-in 42.5% · Repeat 3.1x · Rounds/fan 4.6.
- Revenue per match (AUD): Concession +A$48,200 · Sponsor Activation Package (sold) +A$42,500 · First-party data +A$9,400 · TOTAL +A$100,100 (conservative ≈ A$65,000).

CHECK EVERY SCREEN, INCLUDING ALL 10 STORY MODE FRAMES, and fix:
1. The active-player / connected count. It must read 14,108 everywhere. In particular Frame 6 "Crowd Connects" currently says "14,850 phones connected" — change to "14,108". Any "14,850" anywhere → 14,108.
2. Any remaining USD "$" on a money value → "A$". (Points/pts stay unprefixed.) Check reward values, prize pools, story-frame captions.
3. Remove any leftover old figures anywhere: "+18.4%", "+18%", "76.2%", "28.3%", "A$2.60 basket", or the word "exposures" used as a dollar amount.
4. Confirm the three revenue streams add up to exactly A$100,100 on every screen that shows a total, and that the "conservative ≈ A$65,000" line is present next to each A$100,100 headline.
5. Sponsor line must read "Sponsor Activation Package (sold)" with "185,000 fan touchpoints delivered" as reach only — no CPM, no "exposure value" as the dollar basis.
6. Make the leaderboard top scores and Story Mode Frame 9 agree: use the SAME winner and points (e.g. Renah Rocket 9,430 pts) in both the Leaderboard screen and Frame 9 "Leaderboard and Reward". No two screens should show different top scores.
7. Participation wording: "46% join rate" and "35% active" must not contradict each other or the raw counts (18,342 of 40,000; 14,108 of 40,000).

When done, reply with a short list of every value you changed and the screen it
was on, so I can verify nothing was missed.
