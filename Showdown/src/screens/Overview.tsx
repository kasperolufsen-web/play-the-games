import { motion } from "framer-motion";
import { ArrowRight, QrCode, Zap, Trophy, Gift } from "lucide-react";
import { Card, Pill, LiveDot, FauxQR } from "../components/ui";
import { VENUE, SESSION } from "../data/mock";

const fmt = (n: number) => n.toLocaleString("en-US");

const flow = [
  { icon: QrCode, label: "Scan", note: "QR on the big screen" },
  { icon: Zap, label: "Play", note: "Mini-games & predictions" },
  { icon: Trophy, label: "Compete", note: "Stadium leaderboards" },
  { icon: Gift, label: "Win", note: "Sponsor-funded rewards" },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card glow className="relative overflow-hidden">
        <div className="grid-glow absolute inset-0 opacity-60" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-volt-500/20 blur-[120px]" />
        <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <LiveDot label="In-venue now" />
              <Pill accent="#4FC3FF">Fan engagement platform</Pill>
            </div>
            <h1 className="mt-5 font-display text-4xl font-700 leading-[1.05] tracking-tight sm:text-5xl">
              The stadium
              <br />
              becomes <span className="text-gradient-volt">the game.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/55">
              Showdown turns the dead minutes of live sport into mass
              participation. Fans scan a QR code in their seat, play instantly,
              and compete on a leaderboard the whole venue can see — all funded
              by sponsors, all controlled by the venue.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-volt-400 to-volt-500 px-5 py-3 text-sm font-700 text-ink-950 shadow-glow transition hover:brightness-105">
                Turn dead time into live engagement
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-0.5"
                />
              </button>
              <span className="font-mono text-xs text-white/40">
                {VENUE.name} · {VENUE.city}
              </span>
            </div>
          </div>

          {/* Join card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="relative mx-auto w-full max-w-[300px] rounded-2xl border border-white/10 bg-ink-950/80 p-6 text-center shadow-card"
          >
            <div className="text-[11px] font-700 uppercase tracking-[0.2em] text-volt-400">
              Scan to join the Showdown
            </div>
            <div className="mt-4 flex justify-center">
              <FauxQR size={150} />
            </div>
            <div className="mt-4 font-mono text-lg font-700 tracking-widest">
              {VENUE.sessionCode}
            </div>
            <div className="mt-1 text-xs text-white/40">
              No app. No login. Tap and play.
            </div>
          </motion.div>
        </div>
      </Card>

      {/* Stat strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { v: fmt(SESSION.fansJoined), l: "Fans joined tonight", a: "#9CFF4F" },
          { v: fmt(SESSION.liveNow), l: "Playing live now", a: "#4FC3FF" },
          { v: `${SESSION.avgRoundSeconds}s`, l: "Avg round length", a: "#FF6B4A" },
          { v: `$${fmt(SESSION.prizePool)}`, l: "Sponsor prize pool", a: "#C792FF" },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Card className="p-5">
              <div
                className="font-display text-3xl font-700 leading-none"
                style={{ color: s.a }}
              >
                {s.v}
              </div>
              <div className="mt-2 text-xs font-500 uppercase tracking-wide text-white/45">
                {s.l}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Flow */}
      <div>
        <div className="mb-4 text-[11px] font-700 uppercase tracking-[0.2em] text-white/40">
          How a break plays out
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
              >
                <Card className="relative h-full p-5">
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05]">
                      <Icon size={18} className="text-volt-400" />
                    </div>
                    <span className="font-mono text-xs text-white/25">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-4 font-display text-lg font-700">
                    {f.label}
                  </div>
                  <div className="mt-1 text-sm text-white/45">{f.note}</div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Positioning line */}
      <Card className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-white/55">
          <span className="font-700 text-white">Venue controls the session.</span>{" "}
          The phone is the controller. The stadium screen is the main event.
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill accent="#9CFF4F">Venue-agnostic</Pill>
          <Pill accent="#4FC3FF">Sponsor-funded</Pill>
          <Pill accent="#FF6B4A">Zero-install</Pill>
        </div>
      </Card>
    </div>
  );
}
