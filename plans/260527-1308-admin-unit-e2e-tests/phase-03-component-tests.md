# Phase 03: Component Tests

**Status:** completed

## Files to create

### `src/components/nominations/nomination-status-badge.test.tsx`
- renders "Mới tạo" with grey styling for status=pending
- renders "Public" with blue styling for status=approved
- renders "Spam" with yellow styling for status=rejected
- applies custom className

### `src/components/auth/login-form.test.tsx`
Mock: `@/lib/supabase`, `next/navigation`
- renders email + password fields + submit button
- toggles password visibility on eye button click
- shows error alert when supabase signIn returns error
- shows "Access denied" when profile.role !== "admin"
- redirects to /dashboard on successful admin login
- disables button while loading

### `src/contexts/auth-context.test.tsx`
Mock: `@/lib/supabase`
- throws when useAuth used outside AuthProvider
- provides user=null and loading=true on initial render
- fetches profile after session is established
- signOut calls supabase.auth.signOut
