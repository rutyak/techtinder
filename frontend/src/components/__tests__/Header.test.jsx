import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import DashboardHeader from "../Header";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

describe("DashboardHeader", () => {
  const user = userEvent.setup();

  //create store
  const createStore = (state = {}) => {
    return configureStore({
      reducer: {
        user: (state = {}) => state,
        requests: (state = {}) => state,
      },
      preloadedState: state,
    });
  };

  //store
  const store = createStore({
    user: {
      firstname: "Narendra",
      lastname: "Modi",
    },
    requests: [{ id: 1 }, { id: 2 }],
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <DashboardHeader />
        </BrowserRouter>
      </Provider>
    );
  };

  it("render dashboardheader component", () => {
    renderComponent();
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Narendra")).toBeInTheDocument();
  });

  it("display correct request count badge", () => {
    renderComponent();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("toggle dropdown menu on user area click", async () => {
    renderComponent();
    const userArea = screen.getByText("Welcome");
    await user.click(userArea);

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
