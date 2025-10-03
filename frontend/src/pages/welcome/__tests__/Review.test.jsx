import { render, screen } from "@testing-library/react";
import Reviews from "../Reviews";

describe("Review", () => {
  const renderComponent = () => {
    return render(<Reviews />);
  };

  it("render review commponent", () => {
    renderComponent();
    expect(screen.getByTestId("review")).toBeInTheDocument();
  });
});
