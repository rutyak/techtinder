import Profile from "../Profile";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import axios from "axios";

vi.mock("axios");

describe("Profile", () => {
  const user = userEvent.setup();
  const mockUser = {
    _id: 123,
    firstname: "Jon",
    lastname: "Singh",
    job: "MERN stack developer",
    gender: "male",
    age: 24,
    skills: ["HTML", "CSS", "JS"],
  };

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => "blob:mocked-url");
  });

  const createStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        user: (state = {}) => state,
      },
      preloadedState: { user: preloadedState },
    });
  };

  const renderComponent = () => {
    const store = createStore(mockUser);

    return render(
      <Provider store={store}>
        <ToastContainer />
        <Profile />
      </Provider>
    );
  };

  it("render profile component", () => {
    renderComponent();

    expect(screen.getByText("My Profile")).toBeInTheDocument();
  });

  it("update preview when new image is uploaded", async () => {
    renderComponent();

    const editBtn = screen.getByRole("button", { name: /Edit/i });
    await user.click(editBtn);

    const file = new File(["hello"], "new-image.png", { type: "image/png" });

    const input = screen.getByLabelText(/Upload Profile Image/i);
    await user.upload(input, file);

    const img = screen.getByAltText("Profile");
    expect(img.src).toContain("blob:");
  });

  it("show toast when save button click", async () => {
    axios.patch.mockResolvedValue({
      data: { message: "Profile updated successfully" },
      status: 200,
    });

    const { container } = renderComponent();

    const editBtn = screen.getByRole("button", { name: /Edit/i });
    await user.click(editBtn);

    await user.type(container.querySelector('input[name="firstname"]'), "john");

    await user.type(container.querySelector('input[name="lastname"]'), "Sinha");

    const saveBtn = screen.getByRole("button", { name: /Save/i });
    await user.click(saveBtn);

    expect(
      await screen.getByText("Profile updated successfully")
    ).toBeInTheDocument();
  });
});
