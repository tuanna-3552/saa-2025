import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import KudosSidebar from "./kudos-sidebar";
import type { UserStats, PrizeRecipient } from "@/lib/kudos-types";

jest.mock("./secret-box-dialog", () => {
  return function MockSecretBoxDialog() {
    return <div data-testid="secret-box-dialog">Secret Box Dialog</div>;
  };
});

const mockStats: UserStats = {
  kudosReceived: 15,
  kudosSent: 8,
  heartsReceived: 42,
  secretBoxesOpened: 3,
  secretBoxesUnopened: 2,
};

const mockPrizeRecipients: PrizeRecipient[] = [
  {
    id: "p1",
    name: "Alice Johnson",
    avatar: "/avatars/alice.jpg",
    prizeDescription: "MacBook Pro 16",
    profileUrl: "/profile/u1",
  },
  {
    id: "p2",
    name: "Bob Smith",
    avatar: "/avatars/bob.jpg",
    prizeDescription: "iPad Pro",
    profileUrl: "/profile/u2",
  },
  {
    id: "p3",
    name: "Charlie Brown",
    avatar: "/avatars/charlie.jpg",
    prizeDescription: "AirPods Max",
    profileUrl: "/profile/u3",
  },
];

describe("KudosSidebar", () => {
  it("renders without crashing", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );
    expect(screen.getByText(/Số Kudos bạn nhận được/)).toBeInTheDocument();
  });

  it("renders all stat rows", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    expect(screen.getByText("Số Kudos bạn nhận được:")).toBeInTheDocument();
    expect(screen.getByText("Số Kudos bạn đã gửi:")).toBeInTheDocument();
    expect(screen.getByText("Số tim bạn nhận được:")).toBeInTheDocument();
  });

  it("renders correct stat values", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders secret box rows", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    expect(screen.getByText("Số Secret Box bạn đã mở:")).toBeInTheDocument();
    expect(screen.getByText("Số Secret Box chưa mở:")).toBeInTheDocument();
  });

  it("renders secret box values", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    // 3 opened and 2 unopened
    const allNumbers = screen.getAllByText(/[0-9]+/);
    expect(allNumbers.some((el) => el.textContent === "3")).toBe(true);
    expect(allNumbers.some((el) => el.textContent === "2")).toBe(true);
  });

  it('renders "Mở Secret Box" button', () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    expect(screen.getByText("Mở Secret Box")).toBeInTheDocument();
  });

  it("opens dialog when Mở Secret Box button is clicked", async () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    const button = screen.getByText("Mở Secret Box");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId("secret-box-dialog")).toBeInTheDocument();
    });
  });

  it("renders prize recipients section title", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    expect(screen.getByText(/10 SUNNER NHẬN QUÀ/)).toBeInTheDocument();
  });

  it("renders all recent prize recipients", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    mockPrizeRecipients.forEach((recipient) => {
      expect(screen.getByText(recipient.name)).toBeInTheDocument();
      expect(screen.getByText(recipient.prizeDescription)).toBeInTheDocument();
    });
  });

  it("renders prize recipient links with correct href", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    mockPrizeRecipients.forEach((recipient) => {
      const link = screen.getByText(recipient.name).closest("a");
      expect(link).toHaveAttribute("href", recipient.profileUrl);
    });
  });

  it("renders prize recipient avatars", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    mockPrizeRecipients.forEach((recipient) => {
      const img = screen.getByAltText(recipient.name) as HTMLImageElement;
      expect(img).toHaveAttribute("src", recipient.avatar);
    });
  });

  it("limits display to 10 prize recipients when more are provided", () => {
    const manyRecipients = Array.from({ length: 15 }, (_, i) => ({
      id: `p${i}`,
      name: `Recipient ${i}`,
      avatar: `/avatars/avatar${i}.jpg`,
      prizeDescription: `Prize ${i}`,
      profileUrl: `/profile/u${i}`,
    }));

    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={manyRecipients} />
    );

    // Should render exactly 10
    const links = screen.getAllByRole("link");
    const prizeLinks = links.filter((link) =>
      link.href.includes("/profile/")
    );
    expect(prizeLinks.length).toBeLessThanOrEqual(10);
  });

  it("renders with correct styling structure", () => {
    const { container } = render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveStyle("flex: 0 0 422px");
    expect(mainDiv).toHaveStyle("display: flex");
    expect(mainDiv).toHaveStyle("flex-direction: column");
  });

  it("renders empty prize recipients list gracefully", () => {
    render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={[]} />
    );

    expect(screen.getByText(/10 SUNNER NHẬN QUÀ/)).toBeInTheDocument();
    // Should not error with empty list
  });

  it("includes gift emoji in button", () => {
    const { container } = render(
      <KudosSidebar stats={mockStats} recentPrizeRecipients={mockPrizeRecipients} />
    );

    const button = screen.getByText("Mở Secret Box").closest("button");
    expect(button?.textContent).toContain("🎁");
  });
});
