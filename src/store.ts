import { proxy } from "valtio";
import { devtools } from "valtio/utils";

import { AllowedLanguages } from "./types";

export interface IStore {
  lang: AllowedLanguages;
  dialog: {
    isOpen: boolean;
  };
}

export const store = proxy<IStore>({
  lang: navigator.language as AllowedLanguages,
  dialog: {
    isOpen: false,
  },
});

devtools(store, { name: "Retro Console - Antony", enabled: import.meta.env.DEV });
