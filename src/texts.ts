import type { Command, ITableTextUI } from "./types";

export const TEXTS: Command = {
  about: {
    en: `My name is Antony Fagundez
        I am a Software Architect with experience mainly in React and Typescript
        but always interested in learning about the new techs and ways to generate more value in less time`,
    es: `Mi nombre es Antony Fagundez
        soy Arquitecto de software con experiencia principalmente en React y Typescript
        pero con interés siempre por conocer nuevas tecnologías y maneras de generar más valor en menos tiempo`,
  },
  invalid: {
    en: "This command not exist.",
    es: "Este comando no existe.",
  },
  contact: {
    en: "You can contact me via LinkedIn",
    es: "Puedes contactarme a través de LinkedIn",
  },
  exp: {
    en: `Over the years I have always leaned towards end-to-end front-end technologies.
        Currently working as an architect, I have been able to have a more general vision of the solutions and to be able to create bases, fundamentals and good practices for front-end technologies.
        This has been a challenge for me because it has involved me in the creation of libraries, the CICD process, practices, and synchronization with cross-company teams (Security, UX, Infra).
        In my area, research time is also allowed, to guarantee that the products and technologies are maintainable over time, ensuring their quality and testability.`,
    es: `A lo largo de los años me he inclinado siempre por las tecnologías del lado del front de inicio a fin. 
        Actualmente al desempeñarme como arquitecto, he podido tener una vision más general de las soluciones y poder crear bases, fundamentos y buenas prácticas para las tecnologías del lado del front.
        Lo que ha sido un reto para mi porque me ha involucrado en la creación de desde librerías, el proceso y prácticas de CICD, y sincronización con los equipos cross a la compañía (Seguridad, UX, Infra).
        En mi área también se permite tiempo de research, para garantizar que los productos y la tecnologías sean, mantenibles a través del tiempo, asegurando calidad y testeabilidad de las mismas.
        `,
  },
  "goto --linkedin": {
    es: "Abriendo en otra pestaña",
    en: "Opening in a new window",
  },
  "goto --github": {
    es: "Abriendo en otra pestaña",
    en: "Opening in a new window",
  },
  start: {
    es: "Iniciar",
    en: "Start",
  },
  "change-lng": {
    en: "Lenguaje cambiado a español",
    es: "Changed language to english",
  },
};

export const TABLE_TEXTS: ITableTextUI = {
  about: {},
  exp: {},
  "change-lng": {
    description: {
      en: "Change language to spanish",
      es: "Cambiar lenguaje a ingles",
    },
  },
  goto: {
    args: ["--linkedin", "--github"],
  },
  contact: {},
  "cls | clear": {
    description: {
      en: "Clear all window",
      es: "Limpiar la ventana",
    },
  },
};
