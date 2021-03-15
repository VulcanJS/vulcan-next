import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Home from "../home";

describe("components/home", () => {
  test("renders home with React Testing", () => {
    const { queryAllByText } = render(<Home />);
    expect(queryAllByText("Vulcan Next", { exact: false })).not.toBeNull();
    expect(
      queryAllByText("Vulcan Next", { exact: false }).length
    ).toBeGreaterThan(0);
  });
});
