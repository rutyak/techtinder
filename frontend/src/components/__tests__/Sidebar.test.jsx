import { render, screen } from "@testing-library/react";
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  function renderComponent() {
    return render(<Sidebar />);
  }

  it("render sidebar component", () => {
    renderComponent();

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
});
