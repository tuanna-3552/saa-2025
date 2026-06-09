import { render, screen } from "@testing-library/react";
import ProfileHero from "./profile-hero";

describe("ProfileHero", () => {
  it("renders fullName as a heading", () => {
    render(<ProfileHero avatarUrl="/test-avatar.jpg" fullName="John Doe" />);
    expect(screen.getByRole("heading", { name: "John Doe" })).toBeInTheDocument();
  });

  it("shows fallback avatar container when avatarUrl is null", () => {
    const { container } = render(
      <ProfileHero avatarUrl={null} fullName="Jane Smith" />
    );

    // Check for fallback container with grey background
    const avatarDiv = container.querySelector("div[style*='background']");
    expect(avatarDiv).toBeInTheDocument();

    // Fallback should show initial of name
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("renders avatar image when avatarUrl is provided", () => {
    render(<ProfileHero avatarUrl="/test-avatar.jpg" fullName="Bob Johnson" />);
    const img = screen.getByAltText("Bob Johnson");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test-avatar.jpg");
  });

  it("renders exactly 6 badge circles", () => {
    const { container } = render(
      <ProfileHero avatarUrl="/avatar.jpg" fullName="Test User" />
    );

    // Find all badge divs (64px circles with border)
    const badges = container.querySelectorAll("div[style*='64px']");
    // Count divs that match the badge styling (64px square with border)
    const badgeCircles = Array.from(badges).filter((el) => {
      const style = el.getAttribute("style");
      return style && style.includes("height: 64px") && style.includes("border:");
    });

    expect(badgeCircles).toHaveLength(6);
  });

  it("renders keyvisual background", () => {
    const { container } = render(
      <ProfileHero avatarUrl="/avatar.jpg" fullName="Test User" />
    );

    // Find the background div
    const bgDiv = container.querySelector(
      "div[style*='keyvisual-bg.png']"
    );
    expect(bgDiv).toBeInTheDocument();
  });

  it("renders badge collection label 'Bộ sưu tập icon của tôi'", () => {
    render(<ProfileHero avatarUrl="/avatar.jpg" fullName="Test User" />);
    expect(screen.getByText("Bộ sưu tập icon của tôi")).toBeInTheDocument();
  });

  it("renders section with correct min-height", () => {
    const { container } = render(
      <ProfileHero avatarUrl="/avatar.jpg" fullName="Test User" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveStyle("minHeight: 468px");
  });

  it("renders avatar with white border", () => {
    const { container } = render(
      <ProfileHero avatarUrl="/avatar.jpg" fullName="Test User" />
    );

    // Avatar image should be inside a container with border styling
    const img = screen.getByAltText("Test User");
    expect(img).toBeInTheDocument();
    const avatarContainer = img.parentElement;
    expect(avatarContainer).toHaveStyle("border: 4px solid #FFF");
  });

  it("uses fullName initial when avatar not provided", () => {
    const { container } = render(
      <ProfileHero avatarUrl={null} fullName="Alexander Smith" />
    );

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("capitalizes first letter for fallback initial", () => {
    render(<ProfileHero avatarUrl={null} fullName="alice wonderland" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
