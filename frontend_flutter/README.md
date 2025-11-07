# Food Information App - Flutter Frontend

Flutter cross-platform application for searching foods and viewing detailed nutritional information from the USDA FoodData Central API.

## 📱 Platform Support

**Primary Target: Mobile**

- ✅ iOS (iPhone, iPad)
- ✅ Android (phones, tablets)

**Also Runs On:**

- ✅ Web (Chrome, Safari, Firefox)
- ✅ macOS (desktop app)
- ✅ Windows (desktop app)
- ✅ Linux (desktop app)

## 🚀 Features

- **Food Search**: Real-time search with pagination (20 results per page)
- **Nutritional Details**: View calories, protein, carbs, fat, and fiber
- **Material Design**: Clean, modern UI optimized for mobile
- **Error Handling**: Comprehensive error messages with retry functionality
- **Loading States**: Visual feedback during API calls
- **Pagination**: Previous/Next controls with page indicators
- **Responsive Layout**: Adapts to different screen sizes
- **Cross-Platform**: Single codebase runs on 6 platforms

## 📋 Prerequisites

### Required

- **Flutter SDK**: 3.9.2 or higher
- **Dart**: 3.0.0 or higher
- **Backend API**: Flask server running on `http://localhost:8000`

## 🔧 Installation

### 1. Install Flutter

Follow instructions on https://docs.flutter.dev/install/with-vs-code

### 2. Install Dependencies

```bash
cd frontend_flutter
flutter pub get
```

## 🏃 Running the App

### On iOS Simulator (Mac only)

```bash
# Open iOS Simulator
open -a Simulator

# Run the app
flutter run -d "iPhone"
```

### On Android Emulator

```bash
# Start emulator from Android Studio
# Or from command line:
emulator -avd Pixel_7_API_34

# Run the app
flutter run -d "emulator-5554"
```

### On Web (Chrome)

```bash
flutter run -d chrome
```

### On macOS (Desktop App)

```bash
flutter run -d macos
```

### On Windows (Desktop App)

```bash
flutter run -d windows
```

### On Physical Device

**iOS (requires Mac + Apple Developer account):**

```bash
# Connect iPhone via USB
flutter devices  # Find device ID
flutter run -d [DEVICE_ID]
```

**Android:**

```bash
# Enable Developer Mode on Android device
# Enable USB Debugging
# Connect via USB
flutter devices  # Find device ID
flutter run -d [DEVICE_ID]
```

## 🏗️ Project Structure

```
lib/
├── main.dart                       # App entry point and theme configuration
├── models/                         # Data models
│   ├── food.dart                   # Food search result model
│   └── food_detail.dart            # Detailed food + nutrients model
├── services/                       # Business logic and API integration
│   └── api_service.dart            # HTTP client for backend API
├── screens/                        # Full-page screens
│   ├── search_screen.dart          # Search page with results and pagination
│   └── food_detail_screen.dart     # Detailed nutrition information page
└── widgets/                        # Reusable UI components
    ├── search_bar_widget.dart      # Search input with submit button
    ├── food_card.dart              # Individual food item card
    ├── loading_widget.dart         # Loading spinner with message
    └── error_widget.dart           # Error display with retry button

macos/
├── Runner/
│   ├── DebugProfile.entitlements   # Network permissions for debug
│   └── Release.entitlements        # Network permissions for release

pubspec.yaml                        # Dependencies and project configuration
```

## 🔌 Backend Configuration

### Default Configuration (Localhost)

The app connects to `http://127.0.0.1:8000/api` by default.

**Make sure the Flask backend is running:**

```bash
cd ../backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python3 main.py
```

### Physical Device Configuration

If testing on a physical device, update the API URL:

**1. Find your computer's IP address:**

```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

**2. Update `lib/services/api_service.dart`:**

```dart
class ApiService {
  // Change from:
  static const String baseUrl = 'http://127.0.0.1:8000/api';

  // To (replace with YOUR IP):
  static const String baseUrl = 'http://192.168.1.XXX:8000/api';
}
```

## 🧪 Testing the App

### Manual Testing Checklist

**Search Functionality:**

- [ ] Search for "banana" - should return ~150 results
- [ ] Search for "chicken" - should return many results
- [ ] Search for "asdfghjkl" - should show empty state
- [ ] Search with empty input - button should be disabled

**Pagination:**

- [ ] Click "Next" button - should load page 2
- [ ] Click "Previous" button - should go back to page 1
- [ ] Previous button disabled on page 1
- [ ] Next button disabled on last page
- [ ] Page indicator shows current page

**Food Detail:**

- [ ] Click on a food item - should navigate to detail page
- [ ] Nutrients table displays correctly
- [ ] "Back to Search" button returns to results
- [ ] FDC ID shown at bottom

**Error Handling:**

- [ ] Stop backend server - should show error message
- [ ] Click "Try Again" button - should retry
- [ ] Backend not running - clear error message

**Loading States:**

- [ ] Spinner shows during search
- [ ] "Searching..." message appears
- [ ] Spinner shows when loading detail page

## 🐛 Troubleshooting

### "Failed to connect to backend"

**Check:**

1. Backend is running: `curl http://127.0.0.1:8000/health`
2. CORS is configured correctly
3. Using `127.0.0.1` instead of `localhost` (especially on macOS)
4. Firewall isn't blocking connections

**macOS specific:** Make sure entitlements include network permissions:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

### "No devices available"

```bash
# Check available devices
flutter devices

# iOS: Start simulator
open -a Simulator

# Android: Start emulator from Android Studio
```

### "Package not found" or dependency errors

```bash
flutter clean
flutter pub get
flutter run
```

### Hot reload not working

```bash
# Press 'r' in terminal for hot reload
# Press 'R' for hot restart
# Press 'q' to quit
```

### iOS Simulator not showing

1. Open Xcode
2. Preferences → Components
3. Download iOS Simulator

### macOS app can't connect to localhost

Change API URL from `localhost` to `127.0.0.1` in `lib/services/api_service.dart`

## 📊 Tech Stack

- **Framework**: Flutter 3.16+
- **Language**: Dart 3.0+
- **UI**: Material Design 3
- **HTTP Client**: `http` package (^1.1.0)
- **State Management**: StatefulWidget with setState
- **Navigation**: Flutter Navigator 2.0
- **Backend**: Flask REST API

## 👤 Author

**Linh Fowler**

- Email: htlinhvu@gmail.com
- Phone: (470) 363-3397
- GitHub: [YOUR_GITHUB_USERNAME]
- LinkedIn: [linkedin.com/in/htlinhvu](https://linkedin.com/in/htlinhvu)

## 🙏 Acknowledgments

- **USDA FoodData Central**: Food and nutrition data API
- **Flutter Team**: Excellent documentation and framework
- **Primefocus Health**: Assessment opportunity

---

## Quick Start Summary

```bash
# 1. Install Flutter
https://docs.flutter.dev/install/with-vs-code

# 2. Check installation
flutter doctor

# 3. Get dependencies
cd frontend_flutter
flutter pub get

# 4. Start backend (separate terminal)
cd ../backend
source venv/bin/activate
python main.py

# 5. Run app
flutter run -d macos  # or iPhone, chrome, etc.

# 6. Test
# Search for "banana", view details, paginate
```

**For more help:** https://docs.flutter.dev

---

**Last Updated**: November 2024  
**Flutter Version**: 3.16+  
**Development Time**: 5 hours  
**Platforms Tested**: iOS, Web
