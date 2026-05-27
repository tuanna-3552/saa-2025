import { render, screen } from "@testing-library/react";
import HeroSection from "./hero-section";

// Stable router reference — prevents infinite effect loop in CountdownTimer
const mockRouter = { push: jest.fn() };
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

describe("HeroSection", () => {
  it("renders ROOT FURTHER title (always visible)", () => {
    render(<HeroSection />);
    expect(screen.getByAltText("ROOT FURTHER")).toBeInTheDocument();
  });

  it('shows "Coming soon" label (ID-13, ID-43)', () => {
    render(<HeroSection />);
    // Matches "Comming soon" (design typo preserved from Figma)
    expect(screen.getByText(/comming soon/i)).toBeInTheDocument();
  });

  it("renders ABOUT AWARDS button (ID-12)", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: /about awards/i })).toBeInTheDocument();
  });

  it("renders ABOUT KUDOS button (ID-12)", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: /about kudos/i })).toBeInTheDocument();
  });

  it("ABOUT AWARDS links to #awards section", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: /about awards/i })).toHaveAttribute("href", "#awards");
  });
});
