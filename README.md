# AggieFeed React Native

A simple Expo React Native + TypeScript app that fetches public AggieFeed activity data from UC Davis and displays it in a mobile list/detail flow.

## Features

- Fetches up to 25 public activities from the AggieFeed REST API.
- Displays activity title and actor name in a `FlatList`.
- Navigates to a detail screen for the selected activity.
- Shows loading, error, empty, and retry states.
- Handles missing API fields with readable fallback text.
- Includes pull-to-refresh on the activity list.
- Supports light and dark mode based on the device setting.
- Includes basic unit tests for the AggieFeed API helper.

## Tech Stack

- Expo SDK 54
- React Native
- TypeScript
- React Navigation native stack
- Built-in `fetch` API

## Requirements

- Node.js 20.19.x or newer, matching Expo SDK 54 guidance.
- npm.
- Expo Go on a mobile device, or an iOS/Android simulator.

## Setup

Install dependencies:

```sh
npm install
```

Start the Expo development server:

```sh
npm start
```

Then open the app in Expo Go, an iOS simulator, or an Android emulator.

You can also run platform-specific commands:

```sh
npm run ios
npm run android
npm run web
```

## Verification

Run the TypeScript compiler:

```sh
npm run typecheck
```

Run the unit tests:

```sh
npm test
```

## API

The app fetches data from:

```text
https://aggiefeed.ucdavis.edu/api/v1/activity/public?s=0&l=25
```

The UI uses these fields from each activity:

- `title`
- `actor.displayName`
- `object.objectType`
- `published`

## Assumptions And Tradeoffs

- The app passes the selected normalized activity through React Navigation route params. For a small two-screen assignment, this is simpler than adding global state.
- The TypeScript model includes only the fields this app displays instead of modeling the full AggieFeed response.
- The API response is normalized from `unknown` data before it reaches the UI, which keeps the UI safer without adding a validation library.
- Date formatting uses the built-in `Intl.DateTimeFormat` API instead of a date dependency.

## Known Limitations

- The app depends on the public AggieFeed API being reachable.
- There are no automated tests yet.
- Styling is intentionally simple and focused on readability in both light and dark mode.

## Learning Guide

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for a file-by-file explanation of how the app is organized and what concepts to understand.
