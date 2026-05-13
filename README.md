# Namma Shaale

Namma Shaale is a mobile-first school asset management app built from the provided Stitch UI design bundle. It runs as:

- a local web app at `app/src/main/assets/index.html`
- an Android Studio project through a native Kotlin `WebView` host

## Implemented Screens

- Splash, onboarding, login, and OTP verification
- Home dashboard with quick actions, summary cards, audit progress, and recent activity
- Asset inventory list with search and status filters
- Asset details with maintenance history and status actions
- Add asset form with local in-memory persistence through `localStorage`
- Monthly health check/audit workflow
- Repair request workflow with SDMC approval status
- Reports and insights
- Notifications
- Profile and settings, including dark mode

## Run In Android Studio

1. Open this folder in Android Studio.
2. Let Gradle sync the project.
3. Run the `app` configuration on an emulator or Android device.

The UI is packaged offline in `app/src/main/assets`, so the app does not need a backend to demonstrate the complete flow.

## Run As Web

Open `app/src/main/assets/index.html` in a browser. The same UI and navigation logic is used by the Android app.
