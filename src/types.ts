import { ALLOWED_COMMANDS, CLEAR_COMMANDS, GO_TO_COMMANDS, KNOW_LANGUAGES, KNOW_PAGES, UI_COMMANDS } from "./constants";

export type AllowedLanguages = "es" | "en";

export type TextUI = Record<AllowedLanguages, string>;

export type InfoCommands = "about" | "contact" | "exp";
export type UICommands = "change-lng";
export type ClearCommands = "cls" | "clear";
export type AllowedPage = "linkedin" | "github";
export type GoToCommand = `goto --${AllowedPage}`;

export type AllowedCommands = InfoCommands | GoToCommand | ClearCommands | UICommands;

export type CommandsToShow = InfoCommands | UICommands | "goto" | "cls | clear";

export type Command = Record<string, TextUI>;
export type PersonalPage = Record<AllowedPage, string>;

export type ITableTextUI = Record<CommandsToShow, { args?: string[]; description?: TextUI }>;

export const isAllowedCommand = (inputCommand: string | AllowedCommands): inputCommand is AllowedCommands => ALLOWED_COMMANDS.includes(inputCommand);

export const isKnowLanguage = (navigatorLanguage: string | AllowedLanguages): navigatorLanguage is AllowedLanguages =>
  KNOW_LANGUAGES.includes(navigatorLanguage);

export const isClearCommand = (command: string | ClearCommands): command is ClearCommands => CLEAR_COMMANDS.includes(command);

export const isGoToCommand = (command: string | GoToCommand): command is GoToCommand => GO_TO_COMMANDS.includes(command);

export const isAllowedPage = (page: string | AllowedPage): page is AllowedPage => KNOW_PAGES.includes(page);

export const isUICommand = (command: string | UICommands): command is UICommands => UI_COMMANDS.includes(command);
