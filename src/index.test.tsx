import { ReactTransliterate, getSuggestions } from "./index";

describe("ReactTransliterate", () => {
  it("is truthy", () => {
    expect(ReactTransliterate).toBeTruthy();
  });
});

it("returns translate suggestion", () => {
  expect(getSuggestions("hello")).resolves.toContain("hello");
});
