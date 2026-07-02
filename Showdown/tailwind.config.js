/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', '"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
      },
      colors: {
        ink: {
          950: "#05060B",
          900: "#0A0C14",
          850: "#0E111C",
          800: "#141826",
          700: "#1C2133",
          600: "#272D42",
        },
        volt: {
          400: "#9CFF4F",
          500: "#7CF03B",
          600: "#52C91E",
        },
        flame: {
          400: "#FF6B4A",
          500: "#FF4D2E",
        },
        sky: {
          400: "#4FC3FF",
          500: "#1FA9FF",
        },
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(156,255,79,0.45)",
        "glow-sky": "0 0 40px -8px rgba(79,195,255,0.5)",
        card: "0 24px 60px -24px rgba(0,0,0,0.7)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
