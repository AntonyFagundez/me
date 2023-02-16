export type AllowedLanguages = "es" | "en";

export type ITextUI = Record<AllowedLanguages, string>;

export type AllowedCommands = "about" | "contact" | "exp" | "goto" | string;
export type Command = Record<string, ITextUI>;
