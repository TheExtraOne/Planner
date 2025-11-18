# Current Functionality

## 1. State Management (Redux Toolkit)

Redux Toolkit store configured in `src/stores/app.store.ts`.

**Store Structure:**

```typescript
{
  theme: ThemeState; // Theme-related state (theme mode, isDarkMode)
}
```

**Files:**

- `src/stores/app.store.ts` - Store configuration
- `src/stores/theme.store.ts` - Theme slice
- `src/main.tsx` - Store provider setup

**Types:** `RootState`, `AppStore`, `AppDispatch`

---

## 2. Theme Toggle

Light/dark theme toggle with localStorage persistence and system preference detection.

**How It Works:**

1. Initial theme: Checks localStorage → falls back to system preference → defaults to light
2. State: Redux slice (`setTheme` action) saves to localStorage automatically
3. Application: `useThemeEffect` hook applies theme classes to HTML root
4. UI: Settings dropdown with `Toggle` component

**Files:**

- `src/stores/theme.store.ts` - Theme Redux slice
- `src/utils/theme.helpers.ts` - Theme utilities
- `src/hooks/useThemeEffect.ts` - Theme effect hook
- `src/components/dropdown/SettingsDropdown.tsx` - Theme toggle UI

**localStorage Key:** `taskflow-theme`

---

## 3. React Router Navigation

React Router v6 with nested routes, authentication guards, and lazy loading.

**Routes:**

- Public: `/login`, `/register`
- Protected (Layout wrapper): `/dashboard`, `/categories`, `/profile`
- Root `/` redirects based on authentication
- Fallback `*` for 404

**Lazy Loaded:** `CategoriesPage`, `ProfilePage`, `NotFound`

**Files:**

- `src/App.tsx` - Router configuration
- `src/components/navigation/Navigation.tsx` - Navigation links with active state
- `src/components/layout/Layout.tsx` - Protected routes wrapper
- `src/constants.ts` - Route constants

**Note:** Authentication is currently mocked (`isAuthenticated = true`)
