import { screen, render, waitFor } from "@testing-library/react";
import Requests from "../Requests";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import axios from "axios";

vi.mock("axios");

const mockRequests = [
  {
    _id: "1",
    fromUserId: {
      imageurl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      firstname: "John",
      lastname: "Doe",
      age: "28",
      job: "Software Engineer",
    },
  },
  {
    _id: "2",
    fromUserId: {
      imageurl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      firstname: "Sarah",
      lastname: "Johnson",
      age: "32",
      job: "Product Designer",
    },
  },
];

describe("Requests Component", () => {
  const user = userEvent.setup();

  const createStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        requests: (state = []) => state,
      },
      preloadedState: preloadedState,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (preloadedState) => {
    const store = createStore(preloadedState);

    return render(
      <Provider store={store}>
        <ToastContainer />
        <Requests />
      </Provider>
    );
  };

  it("render request component", () => {
    renderComponent({ requests: mockRequests });

    expect(screen.getByText("Pending Requests")).toBeInTheDocument();

    //request 1
    expect(screen.getByText("John Doe, 28")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();

    //request 2
    expect(screen.getByText("Sarah Johnson, 32")).toBeInTheDocument();
    expect(screen.getByText("Product Designer")).toBeInTheDocument();
  });

  it("if no pending requests found", () => {
    renderComponent({ requests: [] });

    expect(screen.getByText(/No pending requests/i)).toBeInTheDocument();
  });

  it("request accept button clicked", async () => {
    axios.post.mockResolvedValue({ data: { message: "Accepted!" } });
    renderComponent({ requests: mockRequests });

    screen.debug();

    const btn = screen.getAllByRole("button", { name: /Accept/i });
    await user.click(btn[0]);

    expect(await screen.getByText("Accepted!")).toBeInTheDocument();
  });

  it("request reject button clicked", async () => {
    axios.post.mockResolvedValue({ data: { message: "Rejected!" } });

    renderComponent({ requests: mockRequests });

    const btn = screen.getAllByRole("button", { name: /Reject/i });
    await user.click(btn[0]);

    expect(await screen.getByText("Rejected!")).toBeInTheDocument();
  });

  it("accept request fail", async () => {
    const newError = new Error("Accept request failed");
    axios.post.mockRejectedValue(newError);

    renderComponent({ requests: mockRequests });

    const btn = screen.getAllByRole("button", { name: /Accept/i });
    await user.click(btn[0]);

    expect(await screen.getByText("Accept request failed")).toBeInTheDocument();
  });

  it("reject request fail", async () => {
    const newError = new Error("Reject request failed");
    axios.post.mockRejectedValue(newError);

    renderComponent({ requests: mockRequests });

    const btn = screen.getAllByRole("button", { name: /Reject/i });
    await user.click(btn[0]);

    expect(await screen.getByText("Reject request failed")).toBeInTheDocument();
  });
});
