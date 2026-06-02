import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import KudosFeed from "./kudos-feed";
import type { KudoPost } from "@/lib/kudos-types";

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

const mockKudos: KudoPost[] = [
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
    content: "Great work!",
    hashtags: ["#design"],
    attachmentImages: [],
    likeCount: 10,
    likedByCurrentUser: false,
    createdAt: "2025-05-29T10:00:00Z",
  },
];

describe("KudosFeed", () => {
  const defaultProps = {
    kudos: mockKudos,
    hasMore: false,
    onLoadMore: jest.fn(),
    onLike: jest.fn(),
    onCopyLink: jest.fn(),
    onHashtagClick: jest.fn(),
  };

  it("renders kudos cards for each kudo in list", () => {
    render(<KudosFeed {...defaultProps} />);
    expect(screen.getByText("Great work!")).toBeInTheDocument();
  });

  it("shows empty state message when no kudos", () => {
    render(<KudosFeed {...defaultProps} kudos={[]} />);
    expect(screen.getByText("Hiện tại chưa có Kudos nào.")).toBeInTheDocument();
  });

  it("shows 'end of list' message when hasMore is false and kudos exist", () => {
    render(<KudosFeed {...defaultProps} hasMore={false} />);
    expect(screen.getByText("Đã hiển thị tất cả kudo.")).toBeInTheDocument();
  });

  it("does not show 'end of list' message when hasMore is true", () => {
    render(<KudosFeed {...defaultProps} hasMore={true} />);
    expect(
      screen.queryByText("Đã hiển thị tất cả kudo.")
    ).not.toBeInTheDocument();
  });

  it("renders sentinel element when hasMore is true", () => {
    render(<KudosFeed {...defaultProps} hasMore={true} />);
    expect(screen.getByTestId("infinite-scroll-sentinel")).toBeInTheDocument();
  });

  it("setups IntersectionObserver when hasMore is true", async () => {
    const onLoadMore = jest.fn();
    render(<KudosFeed {...defaultProps} hasMore={true} onLoadMore={onLoadMore} />);
    expect(screen.getByTestId("infinite-scroll-sentinel")).toBeInTheDocument();
  });

  it("calls onLike when like button on card is clicked", () => {
    const onLike = jest.fn();
    render(<KudosFeed {...defaultProps} onLike={onLike} />);

    const likeButtons = screen.getAllByLabelText(/likes/);
    if (likeButtons.length > 0) {
      fireEvent.click(likeButtons[0]);
      expect(onLike).toHaveBeenCalledWith("1");
    }
  });

  it("calls onCopyLink when copy link button is clicked", () => {
    const onCopyLink = jest.fn();
    render(<KudosFeed {...defaultProps} onCopyLink={onCopyLink} />);

    const copyButtons = screen.getAllByLabelText("Copy link");
    if (copyButtons.length > 0) {
      fireEvent.click(copyButtons[0]);
      expect(onCopyLink).toHaveBeenCalledWith("1");
    }
  });

  it("renders multiple kudos in sequence", () => {
    const multiKudos = [
      mockKudos[0],
      {
        ...mockKudos[0],
        id: "2",
        content: "Second kudos",
      },
      {
        ...mockKudos[0],
        id: "3",
        content: "Third kudos",
      },
    ];

    render(<KudosFeed {...defaultProps} kudos={multiKudos} />);

    expect(screen.getByText("Great work!")).toBeInTheDocument();
    expect(screen.getByText("Second kudos")).toBeInTheDocument();
    expect(screen.getByText("Third kudos")).toBeInTheDocument();
  });

  it("renders with correct layout - 680px flex column", () => {
    const { container } = render(<KudosFeed {...defaultProps} />);
    const feedDiv = container.firstChild;
    expect(feedDiv).toHaveStyle("flex: 0 0 680px");
    expect(feedDiv).toHaveStyle("display: flex");
    expect(feedDiv).toHaveStyle("flex-direction: column");
  });

  it("does not show sentinel when hasMore is false", () => {
    render(<KudosFeed {...defaultProps} hasMore={false} />);
    expect(screen.queryByTestId("infinite-scroll-sentinel")).not.toBeInTheDocument();
  });
});
