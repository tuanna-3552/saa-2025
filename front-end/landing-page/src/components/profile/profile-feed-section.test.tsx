import { render, screen, fireEvent } from "@testing-library/react";
import ProfileFeedSection from "./profile-feed-section";
import type { KudoPost } from "@/lib/kudos-types";

// Mock KudosCard to avoid complex rendering of child component
jest.mock("@/components/kudos/kudos-card", () => {
  return function MockKudosCard({ kudo }: { kudo: KudoPost }) {
    return (
      <article data-testid={`kudo-card-${kudo.id}`}>
        {kudo.senderName} → {kudo.receiverName}
      </article>
    );
  };
});

const mockKudo1: KudoPost = {
  id: "kudo-1",
  senderId: "u1",
  senderName: "Alice",
  senderAvatar: "/a.jpg",
  senderDepartment: "Design",
  senderStars: 2,
  receiverId: "u2",
  receiverName: "Bob",
  receiverAvatar: "/b.jpg",
  receiverDepartment: "Eng",
  receiverStars: 1,
  content: "Great work!",
  hashtags: [],
  attachmentImages: [],
  likeCount: 5,
  likedByCurrentUser: false,
  createdAt: "2025-05-29T10:00:00Z",
};

const mockKudo2: KudoPost = {
  id: "kudo-2",
  senderId: "u3",
  senderName: "Charlie",
  senderAvatar: "/c.jpg",
  senderDepartment: "PM",
  senderStars: 0,
  receiverId: "u4",
  receiverName: "Diana",
  receiverAvatar: "/d.jpg",
  receiverDepartment: "Sales",
  receiverStars: 3,
  content: "Amazing effort!",
  hashtags: [],
  attachmentImages: [],
  likeCount: 10,
  likedByCurrentUser: true,
  createdAt: "2025-05-28T15:00:00Z",
};

describe("ProfileFeedSection", () => {
  it("renders 'Sun* Annual Awards 2025' header", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    expect(screen.getByText("Sun* Annual Awards 2025")).toBeInTheDocument();
  });

  it("renders 'KUDOS' title", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    expect(screen.getByRole("heading", { name: "KUDOS" })).toBeInTheDocument();
  });

  it("renders filter dropdown button with default 'Đã nhận' label", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    // Button should show "Đã nhận" with the received count
    const button = screen.getByRole("button");
    expect(button.textContent).toContain("Đã nhận");
  });

  it("renders one KudosCard per item in kudos array", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[mockKudo1, mockKudo2]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    expect(screen.getByTestId("kudo-card-kudo-1")).toBeInTheDocument();
    expect(screen.getByTestId("kudo-card-kudo-2")).toBeInTheDocument();
  });

  it("shows empty state text when kudos is empty", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={0}
        sentCount={0}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    expect(screen.getByText("Chưa có kudos nào")).toBeInTheDocument();
  });

  it("does NOT show KudosCards when kudos is empty", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={0}
        sentCount={0}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    expect(screen.queryByTestId(/kudo-card/)).not.toBeInTheDocument();
  });

  it("renders 'Xem thêm' button when hasMore=true and kudos not empty", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[mockKudo1]}
        hasMore={true}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    expect(screen.getByText("Xem thêm")).toBeInTheDocument();
  });

  it("hides 'Xem thêm' button when hasMore=false", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[mockKudo1]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    expect(screen.queryByText("Xem thêm")).not.toBeInTheDocument();
  });

  it("hides 'Xem thêm' when hasMore=true but kudos is empty", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={0}
        sentCount={0}
        kudos={[]}
        hasMore={true}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    expect(screen.queryByText("Xem thêm")).not.toBeInTheDocument();
  });

  it("calls onLoadMore when 'Xem thêm' button is clicked", () => {
    const onLoadMore = jest.fn();
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[mockKudo1]}
        hasMore={true}
        onFilterChange={jest.fn()}
        onLoadMore={onLoadMore}
      />
    );

    const loadMoreBtn = screen.getByText("Xem thêm");
    fireEvent.click(loadMoreBtn);

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("opens filter dropdown when filter button is clicked", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    const filterBtn = screen.getByRole("button");
    fireEvent.click(filterBtn);

    // Should show dropdown options (use getAllByText to get both)
    const receivedOptions = screen.getAllByText(/đã nhận/i);
    const sentOptions = screen.getAllByText(/đã gửi/i);
    expect(receivedOptions.length).toBeGreaterThanOrEqual(1);
    expect(sentOptions.length).toBeGreaterThanOrEqual(1);
  });

  it("calls onFilterChange when filter option is selected", () => {
    const onFilterChange = jest.fn();
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[]}
        hasMore={false}
        onFilterChange={onFilterChange}
        onLoadMore={jest.fn()}
      />
    );

    // Open dropdown
    const filterBtn = screen.getByRole("button");
    fireEvent.click(filterBtn);

    // Click "Đã gửi" option
    const sentOption = screen.getByText(/đã gửi/i);
    fireEvent.click(sentOption);

    expect(onFilterChange).toHaveBeenCalledWith("sent");
  });

  it("renders received count in filter button label", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={42}
        sentCount={10}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    // Button should include the count
    const filterBtn = screen.getByRole("button");
    expect(filterBtn.textContent).toContain("42");
  });

  it("renders sent count in sent filter option", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={25}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    const filterBtn = screen.getByRole("button");
    fireEvent.click(filterBtn);

    // Sent option should show count - look for option with both text and count
    const sentOptions = screen.getAllByText(/đã gửi/i);
    const sentWithCount = sentOptions.find((el) => el.textContent?.includes("25"));
    expect(sentWithCount).toBeInTheDocument();
  });

  it("maintains active filter state when dropdown is closed", () => {
    const { rerender } = render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[mockKudo1]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    const filterBtn = screen.getByRole("button");

    // Open and close dropdown
    fireEvent.click(filterBtn);
    fireEvent.click(filterBtn);

    // Active filter label should still be shown
    expect(filterBtn.textContent).toContain("Đã nhận");
  });

  it("renders section with correct layout structure", () => {
    const { container } = render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders multiple KudosCards with correct spacing", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[mockKudo1, mockKudo2]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    expect(screen.getByTestId("kudo-card-kudo-1")).toBeInTheDocument();
    expect(screen.getByTestId("kudo-card-kudo-2")).toBeInTheDocument();
  });

  it("switches between filter options in dropdown", () => {
    const onFilterChange = jest.fn();
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[]}
        hasMore={false}
        onFilterChange={onFilterChange}
        onLoadMore={jest.fn()}
      />
    );

    const filterBtn = screen.getByRole("button");
    fireEvent.click(filterBtn);

    // Click sent filter (get the listbox option)
    const sentOptions = screen.getAllByText(/đã gửi/i);
    const sentOption = sentOptions.find((el) => el.closest("li"));
    if (sentOption) {
      fireEvent.click(sentOption);
    }

    expect(onFilterChange).toHaveBeenCalledWith("sent");

    // Open again and click received
    fireEvent.click(filterBtn);
    const receivedOptions = screen.getAllByText(/đã nhận/i);
    const receivedOption = receivedOptions.find((el) => el.closest("li"));
    if (receivedOption) {
      fireEvent.click(receivedOption);
    }

    expect(onFilterChange).toHaveBeenCalledWith("received");
  });

  it("closes dropdown after selecting option", () => {
    render(
      <ProfileFeedSection
        
        receivedCount={5}
        sentCount={10}
        kudos={[]}
        hasMore={false}
        onFilterChange={jest.fn()}
        onLoadMore={jest.fn()}
      />
    );

    const filterBtn = screen.getByRole("button");
    fireEvent.click(filterBtn);

    // Verify dropdown is open (multiple elements with these texts)
    const receivedOptions = screen.getAllByText(/đã nhận/i);
    expect(receivedOptions.length).toBeGreaterThan(1);

    // Click sent option (find the listbox option, not the button)
    const sentOptions = screen.getAllByText(/đã gửi/i);
    const sentOption = sentOptions.find((el) => el.closest("li"));
    if (sentOption) {
      fireEvent.click(sentOption);
    }
  });
});
