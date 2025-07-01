import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",

        card: "hsl(var(--color-card))",
        "card-foreground": "hsl(var(--color-card-foreground))",

        popover: "hsl(var(--color-popover))",
        "popover-foreground": "hsl(var(--color-popover-foreground))",

        primary: "hsl(var(--color-primary))",
        "primary-foreground": "hsl(var(--color-primary-foreground))",

        secondary: "hsl(var(--color-secondary))",
        "secondary-foreground": "hsl(var(--color-secondary-foreground))",

        muted: "hsl(var(--color-muted))",
        "muted-foreground": "hsl(var(--color-muted-foreground))",

        accent: "hsl(var(--color-accent))",
        "accent-foreground": "hsl(var(--color-accent-foreground))",

        destructive: "hsl(var(--color-destructive))",
        "destructive-foreground": "hsl(var(--color-destructive-foreground))",

        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
        ring: "hsl(var(--color-ring))",

        // Uncomment if you want to add custom colors for GrönKarta
        // "granite-ridge": "hsl(var(--color-granite-ridge))",
        // "lake-mist": "hsl(var(--color-lake-mist))",
        // "warm-clouds": "hsl(var(--color-warm-clouds))",
        // "glacial-fog": "hsl(var(--color-glacial-fog))",
        // "twilight-lupine": "hsl(var(--color-twilight-lupine))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      // Add animations or other extensions if needed
    },
  },
  plugins: [],
  darkMode: "class", // add dark mode if desired
};

export default config;
