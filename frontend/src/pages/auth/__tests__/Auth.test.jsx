import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Auth from "../Auth";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");

describe("Auth component", () => {
  const user = userEvent.setup();

  const createStore = (preloadedState) => {
    return configureStore({
      reducer: {
        user: (state = {}) => state,
      },
      preloadedState,
    });
  };

  const renderComponent = (preloadedState = {}) => {
    const store = createStore(preloadedState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <Auth />
        </BrowserRouter>
      </Provider>
    );
  };

  it("render login page", async () => {
    axios.post.mockResolvedValue({ data: { message: "Login successfull!" } });

    renderComponent();

    // Open login modal
    const Btn = screen.getByRole("button", { name: /login/i });
    await user.click(Btn);

    await user.type(
      screen.getByPlaceholderText(/Email Address/i),
      "test@gmail.com"
    );
    await user.type(screen.getByPlaceholderText(/Enter password/i), "Test@123");

    const submitBtn = screen.getByTestId("submitBtn");
    await user.click(submitBtn);

    expect(await screen.getByText("Login successfull!")).toBeInTheDocument();
  });

  it("redner forgot-password page", async () => {
    //mock 1
    axios.post.mockResolvedValue({
      data: { message: "OTP send successfully!" },
      status: 200,
    });

    renderComponent();

    //otp send
    const loginBtn = screen.getByRole("button", { name: /login/i });
    await user.click(loginBtn);

    const forgetBtn = screen.getByText("Forgot Password?");
    await user.click(forgetBtn);

    await user.type(
      screen.getByPlaceholderText("Enter your email"),
      "test@gmail.com"
    );
    const verifyBtn = screen.getByTestId("submitBtn");
    await user.click(verifyBtn);

    await user.type(await screen.findByPlaceholderText("Enter OTP"), "788988");

    const verifyOtpBtn = screen.getByTestId("submitBtn");
    await user.click(verifyOtpBtn);

    //mock 2
    axios.post.mockResolvedValue({
      data: { message: "Password change successfully!" },
      status: 200,
    });

    await user.type(
      await screen.findByPlaceholderText("New Password"),
      "Test@123"
    );
    await user.type(
      await screen.findByPlaceholderText("Confirm Password"),
      "Test@123"
    );

    const resetPasswordBtn = screen.getByTestId("submitBtn");
    await user.click(resetPasswordBtn);
  });

  it("render signup page", async () => {
    axios.post.mockResolvedValue({ data: { message: "Signup successfull!" } });

    renderComponent();

    const loginBtn = screen.getByRole("button", { name: /login/i });
    await user.click(loginBtn);

    const signupBtn = screen.getByText("Signup");
    await user.click(signupBtn);

    await user.type(screen.getByPlaceholderText("Enter first name"), "John");
    await user.type(screen.getByPlaceholderText("Enter last name"), "sinha");
    await user.type(
      screen.getByPlaceholderText("Email Address"),
      "john@gmail.com"
    );
    await user.type(screen.getByPlaceholderText("Enter password"), "John@123");

    const submitBtn = screen.getByTestId("submitBtn");
    await user.click(submitBtn);

    expect(await screen.getByText("Signup successfull!")).toBeInTheDocument();
  });
});
