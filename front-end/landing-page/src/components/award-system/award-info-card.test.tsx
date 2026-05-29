import { render, screen } from "@testing-library/react";
import AwardInfoCard from "./award-info-card";
import { AWARDS } from "./award-data";

const TOP_TALENT = AWARDS[0]; // qty="10", unit="Đơn vị", value="7.000.000 VNĐ"

describe("AwardInfoCard", () => {
  it("renders label as heading (ID-6)", () => {
    render(<AwardInfoCard {...TOP_TALENT} />);
    expect(screen.getByRole("heading", { name: TOP_TALENT.label })).toBeInTheDocument();
  });

  it("renders qty value (ID-6)", () => {
    render(<AwardInfoCard {...TOP_TALENT} />);
    expect(screen.getByText(TOP_TALENT.qty)).toBeInTheDocument();
  });

  it("renders unit text when provided (ID-6)", () => {
    render(<AwardInfoCard {...TOP_TALENT} />);
    expect(screen.getByText(TOP_TALENT.unit)).toBeInTheDocument();
  });

  it("renders award value text (ID-6)", () => {
    render(<AwardInfoCard {...TOP_TALENT} />);
    expect(screen.getByText(TOP_TALENT.value)).toBeInTheDocument();
  });

  it("renders valueNote when provided (ID-6)", () => {
    render(<AwardInfoCard {...TOP_TALENT} />);
    expect(screen.getByText(TOP_TALENT.valueNote)).toBeInTheDocument();
  });

  it("renders trophy image composite — bg img and name overlay (ID-7)", () => {
    render(<AwardInfoCard {...TOP_TALENT} />);
    // Background image (award-bg.png) — aria hidden
    expect(document.querySelector('img[src="/home/award-bg.png"]')).toBeInTheDocument();
    // Name overlay — has accessible alt text
    expect(screen.getByAltText(TOP_TALENT.label)).toBeInTheDocument();
  });

  it("name overlay uses nameImageWidth and nameImageHeight (ID-7)", () => {
    render(<AwardInfoCard {...TOP_TALENT} />);
    const nameImg = screen.getByAltText(TOP_TALENT.label) as HTMLImageElement;
    expect(nameImg).toHaveStyle({ width: `${TOP_TALENT.nameImageWidth}px`, height: `${TOP_TALENT.nameImageHeight}px` });
  });

  it("section has id matching award id for scroll targeting (ID-9)", () => {
    const { container } = render(<AwardInfoCard {...TOP_TALENT} />);
    expect(container.querySelector("section")).toHaveAttribute("id", TOP_TALENT.id);
  });

  it("does not render unit span when unit is empty", () => {
    const award = AWARDS[4]; // signature-creator has unit=""
    render(<AwardInfoCard {...award} />);
    const qtySpan = screen.getByText(award.qty);
    // No unit sibling span after the qty value
    expect(qtySpan.nextSibling).toBeNull();
  });
});
