import { subscribe } from "valtio";
import "./ButtonManager.css";

import { IStore, store } from "../store";
import { TEXTS } from "../texts";

export default class ButtonManager {
  _element: HTMLButtonElement;

  constructor(button?: HTMLButtonElement) {
    this._element = button ?? (document.getElementById("init-button") as HTMLButtonElement);
    this.prepare();
  }

  setText(text: string) {
    this._element.innerText = text;
  }

  prepare(state = store) {
    const text = TEXTS.start[state.lang];

    this.setText(text);

    this._element.addEventListener("click", () => {
      store.dialog.isOpen = !store.dialog.isOpen;
    });

    subscribe(store, () => {
      this.listener(store);
    });
  }

  listener(state: IStore) {
    const text = TEXTS.start[state.lang];

    this.setText(text);

    this._element.style.display = state.dialog.isOpen ? "none" : "block";
  }
}
