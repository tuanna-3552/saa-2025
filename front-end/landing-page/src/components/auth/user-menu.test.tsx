import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserMenu from "./user-menu";

const mockSignOut = jest.fn().mockResolvedValue({});
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Supabase mock — controlled per test via mockSession / mockProfile
let mockSession: { user: { id: string } } | null = null;
let mockProfile: { role: string } | null = null;

jest.mock("@/lib/supabase", () => ({
  getSupabase: () => ({
    auth: {
      getSession: jest.fn().mockImplementation(() =>
        Promise.resolve({ data: { session: mockSession } })
      ),
      signOut: mockSignOut,
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: mockProfile }),
        }),
      }),
    }),
  }),
}));

function setUnauthenticated() {
  mockSession = null;
  mockProfile = null;
}

function setEmployee() {
  mockSession = { user: { id: "user-1" } };
  mockProfile = { role: "employee" };
}

function setAdmin() {
  mockSession = { user: { id: "admin-1" } };
  mockProfile = { role: "admin" };
}

describe("UserMenu", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSignOut.mockClear();
  });

  it("renders nothing when no session (ID-0)", async () => {
    setUnauthenticated();
    const { container } = render(<UserMenu />);
    // After async fetch resolves, nothing should be rendered
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  it("renders bell + account icon when session exists (ID-1)", async () => {
    setEmployee();
    render(<UserMenu />);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /thông báo/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /tài khoản/i })).toBeInTheDocument();
    });
  });

  it("account menu: employee does not show Admin Dashboard (ID-38)", async () => {
    setEmployee();
    const user = userEvent.setup();
    render(<UserMenu />);
    await waitFor(() => screen.getByRole("button", { name: /tài khoản/i }));
    await user.click(screen.getByRole("button", { name: /tài khoản/i }));
    expect(screen.queryByText(/admin dashboard/i)).not.toBeInTheDocument();
  });

  it("account menu: admin shows Admin Dashboard (ID-37)", async () => {
    setAdmin();
    const user = userEvent.setup();
    render(<UserMenu />);
    await waitFor(() => screen.getByRole("button", { name: /tài khoản/i }));
    await user.click(screen.getByRole("button", { name: /tài khoản/i }));
    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
  });

  it("sign out calls supabase.auth.signOut and redirects to /login (ID-36)", async () => {
    setEmployee();
    const user = userEvent.setup();
    render(<UserMenu />);
    await waitFor(() => screen.getByRole("button", { name: /tài khoản/i }));
    await user.click(screen.getByRole("button", { name: /tài khoản/i }));
    await user.click(screen.getByRole("button", { name: /đăng xuất/i }));
    expect(mockSignOut).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
