import { subscribeKey } from "valtio/utils";

import { store } from "../store";
import { TABLE_TEXTS } from "../texts";
import { TextUI } from "../types";

export default class TableManager {
  private _table = document.createElement("table");
  private contextText: Record<string, TextUI> = {
    principalText: {
      en: "PRINCIPAL MENU",
      es: "MENU PRINCIPAL",
    },
    command: {
      en: "COMMAND",
      es: "COMANDO",
    },
    arguments: {
      en: "ARGS",
      es: "ARGUMENTOS",
    },
    description: {
      en: "DESCRIPTION",
      es: "DESCRIPCIÓN",
    },
  };
  constructor(table: HTMLTableElement) {
    this._table = table;
    this.renderTable();
    this.addListener();
  }

  renderRow(name: string, args: string[] = [], description = "") {
    return `
    <tr>
         <td>${name}</td>
         <td>${args?.join("<br/>")}</td>
         <td>${description}</td>
    </tr>`;
  }
  renderBody() {
    const tableBody = document.getElementById("table-body");

    const innerText = Object.entries(TABLE_TEXTS).map(([key, val]) => {
      return this.renderRow(key, val?.args, val?.description?.[store.lang]);
    });

    if (tableBody) {
      tableBody.innerHTML = innerText.join("");
    }
  }

  renderHead() {
    this._table.innerHTML = `
    <thead>
      <tr>
        <td colspan="3">
          ${this.contextText.principalText[store.lang]}
        </td>
      </tr>
      <tr>
        <td>
        ${this.contextText.command[store.lang]}
        </td>
        <td>
        ${this.contextText.arguments[store.lang]}
        </td>
        <td>
        ${this.contextText.description[store.lang]}
        </td>
      </tr>
    </thead>
    <tbody id="table-body">
    </tbody>`;
  }

  renderTable() {
    this.renderHead();
    this.renderBody();
  }

  addListener() {
    subscribeKey(store, "lang", () => {
      this.renderTable();
    });
  }
}
