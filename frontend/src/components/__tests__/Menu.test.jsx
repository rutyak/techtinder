import { render, screen } from "@testing-library/react";
import Menu from "../Menu";
import { ToastContainer } from "react-toastify";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

vi.mock("axios");

describe("Menu", () => {
  const user = userEvent.setup();

  const mockedUser = {
    firstname: "Narendra",
    lastname: "Modi",
  };

  function createStore(preloadedState = {}) {
    return configureStore({
      reducer: {
        user: (state = {}) => state,
      },
      preloadedState: {
        user: preloadedState,
      },
    });
  }

  function renderComponent({ setIsOpenDropdown }) {
    const store = createStore(mockedUser);
    return render(
      <>
        <Provider store={store}>
          <BrowserRouter>
            <ToastContainer />
            <Menu setIsOpenDropdown={setIsOpenDropdown} />
          </BrowserRouter>
        </Provider>
      </>
    );
  }

  it("user should logout on logout button click", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Logout successfully" },
      status: 200,
    });

    renderComponent({ setIsOpenDropdown: vi.fn() });

    const logoutBtn = screen.getByRole("button", { name: /Logout/i });
    await user.click(logoutBtn);

    expect(await screen.getByText("Logout successfully")).toBeInTheDocument();
  });

  it("throw error toast on logout fail", async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: "Logout failed" } },
    });

    renderComponent({ setIsOpenDropdown: vi.fn() });

    const logoutBtn = screen.getByRole("button", { name: /Logout/i });
    await user.click(logoutBtn);

    expect(await screen.getByText("Logout failed")).toBeInTheDocument();
  });
});
