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

  it("renders trophy bg image and name overlay (ID-7)", () => {
    render(<AwardInfoCard {...TOP_TALENT} />);
    expect(document.querySelector('img[src="/home/award-bg.png"]')).toBeInTheDocument();
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

  it("trophy appears first in DOM when imageLeft=true", () => {
    const { container } = render(<AwardInfoCard {...TOP_TALENT} imageLeft={true} />);
    const row = container.querySelector("section > div:last-child") as HTMLElement;
    const firstChild = row?.firstElementChild;
    // Trophy block has no heading; content block has h3
    expect(firstChild?.querySelector("h3")).toBeNull();
  });

  it("content appears first in DOM when imageLeft=false (default)", () => {
    const { container } = render(<AwardInfoCard {...TOP_TALENT} imageLeft={false} />);
    const row = container.querySelector("section > div:last-child") as HTMLElement;
    const firstChild = row?.firstElementChild;
    // Content block has h3 heading
    expect(firstChild?.querySelector("h3")).toBeInTheDocument();
  });

  it("does not render unit span when unit is empty", () => {
    const award = AWARDS[4]; // signature-creator has unit=""
    render(<AwardInfoCard {...award} />);
    const qtySpan = screen.getByText(award.qty);
    expect(qtySpan.nextSibling).toBeNull();
  });
});
