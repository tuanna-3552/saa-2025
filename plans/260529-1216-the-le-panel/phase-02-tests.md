# Phase 02 — Tests

## Context Links

- Plan: [plan.md](./plan.md)
- Phase 01: [phase-01-ui-implementation.md](./phase-01-ui-implementation.md)
- Component under test: `front-end/landing-page/src/components/home/the-le-panel.tsx`
- Widget button: `front-end/landing-page/src/components/home/widget-button.tsx`

## Overview

- **Priority**: P2
- **Status**: Complete
- **Goal**: Unit tests for panel open/close behaviour in `widget-button.tsx` and content rendering in `the-le-panel.tsx`

## Test Scope

No test cases were provided in MoMorph for this screen. Based on the spec, cover:

1. **widget-button.tsx** — interaction logic
   - Clicking "Thể lệ" opens the `TheLePannel` component
   - Opening the panel closes the float menu (`panelOpen` → false)
   - Panel is not rendered by default

2. **the-le-panel.tsx** — content rendering
   - Renders the title "Thể lệ"
   - Renders all 3 section headings
   - Renders 4 hero badge items (New Hero, Rising Hero, Super Hero, Legend Hero)
   - Renders 6 Kudos icon items (REVIVAL, TOUCH OF LIGHT, STAY GOLD, FLOW TO HORIZON, BEYOND THE BOUNDARY, ROOT FURTHER)
   - "Đóng" button calls `onClose` callback
   - "Viết KUDOS" button is present

## Files to Create

| File | Purpose |
|------|---------|
| `front-end/landing-page/src/components/home/the-le-panel.test.tsx` | Panel component unit tests |
| `front-end/landing-page/src/components/home/widget-button.test.tsx` | Float button interaction tests (if not already existing) |

> **Note:** Check if `widget-button.test.tsx` already exists before creating. If it does, add the new test cases to the existing file.

## Test Implementation

### `the-le-panel.test.tsx`

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import TheLePannel from "./the-le-panel";

describe("TheLePannel", () => {
  const onClose = jest.fn();

  beforeEach(() => onClose.mockClear());

  it("renders title", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByText("Thể lệ")).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByText(/NGƯỜI NHẬN KUDOS/)).toBeInTheDocument();
    expect(screen.getByText(/NGƯỜI GỬI KUDOS/)).toBeInTheDocument();
    expect(screen.getByText("KUDOS QUỐC DÂN")).toBeInTheDocument();
  });

  it("renders 4 hero badge tiers", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByText("New Hero")).toBeInTheDocument();
    expect(screen.getByText("Rising Hero")).toBeInTheDocument();
    expect(screen.getByText("Super Hero")).toBeInTheDocument();
    expect(screen.getByText("Legend Hero")).toBeInTheDocument();
  });

  it("renders 6 Kudos icon names", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByAltText("REVIVAL")).toBeInTheDocument();
    expect(screen.getByAltText(/TOUCH OF LIGHT/i)).toBeInTheDocument();
    expect(screen.getByAltText("STAY GOLD")).toBeInTheDocument();
    expect(screen.getByAltText(/FLOW TO HORIZON/i)).toBeInTheDocument();
    expect(screen.getByAltText(/BEYOND THE BOUNDARY/i)).toBeInTheDocument();
    expect(screen.getByAltText(/ROOT FURTHER/i)).toBeInTheDocument();
  });

  it("calls onClose when Đóng is clicked", () => {
    render(<TheLePannel onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /Đóng/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders Viết KUDOS button", () => {
    render(<TheLePannel onClose={onClose} />);
    expect(screen.getByRole("button", { name: /Viết KUDOS/i })).toBeInTheDocument();
  });
});
```

### `widget-button.test.tsx` additions

Add these cases (or create the file if it does not exist):

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import WidgetButton from "./widget-button";

describe("WidgetButton — Thể lệ panel", () => {
  it("does not render TheLePannel by default", () => {
    render(<WidgetButton />);
    expect(screen.queryByText("Thể lệ")).not.toBeInTheDocument();
  });

  it("opens TheLePannel when Thể lệ button is clicked", () => {
    render(<WidgetButton />);
    // expand float menu first
    fireEvent.click(screen.getByRole("button", { name: /Mở tuỳ chọn/i }));
    fireEvent.click(screen.getByRole("button", { name: /Thể lệ/i }));
    // panel title should appear
    expect(screen.getByText("Thể lệ")).toBeInTheDocument();
  });

  it("closes TheLePannel when Đóng is clicked", () => {
    render(<WidgetButton />);
    fireEvent.click(screen.getByRole("button", { name: /Mở tuỳ chọn/i }));
    fireEvent.click(screen.getByRole("button", { name: /Thể lệ/i }));
    fireEvent.click(screen.getByRole("button", { name: /Đóng/i }));
    expect(screen.queryByText("Thể lệ")).not.toBeInTheDocument();
  });
});
```

## Run Command

```bash
pnpm --filter landing-page test -- --testPathPattern="the-le-panel|widget-button"
```

## Todo List

- [ ] Check if `widget-button.test.tsx` exists — create or append as needed
- [ ] Create `the-le-panel.test.tsx`
- [ ] Run tests: `pnpm --filter landing-page test`
- [ ] Fix any failures (real fixes only — no mocks to force passing)

## Success Criteria

- All new tests pass
- No regressions in existing widget-button tests (if any)
- `pnpm --filter landing-page test` exits 0
