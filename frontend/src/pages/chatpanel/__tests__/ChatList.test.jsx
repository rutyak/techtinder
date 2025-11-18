import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ChatList from "../ChatList";

//mock navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ChatList", () => {
  const user = userEvent.setup();

  const mockConnections = [
    { _id: 1, firstname: "Jon", imageurl: "https://example.com/jon.jpg" },
    { _id: 2, firstname: "Tom", imageurl: "https://example.com/tom.jpg" },
  ];

  const createStore = (preloadedState) => {

    return configureStore({
      reducer: {
        connections: (state = []) => state,
      },
      preloadedState: preloadedState,
    });
  };

  const renderComponent = (preloadedState) => {
    const store = createStore(preloadedState);

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatList />
        </BrowserRouter>
      </Provider>
    );
  };

  it("render Chat component", () => {
    renderComponent({ connections: mockConnections });
    expect(screen.getByText(/Chats/i)).toBeInTheDocument();
    expect(screen.getByText("Jon")).toBeInTheDocument();
    expect(screen.getByText("Tom")).toBeInTheDocument();

    const text = screen.getAllByText("New Match! Say Hello 👋")
    expect(text[0]).toBeInTheDocument();
  });

  it("render all images with correct url", () => {
    renderComponent({ connections: mockConnections });
    const images = screen.getAllByAltText("profile");

    images.forEach((img, index) => {
      expect(img).toHaveAttribute("src", mockConnections[index].imageurl);
    });
  });

  it("if no connecttions", () => {
    renderComponent({ connections: [] });
    expect(screen.getByText("No connections found")).toBeInTheDocument();
  });

  it("navigates to correct route on desktop", async () => {
    Object.defineProperty(window, "innerWidth", {
      value: 1024,
      configurable: true,
    });

    renderComponent({ connections: mockConnections });
    const targetUser = screen.getAllByTestId("targetUser");

    await user.click(targetUser[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard/chatwindow", {
      state: {
        targetUser: {
          id: mockConnections[0]._id,
          firstname: mockConnections[0].firstname,
          imageurl: mockConnections[0].imageurl,
        },
      },
    });
  });

  it("navigate to correct route on mobile", async () => {
    Object.defineProperty(window, "innerWidth", {
      value: 360,
      configurable: true,
    });

    renderComponent({ connections: mockConnections });
    const targetUser = screen.getAllByTestId("targetUser");

    await user.click(targetUser[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/chatwindow", {
      state: {
        targetUser: {
          id: mockConnections[0]._id,
          firstname: mockConnections[0].firstname,
          imageurl: mockConnections[0].imageurl,
        },
      },
    });
  });
});
