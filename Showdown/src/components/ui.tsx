import { ReactNode } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Brand mark
// ---------------------------------------------------------------------------
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-volt-400 to-sky-500 shadow-glow">
        <div className="h-3.5 w-3.5 rotate-45 rounded-[3px] bg-ink-950" />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-volt-400" />
      </div>
      {!compact && (
        <span className="font-display text-lg font-700 tracking-tight">
          Showdown
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pills / chips
// ---------------------------------------------------------------------------
export function Pill({
  children,
  accent = "#4FC3FF",
  solid = false,
}: {
  children: ReactNode;
  accent?: string;
  solid?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-600 uppercase tracking-wide"
      style={{
        color: solid ? "#05060B" : accent,
        background: solid ? accent : `${accent}1a`,
        border: solid ? "none" : `1px solid ${accent}33`,
      }}
    >
      {children}
    </span>
  );
}

export function LiveDot({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-flame-500/30 bg-flame-500/10 px-2.5 py-1 text-[11px] font-700 uppercase tracking-wide text-flame-400">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame-400" />
      </span>
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
export function Card({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.06] bg-ink-850/80 backdrop-blur-sm ${
        glow ? "shadow-card" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat block
// ---------------------------------------------------------------------------
export function Stat({
  value,
  label,
  accent = "#9CFF4F",
}: {
  value: string;
  label: string;
  accent?: string;
}) {
  return (
    <div>
      <div
        className="font-display text-2xl font-700 leading-none"
        style={{ color: accent }}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[11px] font-500 uppercase tracking-wide text-white/45">
        {label}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Phone frame — used to show the "phone is the controller" experience
// ---------------------------------------------------------------------------
export function PhoneFrame({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[300px] rounded-[2.6rem] border border-white/10 bg-ink-950 p-2.5 shadow-card">
        <div className="absolute left-1/2 top-2.5 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-ink-950" />
        <div className="relative h-[620px] overflow-hidden rounded-[2.1rem] bg-ink-900">
          {children}
        </div>
      </div>
      {label && (
        <div className="mt-3 text-[11px] font-600 uppercase tracking-widest text-white/35">
          {label}
        </div>
      )}
    </div>
  );
}

// Faux QR — decorative, deterministic pattern. Not a scannable code.
export function FauxQR({ size = 132 }: { size?: number }) {
  const cells = 11;
  const seed = (i: number, j: number) =>
    (i * 7 + j * 13 + ((i * j) % 5)) % 3 !== 0;
  return (
    <div
      className="rounded-xl bg-white p-2.5"
      style={{ width: size, height: size }}
    >
      <div
        className="grid h-full w-full gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${cells}, 1fr)` }}
      >
        {Array.from({ length: cells * cells }).map((_, idx) => {
          const i = Math.floor(idx / cells);
          const j = idx % cells;
          const corner =
            (i < 3 && j < 3) ||
            (i < 3 && j > cells - 4) ||
            (i > cells - 4 && j < 3);
          const on = corner ? (i + j) % 2 === 0 || (i < 3 && j < 3) : seed(i, j);
          return (
            <div
              key={idx}
              className="rounded-[1px]"
              style={{ background: on ? "#05060B" : "transparent" }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Animated meter bar
export function Meter({
  value,
  accent = "#9CFF4F",
  height = 8,
}: {
  value: number;
  accent?: string;
  height?: number;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-full bg-white/[0.07]"
      style={{ height }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: accent }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}

export function SectionTitle({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div>
      {kicker && (
        <div className="mb-1.5 text-[11px] font-700 uppercase tracking-[0.2em] text-volt-400">
          {kicker}
        </div>
      )}
      <h2 className="font-display text-2xl font-700 tracking-tight">{title}</h2>
      {sub && <p className="mt-1 max-w-xl text-sm text-white/50">{sub}</p>}
    </div>
  );
}
