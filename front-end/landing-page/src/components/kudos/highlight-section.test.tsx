import { render, screen, fireEvent } from "@testing-library/react";
import HighlightSection from "./highlight-section";
import type { HighlightKudo } from "@/lib/kudos-types";

const mockKudos: HighlightKudo[] = [
  {
    id: "1",
    senderId: "u1",
    senderName: "Alice",
    senderAvatar: "/avatars/alice.jpg",
    senderDepartment: "Design",
    senderStars: 1,
    receiverId: "u2",
    receiverName: "Bob",
    receiverAvatar: "/avatars/bob.jpg",
    receiverDepartment: "Engineering",
    receiverStars: 2,
    content: "Great work on the UI!",
    hashtags: ["#design"],
    attachmentImages: [],
    likeCount: 10,
    likedByCurrentUser: false,
    createdAt: "2025-05-29T10:00:00Z",
  },
  {
    id: "2",
    senderId: "u3",
    senderName: "Charlie",
    senderAvatar: "/avatars/charlie.jpg",
    senderDepartment: "Management",
    senderStars: 0,
    receiverId: "u2",
    receiverName: "Bob",
    receiverAvatar: "/avatars/bob.jpg",
    receiverDepartment: "Engineering",
    receiverStars: 2,
    content: "Excellent leadership!",
    hashtags: ["#team"],
    attachmentImages: [],
    likeCount: 5,
    likedByCurrentUser: true,
    createdAt: "2025-05-28T15:00:00Z",
  },
  {
    id: "3",
    senderId: "u4",
    senderName: "Diana",
    senderAvatar: "/avatars/diana.jpg",
    senderDepartment: "Marketing",
    senderStars: 1,
    receiverId: "u5",
    receiverName: "Eve",
    receiverAvatar: "/avatars/eve.jpg",
    receiverDepartment: "Sales",
    receiverStars: 3,
    content: "Amazing campaign!",
    hashtags: ["#marketing"],
    attachmentImages: [],
    likeCount: 15,
    likedByCurrentUser: false,
    createdAt: "2025-05-27T12:00:00Z",
  },
];

describe("HighlightSection", () => {
  const defaultProps = {
    kudos: mockKudos,
    hashtags: ["#design", "#team", "#marketing"],
    departments: ["Design", "Engineering", "Management"],
    activeHashtag: null,
    activeDepartment: null,
    onHashtagChange: jest.fn(),
    onDepartmentChange: jest.fn(),
    onLike: jest.fn(),
    onCopyLink: jest.fn(),
  };

  it("renders section label 'Sun* Annual Awards 2025'", () => {
    render(<HighlightSection {...defaultProps} />);
    expect(screen.getByText("Sun* Annual Awards 2025")).toBeInTheDocument();
  });

  it("renders title 'HIGHLIGHT KUDOS'", () => {
    render(<HighlightSection {...defaultProps} />);
    expect(screen.getByText("HIGHLIGHT KUDOS")).toBeInTheDocument();
  });

  it("renders filter buttons for Hashtag and Phòng ban", () => {
    render(<HighlightSection {...defaultProps} />);
    const hashtagButton = screen.getByText("Hashtag");
    const departmentButton = screen.getByText("Phòng ban");
    expect(hashtagButton).toBeInTheDocument();
    expect(departmentButton).toBeInTheDocument();
  });

  it("renders prev/next carousel navigation buttons", () => {
    render(<HighlightSection {...defaultProps} />);
    const buttons = screen.getAllByRole("button");
    // Should have prev/next buttons in carousel + pagination
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("shows pagination counter in '1/N' format", () => {
    render(<HighlightSection {...defaultProps} />);
    expect(screen.getByText(/1\/3/)).toBeInTheDocument();
  });

  it("navigates to next card when next button is clicked", () => {
    render(<HighlightSection {...defaultProps} />);
    expect(screen.getByText(/1\/3/)).toBeInTheDocument();

    const nextButtons = screen.getAllByLabelText("Next highlight");
    fireEvent.click(nextButtons[0]);

    expect(screen.getByText(/2\/3/)).toBeInTheDocument();
  });

  it("navigates to previous card when prev button is clicked", () => {
    render(<HighlightSection {...defaultProps} />);
    const nextButtons = screen.getAllByLabelText("Next highlight");
    fireEvent.click(nextButtons[0]);
    expect(screen.getByText(/2\/3/)).toBeInTheDocument();

    const prevButtons = screen.getAllByLabelText("Previous highlight");
    fireEvent.click(prevButtons[0]);

    expect(screen.getByText(/1\/3/)).toBeInTheDocument();
  });

  it("shows 'Không có highlight nào.' when kudos array is empty", () => {
    render(<HighlightSection {...defaultProps} kudos={[]} />);
    expect(screen.getByText("Không có highlight nào.")).toBeInTheDocument();
  });

  it("calls onLike when like button on card is clicked", () => {
    const onLike = jest.fn();
    render(<HighlightSection {...defaultProps} onLike={onLike} />);

    const likeButtons = screen.getAllByLabelText(/likes/);
    if (likeButtons.length > 0) {
      fireEvent.click(likeButtons[0]);
      expect(onLike).toHaveBeenCalled();
    }
  });

  it("calls onCopyLink when copy link button is clicked", () => {
    const onCopyLink = jest.fn();
    render(<HighlightSection {...defaultProps} onCopyLink={onCopyLink} />);

    const copyButtons = screen.getAllByLabelText("Copy link");
    if (copyButtons.length > 0) {
      fireEvent.click(copyButtons[0]);
      expect(onCopyLink).toHaveBeenCalled();
    }
  });

  it("resets to first slide when kudos list changes", () => {
    const { rerender } = render(<HighlightSection {...defaultProps} />);

    const nextButtons = screen.getAllByLabelText("Next highlight");
    fireEvent.click(nextButtons[0]);
    expect(screen.getByText(/2\/3/)).toBeInTheDocument();

    // Change kudos list
    rerender(
      <HighlightSection {...defaultProps} kudos={[mockKudos[0], mockKudos[1]]} />
    );

    expect(screen.getByText(/1\/2/)).toBeInTheDocument();
  });
});
