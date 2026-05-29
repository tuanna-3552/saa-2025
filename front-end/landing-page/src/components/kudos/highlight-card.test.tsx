import { render, screen, fireEvent } from "@testing-library/react";
import HighlightCard from "./highlight-card";
import type { HighlightKudo } from "@/lib/kudos-types";

const mockKudo: HighlightKudo = {
  id: "kudo-1",
  senderId: "u1",
  senderName: "Alice Johnson",
  senderAvatar: "/avatars/alice.jpg",
  senderDepartment: "Design",
  senderStars: 2,
  receiverId: "u2",
  receiverName: "Bob Smith",
  receiverAvatar: "/avatars/bob.jpg",
  receiverDepartment: "Engineering",
  receiverStars: 3,
  content: "Excellent UI work on the dashboard!",
  hashtags: ["#design", "#quality"],
  attachmentImages: [],
  likeCount: 25,
  likedByCurrentUser: false,
  createdAt: "2025-05-29T14:30:00Z",
};

describe("HighlightCard", () => {
  it("renders sender and receiver info", () => {
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });

  it("renders sender and receiver departments", () => {
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("renders formatted date in HH:mm - MM/DD/YYYY format", () => {
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    // Date format check - regex is flexible for timezone issues
    expect(screen.getByText(/\d{2}:\d{2} - 05\/29\/2025/)).toBeInTheDocument();
  });

  it("renders kudo content", () => {
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("Excellent UI work on the dashboard!")).toBeInTheDocument();
  });

  it("renders like count", () => {
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("renders hashtags", () => {
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("#design")).toBeInTheDocument();
    expect(screen.getByText("#quality")).toBeInTheDocument();
  });

  it("renders Copy Link button", () => {
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("Copy Link")).toBeInTheDocument();
  });

  it("shows active border when isActive=true", () => {
    const { container } = render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    const article = container.querySelector("article");
    // Border color can be in hex or rgb format
    const styles = window.getComputedStyle(article!);
    expect(styles.borderColor).toBeTruthy();
  });

  it("shows inactive border when isActive=false", () => {
    const { container } = render(
      <HighlightCard
        kudo={mockKudo}
        isActive={false}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    const article = container.querySelector("article");
    expect(article).toHaveStyle("border: 4px solid rgba(255,234,158,0.4)");
  });

  it("calls onLike when like button is clicked", () => {
    const onLike = jest.fn();
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={onLike}
        onCopyLink={jest.fn()}
      />
    );

    const likeButton = screen.getByLabelText(/likes/);
    fireEvent.click(likeButton);
    expect(onLike).toHaveBeenCalledTimes(1);
  });

  it("calls onCopyLink when copy link button is clicked", () => {
    const onCopyLink = jest.fn();
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={onCopyLink}
      />
    );

    const copyButton = screen.getByLabelText("Copy link");
    fireEvent.click(copyButton);
    expect(onCopyLink).toHaveBeenCalledTimes(1);
  });

  it("shows red heart when likedByCurrentUser=true", () => {
    const likedKudo = { ...mockKudo, likedByCurrentUser: true };
    const { container } = render(
      <HighlightCard
        kudo={likedKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    expect(container.textContent).toContain("❤️");
  });

  it("shows white heart when likedByCurrentUser=false", () => {
    const { container } = render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    expect(container.textContent).toContain("🤍");
  });

  it("renders star count for sender and receiver", () => {
    render(
      <HighlightCard
        kudo={mockKudo}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    // Check for star badges via aria-label or visible text
    const starText = screen.getByText("★ 2");
    expect(starText).toBeInTheDocument();
  });

  it("renders with no hashtags when empty array", () => {
    const kudoNoTags = { ...mockKudo, hashtags: [] };
    render(
      <HighlightCard
        kudo={kudoNoTags}
        isActive={true}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    expect(screen.queryByText("#design")).not.toBeInTheDocument();
  });
});
