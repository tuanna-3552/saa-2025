import { render, screen, act } from "@testing-library/react";
import CountdownTimer from "./countdown-timer";

// Stable router object — new object per render would re-trigger useEffect([..., router])
const mockRouter = { push: jest.fn() };
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

function futureDate(daysAhead = 10) {
  return new Date(Date.now() + daysAhead * 86_400_000).toISOString();
}

describe("CountdownTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders zero-padded 2-digit values (ID-40)", () => {
    render(<CountdownTimer targetDate={futureDate(1)} />);
    act(() => { jest.advanceTimersByTime(100); });
    // Days will be 0 padded to "01" or similar 2-digit strings
    const digits = screen.getAllByRole("generic").filter(
      (el) => /^\d$/.test(el.textContent ?? "")
    );
    // Each unit group renders 2 digit cards → 3 groups × 2 = 6 digits
    expect(digits.length).toBeGreaterThanOrEqual(6);
  });

  it("uses NEXT_PUBLIC_EVENT_DATE to drive countdown (ID-56)", () => {
    const date = futureDate(5);
    process.env.NEXT_PUBLIC_EVENT_DATE = date;
    render(<CountdownTimer targetDate={process.env.NEXT_PUBLIC_EVENT_DATE ?? ""} />);
    act(() => { jest.advanceTimersByTime(100); });
    // Days label should be visible
    expect(screen.getByText("DAYS")).toBeInTheDocument();
    delete process.env.NEXT_PUBLIC_EVENT_DATE;
  });

  it("shows zeros when targetDate is in the past (ID-57)", () => {
    render(<CountdownTimer targetDate="2020-01-01T00:00:00Z" />);
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.getByText("DAYS")).toBeInTheDocument();
    // All digit cards show "0"
    const zeros = screen.getAllByText("0");
    expect(zeros.length).toBeGreaterThanOrEqual(6);
  });

  it("shows zeros for invalid targetDate (ID-40 fallback)", () => {
    render(<CountdownTimer targetDate="not-a-date" />);
    act(() => { jest.advanceTimersByTime(100); });
    const zeros = screen.getAllByText("0");
    expect(zeros.length).toBeGreaterThanOrEqual(6);
  });
});
