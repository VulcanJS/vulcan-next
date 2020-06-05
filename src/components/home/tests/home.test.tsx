// import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Home from "../home";

describe("components/home", () => {
  test("renders home with React Testing", () => {
    const { getByRole } = render(<Home />);
    expect(getByRole("heading")).toHaveTextContent("Vulcan Next Starter");
  });
});
