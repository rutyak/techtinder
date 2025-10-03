import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { afterEach, beforeEach, vi } from "vitest";
import axios from "axios";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";

vi.mock("axios");

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("../components/Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

// FIXED: Correct path for ChatList
vi.mock("./chatpanel/ChatList", () => ({
  default: () => <div data-testid="chat-list">ChatList</div>,
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
  };
});

const mockConnections = [
  { _id: 1, firstname: "Jon", imageurl: "https://example.com/jon.jpg" },
  { _id: 2, firstname: "Tom", imageurl: "https://example.com/tom.jpg" },
];

const mockRequests = [
  {
    _id: 1,
    firstname: "Jon",
    lastname: "Dhoke",
    age: "20",
    imageurl: "https://example.com/jon.jpg",
  },
  {
    _id: 2,
    firstname: "Tom",
    lastname: "Wankhade",
    age: "22",
    imageurl: "https://example.com/tom.jpg",
  },
];

describe("Dashboard", () => {
  const createStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        connections: (state = []) => state,
        requests: (state = []) => state,
      },
      preloadedState: preloadedState,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderComponent = (preloadedState) => {
    const store = createStore(preloadedState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
  };

  it("render dashboard with all components", async () => {
    // Mock axios calls properly
    axios.get.mockImplementation((url) => {
      if (url.includes("requests")) {
        return Promise.resolve({ data: { requests: mockRequests } });
      } else if (url.includes("connections")) {
        return Promise.resolve({ data: { data: mockConnections } });
      }
      return Promise.reject(new Error("Not found"));
    });

    renderComponent();

    expect(screen.getByTestId("dashboard")).toBeInTheDocument();
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Chats")).toBeInTheDocument();
  });
});
