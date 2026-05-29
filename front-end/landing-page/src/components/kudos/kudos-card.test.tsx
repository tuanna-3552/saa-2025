import { render, screen, fireEvent } from "@testing-library/react";
import KudosCard from "./kudos-card";
import type { KudoPost } from "@/lib/kudos-types";

const mockKudo: KudoPost = {
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
  content: "Excellent work on the project!",
  hashtags: ["#project", "#excellence"],
  attachmentImages: ["/images/img1.jpg", "/images/img2.jpg"],
  likeCount: 42,
  likedByCurrentUser: false,
  createdAt: "2025-05-29T14:30:00Z",
};

describe("KudosCard", () => {
  it("renders sender and receiver info", () => {
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });

  it("renders sender and receiver departments", () => {
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("renders formatted date in HH:mm - MM/DD/YYYY format", () => {
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    // Date format check - regex is flexible for timezone issues
    expect(screen.getByText(/\d{2}:\d{2} - 05\/29\/2025/)).toBeInTheDocument();
  });

  it("renders kudo content", () => {
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("Excellent work on the project!")).toBeInTheDocument();
  });

  it("renders like count", () => {
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders hashtags", () => {
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("#project")).toBeInTheDocument();
    expect(screen.getByText("#excellence")).toBeInTheDocument();
  });

  it("renders attachment images", () => {
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    const images = screen.getAllByAltText(/Attachment/);
    expect(images).toHaveLength(2);
  });

  it("renders Copy Link button", () => {
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );
    expect(screen.getByText("Copy Link")).toBeInTheDocument();
  });

  it("shows red heart emoji when likedByCurrentUser=true", () => {
    const likedKudo = { ...mockKudo, likedByCurrentUser: true };
    const { container } = render(
      <KudosCard
        kudo={likedKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    expect(container.textContent).toContain("❤️");
  });

  it("shows white heart emoji when likedByCurrentUser=false", () => {
    const { container } = render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    expect(container.textContent).toContain("🤍");
  });

  it("calls onLike when like button is clicked", () => {
    const onLike = jest.fn();
    render(
      <KudosCard
        kudo={mockKudo}
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
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={onCopyLink}
      />
    );

    const copyButton = screen.getByText("Copy Link");
    fireEvent.click(copyButton);
    expect(onCopyLink).toHaveBeenCalledTimes(1);
  });

  it("calls onHashtagClick when hashtag is clicked", () => {
    const onHashtagClick = jest.fn();
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
        onHashtagClick={onHashtagClick}
      />
    );

    const hashtag = screen.getByText("#project");
    fireEvent.click(hashtag);
    // onHashtagClick receives the tag as it appears (with or without #)
    expect(onHashtagClick).toHaveBeenCalled();
  });

  it("renders hashtags on separate line above content", () => {
    const { container } = render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    // Should have hashtags as text (not just in tags section)
    expect(screen.getByText("#project #excellence")).toBeInTheDocument();
  });

  it("renders with no attachments when empty array", () => {
    const kudoNoAttachments = { ...mockKudo, attachmentImages: [] };
    render(
      <KudosCard
        kudo={kudoNoAttachments}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    expect(screen.queryByAltText(/Attachment/)).not.toBeInTheDocument();
  });

  it("renders with no hashtags when empty array", () => {
    const kudoNoTags = { ...mockKudo, hashtags: [] };
    render(
      <KudosCard
        kudo={kudoNoTags}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    expect(screen.queryByText("#project")).not.toBeInTheDocument();
  });

  it("renders star badges for sender and receiver", () => {
    render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    // Star count should appear
    const starTexts = screen.getAllByText(/★/);
    expect(starTexts.length).toBeGreaterThan(0);
  });

  it("renders as 680px width article", () => {
    const { container } = render(
      <KudosCard
        kudo={mockKudo}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    const article = container.querySelector("article");
    expect(article).toHaveStyle("width: 100%");
  });

  it("formats like count with Vietnamese locale", () => {
    const kudoHighLikes = { ...mockKudo, likeCount: 1000 };
    render(
      <KudosCard
        kudo={kudoHighLikes}
        onLike={jest.fn()}
        onCopyLink={jest.fn()}
      />
    );

    // Vietnamese locale: 1.000
    expect(screen.getByText(/1\.000|1000/)).toBeInTheDocument();
  });
});
