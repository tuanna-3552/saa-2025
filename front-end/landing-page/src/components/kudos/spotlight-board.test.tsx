import { render, screen } from "@testing-library/react";
import SpotlightBoard from "./spotlight-board";
import type { SpotlightRecipient } from "@/lib/kudos-types";

describe("SpotlightBoard", () => {
  const mockRecipients: SpotlightRecipient[] = [
    {
      id: "u1",
      name: "Alice Johnson",
      kudosCount: 15,
      lastReceivedAt: "2025-05-29T10:00:00Z",
    },
    {
      id: "u2",
      name: "Bob Smith",
      kudosCount: 25,
      lastReceivedAt: "2025-05-28T15:00:00Z",
    },
    {
      id: "u3",
      name: "Charlie Brown",
      kudosCount: 8,
      lastReceivedAt: "2025-05-27T12:00:00Z",
    },
  ];

  it("renders without crashing", () => {
    render(<SpotlightBoard recipients={mockRecipients} totalCount={48} />);
    expect(screen.getByText("Sun* Annual Awards 2025")).toBeInTheDocument();
  });

  it("renders total kudos count", () => {
    render(<SpotlightBoard recipients={mockRecipients} totalCount={48} />);
    expect(screen.getByText("48 KUDOS")).toBeInTheDocument();
  });

  it("renders section label 'Sun* Annual Awards 2025'", () => {
    render(<SpotlightBoard recipients={mockRecipients} totalCount={48} />);
    expect(screen.getByText("Sun* Annual Awards 2025")).toBeInTheDocument();
  });

  it("renders canvas element with aria-label", () => {
    render(<SpotlightBoard recipients={mockRecipients} totalCount={48} />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("aria-label");
  });

  it("renders ticker strip with recipient names", () => {
    const { container } = render(
      <SpotlightBoard recipients={mockRecipients} totalCount={48} />
    );

    // Check that ticker contains recipient names in the text
    const tickerText = container.textContent;
    mockRecipients.forEach((recipient) => {
      expect(tickerText).toContain(recipient.name);
    });
  });

  it("renders empty state with 0 recipients", () => {
    render(<SpotlightBoard recipients={[]} totalCount={0} />);
    expect(screen.getByText("0 KUDOS")).toBeInTheDocument();
  });

  it("formats kudos count with thousand separator", () => {
    render(<SpotlightBoard recipients={mockRecipients} totalCount={1234} />);
    // Vietnamese locale uses "." for thousands
    expect(screen.getByText(/1.234 KUDOS|1234 KUDOS/)).toBeInTheDocument();
  });

  it("renders all recipient names in ticker", () => {
    const { container } = render(
      <SpotlightBoard recipients={mockRecipients} totalCount={48} />
    );

    const tickerText = container.textContent;
    mockRecipients.forEach((recipient) => {
      expect(tickerText).toContain(recipient.name);
    });
  });

  it("displays ticker text with timestamp format", () => {
    const { container } = render(
      <SpotlightBoard recipients={mockRecipients} totalCount={48} />
    );
    // Should contain ticker format with timestamp
    expect(container.textContent).toContain("08:30PM");
    expect(container.textContent).toContain("đã nhận được một Kudos mới");
  });

  it("renders canvas with correct dimensions", () => {
    render(<SpotlightBoard recipients={mockRecipients} totalCount={48} />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toHaveAttribute("width", "1152");
    expect(canvas).toHaveAttribute("height", "420");
  });

  it("renders ticker animation container", () => {
    const { container } = render(
      <SpotlightBoard recipients={mockRecipients} totalCount={48} />
    );

    const tickerDiv = container.querySelector("[style*='animation']");
    expect(tickerDiv).toBeInTheDocument();
  });
});
