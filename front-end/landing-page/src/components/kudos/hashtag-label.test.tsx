import { render, screen, fireEvent } from "@testing-library/react";
import HashtagLabel from "./hashtag-label";

describe("HashtagLabel", () => {
  it("renders hashtag with # prefix", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);
    expect(screen.getByText("#design")).toBeInTheDocument();
  });

  it("renders hashtag that already has # prefix as-is", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="#design" onClick={onClick} />);
    expect(screen.getByText("#design")).toBeInTheDocument();
  });

  it("calls onClick with tag value (without #) when clicked", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByText("#design");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledWith("design");
  });

  it("calls onClick with tag value when tag already has # prefix", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="#design" onClick={onClick} />);

    const button = screen.getByText("#design");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledWith("#design");
  });

  it("renders as button element", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("is styled as a minimal button", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button.tagName).toBe("BUTTON");
    // Verify it's a clickable element
    expect(button).toBeInTheDocument();
  });

  it("has cursor pointer style", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("cursor: pointer");
  });

  it("renders in red color (#D4271D)", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("color: rgb(212, 39, 29)");
  });

  it("renders with bold font weight (700)", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("font-weight: 700");
  });

  it("renders with Montserrat font", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("font-family: var(--font-montserrat), Montserrat, sans-serif");
  });

  it("renders with 16px font size", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("font-size: 16px");
  });

  it("can be clicked multiple times", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByText("#design");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("handles different hashtag values", () => {
    const onClick = jest.fn();
    const { rerender } = render(
      <HashtagLabel tag="design" onClick={onClick} />
    );
    expect(screen.getByText("#design")).toBeInTheDocument();

    rerender(<HashtagLabel tag="quality" onClick={onClick} />);
    expect(screen.getByText("#quality")).toBeInTheDocument();

    rerender(<HashtagLabel tag="team" onClick={onClick} />);
    expect(screen.getByText("#team")).toBeInTheDocument();
  });

  it("renders with inline display", () => {
    const onClick = jest.fn();
    render(<HashtagLabel tag="design" onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("display: inline");
  });
});
