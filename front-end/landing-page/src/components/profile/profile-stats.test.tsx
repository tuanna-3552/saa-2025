import { render, screen, fireEvent } from "@testing-library/react";
import ProfileStats from "./profile-stats";
import type { UserStats } from "@/lib/kudos-types";

// Mock SecretBoxDialog to avoid testing unrelated dialog behavior
jest.mock("@/components/kudos/secret-box-dialog", () => {
  return function MockSecretBoxDialog({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
  }) {
    if (!open) return null;
    return (
      <div
        role="dialog"
        aria-label="Secret Box"
        onClick={onClose}
        data-testid="secret-box-dialog"
      >
        Secret Box Dialog
      </div>
    );
  };
});

const mockStats: UserStats = {
  kudosReceived: 5,
  kudosSent: 25,
  heartsReceived: 10,
  secretBoxesOpened: 2,
  secretBoxesUnopened: 3,
};

describe("ProfileStats", () => {
  it("renders all 5 stat labels", () => {
    render(<ProfileStats stats={mockStats} isOwn={true} />);

    expect(screen.getByText("Kudos bạn nhận được:")).toBeInTheDocument();
    expect(screen.getByText("Kudos bạn đã gửi:")).toBeInTheDocument();
    expect(screen.getByText("Số tim bạn nhận được:")).toBeInTheDocument();
    expect(screen.getByText("Secret Box bạn đã mở:")).toBeInTheDocument();
    expect(screen.getByText("Secret Box chưa mở:")).toBeInTheDocument();
  });

  it("renders stat values from props", () => {
    render(<ProfileStats stats={mockStats} isOwn={true} />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders Secret Box button when isOwn=true", () => {
    render(<ProfileStats stats={mockStats} isOwn={true} />);

    expect(screen.getByText(/mở secret box/i)).toBeInTheDocument();
  });

  it("does NOT render Secret Box button when isOwn=false", () => {
    render(<ProfileStats stats={mockStats} isOwn={false} />);

    expect(screen.queryByText(/mở secret box/i)).not.toBeInTheDocument();
  });

  it("opens dialog when Secret Box button is clicked", () => {
    render(<ProfileStats stats={mockStats} isOwn={true} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByTestId("secret-box-dialog")).toBeInTheDocument();
  });

  it("closes dialog when dialog onClose is called", () => {
    render(<ProfileStats stats={mockStats} isOwn={true} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByTestId("secret-box-dialog")).toBeInTheDocument();

    // Click on the dialog to trigger onClose
    const dialog = screen.getByTestId("secret-box-dialog");
    fireEvent.click(dialog);

    expect(screen.queryByTestId("secret-box-dialog")).not.toBeInTheDocument();
  });

  it("renders stats card with correct background color", () => {
    const { container } = render(<ProfileStats stats={mockStats} isOwn={true} />);

    // Find the card container by checking all divs for the background (converted to rgb)
    const allDivs = container.querySelectorAll("div");
    const card = Array.from(allDivs).find((div) => {
      const style = div.getAttribute("style");
      // The color #00070C converts to rgb(0, 7, 12)
      return style && (style.includes("#00070C") || style.includes("rgb(0, 7, 12)"));
    });
    expect(card).toBeDefined();
  });

  it("renders divider before Secret Box stats", () => {
    const { container } = render(<ProfileStats stats={mockStats} isOwn={true} />);

    // Look for the divider (1px height)
    const divider = container.querySelector("div[style*='height: 1px']");
    expect(divider).toBeInTheDocument();
  });

  it("displays stat values with correct text content", () => {
    render(<ProfileStats stats={mockStats} isOwn={true} />);

    // Check that all stat values are displayed
    const values = [
      screen.getByText("5"),
      screen.getByText("25"),
      screen.getByText("10"),
      screen.getByText("2"),
      screen.getByText("3"),
    ];
    values.forEach((v) => expect(v).toBeInTheDocument());
  });

  it("renders stats with correct layout structure", () => {
    const { container } = render(<ProfileStats stats={mockStats} isOwn={true} />);

    // Check for the stats card container by finding div with background color
    const allDivs = container.querySelectorAll("div");
    const statsCard = Array.from(allDivs).find((div) => {
      const style = div.getAttribute("style");
      // The color #00070C converts to rgb(0, 7, 12)
      return style && (style.includes("#00070C") || style.includes("rgb(0, 7, 12)"));
    });
    expect(statsCard).toBeDefined();
  });

  it("handles large stat numbers", () => {
    const largeStats: UserStats = {
      kudosReceived: 999,
      kudosSent: 2500,
      heartsReceived: 1000,
      secretBoxesOpened: 99,
      secretBoxesUnopened: 50,
    };

    render(<ProfileStats stats={largeStats} isOwn={true} />);

    expect(screen.getByText("999")).toBeInTheDocument();
    expect(screen.getByText("2500")).toBeInTheDocument();
  });

  it("renders Secret Box button with correct emoji", () => {
    const { container } = render(<ProfileStats stats={mockStats} isOwn={true} />);

    const button = screen.getByRole("button");
    expect(button.textContent).toContain("🎁");
  });

  it("renders button with gold background when isOwn=true", () => {
    render(<ProfileStats stats={mockStats} isOwn={true} />);

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("background: #FFEA9E");
  });

  it("handles zero values in stats", () => {
    const zeroStats: UserStats = {
      kudosReceived: 0,
      kudosSent: 0,
      heartsReceived: 0,
      secretBoxesOpened: 0,
      secretBoxesUnopened: 0,
    };

    render(<ProfileStats stats={zeroStats} isOwn={true} />);

    const zeroTexts = screen.getAllByText("0");
    expect(zeroTexts.length).toBeGreaterThanOrEqual(5);
  });
});
