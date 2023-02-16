import { proxy } from "valtio";
import { devtools } from "valtio/utils";

export const store = proxy({
  selectedLanguage: "es",
  dialog: {
    isDragging: false,
    isHidden: true,
    xDiff: 0,
    yDiff: 0,
    x: 50,
    y: 50,
    isOpen: false,
  },
});

devtools(store, { name: "Retro Console - Antony", enabled: import.meta.env.DEV });
