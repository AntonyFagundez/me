import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/matrix/",
  test: {
    environment: "jsdom",
  },
});
