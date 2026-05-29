import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa",
        surface: "#ffffff",
        "surface-muted": "#f3f4f5",
        "surface-strong": "#e7e8e9",
        ink: "#191c1d",
        muted: "#44474a",
        outline: "#c5c6ca",
        primary: "#0453cd",
        "primary-soft": "#dae2ff",
        success: "#059669",
        "success-soft": "#dff7ec",
        danger: "#ba1a1a",
        charcoal: "#1a1c1e",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.04)",
        lift: "0 10px 32px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
