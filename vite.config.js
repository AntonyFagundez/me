import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/me/",
  test: {
    environment: "jsdom",
  },
});
