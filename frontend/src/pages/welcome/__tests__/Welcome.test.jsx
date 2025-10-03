import { render, screen } from "@testing-library/react";
import Welcome from "../Welcome";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../utils/store";

describe("Welcome", () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </Provider>
    );
  };

  it("render welcome component", () => {
    renderComponent();
    expect(screen.getByTestId("welcome-container")).toBeInTheDocument();
  });
});
