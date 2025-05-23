# 🌟 SnapCivic

<div align="center">
  <img src="./assets/images/appIcon.png" alt="SnapCivic Logo" width="120px" />
  <h3>Empowering Communities Through Civic Engagement</h3>
</div>

## 📲 Download SnapCivic

[![Download APK](https://img.shields.io/badge/Download%20APK-SnapCivic-blue.svg?style=for-the-badge&logo=android)](https://your-download-link.com)

Get the latest version of **SnapCivic** on your Android device:  
👉 [Click here to download SnapCivic APK](https://drive.google.com/file/d/1kwS_xSfYi-ZfWXS2QM7oAiA6lNPN4IQK/view?usp=sharing)

---

🔒 **Safe & Secure**  
SnapCivic is built with trusted open-source technologies like **React Native** and **Expo**, and contains **no malware, tracking, or hidden code**.

🛠️ **Open Source & Transparent**  
This app is fully open-source and community-driven. Feel free to explore the codebase and contribute!  
🔗 [View Source on GitHub](https://github.com/Hrithik0112/Snap-Civic)


## Demo Video
https://github.com/user-attachments/assets/2c0094dc-54c7-456e-ad2a-941945a865e8



## Backend

https://github.com/olifarhaan/snap-civic

## 📱 About

SnapCivic is a modern mobile application that enables citizens to report and track community issues in real-time. Built with React Native and Expo, it provides a seamless platform for civic engagement and community improvement.

## ✨ Features

- 🔍 **Issue Reporting**: Easily report community issues with photos and detailed descriptions
- 📍 **Location Integration**: Precise location tracking for accurate issue mapping
- 💬 **Community Discussion**: Engage in meaningful discussions about reported issues
- 📊 **Status Tracking**: Real-time updates on issue resolution progress
- 🏆 **User Recognition**: Achievement system to encourage active participation
- 🔔 **Smart Notifications**: Stay updated on issues that matter to you
- 🎨 **Modern UI/UX**: Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **Navigation**: Expo Router
- **UI Components**: Custom-built with React Native components
- **Location Services**: expo-location
- **Image Handling**: expo-image-picker
- **State Management**: React Hooks
- **Styling**: React Native StyleSheet

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/snap-civic.git
```

2. Install dependencies:

```bash
cd snap-civic
npm install
```

3. Start the development server:

```bash
npm start
```

## 📁 Project Structure

```
snap-civic/
│
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Home Feed Screen
│   │   ├── create.tsx     # Create Report Screen
│   │   └── profile.tsx    # User Profile Screen
│   │
│   ├── (auth)/            # Authentication screens
│   │   ├── login.tsx      # Login Screen
│   │   └── register.tsx   # Registration Screen
│   │
│   ├── _layout.tsx        # Root Layout
│   └── +html.tsx          # HTML Template
│
├── components/            # Reusable UI components
│   ├── Card.tsx          # Issue Card Component
│   ├── Header.tsx        # App Header
│   ├── SplashScreen.tsx  # Custom Splash Screen
│   └── Themed.tsx        # Theme Components
│
├── constants/            # App-wide constants
│   ├── Colors.ts        # Color Definitions
│   └── Layout.ts        # Layout Constants
│
├── services/            # API and external services
│   └── api.ts          # API Service
│
├── utils/              # Helper functions
│   ├── MockData.ts    # Mock Data for Development
│   ├── MockProfile.ts # Mock User Profile
│   └── Navigation.ts  # Navigation Utilities
│
└── assets/            # Static resources
    ├── images/       # Image Assets
    ├── fonts/        # Custom Fonts
    ├── icon.png      # App Icon
    └── splash.png    # Splash Screen Image
```

This structure follows Expo Router's file-based routing convention and organizes code for maximum maintainability and scalability.

## 🎯 Core Components

- **Card**: Reusable component for displaying issue reports
- **CommentsModal**: Discussion interface for community engagement
- **Header**: Custom navigation header with notification system
- **useColorScheme**: Theme management hook

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 📱 Supported Platforms

- iOS
- Android
- Web (experimental)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [FontAwesome](https://fontawesome.com)
- Location services by [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- Image handling by [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

---

<div align="center">
  <sub>Built with ❤️ by [Hrithik And Ali]</sub>
</div>
