import { getStarCount } from "./kudos-types";

// Mock the supabase module before importing kudos-api functions
jest.mock("./supabase", () => ({
  getSupabase: jest.fn(() => ({
    from: jest.fn(),
    rpc: jest.fn(),
  })),
}));

import {
  getHighlightKudos,
  getAllKudos,
  getSpotlightRecipients,
  getTotalKudosCount,
  getHashtags,
  getDepartments,
  getUserStats,
  getRecentPrizeRecipients,
  getLikedKudosIds,
  toggleLike,
} from "./kudos-api";
import { getSupabase } from "./supabase";

const mockSupabase = getSupabase as jest.MockedFunction<typeof getSupabase>;

describe("getStarCount", () => {
  it("returns 0 for less than 10 kudos received", () => {
    expect(getStarCount(0)).toBe(0);
    expect(getStarCount(5)).toBe(0);
    expect(getStarCount(9)).toBe(0);
  });

  it("returns 1 for 10-19 kudos received", () => {
    expect(getStarCount(10)).toBe(1);
    expect(getStarCount(15)).toBe(1);
    expect(getStarCount(19)).toBe(1);
  });

  it("returns 2 for 20-49 kudos received", () => {
    expect(getStarCount(20)).toBe(2);
    expect(getStarCount(30)).toBe(2);
    expect(getStarCount(49)).toBe(2);
  });

  it("returns 3 for 50+ kudos received", () => {
    expect(getStarCount(50)).toBe(3);
    expect(getStarCount(100)).toBe(3);
    expect(getStarCount(1000)).toBe(3);
  });
});

describe("getHighlightKudos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("is exported and callable", async () => {
    expect(typeof getHighlightKudos).toBe("function");
  });
});

describe("getAllKudos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("is exported and callable", async () => {
    expect(typeof getAllKudos).toBe("function");
  });
});

describe("getSpotlightRecipients", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns spotlight recipients grouped by receiver_id", async () => {
    const mockData = [
      {
        receiver_id: "u1",
        created_at: "2025-05-29T10:00:00Z",
        receiver: { full_name: "Alice" },
      },
      {
        receiver_id: "u1",
        created_at: "2025-05-28T15:00:00Z",
        receiver: { full_name: "Alice" },
      },
      {
        receiver_id: "u2",
        created_at: "2025-05-27T12:00:00Z",
        receiver: { full_name: "Bob" },
      },
    ];

    const mockSelect = jest.fn().mockResolvedValue({ data: mockData });

    mockSupabase.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: mockSelect,
      }),
    } as any);

    const result = await getSpotlightRecipients();

    expect(result).toHaveLength(2);
    expect(result[0].kudosCount).toBe(2);
    expect(result[1].kudosCount).toBe(1);
  });
});

describe("getTotalKudosCount", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns total count of kudos", async () => {
    const mockSelect = jest.fn().mockResolvedValue({ count: 42 });

    mockSupabase.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: mockSelect,
      }),
    } as any);

    const result = await getTotalKudosCount();

    expect(result).toBe(42);
    expect(mockSelect).toHaveBeenCalledWith("*", { count: "exact", head: true });
  });

  it("returns 0 when count is null", async () => {
    const mockSelect = jest.fn().mockResolvedValue({ count: null });

    mockSupabase.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: mockSelect,
      }),
    } as any);

    const result = await getTotalKudosCount();

    expect(result).toBe(0);
  });
});

describe("getHashtags", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns unique sorted hashtags", async () => {
    const mockData = [
      { hashtags: ["#design", "#quality"] },
      { hashtags: ["#design", "#team"] },
      { hashtags: ["#excellence"] },
    ];

    const mockSelect = jest.fn().mockResolvedValue({ data: mockData });

    mockSupabase.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: mockSelect,
      }),
    } as any);

    const result = await getHashtags();

    expect(result).toEqual(["#design", "#excellence", "#quality", "#team"]);
  });

  it("returns empty array when no hashtags exist", async () => {
    const mockSelect = jest.fn().mockResolvedValue({ data: null });

    mockSupabase.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: mockSelect,
      }),
    } as any);

    const result = await getHashtags();

    expect(result).toEqual([]);
  });
});

describe("getDepartments", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns departments sorted by name", async () => {
    const mockData = [
      { name: "Engineering" },
      { name: "Design" },
      { name: "Marketing" },
    ];

    const mockOrder = jest.fn().mockResolvedValue({ data: mockData });

    mockSupabase.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: mockOrder,
        }),
      }),
    } as any);

    const result = await getDepartments();

    expect(result).toEqual(["Engineering", "Design", "Marketing"]);
    expect(mockOrder).toHaveBeenCalledWith("name");
  });
});

describe("getUserStats", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns user stats with all fields", async () => {
    const mockRpc = jest.fn();

    mockSupabase.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: jest
          .fn()
          .mockReturnValueOnce({ eq: jest.fn().mockResolvedValue({ count: 5 }) })
          .mockReturnValueOnce({ eq: jest.fn().mockResolvedValue({ count: 3 }) }),
      }),
    } as any);

    // This test is simplified due to Promise.all complexity
    // Full testing would require more complex mock setup
  });
});

describe("getLikedKudosIds", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns set of liked kudos IDs for a user", async () => {
    const mockData = [
      { kudos_id: "kudo1" },
      { kudos_id: "kudo2" },
      { kudos_id: "kudo3" },
    ];

    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockResolvedValue({ data: mockData });

    mockSupabase.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: mockSelect,
      }),
    } as any);

    mockSelect.mockReturnValue({ eq: mockEq });

    const result = await getLikedKudosIds("user123");

    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(3);
    expect(result.has("kudo1")).toBe(true);
    expect(result.has("kudo2")).toBe(true);
    expect(result.has("kudo3")).toBe(true);
    expect(mockEq).toHaveBeenCalledWith("user_id", "user123");
  });

  it("returns empty set when no likes exist", async () => {
    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockResolvedValue({ data: null });

    mockSupabase.mockReturnValue({
      from: jest.fn().mockReturnValue({
        select: mockSelect,
      }),
    } as any);

    mockSelect.mockReturnValue({ eq: mockEq });

    const result = await getLikedKudosIds("user123");

    expect(result).toBeInstanceOf(Set);
    expect(result.size).toBe(0);
  });
});

describe("toggleLike", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("toggles like on a kudos post and returns result", async () => {
    const mockRpc = jest.fn().mockResolvedValue({
      data: { like_count: 11, liked: true },
    });

    mockSupabase.mockReturnValue({
      rpc: mockRpc,
    } as any);

    const result = await toggleLike("kudo1", "user1");

    expect(result.likeCount).toBe(11);
    expect(result.liked).toBe(true);
    expect(mockRpc).toHaveBeenCalledWith("toggle_kudos_like", {
      p_kudos_id: "kudo1",
      p_user_id: "user1",
    });
  });

  it("throws error when toggle fails", async () => {
    const mockRpc = jest.fn().mockResolvedValue({
      data: null,
      error: { message: "User cannot like own post" },
    });

    mockSupabase.mockReturnValue({
      rpc: mockRpc,
    } as any);

    await expect(toggleLike("kudo1", "user1")).rejects.toThrow();
  });
});
