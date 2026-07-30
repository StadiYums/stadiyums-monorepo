export type ThemeId = "default" | "grizzly";

export type ThemeColors = {
  navy: string;
  navyDeep: string;
  cream: string;
  inputBg: string;
  accent: string;
  accentDim: string;
  accentRing: string;
  accentBorder: string;
  accentTint10: string;
  accentTint15: string;
  line: string;
};

export type Theme = {
  id: ThemeId;
  name: string;
  wordmark: { before: string; accent: string };
  tagline: string;
  colors: ThemeColors;
  logoSrc: string;
  showPoweredBy: boolean;
  pageTitle: string;
};

export const THEMES: Record<ThemeId, Theme> = {
  default: {
    id: "default",
    name: "StadiYums",
    wordmark: { before: "Stadi", accent: "Yums" },
    tagline: "More game. Less lines.",
    colors: {
      navy: "#0B1D33",
      navyDeep: "#071527",
      cream: "#F7F5F0",
      inputBg: "#F7F5F0",
      accent: "#FD490A",
      accentDim: "#E44309",
      accentRing: "rgba(253,73,10,0.15)",
      accentBorder: "rgba(253,73,10,0.4)",
      accentTint10: "rgba(253,73,10,0.1)",
      accentTint15: "rgba(253,73,10,0.15)",
      line: "rgba(11,29,51,0.1)",
    },
    logoSrc: "/favicon.png",
    showPoweredBy: false,
    pageTitle: "StadiYums — Live Demo",
  },
  grizzly: {
    id: "grizzly",
    name: "Fresno Grizzlies",
    wordmark: { before: "Fresno ", accent: "Grizzlies" },
    tagline: "Growlifornia",
    colors: {
      navy: "#231F20",
      navyDeep: "#1A1718",
      cream: "#F7F5F0",
      inputBg: "#FFFFFF",
      accent: "#D10E47",
      accentDim: "#B00C3D",
      accentRing: "rgba(209,14,71,0.18)",
      accentBorder: "rgba(209,14,71,0.45)",
      accentTint10: "rgba(209,14,71,0.1)",
      accentTint15: "rgba(209,14,71,0.15)",
      line: "rgba(35,31,32,0.1)",
    },
    logoSrc: "https://www.mlbstatic.com/team-logos/259.svg",
    showPoweredBy: true,
    pageTitle: "Fresno Grizzlies — Chukchansi Park",
  },
};

export function applyThemeColors(colors: ThemeColors): void {
  const root = document.documentElement;
  root.style.setProperty("--navy", colors.navy);
  root.style.setProperty("--navy-deep", colors.navyDeep);
  root.style.setProperty("--cream", colors.cream);
  root.style.setProperty("--input-bg", colors.inputBg);
  root.style.setProperty("--orange", colors.accent);
  root.style.setProperty("--orange-dim", colors.accentDim);
  root.style.setProperty("--accent-ring", colors.accentRing);
  root.style.setProperty("--accent-border", colors.accentBorder);
  root.style.setProperty("--accent-tint-10", colors.accentTint10);
  root.style.setProperty("--accent-tint-15", colors.accentTint15);
  root.style.setProperty("--line", colors.line);
}
