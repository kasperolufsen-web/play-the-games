import { motion } from "framer-motion";
import { Check, Wifi, Users, ShieldCheck } from "lucide-react";
import {
  Card,
  PhoneFrame,
  FauxQR,
  Pill,
  LiveDot,
  SectionTitle,
} from "../components/ui";
import { VENUE, STADIUM_CTA } from "../data/mock";

const steps = [
  { n: "1", t: "Scan the QR", d: "Shown on the big screen and on seat-back cards." },
  { n: "2", t: "Tap a name", d: "Guest by default — no account, no download." },
  { n: "3", t: "You're in", d: "Phone becomes your controller for the night." },
];

export default function Join() {
  return (
    <div className="space-y-8">
      <SectionTitle
        kicker="Onboarding"
        title="Scan, tap, you're in"
        sub="A friction-free join flow built for 50,000 people at once. The lighter the entry, the bigger the crowd."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        {/* Left: steps + trust */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 * i }}
              >
                <Card className="h-full p-5">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-volt-500/15 font-display text-sm font-700 text-volt-400">
                    {s.n}
                  </div>
                  <div className="mt-4 font-600">{s.t}</div>
                  <div className="mt-1 text-sm text-white/45">{s.d}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card glow className="relative overflow-hidden p-6">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-sky-500/15 blur-[90px]" />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <LiveDot />
                  <span className="text-sm text-white/50">
                    Joining this break
                  </span>
                </div>
                <div className="mt-2 font-display text-4xl font-700 text-volt-400">
                  +{STADIUM_CTA.joinedThisBreak.toLocaleString()}
                </div>
                <div className="text-sm text-white/40">
                  fans in the last 22 seconds
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Wifi, t: "Lightweight web app", d: "Loads on stadium wifi & 4G" },
                  { icon: ShieldCheck, t: "Guest-first", d: "No personal data to play" },
                  { icon: Users, t: "Built for crowds", d: "Concurrency at venue scale" },
                ].map((f) => (
                  <div key={f.t} className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05]">
                      <f.icon size={16} className="text-sky-400" />
                    </div>
                    <div>
                      <div className="text-sm font-600">{f.t}</div>
                      <div className="text-xs text-white/40">{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex flex-wrap items-center gap-2">
            <Pill accent="#9CFF4F">Venue-controlled session</Pill>
            <Pill accent="#4FC3FF">{VENUE.sessionCode}</Pill>
            <Pill accent="#FF6B4A">{VENUE.name}</Pill>
          </div>
        </div>

        {/* Right: phone join screen */}
        <PhoneFrame label="The phone is the controller">
          <div className="flex h-full flex-col bg-gradient-to-b from-ink-900 to-ink-950">
            <div className="px-6 pt-10">
              <div className="text-[11px] font-700 uppercase tracking-[0.2em] text-volt-400">
                Welcome to
              </div>
              <div className="font-display text-2xl font-700">
                {VENUE.name}
              </div>
              <div className="mt-1 text-xs text-white/40">{VENUE.fixture}</div>
            </div>

            <div className="mt-6 flex flex-1 flex-col items-center justify-center px-6">
              <FauxQR size={140} />
              <div className="mt-5 font-mono text-base font-700 tracking-[0.3em] text-white">
                {VENUE.sessionCode}
              </div>
              <div className="mt-1 text-center text-xs text-white/40">
                Already scanned? Pick a name below.
              </div>

              <div className="mt-6 w-full space-y-2.5">
                <div className="flex items-center justify-between rounded-xl border border-volt-400/40 bg-volt-500/10 px-4 py-3">
                  <span className="font-600 text-volt-400">@you · Block 207</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-volt-400 text-ink-950">
                    <Check size={14} strokeWidth={3} />
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/45">
                  Change name
                </div>
              </div>
            </div>

            <div className="px-5 pb-7">
              <button className="w-full rounded-xl bg-gradient-to-r from-volt-400 to-volt-500 py-3.5 text-center font-700 text-ink-950 shadow-glow">
                Enter the Showdown
              </button>
              <div className="mt-3 text-center text-[10px] text-white/30">
                Playing as guest · No download required
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
