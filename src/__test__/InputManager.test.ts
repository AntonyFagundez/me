import { beforeAll, describe, expect, it } from "vitest";

import { InputManager } from "../InputManager";

// The two tests marked with concurrent will be run in parallel
describe("InputManager()", () => {
  beforeAll(() => {});
  it("Should can initialize without errors", async () => {
    const inputBox = document.createElement("div");

    const input = document.createElement("input");

    const result = new InputManager(input, inputBox);

    expect(result instanceof InputManager).toBeTruthy();
  });
});
