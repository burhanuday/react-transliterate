import * as React from "react";
import { render } from "@testing-library/react";
import { ReactTransliterate } from "./index";

describe("ReactTransliterate", () => {
  it("is exported", () => {
    expect(ReactTransliterate).toBeTruthy();
  });

  it("renders without errors", () => {
    const mockFunction = jest.fn();

    render(
      <ReactTransliterate value="" onChangeText={mockFunction} lang="hi" />,
    );
  });
});
