# Audio Transcript Player

A React Native application that plays audio while highlighting the corresponding transcript text. This app supports multiple speakers and features playback controls including play/pause, forward, and rewind functionality.

## Features

- Play/pause audio playback
- Navigate between phrases (forward/rewind)
- Highlight current phrase during playback
- Support for multiple speakers
- Synchronized transcript display

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native CLI
- Expo CLI (for development)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd BasicAudioPlayer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Install required dependencies for the project:

```bash
npx expo install expo-av @reduxjs/toolkit react-redux react-native-vector-icons react-native-sound-player
```

## Running the Application

### iOS Version

1. Install iOS dependencies:

```bash
cd ios
pod install
cd ..
```

2. Run the iOS version:

```bash
npm run ios
# or
yarn ios
```

### Android Version

1. Ensure you have Android Studio and an Android emulator set up

2. Run the Android version:

```bash
npm run android
# or
yarn android
```

## Usage

1. Place your audio file in the assets directory
2. Update the audio file path in `App.tsx`
3. Place your transcript JSON file in the assets directory
4. Update the transcript file path in `App.tsx`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
