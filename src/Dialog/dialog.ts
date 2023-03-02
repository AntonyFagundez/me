import { subscribeKey } from "valtio/utils";

import { dragElement } from "../draggable";
import { InputManager } from "../Input/InputManager";
import { store } from "../store";
import TableManager from "../Table/TableManager";

import "./dialog.css";

const dialog = document.getElementById("dialog") as HTMLDialogElement;
const main = document.getElementById("main") as HTMLElement;

subscribeKey(store.dialog, "isOpen", (value) => {
  main.setAttribute("data-initialized", value.toString());

  dialog.open = value;
  if (value) {
    const closeButton = document.getElementById("close-dialog") as HTMLButtonElement;

    closeButton.addEventListener("click", () => {
      store.dialog.isOpen = false;
    });

    new InputManager();

    dragElement(document.getElementById("dialog") as HTMLElement, document.getElementById("actions") as HTMLDivElement);

    new TableManager(document.getElementById("command-table") as HTMLTableElement);
  }
});
