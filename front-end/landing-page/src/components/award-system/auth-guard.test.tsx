import { render, screen, waitFor } from "@testing-library/react";
import AuthGuard from "./auth-guard";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

let mockSession: { user: { id: string } } | null = null;

jest.mock("@/lib/supabase", () => ({
  getSupabase: () => ({
    auth: {
      getSession: jest.fn().mockImplementation(() =>
        Promise.resolve({ data: { session: mockSession } })
      ),
    },
  }),
}));

describe("AuthGuard", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSession = null;
  });

  it("renders Loading... immediately before session resolves", () => {
    mockSession = null;
    render(<AuthGuard><div>protected</div></AuthGuard>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders children when session exists (ID-0)", async () => {
    mockSession = { user: { id: "user-1" } };
    render(<AuthGuard><div>protected content</div></AuthGuard>);
    await waitFor(() => {
      expect(screen.getByText("protected content")).toBeInTheDocument();
    });
  });

  it("redirects to /login when no session (ID-1)", async () => {
    mockSession = null;
    render(<AuthGuard><div>protected content</div></AuthGuard>);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
    expect(screen.queryByText("protected content")).not.toBeInTheDocument();
  });
});
