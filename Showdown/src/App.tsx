import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  QrCode,
  Gamepad2,
  Trophy,
  Gift,
  MonitorPlay,
  Camera,
  CameraOff,
} from "lucide-react";
import { Logo } from "./components/ui";
import { VENUE } from "./data/mock";

import Overview from "./screens/Overview";
import Join from "./screens/Join";
import Play from "./screens/Play";
import Leaderboard from "./screens/Leaderboard";
import Rewards from "./screens/Rewards";
import StadiumScreen from "./screens/StadiumScreen";

type ScreenKey =
  | "overview"
  | "join"
  | "play"
  | "leaderboard"
  | "rewards"
  | "stadium";

const NAV: {
  key: ScreenKey;
  label: string;
  icon: typeof Sparkles;
  hint: string;
}[] = [
  { key: "overview", label: "Overview", icon: Sparkles, hint: "The pitch" },
  { key: "join", label: "Join", icon: QrCode, hint: "Scan to play" },
  { key: "play", label: "Play", icon: Gamepad2, hint: "Games & predictions" },
  { key: "leaderboard", label: "Leaderboard", icon: Trophy, hint: "Stadium scale" },
  { key: "rewards", label: "Rewards", icon: Gift, hint: "Sponsor-funded" },
  { key: "stadium", label: "Stadium Screen", icon: MonitorPlay, hint: "Main event" },
];

const SCREENS: Record<ScreenKey, () => JSX.Element> = {
  overview: Overview,
  join: Join,
  play: Play,
  leaderboard: Leaderboard,
  rewards: Rewards,
  stadium: StadiumScreen,
};

export default function App() {
  const [screen, setScreen] = useState<ScreenKey>("overview");
  const [capture, setCapture] = useState(false);
  const Active = SCREENS[screen];

  return (
    <div className="relative min-h-screen bg-ink-950 text-white">
      {/* Ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-volt-500/10 blur-[140px]" />
        <div className="absolute right-[-10%] top-[20%] h-[460px] w-[460px] rounded-full bg-sky-500/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-1/3 h-[420px] w-[420px] rounded-full bg-flame-500/[0.07] blur-[150px]" />
      </div>

      <div className="relative flex">
        {/* ---- Sidebar (hidden in Capture Mode) ---- */}
        <AnimatePresence>
          {!capture && (
            <motion.aside
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="sticky top-0 z-30 hidden h-screen w-[244px] shrink-0 flex-col border-r border-white/[0.06] bg-ink-900/70 px-4 py-6 backdrop-blur-xl lg:flex"
            >
              <div className="px-2">
                <Logo />
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map((item) => {
                  const active = screen === item.key;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setScreen(item.key)}
                      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                        active
                          ? "bg-white/[0.06] text-white"
                          : "text-white/55 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="navactive"
                          className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-volt-400 to-sky-500"
                        />
                      )}
                      <Icon
                        size={18}
                        className={active ? "text-volt-400" : ""}
                        strokeWidth={2.2}
                      />
                      <span className="flex-1">
                        <span className="block text-sm font-600">
                          {item.label}
                        </span>
                        <span className="block text-[11px] text-white/35">
                          {item.hint}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-auto rounded-xl border border-white/[0.06] bg-ink-850/80 p-3">
                <div className="text-[11px] font-600 uppercase tracking-wide text-white/40">
                  Active session
                </div>
                <div className="mt-1 font-display text-sm font-700">
                  {VENUE.name}
                </div>
                <div className="mt-0.5 text-[11px] text-white/40">
                  {VENUE.fixture}
                </div>
                <div className="mt-2 inline-flex rounded-md bg-volt-500/15 px-2 py-1 font-mono text-[11px] font-700 text-volt-400">
                  {VENUE.sessionCode}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ---- Main stage ---- */}
        <main className="relative flex-1">
          {/* Topbar (hidden in Capture Mode) */}
          <AnimatePresence>
            {!capture && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.06] bg-ink-950/70 px-6 py-3.5 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 lg:hidden">
                  <Logo compact />
                </div>
                <div className="hidden text-sm text-white/40 lg:block">
                  Product vision prototype
                  <span className="mx-2 text-white/15">/</span>
                  <span className="text-white/70">
                    {NAV.find((n) => n.key === screen)?.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile nav */}
                  <div className="flex gap-1 lg:hidden">
                    {NAV.map((n) => (
                      <button
                        key={n.key}
                        onClick={() => setScreen(n.key)}
                        className={`grid h-9 w-9 place-items-center rounded-lg ${
                          screen === n.key
                            ? "bg-white/10 text-volt-400"
                            : "text-white/50"
                        }`}
                      >
                        <n.icon size={17} />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCapture(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-600 text-white/80 transition hover:bg-white/[0.08]"
                  >
                    <Camera size={16} />
                    Capture Mode
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating exit-capture button */}
          {capture && (
            <button
              onClick={() => setCapture(false)}
              className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-850/90 px-4 py-2.5 text-sm font-600 text-white/80 shadow-card backdrop-blur transition hover:bg-ink-800"
            >
              <CameraOff size={16} />
              Exit Capture
            </button>
          )}

          <div className="mx-auto max-w-[1180px] px-5 py-7 sm:px-8 sm:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Active />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
