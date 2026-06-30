import { motion } from "framer-motion";
import { Card, FauxQR, LiveDot, Pill, SectionTitle } from "../components/ui";
import { Logo } from "../components/ui";
import { VENUE, LEADERBOARD, SECTION_BATTLE, STADIUM_CTA } from "../data/mock";

const fmt = (n: number) => n.toLocaleString("en-US");
const podium = LEADERBOARD.slice(0, 3);

export default function StadiumScreen() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle
          kicker="The main event"
          title="The stadium screen"
          sub="The shared display every fan looks up to. Built to read from the back row — and to make people scan."
        />
        <Pill accent="#4FC3FF">16:9 · big screen render</Pill>
      </div>

      {/* The giant board */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-card">
        <div className="grid-glow absolute inset-0 opacity-50" />
        <div className="absolute -left-32 top-[-20%] h-[60%] w-[55%] rounded-full bg-volt-500/20 blur-[140px]" />
        <div className="absolute -right-32 bottom-[-20%] h-[60%] w-[55%] rounded-full bg-sky-500/20 blur-[140px]" />

        {/* Top bar */}
        <div className="relative flex items-center justify-between px-7 pt-6">
          <Logo />
          <div className="flex items-center gap-3">
            <LiveDot label="Half-time break" />
            <span className="font-mono text-sm text-white/50">
              {VENUE.fixture}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="relative grid h-[calc(100%-120px)] grid-cols-[1.05fr_1fr] gap-6 px-7 py-5">
          {/* Left: headline + join */}
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl font-700 leading-[1.04] tracking-tight xl:text-5xl"
            >
              Turn dead time into
              <br />
              <span className="text-gradient-volt">live engagement.</span>
            </motion.h2>

            <div className="mt-6 flex items-center gap-5">
              <FauxQR size={132} />
              <div>
                <div className="text-[11px] font-700 uppercase tracking-[0.2em] text-volt-400">
                  Scan to play now
                </div>
                <div className="mt-1 font-mono text-3xl font-700 tracking-[0.2em]">
                  {STADIUM_CTA.qr}
                </div>
                <div className="mt-2 text-sm text-white/50">
                  Next round starts in
                </div>
                <div className="font-display text-4xl font-700 text-flame-400">
                  0:{String(STADIUM_CTA.countdown).padStart(2, "0")}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Pill accent="#9CFF4F" solid>
                +{fmt(STADIUM_CTA.joinedThisBreak)} joined this break
              </Pill>
              <span className="text-xs text-white/40">
                Powered by {VENUE.sponsor}
              </span>
            </div>
          </div>

          {/* Right: live podium + section battle */}
          <div className="flex flex-col gap-4">
            <Card className="flex-1 p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-700">
                  Top of the stadium
                </span>
                <span className="font-mono text-xs text-white/40">
                  {fmt(VENUE.capacity)} seats
                </span>
              </div>
              <div className="mt-4 space-y-2.5">
                {podium.map((p, i) => (
                  <motion.div
                    key={p.rank}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-volt-400 to-sky-500 font-display text-base font-700 text-ink-950">
                      {p.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-600">{p.name}</div>
                      <div className="text-xs text-white/40">{p.section}</div>
                    </div>
                    <div className="font-mono text-lg font-700 text-volt-400">
                      {fmt(p.points)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-700">Section battle</span>
                <span className="text-[11px] text-white/40">live</span>
              </div>
              <div className="flex items-end gap-3">
                {SECTION_BATTLE.map((s, i) => (
                  <div key={s.name} className="flex flex-1 flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${s.share * 2.6}px` }}
                      transition={{ delay: 0.1 * i, duration: 0.7 }}
                      className="w-full rounded-t-md"
                      style={{ background: s.color, minHeight: 8 }}
                    />
                    <div className="mt-2 text-center text-[10px] leading-tight text-white/45">
                      {s.name}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Sponsor footer */}
        <div className="relative flex items-center justify-between border-t border-white/[0.06] px-7 py-3.5">
          <span className="font-mono text-xs text-white/40">
            {VENUE.name} · {VENUE.city}
          </span>
          <span className="text-xs font-600 text-white/55">
            Reward pool presented by{" "}
            <span className="text-volt-400">{VENUE.sponsor}</span>
          </span>
        </div>
      </div>

      <Card className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-white/55">
          The big screen drives the join; the phone drives the play. One session,
          one venue, one shared moment.
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill accent="#9CFF4F">Venue-controlled</Pill>
          <Pill accent="#4FC3FF">Reads from the back row</Pill>
        </div>
      </Card>
    </div>
  );
}
