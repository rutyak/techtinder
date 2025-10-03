import { render, screen } from "@testing-library/react";
import Herosection from "../Herosection";
import { vi } from "vitest";

describe("Herosection", () => {
  const setIsScrollingUp = vi.fn();

  beforeEach(() => {
    Object.defineProperty(window, "pageYOffset", {
      writable: true,
      value: 0,
    });

    //mock scrollTo
    window.scrollTo = vi.fn();
  });

  const renderComponent = (props = {}) => {
    return render(<Herosection {...props} />);
  };

  it("render herosection component", () => {
    renderComponent();
    expect(screen.getByText(/Match. Connect. Hired./i)).toBeInTheDocument();
    expect(
      screen.getByText(/Where Tech Talent Meets Perfect Opportunitie/i)
    ).toBeInTheDocument();
  });

  it("apply disappear-animation style if isScrollingUp is true", () => {
    renderComponent({ isScrollingUp: true, setIsScrollingUp });
    expect(screen.getByTestId("herosection-container")).toHaveClass(
      "disappear-animation"
    );
  });

  it("dont apply disappear-animation style if isScrollingUp is false", () => {
    renderComponent({ isScrollingUp: false, setIsScrollingUp });
    expect(screen.getByTestId("herosection-container")).not.toHaveClass(
      "disappear-animation"
    );
  });

  it("calls setIsScrollingUp(true) when scroll > 80", () => {
    renderComponent({ isScrollingUp: false, setIsScrollingUp });

    window.pageYOffset = 100;
    window.dispatchEvent(new Event("scroll"));

    expect(setIsScrollingUp).toHaveBeenCalledWith(true);
  });

  it("calls setIsScrolling(false) when scroll <= 80", () => {
    renderComponent({ isScrollingUp: false, setIsScrollingUp });

    window.pageYOffset = 50;
    window.dispatchEvent(new Event("scroll"));

    expect(setIsScrollingUp).toHaveBeenCalledWith(false);
  });
});
