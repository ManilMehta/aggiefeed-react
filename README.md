# AggieFeed React Native

A small Expo React Native + TypeScript app that fetches public UC Davis AggieFeed activity data and displays it in a mobile list/detail flow.

## What The App Does

- Fetches up to 25 public AggieFeed activities.
- Shows activity titles and actor names in a scrollable list.
- Opens a detail screen when an activity is tapped.
- Displays each selected activity's title, actor, object type, and published date.
- Handles loading, error, empty, retry, and pull-to-refresh states.
- Supports light and dark mode based on the device setting.

## Tech Stack

- Expo SDK 54
- React Native
- TypeScript
- React Navigation native stack
- Node's built-in test runner for basic unit tests

## Before You Start

Install these on your computer:

- Node.js 20.19.x or newer
- npm, which comes with Node.js
- Git

To run the app on your phone:

- Install Expo Go from the iOS App Store or Google Play Store.
- Make sure your phone and computer are on the same Wi-Fi network.

To run the app in a simulator:

- For iOS: install Xcode on macOS.
- For Android: install Android Studio and create an Android emulator.

## Step-By-Step Setup

### 1. Clone The Repository

```sh
git clone https://github.com/ManilMehta/aggiefeed-react.git
```

### 2. Move Into The Project Folder

```sh
cd aggiefeed-react
```

### 3. Install Dependencies

```sh
npm install
```

This installs Expo, React Native, React Navigation, TypeScript, and the other packages needed by the app.

### 4. Start The Expo Development Server

```sh
npm start
```

Expo will print a QR code and a list of keyboard shortcuts in your terminal.

### 5. Open The App On Your Device

For iPhone:

1. Open the Camera app.
2. Scan the QR code from the terminal.
3. Tap the Expo Go link that appears.

For Android:

1. Open Expo Go.
2. Tap the option to scan a QR code.
3. Scan the QR code from the terminal.

### 6. Or Open The App In A Simulator

If the Expo server is already running, use one of these shortcuts from the terminal:

- Press `i` to open the iOS simulator.
- Press `a` to open the Android emulator.
- Press `w` to open the web version.

You can also run platform-specific commands directly:

```sh
npm run ios
npm run android
npm run web
```

## How To Use The App

1. Launch the app.
2. Wait for the AggieFeed activity list to load.
3. Pull down on the list to refresh.
4. Tap an activity row to open its detail screen.
5. Use the normal mobile back button/header back button to return to the list.

## Verification Commands

Run the TypeScript compiler:

```sh
npm run typecheck
```

Run the unit tests:

```sh
npm test
```

## API Used

The app fetches data from:

```text
https://aggiefeed.ucdavis.edu/api/v1/activity/public?s=0&l=25
```

The app displays these fields:

- `title`
- `actor.displayName`
- `object.objectType`
- `published`

## Troubleshooting

If `npm install` fails:

- Confirm Node.js is installed with `node -v`.
- Confirm npm is installed with `npm -v`.
- Delete `node_modules` and run `npm install` again.

If Expo Go cannot connect:

- Make sure your phone and computer are on the same Wi-Fi network.
- Restart the Expo server with `npm start`.
- Try choosing tunnel mode from the Expo terminal options if your network blocks local connections.

If the activity list does not load:

- Confirm your device or simulator has internet access.
- The app depends on the public AggieFeed API being reachable.

## Project Notes

- The selected activity is passed through React Navigation route params because this is a small two-screen app.
- The TypeScript model includes only the API fields used by the UI.
- The API response is normalized from `unknown` data before it reaches the screens.
- Date formatting uses the built-in `Intl.DateTimeFormat` API instead of a date dependency.

## Learning Guide

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for a file-by-file explanation of how the app is organized and what concepts to understand.
