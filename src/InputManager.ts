import { PAGES } from "./constants";
import "./InputManager.css";
import { TEXTS } from "./texts";
import { AllowedLanguages, GoToCommand, isAllowedCommand, isAllowedPage, isClearCommand, isGoToCommand, isKnowLanguage } from "./types";

export class InputManager {
  private _input: HTMLInputElement;
  private _inputBox: HTMLDivElement;
  private readonly _lang: AllowedLanguages;
  private counter: number = 0;

  constructor(input?: HTMLInputElement, container?: HTMLDivElement) {
    this._lang = isKnowLanguage(navigator.language) ? navigator.language : "en";
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
  }

  clearHistory() {
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

  handleInput(value: string) {
    if (!isAllowedCommand(value)) {
      this.handleInjectResult(TEXTS.invalid[this._lang]);

      this.scrollToBottom();

      return;
    }

    if (isClearCommand(value)) {
      this.clearHistory();

      return;
    }

    if (isGoToCommand(value)) {
      this.handleGoTo(value);
    }

    this.handleInjectResult(TEXTS[value][this._lang]);

    this.scrollToBottom();
  }
}
