"use client";
import { motion } from "framer-motion";
import { COLORS as C } from "../lib/game";

export const display = `"Cormorant Garamond", Georgia, serif`;
export const sans = `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
export const ease = [0.22, 1, 0.36, 0.22];
export const spring = { type: "spring", stiffness: 320, damping: 30 };

export function RingsMark({ size = 60, animated = false, stroke = 4 }) {
  const r = size * 0.22;
  const dx = r * 1.15;
  const dy = r * 0.6;
  const cx = size / 2;
  const cy = size / 2;
  const rings = [
    { x: cx - 2 * dx, y: cy - dy, color: "#0081C8" },
    { x: cx, y: cy - dy, color: "#111111" },
    { x: cx + 2 * dx, y: cy - dy, color: C.red },
    { x: cx - dx, y: cy + dy, color: C.gold },
    { x: cx + dx, y: cy + dy, color: "#009F3D" },
  ];
  return (
    <svg
      width={size * 2.4}
      height={size * 1.3}
      viewBox={`0 0 ${size * 2.4} ${size * 1.3}`}
      style={{ overflow: "visible" }}
    >
      <g transform={`translate(${size * 0.7}, ${size * 0.1})`}>
        {rings.map((ring, i) => (
          <motion.circle
            key={i}
            cx={ring.x}
            cy={ring.y}
            r={r}
            fill="none"
            stroke={ring.color}
            strokeWidth={stroke}
            initial={animated ? { pathLength: 0, opacity: 0 } : false}
            animate={animated ? { pathLength: 1, opacity: 1 } : false}
            transition={{ duration: 1, delay: i * 0.14, ease }}
          />
        ))}
      </g>
    </svg>
  );
}

export function Seam({ delay = 0, width = 64 }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.9, delay, ease }}
      style={{
        height: 1,
        width,
        background: C.gold,
        transformOrigin: "center",
        margin: "0 auto",
      }}
    />
  );
}

export function PrimaryButton({ children, disabled, onClick, style }) {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={disabled ? undefined : onClick}
      style={{
        width: "100%",
        padding: "18px 20px",
        borderRadius: 16,
        border: "none",
        fontFamily: sans,
        fontSize: 16.5,
        fontWeight: 600,
        letterSpacing: 0.3,
        cursor: disabled ? "default" : "pointer",
        background: disabled ? C.navySoft : C.gold,
        color: disabled ? C.slate : C.navyDeep,
        boxShadow: disabled ? "none" : "0 12px 30px rgba(200,162,75,0.3)",
        transition: "background 0.3s, color 0.3s",
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

export const pageBg = {
  minHeight: "100vh",
  background: `radial-gradient(120% 80% at 50% 0%, ${C.navy} 0%, ${C.navyDeep} 70%)`,
  display: "flex",
  justifyContent: "center",
  fontFamily: sans,
};
