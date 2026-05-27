import { render, screen } from "@testing-library/react";
import AwardCard from "./award-card";

const BASE_PROPS = {
  bgImage: "/home/award-bg.png",
  nameImage: "/home/award-test-name.png",
  nameImageWidth: 200,
  nameImageHeight: 40,
  title: "Top Talent",
  description: "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
  detailHref: "#top-talent",
};

describe("AwardCard", () => {
  it("renders award title (ID-15)", () => {
    render(<AwardCard {...BASE_PROPS} />);
    expect(screen.getByText("Top Talent")).toBeInTheDocument();
  });

  it("renders description (ID-15)", () => {
    render(<AwardCard {...BASE_PROPS} />);
    expect(screen.getByText(BASE_PROPS.description)).toBeInTheDocument();
  });

  it('renders "Chi tiết" link (ID-15)', () => {
    render(<AwardCard {...BASE_PROPS} />);
    expect(screen.getByRole("link", { name: /chi tiết/i })).toBeInTheDocument();
  });

  it("Chi tiết link uses correct href (ID-47–50)", () => {
    render(<AwardCard {...BASE_PROPS} />);
    expect(screen.getByRole("link", { name: /chi tiết/i })).toHaveAttribute("href", "#top-talent");
  });

  it("description has line-clamp container styles (spec C2.1.3)", () => {
    render(<AwardCard {...BASE_PROPS} />);
    const desc = screen.getByText(BASE_PROPS.description);
    // jsdom silently drops -webkit-line-clamp; verify the associated properties it does keep
    expect(desc).toHaveStyle({ overflow: "hidden" });
    expect(desc.getAttribute("style") ?? "").toContain("display: -webkit-box");
  });

  it("name image uses title as alt text for accessibility", () => {
    render(<AwardCard {...BASE_PROPS} />);
    expect(screen.getByAltText("Top Talent")).toBeInTheDocument();
  });
});
