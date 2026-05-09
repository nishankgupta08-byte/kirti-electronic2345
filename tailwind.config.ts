import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        kirti: {
          primary: "#0EA5E9",
          hover: "#0284C7",
          light: "#BAE6FD",
          lighter: "#F0F9FF",
          border: "#E0F2FE",
          dark: "#0F172A",
          muted: "#475569",
        },
      },
      boxShadow: {
        glass: "0 4px 24px rgba(14,165,233,0.10)",
        "glass-lg": "0 8px 32px rgba(14,165,233,0.25)",
        "card-hover": "0 12px 40px rgba(14,165,233,0.18)",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
