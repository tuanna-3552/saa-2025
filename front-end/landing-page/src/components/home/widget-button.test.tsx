import { render, screen, fireEvent } from "@testing-library/react";
import WidgetButton from "./widget-button";

describe("WidgetButton — Thể lệ panel", () => {
  it("does not render TheLePannel by default", () => {
    render(<WidgetButton />);
    expect(screen.queryByText("Thể lệ")).not.toBeInTheDocument();
  });

  it("opens TheLePannel when Thể lệ button is clicked", () => {
    render(<WidgetButton />);
    fireEvent.click(screen.getByRole("button", { name: /Mở tuỳ chọn/i }));
    fireEvent.click(screen.getByRole("button", { name: /Thể lệ/i }));
    expect(screen.getByText("Thể lệ")).toBeInTheDocument();
  });

  it("closes TheLePannel when Đóng is clicked", () => {
    render(<WidgetButton />);
    fireEvent.click(screen.getByRole("button", { name: /Mở tuỳ chọn/i }));
    fireEvent.click(screen.getByRole("button", { name: /Thể lệ/i }));
    fireEvent.click(screen.getByRole("button", { name: /Đóng/i }));
    expect(screen.queryByText("Thể lệ")).not.toBeInTheDocument();
  });
});
