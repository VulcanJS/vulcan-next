import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Home from "../home";

describe("components/home", () => {
  test("renders home with React Testing", () => {
    const { queryByText } = render(<Home />);
    expect(queryByText("Vulcan Next")).not.toBeNull();
  });
});
