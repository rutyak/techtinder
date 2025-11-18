import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import ChatWindow from "../ChatWindow";
import userEvent from "@testing-library/user-event";

//mocking
const mockNavigate = vi.fn();
const mockLocation = vi.fn();
const mockSocket = {
  emit: vi.fn(),
  on: vi.fn(),
  disconnect: vi.fn(),
};

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation(),
  };
});

//mock socket
vi.mock("../../../utils/socket", () => ({
  createSocketConnection: () => mockSocket,
}));

//mock axios
vi.mock("axios", () => ({
  __esModule: true,
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock("react-redux", () => ({
  useSelector: () => ({
    _id: "user123",
    firstname: "Jon",
  }),
}));

vi.mock("../../assets/chatbg.png", () => "chatbg.png");

describe("ChatWindow", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();

    mockLocation.mockReturnValue({
      state: {
        targetUser: {
          id: "123",
          firstname: "Jon",
          imageurl: "https//example.com/jon.jpg",
        },
      },
    });

    vi.mocked(axios.get).mockResolvedValue({
      data: {
        chat: [
          {
            messages: [
              { _id: "1", text: "Hello", senderId: { _id: "target123" } },
              { _id: "2", text: "Hi there", senderId: { _id: "user123" } },
            ],
          },
        ],
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete Element.prototype.scrollIntoView;
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ChatWindow />
      </BrowserRouter>
    );
  };

  it("render chat window", async () => {
    renderComponent();
    expect(await screen.findByText("Jon")).toBeInTheDocument();
    expect(await screen.findByAltText("targetuser-image")).toBeInTheDocument();
  });

  it("navigates back on mobile", async () => {
    Object.defineProperty(window, "innerWidth", {
      value: 360,
    });

    renderComponent();
    const backbtn = screen.getByTestId("back");

    await user.click(backbtn);
    expect(mockNavigate).toHaveBeenCalled("/dashboard");
  });

  it("sets up socket connection when component loads", async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockSocket?.emit).toHaveBeenCalledWith("joinChat", {
        targetUserId: "123",
        firstname: "Jon",
      });
    });
  });

  it("send message when user type and enter", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Type a message...");
    await user.type(input, "How r you?");
    await user.keyboard(`{Enter}`);

    await waitFor(() => {
      expect(mockSocket?.emit).toHaveBeenCalledWith("sendMessage", {
        firstname: "Jon",
        targetUserId: "123",
        text: "How r you?",
      });
    });
  });

  it("send message when user type and click send icon", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Type a message...");
    await user.type(input, "How r you?");

    const btn = screen.getByTestId("send");
    await user.click(btn);

    await waitFor(() => {
      expect(mockSocket?.emit).toHaveBeenCalledWith("sendMessage", {
        firstname: "Jon",
        targetUserId: "123",
        text: "How r you?",
      });
    });
  });

  it("receives messages via socket", async () => {
    let messageHandler;

    // Set up the mock implementation
    mockSocket.on.mockImplementation((eventName, callback) => {
      if (eventName === "messageReceive") {
        messageHandler = callback;
      }
    });

    renderComponent();

    // Wait for the socket listener to be set up
    await waitFor(() => {
      expect(mockSocket.on).toHaveBeenCalledWith(
        "messageReceive",
        expect.any(Function)
      );
    });

    //receiving a message
    act(() => {
      messageHandler({
        firstname: "TestUser",
        text: "This is a test message",
        senderId: "target123", 
      });
    });

    expect(
      await screen.findByText("This is a test message")
    ).toBeInTheDocument();
  });

  it("load the chat", async () => {
    renderComponent();

    expect(await screen.findByText("Hello")).toBeInTheDocument();
    expect(await screen.findByText("Hi there")).toBeInTheDocument();
  });
});
