import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Minus, Flame } from "lucide-react";
import { Card, Pill, LiveDot, Meter, SectionTitle } from "../components/ui";
import { LEADERBOARD, SECTION_BATTLE, ACTIVITY } from "../data/mock";

const fmt = (n: number) => n.toLocaleString("en-US");

function Delta({ d }: { d: number }) {
  if (d === 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-white/30">
        <Minus size={12} />
      </span>
    );
  const up = d > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-600 ${
        up ? "text-volt-400" : "text-flame-400"
      }`}
    >
      {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      {Math.abs(d)}
    </span>
  );
}

export default function Leaderboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle
          kicker="Stadium scale"
          title="One leaderboard. The whole venue."
          sub="Every fan, every section, ranked in real time. The board on the big screen is the same board in their hand."
        />
        <LiveDot label="Updating live" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* Main ranking */}
        <Card glow className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <span className="font-display text-lg font-700">Top fans tonight</span>
            <span className="font-mono text-xs text-white/40">
              18,342 ranked
            </span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {LEADERBOARD.map((pl, i) => (
              <motion.div
                key={pl.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i }}
                className={`flex items-center gap-4 px-5 py-3 ${
                  pl.you ? "bg-volt-500/[0.07]" : ""
                }`}
              >
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg font-display text-sm font-700 ${
                    pl.rank <= 3
                      ? "bg-gradient-to-br from-volt-400 to-sky-500 text-ink-950"
                      : "bg-white/[0.05] text-white/60"
                  }`}
                >
                  {pl.rank}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-600">
                      {pl.name}
                    </span>
                    {pl.you && (
                      <span className="rounded bg-volt-400 px-1.5 py-0.5 text-[10px] font-700 text-ink-950">
                        YOU
                      </span>
                    )}
                    {pl.streak >= 6 && (
                      <span className="inline-flex items-center gap-0.5 text-[11px] text-flame-400">
                        <Flame size={11} /> {pl.streak}
                      </span>
                    )}
                  </div>
                  <div className="truncate text-xs text-white/40">
                    {pl.handle} · {pl.section}
                  </div>
                </div>

                <Delta d={pl.delta} />
                <div className="w-20 text-right font-mono text-sm font-700">
                  {fmt(pl.points)}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-white/[0.06] px-5 py-3 text-center text-xs text-white/35">
            Live since kickoff · refreshed every round
          </div>
        </Card>

        {/* Right rail: section battle + activity */}
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-700">
                Section battle
              </span>
              <Pill accent="#9CFF4F">Stand vs stand</Pill>
            </div>
            <div className="mt-4 space-y-4">
              {SECTION_BATTLE.map((s) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-600">{s.name}</span>
                    <span className="font-mono text-white/55">
                      {fmt(s.points)}
                    </span>
                  </div>
                  <Meter value={s.share * 3} accent={s.color} />
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-white/[0.03] p-3 text-xs text-white/45">
              North Stand is winning the rewards multiplier this break.
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-lg font-700">Live feed</span>
              <LiveDot />
            </div>
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: a.color }}
                  />
                  <span className="flex-1 text-sm text-white/60">
                    <span className="font-600 text-white">{a.who}</span> {a.what}
                  </span>
                  <span
                    className="font-mono text-xs font-700"
                    style={{ color: a.color }}
                  >
                    {a.pts}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
