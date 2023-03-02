import { subscribeKey } from "valtio/utils";

import { PAGES } from "../constants";
import { IStore, store } from "../store";
import { TEXTS } from "../texts";
import { AllowedLanguages, GoToCommand, isAllowedCommand, isAllowedPage, isClearCommand, isGoToCommand, isUICommand } from "../types";
import "./InputManager.css";

export class InputManager {
  private _input: HTMLInputElement;
  private _inputBox: HTMLDivElement;
  private _lang: AllowedLanguages;
  private counter: number = 0;
  private history: string[] = [];
  private historyPosition: null | number = null;

  constructor(input?: HTMLInputElement, container?: HTMLDivElement, lang: AllowedLanguages = "en") {
    this._lang = lang;
    this._inputBox = container ?? (document.getElementById("input-box") as HTMLDivElement);
    this._input = input ?? (document.getElementById("input-command") as HTMLInputElement);
    this.addListener();
  }

  scrollToBottom() {
    const dialog = document.getElementById("menu") as HTMLElement;

    dialog.scrollTop = dialog.scrollHeight;
  }

  handleInjectResult(textOrNode: string | Element) {
    const inputBoxOld = this._inputBox.cloneNode(true) as HTMLDivElement;

    inputBoxOld.id = "input-bx-disable" + this.counter;

    inputBoxOld.setAttribute("data-generated", "");

    const inputOld = inputBoxOld.children[1] as HTMLInputElement;

    inputOld.setAttribute("data-generated", "");

    inputOld.id = "input-disable" + this.counter;
    inputOld.disabled = true;

    this.counter++;

    this._inputBox.insertAdjacentElement("beforebegin", inputBoxOld);
    this._input.value = "";

    let textContainer = document.createElement("div");

    textContainer.setAttribute("data-generated", "");

    if (typeof textOrNode === "string") {
      textContainer.innerText = textOrNode;
    }

    this._inputBox.insertAdjacentElement("beforebegin", textContainer);
  }

  addListener() {
    this._input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        // @ts-expect-error
        this.handleInput(e.target.value);
      }
    });
    this._input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.setPreviousInputFromHistory();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.setNextInputFromHistory();
      }
    });

    subscribeKey(store, "lang", (val) => {
      this._lang = val;
    });
  }

  setPreviousInputFromHistory = () => {
    let prevValue: string | undefined = undefined;
    let cursor: number | null = 0;

    if (this.historyPosition === null) {
      this.historyPosition = this.history.length - 1;
      cursor = this.history.length - 1;
    } else if (this.historyPosition !== null && this.historyPosition > 0) {
      cursor = this.historyPosition - 1;
    } else if (this.historyPosition === 0) {
      cursor = 0;
    }

    prevValue = this.history.at(cursor);
    if (prevValue) {
      this._input.value = prevValue;
    }
    this.historyPosition = cursor;
  };

  setNextInputFromHistory = () => {
    let cursor: number | null = 0;

    if (this.historyPosition === null) {
      return;
    }
    if (this.historyPosition < this.history.length - 1) {
      cursor = this.historyPosition + 1;
      let nextValue = this.history.at(cursor);

      if (nextValue) {
        this._input.value = nextValue;
      }
      this.historyPosition = cursor;
    } else if (this.historyPosition === this.history.length - 1) {
      this.historyPosition = null;
      this._input.value = "";
    }
  };

  // TODO: Test history
  // setInputTextFromHistory = (forward = true) => {
  //   let nextValue = "";

  //   // SI no hay nada en el array history,no ejecutar
  //   // SI es hacia atras debería tomar el largo el último elemento.
  //   // Ese indice debería ser el cursor
  //   // SI se le da hacia abajo hasta llegar al largo del array debería resetearse

  //   if (forward && this.historyPosition) {
  //     const prev = this.history.at(this.historyPosition);

  //     nextValue = prev ?? "";
  //   } else {
  //     const next = this.history.at(this.historyPosition);

  //     nextValue = next ?? "";
  //   }

  //   this._input.value = nextValue;

  //   this.historyPosition = this.history.findIndex((x) => x === nextValue);
  // };

  clearWindow() {
    const elements = document.querySelectorAll("[data-generated]");

    elements.forEach((x) => x.remove());

    this._input.value = "";
  }

  handleGoTo(value: GoToCommand) {
    const [, page] = value.split("--");

    if (isAllowedPage(page)) {
      window.open(PAGES[page], "_blank")?.focus();
    }
  }

  toggleLanguage() {
    store.lang = store.lang === "en" ? "es" : "en";
  }

  listener(state: IStore) {
    this._lang = state.lang;
  }

  handleInput(value: string) {
    if (!isAllowedCommand(value)) {
      this.handleInjectResult(TEXTS.invalid[this._lang]);

      this.scrollToBottom();

      return;
    }

    this.history.push(value);

    if (isClearCommand(value)) {
      this.clearWindow();

      return;
    }

    if (isGoToCommand(value)) {
      this.handleGoTo(value);
    }

    if (isUICommand(value)) {
      this.toggleLanguage();
    }

    this.handleInjectResult(TEXTS[value][this._lang]);

    this.scrollToBottom();
  }
}
