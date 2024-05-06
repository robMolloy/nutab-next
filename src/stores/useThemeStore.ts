import { create } from "zustand";
import { Theme as TThemeName } from "daisyui";

export type TDaisyBrandColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "ghost";
export type TDaisyStateColor = "info" | "success" | "warning" | "error";
export type TDaisySize = "xs" | "sm" | "md" | "lg";

const themeNames = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
] as const;

interface ThemeState {
  themeNames: typeof themeNames;
  themeName: TThemeName;
  setThemeName: (themeName: TThemeName) => void;
  setRandomThemeName: () => void;
}

export const useThemeStore = create<ThemeState>()((set, get) => ({
  themeNames,
  themeName: "cupcake",
  setThemeName: (themeName: TThemeName) => {
    const htmlElm = document.querySelector("html");
    if (!htmlElm)
      throw new Error("can't find html element so unable to change theme");

    htmlElm.setAttribute("data-theme", themeName);
    set(() => ({ themeName: themeName }));
  },
  setRandomThemeName: () => {
    const randomNumber = Math.floor(Math.random() * themeNames.length);
    const newThemeName = get().themeNames[randomNumber];

    if (newThemeName) get().setThemeName(newThemeName);
  },
}));
