import { proxy } from "valtio";
import { devtools } from "valtio/utils";

export const store = proxy({
  selectedLanguage: "es",
  dialog: {
    isOpen: false,
  },
});

devtools(store, { name: "Retro Console - Antony", enabled: import.meta.env.DEV });
