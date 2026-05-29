import { render, screen, fireEvent } from "@testing-library/react";
import TheLePannel from "./the-le-panel";

describe("TheLePannel", () => {
  const onClose = jest.fn();

  beforeEach(() => onClose.mockClear());

  it("renders title", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByText("Thể lệ")).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByText(/NGƯỜI NHẬN KUDOS/)).toBeInTheDocument();
    expect(screen.getByText(/NGƯỜI GỬI KUDOS/)).toBeInTheDocument();
    expect(screen.getByText("KUDOS QUỐC DÂN")).toBeInTheDocument();
  });

  it("renders 4 hero badge tiers", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByText("New Hero")).toBeInTheDocument();
    expect(screen.getByText("Rising Hero")).toBeInTheDocument();
    expect(screen.getByText("Super Hero")).toBeInTheDocument();
    expect(screen.getByText("Legend Hero")).toBeInTheDocument();
  });

  it("renders 6 Kudos icon images", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByAltText("REVIVAL")).toBeInTheDocument();
    expect(screen.getByAltText("TOUCH OF LIGHT")).toBeInTheDocument();
    expect(screen.getByAltText("STAY GOLD")).toBeInTheDocument();
    expect(screen.getByAltText("FLOW TO HORIZON")).toBeInTheDocument();
    expect(screen.getByAltText("BEYOND THE BOUNDARY")).toBeInTheDocument();
    expect(screen.getByAltText("ROOT FURTHER")).toBeInTheDocument();
  });

  it("calls onClose when Đóng is clicked", () => {
    render(<TheLePannel onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /Đóng/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders Viết KUDOS button", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByRole("button", { name: /Viết KUDOS/i })).toBeInTheDocument();
  });
});
