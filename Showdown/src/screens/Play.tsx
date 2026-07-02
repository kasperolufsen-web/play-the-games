import { motion } from "framer-motion";
import { Timer, Users, Flame, ChevronRight } from "lucide-react";
import {
  Card,
  Pill,
  LiveDot,
  PhoneFrame,
  Meter,
  SectionTitle,
} from "../components/ui";
import { MINI_GAMES, LIVE_PREDICTION } from "../data/mock";

const fmt = (n: number) => n.toLocaleString("en-US");

export default function Play() {
  const p = LIVE_PREDICTION;
  return (
    <div className="space-y-8">
      <SectionTitle
        kicker="Phone is the controller"
        title="Short games. Live predictions. Every break."
        sub="Each stoppage triggers a fast round. Reaction tests, skill shots, and real-time calls on what happens next — synced to the action on the pitch."
      />

      {/* Mini-game catalogue */}
      <div className="grid gap-4 sm:grid-cols-2">
        {MINI_GAMES.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
          >
            <Card className="group relative h-full overflow-hidden p-5">
              <div
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full blur-[70px] transition group-hover:opacity-90"
                style={{ background: `${g.accent}33` }}
              />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{ background: `${g.accent}1f` }}
                  >
                    <span
                      className="h-3.5 w-3.5 rotate-45 rounded-[3px]"
                      style={{ background: g.accent }}
                    />
                  </div>
                  <div>
                    <div className="font-display text-lg font-700">
                      {g.title}
                    </div>
                    <div className="text-sm text-white/45">{g.tagline}</div>
                  </div>
                </div>
              </div>

              <div className="relative mt-5 flex items-center gap-2">
                <Pill accent={g.accent}>{g.type}</Pill>
                <span className="inline-flex items-center gap-1 text-xs text-white/45">
                  <Timer size={13} /> {g.duration}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-white/45">
                  <Users size={13} /> {fmt(g.players)}
                </span>
                <ChevronRight
                  size={18}
                  className="ml-auto text-white/25 transition group-hover:translate-x-0.5 group-hover:text-white/60"
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Live prediction split: big-screen view + phone */}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <Card glow className="relative overflow-hidden">
          <div className="grid-glow absolute inset-0 opacity-50" />
          <div className="relative p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <LiveDot label="Prediction open" />
                <span className="text-sm text-white/45">{p.context}</span>
              </div>
              <span className="font-mono text-sm text-white/40">closes in 0:08</span>
            </div>

            <h3 className="mt-5 font-display text-2xl font-700 sm:text-3xl">
              {p.question}
            </h3>

            <div className="mt-6 space-y-3">
              {p.options.map((o, i) => (
                <motion.div
                  key={o.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-600">{o.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-volt-400">
                        {o.odds}
                      </span>
                      <span className="w-12 text-right font-mono text-sm text-white/55">
                        {o.share}%
                      </span>
                    </div>
                  </div>
                  <div className="relative z-10 mt-2.5">
                    <Meter
                      value={o.share}
                      accent={i === 0 ? "#9CFF4F" : "#4FC3FF"}
                      height={6}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-white/40">
              <Flame size={14} className="text-flame-400" />
              13,902 fans have called this round
            </div>
          </div>
        </Card>

        {/* Phone: power-strike skill game mid-play */}
        <PhoneFrame label="In-hand: Power Strike">
          <div className="flex h-full flex-col bg-gradient-to-b from-[#10231a] to-ink-950">
            <div className="flex items-center justify-between px-5 pt-9">
              <Pill accent="#9CFF4F" solid>
                Round 4
              </Pill>
              <span className="font-mono text-sm font-700 text-white">0:11</span>
            </div>

            <div className="mt-3 px-5">
              <div className="font-display text-xl font-700">Power Strike</div>
              <div className="text-xs text-white/45">
                Hold to charge — release in the green.
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <div className="relative h-44 w-full">
                {/* charge track */}
                <div className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="absolute bottom-0 h-[68%] w-full rounded-full bg-gradient-to-t from-volt-500 to-volt-400" />
                  {/* sweet spot */}
                  <div className="absolute bottom-[60%] h-[16%] w-full bg-white/30" />
                </div>
                <div className="absolute left-1/2 top-[24%] -translate-x-1/2 translate-y-[-50%] rounded-md bg-volt-400 px-2 py-0.5 font-mono text-[10px] font-700 text-ink-950">
                  PERFECT
                </div>
              </div>

              <div className="mt-2 font-display text-3xl font-700 text-volt-400">
                68%
              </div>
              <div className="text-xs text-white/40">charge power</div>
            </div>

            <div className="px-5 pb-8">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="w-full rounded-2xl bg-gradient-to-r from-volt-400 to-volt-500 py-5 text-center font-display text-lg font-700 text-ink-950 shadow-glow"
              >
                HOLD TO CHARGE
              </motion.button>
              <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
                <span>Your score</span>
                <span className="font-mono text-volt-400">8,755 pts</span>
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
