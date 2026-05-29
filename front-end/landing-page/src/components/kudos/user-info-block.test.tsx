import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserInfoBlock from "./user-info-block";

describe("UserInfoBlock", () => {
  const defaultProps = {
    avatar: "/avatars/alice.jpg",
    name: "Alice Johnson",
    department: "Design",
    stars: 2,
    profileUrl: "/profile/u1",
  };

  it("renders avatar image", () => {
    render(<UserInfoBlock {...defaultProps} />);
    const img = screen.getByAltText("Alice Johnson");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/avatars/alice.jpg");
  });

  it("renders user name", () => {
    render(<UserInfoBlock {...defaultProps} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
  });

  it("renders user department", () => {
    render(<UserInfoBlock {...defaultProps} />);
    expect(screen.getByText("Design")).toBeInTheDocument();
  });

  it("renders star count badge", () => {
    render(<UserInfoBlock {...defaultProps} />);
    expect(screen.getByText("★ 2")).toBeInTheDocument();
  });

  it("renders with different star counts", () => {
    const { rerender } = render(<UserInfoBlock {...defaultProps} stars={0} />);
    expect(screen.getByText("★ 0")).toBeInTheDocument();

    rerender(<UserInfoBlock {...defaultProps} stars={3} />);
    expect(screen.getByText("★ 3")).toBeInTheDocument();
  });

  it("shows tooltip on hover with name and department", async () => {
    render(<UserInfoBlock {...defaultProps} />);

    const userBlock = screen.getByText("Alice Johnson").closest("span");
    fireEvent.mouseEnter(userBlock!);

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
    });
  });

  it("shows tooltip with star count", async () => {
    render(<UserInfoBlock {...defaultProps} />);

    const userBlock = screen.getByText("Alice Johnson").closest("span");
    fireEvent.mouseEnter(userBlock!);

    await waitFor(() => {
      const tooltipContent = screen.getByRole("tooltip");
      expect(tooltipContent.textContent).toContain("★ 2");
    });
  });

  it("hides tooltip on mouse leave", async () => {
    jest.useFakeTimers();

    render(<UserInfoBlock {...defaultProps} />);

    const userBlock = screen.getByText("Alice Johnson").closest("span");
    fireEvent.mouseEnter(userBlock!);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    fireEvent.mouseLeave(userBlock!);
    jest.advanceTimersByTime(200);

    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it("renders with 235px width", () => {
    const { container } = render(<UserInfoBlock {...defaultProps} />);
    const div = container.querySelector("div");
    expect(div).toHaveStyle("width: 235px");
  });

  it("renders avatar as circular with border", () => {
    const { container } = render(<UserInfoBlock {...defaultProps} />);
    const avatarDiv = container.querySelector(
      "div[style*='border-radius'][style*='50%']"
    );
    expect(avatarDiv).toBeInTheDocument();
  });

  it("renders with flex column layout", () => {
    const { container } = render(<UserInfoBlock {...defaultProps} />);
    const div = container.querySelector("div");
    expect(div).toHaveStyle("flex-direction: column");
  });

  it("applies cursor pointer style", () => {
    const { container } = render(<UserInfoBlock {...defaultProps} />);
    const div = container.querySelector("div");
    expect(div).toHaveStyle("cursor: pointer");
  });

  it("renders with different names and departments", () => {
    const { rerender } = render(<UserInfoBlock {...defaultProps} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();

    rerender(
      <UserInfoBlock
        {...defaultProps}
        name="Bob Smith"
        department="Engineering"
      />
    );
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });
});
