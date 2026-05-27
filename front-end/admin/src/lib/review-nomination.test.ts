import { reviewNomination } from "./review-nomination";

const mockEq = jest.fn().mockResolvedValue({ error: null });
const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
const mockFrom = jest.fn().mockReturnValue({ update: mockUpdate });

jest.mock("@/lib/supabase", () => ({
  supabase: { from: (...args: unknown[]) => mockFrom(...args) },
}));

beforeEach(() => {
  jest.clearAllMocks();
  // Re-bind full chain so clearAllMocks() doesn't break implementations
  mockEq.mockResolvedValue({ error: null });
  mockUpdate.mockReturnValue({ eq: mockEq });
  mockFrom.mockReturnValue({ update: mockUpdate });
});

describe("reviewNomination", () => {
  it("calls supabase update with approved status and returns no error", async () => {
    const result = await reviewNomination("nom-1", "approved", "reviewer-1");

    expect(mockFrom).toHaveBeenCalledWith("nominations");
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ status: "approved", reviewed_by: "reviewer-1" })
    );
    expect(mockEq).toHaveBeenCalledWith("id", "nom-1");
    expect(result).toEqual({ error: null });
  });

  it("calls supabase update with rejected status", async () => {
    await reviewNomination("nom-2", "rejected", "reviewer-1");
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ status: "rejected" })
    );
  });

  it("returns error message when supabase fails", async () => {
    mockEq.mockResolvedValueOnce({ error: { message: "DB error" } });

    const result = await reviewNomination("nom-3", "approved", "reviewer-1");
    expect(result).toEqual({ error: "DB error" });
  });
});
