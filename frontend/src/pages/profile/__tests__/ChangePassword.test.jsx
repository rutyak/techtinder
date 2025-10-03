import { render, screen } from "@testing-library/react";
import ChangePassword from "../ChangePassword";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import axios from "axios";

vi.mock("axios");

describe("ChangePassword", () => {
  const user = userEvent.setup();

  function renderComponent({ showPasswordFields, setShowPasswordFields }) {
    return render(
      <>
        <ToastContainer />
        <ChangePassword
          showPasswordFields={showPasswordFields}
          setShowPasswordFields={setShowPasswordFields}
        />
      </>
    );
  }

  it("render change-password component", async () => {
    axios.patch.mockResolvedValue({
      data: { message: "Password changed successfully" },
      status: 200,
    });

    console.log("mocking axios : ", axios.post);

    renderComponent({
      showPasswordFields: true,
      setShowPasswordFields: vi.fn(),
    });

    await user.type(
      screen.getByPlaceholderText("Enter old password"),
      "Test@123"
    );
    await user.type(screen.getByPlaceholderText("New password"), "NewTest@123");
    await user.type(
      screen.getByPlaceholderText("Confirm password"),
      "NewTest@123"
    );

    const saveBtn = screen.getByRole("button", { name: /Save Password/i });
    await user.click(saveBtn);

    expect(
      await screen.findByText("Password changed successfully")
    ).toBeInTheDocument();
  });

  it("render change-password failed", async () => {
    axios.patch.mockRejectedValue({
      response: { data: { message: "Invalid old password" }, status: 400 },
    });

    console.log("mocking axios : ", axios.post);

    renderComponent({
      showPasswordFields: true,
      setShowPasswordFields: vi.fn(),
    });

    await user.type(
      screen.getByPlaceholderText("Enter old password"),
      "Test@123"
    );
    await user.type(screen.getByPlaceholderText("New password"), "NewTest@123");
    await user.type(
      screen.getByPlaceholderText("Confirm password"),
      "NewTest@123"
    );

    const saveBtn = screen.getByRole("button", { name: /Save Password/i });
    await user.click(saveBtn);

    expect(await screen.findByText("Invalid old password")).toBeInTheDocument();
  });
});
