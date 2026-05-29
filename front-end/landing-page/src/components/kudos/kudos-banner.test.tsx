import { render, screen } from "@testing-library/react";
import KudosBanner from "./kudos-banner";

describe("KudosBanner", () => {
  it("renders without crashing", () => {
    render(<KudosBanner />);
    expect(screen.getByText("Hệ thống ghi nhận và cảm ơn")).toBeInTheDocument();
  });

  it("renders the tagline text", () => {
    render(<KudosBanner />);
    expect(screen.getByText("Hệ thống ghi nhận và cảm ơn")).toBeInTheDocument();
  });

  it("renders the KUDOS logo text", () => {
    render(<KudosBanner />);
    expect(screen.getByText("KUDOS")).toBeInTheDocument();
  });

  it("renders with 100% width and 512px height", () => {
    const { container } = render(<KudosBanner />);
    const section = container.querySelector("section");
    expect(section).toHaveStyle("width: 100%");
    expect(section).toHaveStyle("height: 512px");
  });
});
