import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import FeedCards from "../FeedCards";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import TinderCard from "react-tinder-card";

vi.mock("axios");

// vi.mock("react-tinder-card", () => {
//   return {
//     default: vi.fn(({ children, onSwipe }, ref) => {
//       // Provide a fake ref with swipe method
//       if (ref) {
//         ref.current = {
//           swipe: vi.fn((dir) => onSwipe(dir)), // call onSwipe when swipe is called
//         };
//       }

//       return <div data-testid="mock-card">{children}</div>;
//     }),
//   };
// });

describe("FeedCards", () => {
  const user = userEvent.setup();

  const mockFeed = [
    { _id: 1, firstname: "John", lastname: "Sinha", age: 25 },
    { _id: 2, firstname: "Tilak", lastname: "Marma", age: 30 },
  ];

  function createStore(mockFeed = []) {
    return configureStore({
      reducer: {
        feed: (state = {}) => state,
      },
      preloadedState: {
        feed: mockFeed,
      },
    });
  }

  function renderComponent() {
    const store = createStore(mockFeed);

    return render(
      <Provider store={store}>
        <ToastContainer />
        <FeedCards
          profile={mockFeed[0]}
          showActions={true}
          showLabels={true}
          isPreview={false}
        />
      </Provider>
    );
  }

  it("remove feed on left swipe", async () => {
    axios.post.mockResolvedValue({
      data: { message: "User ignored successfully" },
      status: 200,
    });

    renderComponent();

    const leftSwipeBtn = screen.getByRole("button", { name: /left swipe/i });
    await user.click(leftSwipeBtn);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/request/send/ignored/1"),
      {},
      { withCredentials: true }
    );
  });
});
