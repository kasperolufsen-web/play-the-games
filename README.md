# Play the Games — live Olympic quiz

A host-controlled, Kahoot-style live quiz for your pitch. You open the **host
screen** on the projector, the room **scans a QR code**, everyone types a name,
and you press **Start** to drive all phones through five Olympic questions in
sync — with a live leaderboard and a final podium.

- Public URL anyone can scan (Vercel)
- Real-time sync over websockets (Supabase Realtime — no server to run)
- No accounts, no database tables, guest mode by default
- Comfortably handles ~25–40 phones

---

## What you need (two free accounts, ~15 minutes)

1. A free **Supabase** account — supabase.com
2. A free **Vercel** account — vercel.com
3. A free **GitHub** account (easiest way to get the code into Vercel)

No credit card required for any of them.

---

## Step 1 — Supabase (gives you the realtime backend)

1. Go to supabase.com, sign in, click **New project**.
2. Give it any name, pick any region close to you, set a database password
   (you won't need it), click **Create**. Wait ~1 minute for it to spin up.
3. In the left sidebar open **Project Settings → API**.
4. Copy two values — you'll paste them into Vercel in Step 3:
   - **Project URL** (looks like `https://abcdxyz.supabase.co`)
   - **anon public** key (a long string under "Project API keys")

That's it. You do **not** need to create any tables. This app only uses
Supabase Realtime "broadcast", which is on by default.

---

## Step 2 — Get the code onto GitHub

**Option A (simplest):** unzip this project, then drag the folder into a new
GitHub repo using GitHub Desktop, or upload it via github.com → **New
repository → uploading an existing file**.

**Option B (command line):**
```bash
cd play-the-games
git init
git add .
git commit -m "Play the Games"
# create an empty repo on github.com first, then:
git remote add origin https://github.com/YOUR-NAME/play-the-games.git
git push -u origin main
```

---

## Step 3 — Deploy on Vercel (gives you the public URL)

1. Go to vercel.com → **Add New → Project**.
2. **Import** the GitHub repo you just made.
3. Before clicking Deploy, open **Environment Variables** and add these two
   (names must match exactly):

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | the Project URL from Step 1 |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the anon public key from Step 1 |

4. Click **Deploy**. After ~1 minute you'll get a live URL like
   `https://play-the-games-xyz.vercel.app`.

Done. That URL is your app.

---

## Step 4 — Run it in the pitch

1. On the projector / laptop, open **`your-url.vercel.app/host`**.
   You'll see a big QR code and a "Room OLY-XXXX" code.
2. Say *"Let's play a game — scan the code."* The room scans with their phone
   camera; it opens the join page, they type a name, tap **Play as guest**, and
   their name pops into your lobby live.
3. When enough people are in, press **Start the games**.
4. Each question runs on a 15-second timer. Phones tap their answer; the host
   screen shows how many have answered. You can hit **Reveal now** to skip the
   timer.
5. After each question: correct answer + an Olympic fact, then press
   **See standings** for the animated leaderboard, then **Next question**.
6. After question five you land on the **Final Podium** with your closing line:
   *"Now imagine this with 50,000 fans during a break in the Olympic Games."*

### Tips for a smooth live demo
- Test the whole flow once from your own phone the day before.
- Have the host URL open and the QR showing **before** you start talking.
- If someone's phone refreshes mid-game, it automatically re-syncs to the
  current question — they won't get stuck.
- The host screen is the source of truth. If you ever need a clean restart,
  just reload `/host` (it generates a fresh room code).

---

## Editing the questions

All five questions live in **`lib/game.js`** in the `QUESTIONS` array. Each has:

- `format` — the label shown on screen ("Multiple choice", "Speed", etc.)
- `prompt` — the question text
- `options` — the answer buttons (2 options renders as a True/False pair)
- `answer` — the **index** of the correct option (0 = first, 1 = second, …)
- `fact` — the line revealed after the answer

Change `TIME_PER_Q` in the same file to adjust the per-question timer.
After editing, commit and push — Vercel redeploys automatically.

---

## Running locally (optional, for testing)

```bash
cp .env.example .env.local      # paste your two Supabase values into it
npm install
npm run dev                     # open http://localhost:3000/host
```
To test multiplayer locally, open `/host` on your laptop and `/play` on your
phone — but your phone must reach your laptop, so the deployed Vercel URL is the
reliable way to test with real devices.

---

## How it works (for the pitch Q&A)

The host browser holds the authoritative game state and broadcasts state
snapshots over a Supabase Realtime channel named after the room code. Players
broadcast lightweight `join` and `answer` events back. There's no database and
no custom server — the "backend" is just Supabase's managed websocket layer,
which is why it deploys in minutes and costs nothing at this scale.
