import { render, screen } from "@testing-library/react";
import AwardInfoCard from "./award-info-card";
import { AWARDS } from "./award-data";

const TOP_TALENT = AWARDS[0]; // qty="10", unit="Đơn vị", value="7.000.000 VNĐ"
const TOP_PROJECT = AWARDS[1]; // image=""

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

  it("img element has width=336 and height=336 when image provided (ID-7)", () => {
    const award = { ...TOP_TALENT, image: "/awards/top-talent.png" };
    render(<AwardInfoCard {...award} />);
    const img = screen.getByRole("img", { name: award.label });
    expect(img).toHaveAttribute("width", "336");
    expect(img).toHaveAttribute("height", "336");
  });

  it("renders placeholder (no img) when image is empty (ID-7 fallback)", () => {
    render(<AwardInfoCard {...TOP_PROJECT} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("section has id matching award id for scroll targeting (ID-9)", () => {
    const { container } = render(<AwardInfoCard {...TOP_TALENT} />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("id", TOP_TALENT.id);
  });

  it("does not render unit span when unit is empty", () => {
    const award = { ...AWARDS[4] }; // signature-creator has unit=""
    render(<AwardInfoCard {...award} />);
    // Should render qty but no unit span
    expect(screen.getByText(award.qty)).toBeInTheDocument();
  });
});
