import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AwardNav from "./award-nav";
import { AWARDS } from "./award-data";

beforeEach(() => {
  // IntersectionObserver not available in jsdom — provide no-op mock
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    })),
  });

  // Mock getElementById for scrollIntoView calls
  jest.spyOn(document, "getElementById").mockReturnValue({
    scrollIntoView: jest.fn(),
  } as unknown as HTMLElement);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("AwardNav", () => {
  it("renders all 6 award nav items in correct order (ID-5)", () => {
    render(<AwardNav />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(6);
    AWARDS.forEach((award, i) => {
      expect(buttons[i]).toHaveTextContent(award.label);
    });
  });

  it("first item has active gold color by default (ID-11)", () => {
    render(<AwardNav />);
    const firstButton = screen.getAllByRole("button")[0];
    expect(firstButton).toHaveStyle({ color: "#FFEA9E" });
  });

  it("non-active items do not have gold color (ID-11)", () => {
    render(<AwardNav />);
    const buttons = screen.getAllByRole("button");
    // Remaining buttons should not have active gold
    for (let i = 1; i < buttons.length; i++) {
      expect(buttons[i]).not.toHaveStyle({ color: "#FFEA9E" });
    }
  });

  it("clicking a nav item calls getElementById and scrollIntoView (ID-9)", async () => {
    const user = userEvent.setup();
    render(<AwardNav />);
    const secondButton = screen.getAllByRole("button")[1];
    await user.click(secondButton);
    expect(document.getElementById).toHaveBeenCalledWith(AWARDS[1].id);
  });
});
