import { AllowedCommands, AllowedLanguages, Command } from "./types";

export class InputManager {
  private readonly COMMANDS: AllowedCommands[] = ["about", "contact", "exp", "goto"];

  private readonly COMMANDS_TEXT: Command = {
    about: {
      en: "Hi",
      es: "Hola",
    },
    invalid: {
      en: "This command not exist.",
      es: "Este comando no existe",
    },
    contact: {
      en: "contact",
      es: "contacto",
    },
    exp: {
      en: "experience",
      es: "experiencia",
    },
    goto: {
      en: "go to",
      es: "Ir a",
    },
  };
  private _input: HTMLInputElement;
  private _inputBox: HTMLDivElement;
  private readonly _lang: AllowedLanguages;
  private counter: number = 0;

  constructor() {
    this._inputBox = document.getElementById("input-box") as HTMLDivElement;
    this._lang = navigator.language as AllowedLanguages;
    this._input = document.getElementById("input-command") as HTMLInputElement;
    this.prepare();
  }

  prepare() {
    this._input = document.getElementById("input-command") as HTMLInputElement;
    this.addListener();
  }

  scrollToBottom() {
    const dialog = document.getElementById("menu") as HTMLElement;

    dialog.scrollTop = dialog.scrollHeight;
  }

  handleInjectResult(textOrNode: string | Element) {
    const inputBoxOld = this._inputBox.cloneNode(true) as HTMLDivElement;

    inputBoxOld.id = "input-bx-disable" + this.counter;

    const inputOld = inputBoxOld.children[1] as HTMLInputElement;

    inputOld.id = "input-disable" + this.counter;
    inputOld.disabled = true;

    this.counter++;

    this._inputBox.insertAdjacentElement("beforebegin", inputBoxOld);
    this._input.value = "";

    if (typeof textOrNode === "string") {
      this._inputBox.insertAdjacentText("beforebegin", textOrNode);
    } else {
      this._inputBox.insertAdjacentElement("beforebegin", textOrNode);
    }
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

  handleInput(value: string) {
    if (!this.COMMANDS.includes(value.toLowerCase())) {
      this.handleInjectResult(this.COMMANDS_TEXT.invalid[this._lang]);

      this.scrollToBottom();

      return;
    }

    this.handleInjectResult(this.COMMANDS_TEXT[value][this._lang]);

    this.scrollToBottom();
  }
}
