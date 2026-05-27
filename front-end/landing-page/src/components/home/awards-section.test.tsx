import { render, screen } from "@testing-library/react";
import AwardsSection from "./awards-section";

describe("AwardsSection", () => {
  it("renders 6 award cards (spec C2) (ID-15)", () => {
    render(<AwardsSection />);
    // Each card has a "Chi tiết" link — 6 cards = 6 links
    expect(screen.getAllByRole("link", { name: /chi tiết/i })).toHaveLength(6);
  });

  it("renders all 6 award titles", () => {
    render(<AwardsSection />);
    const titles = [
      "Top Talent",
      "Top Project",
      "Top Project Leader",
      "Best Manager",
      "Signature 2025 Creator",
      "MVP",
    ];
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders section heading "Hệ thống giải thưởng"', () => {
    render(<AwardsSection />);
    expect(screen.getByRole("heading", { name: /hệ thống giải thưởng/i })).toBeInTheDocument();
  });

  it("renders section label Sun* annual awards 2025", () => {
    render(<AwardsSection />);
    expect(screen.getByText(/sun\* annual awards 2025/i)).toBeInTheDocument();
  });
});
