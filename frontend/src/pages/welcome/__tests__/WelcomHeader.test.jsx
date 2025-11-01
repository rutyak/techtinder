import { BrowserRouter } from "react-router-dom";
import WelcomHeader from "../WelcomHeader";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../utils/store";

describe("WelcomeHeader", () => {
  const renderWithRouter = (props = {}) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <WelcomHeader {...props} />
        </BrowserRouter>
      </Provider>
    );
  };

  it("render application name", () => {
    renderWithRouter();
    expect(screen.getByText("ConnectEdge")).toBeInTheDocument();
  });

  it("render navigation links", () => {
    renderWithRouter();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("render login component", () => {
    renderWithRouter();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("does not apply backdrop styling when isScrollingUp is false", () => {
    renderWithRouter({ isScrollingUp: false });
    const header = screen.getByTestId("header");
    expect(header).not.toHaveClass("backdrop-blur-md");
    expect(header).not.toHaveClass("backdrop-saturate-150");
  });

  it("apply backdrop styling when isScrolling is true", () => {
    renderWithRouter({ isScrollingUp: true });
    const header = screen.getByTestId("header");
    expect(header).toHaveClass("backdrop-blur-md");
    expect(header).toHaveClass("backdrop-saturate-150");
  });
});
