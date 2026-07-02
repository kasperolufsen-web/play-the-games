import { motion } from "framer-motion";
import { Gift, Ticket, Sparkles, Lock } from "lucide-react";
import {
  Card,
  Pill,
  PhoneFrame,
  SectionTitle,
  Meter,
} from "../components/ui";
import { REWARDS, VENUE } from "../data/mock";

const fmt = (n: number) => n.toLocaleString("en-US");
const YOUR_POINTS = 8755;

export default function Rewards() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle
          kicker="Sponsor-funded"
          title="Play turns into prizes"
          sub="Sponsors fund the reward pool; fans spend the points they earn. Every redemption is a branded moment the venue controls."
        />
        <Card className="px-4 py-3">
          <div className="text-[11px] uppercase tracking-wide text-white/40">
            Your balance
          </div>
          <div className="font-display text-2xl font-700 text-volt-400">
            {fmt(YOUR_POINTS)} pts
          </div>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        {/* Reward grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {REWARDS.map((r, i) => {
            const affordable = YOUR_POINTS >= r.cost;
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
              >
                <Card className="group relative h-full overflow-hidden p-5">
                  <div
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-[60px]"
                    style={{ background: `${r.accent}2e` }}
                  />
                  <div className="relative flex items-start justify-between">
                    <div
                      className="grid h-11 w-11 place-items-center rounded-xl"
                      style={{ background: `${r.accent}1f` }}
                    >
                      <Gift size={18} style={{ color: r.accent }} />
                    </div>
                    <div className="flex items-center gap-2">
                      {r.hot && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-flame-500/15 px-2 py-0.5 text-[10px] font-700 uppercase text-flame-400">
                          <Sparkles size={10} /> Hot
                        </span>
                      )}
                      <Pill accent={r.accent}>{r.tag}</Pill>
                    </div>
                  </div>

                  <div className="relative mt-4 font-display text-lg font-700 leading-snug">
                    {r.title}
                  </div>
                  <div className="relative mt-1 text-xs text-white/40">
                    by {r.sponsor} · {r.remaining} left
                  </div>

                  <div className="relative mt-4">
                    <Meter
                      value={Math.min(100, (YOUR_POINTS / r.cost) * 100)}
                      accent={r.accent}
                      height={6}
                    />
                  </div>

                  <div className="relative mt-4 flex items-center justify-between">
                    <span className="font-mono text-sm font-700 text-white/80">
                      {fmt(r.cost)} pts
                    </span>
                    <button
                      disabled={!affordable}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-700 transition ${
                        affordable
                          ? "bg-gradient-to-r from-volt-400 to-volt-500 text-ink-950 hover:brightness-105"
                          : "cursor-not-allowed bg-white/[0.05] text-white/35"
                      }`}
                    >
                      {affordable ? (
                        <>
                          <Ticket size={14} /> Redeem
                        </>
                      ) : (
                        <>
                          <Lock size={13} /> {fmt(r.cost - YOUR_POINTS)} more
                        </>
                      )}
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Phone: redemption confirmation */}
        <PhoneFrame label="Redeem at the kiosk">
          <div className="flex h-full flex-col bg-gradient-to-b from-[#13251a] to-ink-950">
            <div className="px-5 pt-9">
              <div className="text-[11px] font-700 uppercase tracking-[0.2em] text-volt-400">
                Reward unlocked
              </div>
              <div className="mt-1 font-display text-xl font-700">
                Free {VENUE.sponsor}
              </div>
              <div className="text-xs text-white/45">Kiosk 4 · North Stand</div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-volt-400 to-volt-500 shadow-glow"
              >
                <Ticket size={40} className="text-ink-950" />
              </motion.div>

              <div className="mt-6 w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4 text-center">
                <div className="text-[11px] uppercase tracking-wide text-white/40">
                  Show this code
                </div>
                <div className="mt-1 font-mono text-2xl font-700 tracking-[0.25em] text-volt-400">
                  VX-4417
                </div>
                <div className="mt-1 text-[11px] text-white/35">
                  Valid until full-time
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                <span className="font-mono">−500 pts</span>
                <span>·</span>
                <span className="font-mono text-volt-400">
                  {fmt(YOUR_POINTS - 500)} left
                </span>
              </div>
            </div>

            <div className="px-5 pb-8">
              <button className="w-full rounded-xl bg-white/[0.06] py-3 text-center text-sm font-600 text-white/80">
                Back to games
              </button>
            </div>
          </div>
        </PhoneFrame>
      </div>

      <Card className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-white/55">
          Reward pool funded by{" "}
          <span className="font-700 text-white">{VENUE.sponsor}</span> and the
          club store — fully branded, fully measurable.
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill accent="#9CFF4F">Sponsor ROI</Pill>
          <Pill accent="#4FC3FF">Footfall to kiosks</Pill>
          <Pill accent="#FF6B4A">Opt-in data</Pill>
        </div>
      </Card>
    </div>
  );
}
