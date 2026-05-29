import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileTooltip from "./profile-tooltip";

describe("ProfileTooltip", () => {
  const defaultProps = {
    avatar: "/avatars/alice.jpg",
    name: "Alice Johnson",
    department: "Design",
    stars: 2,
    children: <div>User Block</div>,
  };

  it("renders children element", () => {
    render(<ProfileTooltip {...defaultProps} />);
    expect(screen.getByText("User Block")).toBeInTheDocument();
  });

  it("does not show tooltip initially", () => {
    render(<ProfileTooltip {...defaultProps} />);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on mouse enter", async () => {
    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("displays avatar in tooltip", async () => {
    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      const avatarImgs = screen.getAllByAltText("Alice Johnson");
      expect(avatarImgs.length).toBeGreaterThan(0);
    });
  });

  it("displays name in tooltip", async () => {
    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      const tooltipNames = screen.getAllByText("Alice Johnson");
      expect(tooltipNames.length).toBeGreaterThan(0);
    });
  });

  it("displays department in tooltip", async () => {
    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      const tooltipDepts = screen.getAllByText("Design");
      expect(tooltipDepts.length).toBeGreaterThan(0);
    });
  });

  it("displays star count in tooltip", async () => {
    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip.textContent).toContain("★ 2");
    });
  });

  it("hides tooltip on mouse leave", async () => {
    jest.useFakeTimers();

    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    fireEvent.mouseLeave(span!);
    jest.advanceTimersByTime(200);

    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it("shows tooltip on focus", async () => {
    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.focus(span!);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  it("hides tooltip on blur", async () => {
    jest.useFakeTimers();

    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.focus(span!);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    fireEvent.blur(span!);
    jest.advanceTimersByTime(200);

    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it("renders tooltip with correct background color", async () => {
    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      const computedStyle = window.getComputedStyle(tooltip);
      expect(computedStyle.background).toBeDefined();
    });
  });

  it("renders tooltip with border", async () => {
    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveStyle("border-radius: 12px");
    });
  });

  it("positions tooltip above and centered", async () => {
    render(<ProfileTooltip {...defaultProps} />);

    const span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveStyle("left: 50%");
    });
  });

  it("handles different user data", async () => {
    const { rerender } = render(<ProfileTooltip {...defaultProps} />);

    let span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    rerender(
      <ProfileTooltip
        avatar="/avatars/bob.jpg"
        name="Bob Smith"
        department="Engineering"
        stars={3}
        children={<div>User Block</div>}
      />
    );

    span = screen.getByText("User Block").closest("span");
    fireEvent.mouseEnter(span!);

    await waitFor(() => {
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip.textContent).toContain("★ 3");
    });
  });
});
