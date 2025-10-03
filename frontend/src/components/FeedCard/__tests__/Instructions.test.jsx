import { render, screen } from "@testing-library/react";
import Instruction from "../Instructions";

describe("Sidebar", () => {
  function renderComponent() {
    return render(<Instruction/>);
  }

  it("render sidebar component", () => {
    renderComponent();

    expect(screen.getByTestId("instructions")).toBeInTheDocument();
  });
});
