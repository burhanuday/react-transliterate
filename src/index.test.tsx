import { getTransliterateSuggestions, ReactTransliterate } from "./index";

describe("ReactTransliterate", () => {
  it("is truthy", () => {
    expect(ReactTransliterate).toBeTruthy();
  });
});

it("returns translate suggestion", () => {
  expect(getTransliterateSuggestions("hello")).resolves.toContain("hello");
});
