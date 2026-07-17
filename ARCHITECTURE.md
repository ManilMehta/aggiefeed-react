# AggieFeed Architecture Guide

This guide explains how the project is organized and what you should understand so you can confidently discuss and extend the app.

## Big Picture

The app has one simple data flow:

1. `App.tsx` creates the navigation stack.
2. `ActivityListScreen` loads activities from the AggieFeed API.
3. `fetchActivities()` fetches and normalizes the API response.
4. `ActivityListItem` renders each row in the list.
5. Tapping a row navigates to `ActivityDetailScreen`.
6. `ActivityDetailScreen` displays the selected activity.
7. The shared theme colors keep screens readable in light and dark mode.

```text
App.tsx
  -> ActivityListScreen
    -> fetchActivities
    -> ActivityListItem
      -> ActivityDetailScreen
```

## File Responsibilities

### `App.tsx`

This is the app shell. It creates the React Navigation native stack and registers the two screens:

- `ActivityList`
- `ActivityDetail`

Important concepts:

- `NavigationContainer` owns navigation state.
- `createNativeStackNavigator` creates a mobile-style stack with native back navigation.
- `RootStackParamList` makes screen names and route params type-safe.

### `index.ts`

This is the Expo entry point. It calls `registerRootComponent(App)`, which tells Expo and React Native which component starts the app.

You usually do not need to change this file for a small Expo app.

### `src/types/activity.ts`

This file defines the TypeScript shape the app uses for AggieFeed activities.

The app does not model the entire API response. It only models the fields required by the assignment:

- `id`
- `_id`
- `title`
- `published`
- `actor.displayName`
- `object.objectType`

Important concept:

- Fields are optional because public API data can be incomplete. Optional fields force the UI to handle missing values instead of crashing.

### `src/api/aggieFeed.ts`

This file owns the API URL and the `fetchActivities()` function.

It does three jobs:

- Sends the HTTP request.
- Throws a readable error if the server responds with a failed status.
- Converts the raw JSON response from `unknown` into the app's `Activity` type.

Important concepts:

- `unknown` is safer than `any` because it forces you to check data before using it.
- `Array.isArray(data)` confirms that the API returned a list.
- `normalizeActivity()` extracts only the fields the UI needs.

### `src/api/aggieFeed.test.ts`

This file contains basic unit tests for the API helper.

The tests mock `globalThis.fetch`, which means they do not call the live UC Davis API. They verify:

- Successful API data is normalized.
- Missing nested fields stay optional.
- HTTP error statuses throw useful errors.
- Unexpected response shapes throw useful errors.

Important concept:

- Good tests for data-fetching code usually check both the happy path and failure paths.

### `src/navigation/types.ts`

This file defines the route names and params for the navigation stack.

Current routes:

- `ActivityList`: no params.
- `ActivityDetail`: receives `{ activity: Activity }`.

Important concept:

- Typed route params help TypeScript catch mistakes like navigating to the wrong screen name or forgetting a required param.

### `src/screens/ActivityListScreen.tsx`

This is the main screen.

It owns the screen state:

- `activities`
- `isLoading`
- `isRefreshing`
- `errorMessage`

It renders:

- Loading state while the first request is running.
- Error state with a retry button.
- Empty state if the API returns no activities.
- A `FlatList` when activities are available.

Important concepts:

- `useEffect` runs the first fetch after the screen mounts.
- `useCallback` keeps `loadActivities` stable so it can be safely used by `useEffect`.
- `FlatList` is preferred for lists because it is optimized for many rows.
- `RefreshControl` adds pull-to-refresh.

### `src/screens/ActivityDetailScreen.tsx`

This screen reads the selected activity from `route.params`.

It displays the required detail fields:

- `title`
- `actor.displayName`
- `object.objectType`
- `published`

Important concepts:

- The detail screen does not fetch again because the selected activity was already loaded on the list screen.
- Fallback values like `Unknown actor` make missing fields visible without breaking the UI.

### `src/components/ActivityListItem.tsx`

This component renders one tappable list row.

It receives:

- `activity`
- `onPress`

It also exports two helper functions:

- `getActivityTitle()`
- `getActorName()`

Important concepts:

- Keeping row UI in a component makes the list screen easier to read.
- `Pressable` gives touch feedback and is the standard React Native primitive for tappable UI.
- `accessibilityRole` and `accessibilityLabel` make the row easier for assistive technologies to understand.

### `src/components/ScreenState.tsx`

This component renders reusable full-screen states.

It supports:

- Loading spinner.
- Title.
- Optional message.
- Optional action button.

Important concept:

- Loading, error, and empty screens often share layout. A small reusable component reduces duplication while staying easy to understand.

### `src/utils/formatDate.ts`

This file formats the `published` date for display.

It returns:

- `Unknown date` when no date exists.
- The original string when the date is invalid.
- A localized readable date when the date is valid.

Important concept:

- Utility files are good for small pure functions that do not belong to a screen or component.

### `src/theme/colors.ts`

This file defines the app's light and dark color palettes.

Screens and components call `getColors(useColorScheme())` to choose colors based on the device setting.

Important concept:

- Centralizing colors avoids scattering hard-coded values across the app and makes theme changes easier.

## State Management

This app uses local React state instead of Redux, Zustand, React Query, or context.

That is a good fit here because:

- There is only one API request.
- Only one screen owns the list data.
- The detail screen only needs the selected item.
- The assignment rewards clarity over unnecessary complexity.

## Error Handling Strategy

Errors are handled in the list screen because that is where fetching happens.

The API helper throws errors for:

- Non-success HTTP status codes.
- Unexpected response shape.

The screen catches those errors and turns them into user-visible text plus a retry button.

## TypeScript Strategy

The app uses TypeScript in three important places:

- API data type: `Activity`
- Navigation params: `RootStackParamList`
- Component props: each component declares what it receives

This helps you explain that TypeScript is not just for avoiding typos. It documents the contracts between files.

## Things To Be Ready To Explain

- Why `FlatList` is used instead of mapping inside a `ScrollView`.
- Why `fetchActivities()` returns normalized data instead of raw API JSON.
- Why fields are optional in `Activity`.
- Why passing the selected activity through navigation is reasonable for a small assignment.
- How loading, error, empty, and success states are represented.
- What you would improve next if given more time: tests, richer styling, deeper API validation, or React Query.
- How `npm test` differs from `npm run typecheck`: tests verify behavior, while TypeScript verifies types.
