import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          green: "#4F8F46",
          charcoal: "#222222",
          black: "#080808",
          steel: "#5D6670",
          offwhite: "#F7F7F5",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Barlow Condensed", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        industrial: "0 18px 60px rgba(8, 8, 8, 0.16)",
        "green-glow": "0 0 0 1px rgba(79, 143, 70, 0.32), 0 18px 42px rgba(79, 143, 70, 0.18)",
      },
      keyframes: {
        moveHorizontal: {
          "0%": { transform: "translateX(-45%) translateY(-8%)" },
          "50%": { transform: "translateX(45%) translateY(10%)" },
          "100%": { transform: "translateX(-45%) translateY(-8%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg) translateX(28px) rotate(0deg)" },
          "50%": { transform: "rotate(180deg) translateX(42px) rotate(-180deg)" },
          "100%": { transform: "rotate(360deg) translateX(28px) rotate(-360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-35%)" },
          "50%": { transform: "translateY(35%)" },
          "100%": { transform: "translateY(-35%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        first: "moveVertical 32s ease infinite",
        second: "moveInCircle 24s reverse infinite",
        third: "moveInCircle 36s linear infinite",
        fourth: "moveHorizontal 42s ease infinite",
        fifth: "moveInCircle 28s ease infinite",
        "fade-in-up": "fadeInUp 500ms ease both",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
