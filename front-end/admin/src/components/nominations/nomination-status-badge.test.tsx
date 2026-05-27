import { render, screen } from "@testing-library/react";
import { NominationStatusBadge } from "./nomination-status-badge";

describe("NominationStatusBadge", () => {
  it("renders 'Mới tạo' for pending status", () => {
    render(<NominationStatusBadge status="pending" />);
    expect(screen.getByText("Mới tạo")).toBeInTheDocument();
  });

  it("renders 'Public' for approved status", () => {
    render(<NominationStatusBadge status="approved" />);
    expect(screen.getByText("Public")).toBeInTheDocument();
  });

  it("renders 'Spam' for rejected status", () => {
    render(<NominationStatusBadge status="rejected" />);
    expect(screen.getByText("Spam")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <NominationStatusBadge status="pending" className="extra-class" />
    );
    expect(container.firstChild).toHaveClass("extra-class");
  });

  it("renders a dot indicator span", () => {
    const { container } = render(<NominationStatusBadge status="approved" />);
    const dots = container.querySelectorAll("span > span");
    expect(dots.length).toBeGreaterThan(0);
  });
});
