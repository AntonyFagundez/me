import { subscribeKey } from "valtio/utils";

import { dragElement } from "./draggable";
import { InputManager } from "./InputManager";
import { store } from "./store";

import "./dialog.css";

const button = document.getElementById("init-button") as HTMLButtonElement;
const dialog = document.getElementById("dialog") as HTMLDialogElement;
const main = document.getElementById("main") as HTMLElement;

// subscribeKey(store, "openDialog", () => dialog.open = store.openDialog)

subscribeKey(store.dialog, "isOpen", (value) => {
  if (value) {
    button.style.display = "none";
  } else {
    button.style.display = "block";
  }
});

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
  }
});

button.addEventListener("click", () => {
  store.dialog.isOpen = !store.dialog.isOpen;
});
