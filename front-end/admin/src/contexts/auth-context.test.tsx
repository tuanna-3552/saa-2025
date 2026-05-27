import { render, screen, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./auth-context";

// Supabase mock state
const mockUnsubscribe = jest.fn();
let mockAuthStateCallback: ((event: string, session: unknown) => void) | null = null;

const mockGetSession = jest.fn();
const mockSignOut = jest.fn();
const mockSingle = jest.fn();
const mockEq = jest.fn(() => ({ single: mockSingle }));
const mockSelect = jest.fn(() => ({ eq: mockEq }));
const mockFrom = jest.fn(() => ({ select: mockSelect }));

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: () => mockGetSession(),
      signOut: () => mockSignOut(),
      onAuthStateChange: (cb: (event: string, session: unknown) => void) => {
        mockAuthStateCallback = cb;
        return { data: { subscription: { unsubscribe: mockUnsubscribe } } };
      },
    },
    from: (...args: unknown[]) => mockFrom(...args),
  },
}));

function TestConsumer() {
  const { user, profile, loading } = useAuth();
  if (loading) return <div>loading</div>;
  return (
    <div>
      <span data-testid="user">{user ? (user as { id: string }).id : "none"}</span>
      <span data-testid="profile">{profile ? (profile as { full_name: string }).full_name : "none"}</span>
    </div>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  mockAuthStateCallback = null;
  // Re-bind full chain so clearAllMocks() doesn't break implementations
  mockSingle.mockResolvedValue({ data: null });
  mockEq.mockReturnValue({ single: mockSingle });
  mockSelect.mockReturnValue({ eq: mockEq });
  mockFrom.mockReturnValue({ select: mockSelect });
  // Default: no session
  mockGetSession.mockResolvedValue({ data: { session: null } });
});

describe("AuthProvider", () => {
  it("starts in loading state then resolves to no user when no session", async () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByText("loading")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByTestId("user")).toHaveTextContent("none"));
  });

  it("unsubscribes from auth state changes on unmount", async () => {
    const { unmount } = render(<AuthProvider><TestConsumer /></AuthProvider>);
    await waitFor(() => screen.getByTestId("user"));
    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it("fetches profile when session exists", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: "user-1" } } },
    });
    mockSingle.mockResolvedValueOnce({ data: { full_name: "Test Admin" } });

    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await waitFor(() =>
      expect(screen.getByTestId("profile")).toHaveTextContent("Test Admin")
    );
  });

  it("updates state when auth state changes to signed-in", async () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await waitFor(() => screen.getByTestId("user"));

    mockSingle.mockResolvedValueOnce({ data: { full_name: "New User" } });

    act(() => {
      mockAuthStateCallback?.("SIGNED_IN", { user: { id: "user-2" } });
    });

    await waitFor(() =>
      expect(screen.getByTestId("profile")).toHaveTextContent("New User")
    );
  });

  it("clears loading even when fetchProfile rejects (network error)", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: "user-error" } } },
    });
    // Simulate supabase throwing on the profile fetch
    mockSingle.mockRejectedValueOnce(new Error("Network error"));

    render(<AuthProvider><TestConsumer /></AuthProvider>);
    // loading should clear to false via finally block, revealing the consumer
    await waitFor(() => expect(screen.getByTestId("user")).toBeInTheDocument());
    expect(screen.getByTestId("profile")).toHaveTextContent("none");
  });

  it("clears profile on sign-out auth state change", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: "user-1" } } },
    });
    mockSingle.mockResolvedValueOnce({ data: { full_name: "Admin" } });

    render(<AuthProvider><TestConsumer /></AuthProvider>);
    await waitFor(() => screen.getByTestId("profile"));

    act(() => {
      mockAuthStateCallback?.("SIGNED_OUT", null);
    });

    await waitFor(() =>
      expect(screen.getByTestId("profile")).toHaveTextContent("none")
    );
  });
});

describe("useAuth", () => {
  it("throws when used outside AuthProvider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useAuth must be used within AuthProvider"
    );
    consoleError.mockRestore();
  });
});
