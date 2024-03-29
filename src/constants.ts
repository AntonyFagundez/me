import type { AllowedCommands, AllowedLanguages, AllowedPage, ClearCommands, GoToCommand, PersonalPage, UICommands } from "./types";

export const ALLOWED_COMMANDS: AllowedCommands | string[] = [
  "about",
  "contact",
  "exp",
  "goto --linkedin",
  "goto --github",
  "cls",
  "clear",
  "change-lng",
];

export const KNOW_LANGUAGES: AllowedLanguages | string[] = ["en", "es"];
export const KNOW_PAGES: AllowedPage | string[] = ["github", "linkedin"];

export const CLEAR_COMMANDS: ClearCommands | string[] = ["cls", "clear"];
export const GO_TO_COMMANDS: GoToCommand | string[] = ["goto --linkedin", "goto --github"];
export const UI_COMMANDS: UICommands | string[] = ["change-lng"];

export const PAGES: PersonalPage = {
  github: "https://github.com/AntonyFagundez",
  linkedin: "https://www.linkedin.com/in/antony-fagundez/",
};
