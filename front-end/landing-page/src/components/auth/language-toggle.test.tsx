import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageToggle from "./language-toggle";

describe("LanguageToggle", () => {
  it('shows "VN" by default (ID-10)', () => {
    render(<LanguageToggle />);
    expect(screen.getByText("VN")).toBeInTheDocument();
  });

  it("click opens VN/EN dropdown (ID-24)", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);
    await user.click(screen.getByRole("button", { name: /chọn ngôn ngữ/i }));
    expect(screen.getByText(/EN — English/i)).toBeInTheDocument();
  });

  it("selecting EN updates displayed value (ID-25)", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);
    await user.click(screen.getByRole("button", { name: /chọn ngôn ngữ/i }));
    await user.click(screen.getByText(/EN — English/i));
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("selecting VN from EN updates displayed value (ID-26)", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);
    // Switch to EN first
    await user.click(screen.getByRole("button", { name: /chọn ngôn ngữ/i }));
    await user.click(screen.getByText(/EN — English/i));
    // Switch back to VN
    await user.click(screen.getByRole("button", { name: /chọn ngôn ngữ/i }));
    await user.click(screen.getByText(/VN — Tiếng Việt/i));
    expect(screen.getByText("VN")).toBeInTheDocument();
  });

  it("dropdown closes after selection", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);
    await user.click(screen.getByRole("button", { name: /chọn ngôn ngữ/i }));
    await user.click(screen.getByText(/EN — English/i));
    expect(screen.queryByText(/EN — English/i)).not.toBeInTheDocument();
  });
});
