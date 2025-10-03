import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Card", () => {
  const renderComponent = (props = {}) => {
    return render(<Card {...props} />);
  };

  it("render card component", () => {
    renderComponent({
      name: "Rutik",
      position: "MERN stact developer",
      rating: 4.9,
      text: "Techtinder is a great application",
    });
    expect(screen.getByText(/Rutik/i)).toBeInTheDocument();
    expect(screen.getByText(/MERN stact developer/i)).toBeInTheDocument();
    expect(screen.getByText(/4.9/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Techtinder is a great application/i)
    ).toBeInTheDocument();
  });
});
