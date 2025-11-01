import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  it("render footer component", () => {
    renderComponent();
    expect(
      screen.getByText(/Payments are securely processed via/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Designed with ❤️ by Rutik Khandekar/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ConnectEdge. All rights reserved./i)
    ).toBeInTheDocument();
  });

  it("footer links test", () => {
    renderComponent();
    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Support/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Contact Us/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Privacy Policy/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Terms of Service/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Subscription Terms/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Refund Policy/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Cancellation Policy/i })
    ).toBeInTheDocument();
  });
});
