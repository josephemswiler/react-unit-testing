import { cleanup, render } from "@testing-library/react";

import App from "./App";
import React from "react";

afterEach(() => {
  cleanup();
});

test("header should have correct text", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("95797e4e-4641-4edb-a9a5-aab52d538822")).toHaveTextContent(
    "Top Stories"
  );
});
