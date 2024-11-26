# RN Simple Store

A simple React Native application that displays a list of products, allows users to view product details, and mark products as favorites. The app includes navigation, state management, caching, and API integration for dynamic data fetching.

---

## Features

- **Product Listing**: Displays a list of products with their title, description, price, and image.
- **Product Details**: Navigate to a detailed view of a selected product.
- **Favorites**: Mark products as favorites.
- **Navigation**: Smooth navigation between screens using Expo Router.
- **API Integration**: Fetch product data from a public API.
- **Responsive and User-Friendly UI**: Clean, modern, and easy-to-use design.

---

## Screenshots

| ![screenshot1](https://github.com/user-attachments/assets/21c1a8ee-a976-42e6-bced-653c0e7b19cb) | ![screenshot2](https://github.com/user-attachments/assets/afbf49db-10dc-4a2e-84c1-811a0aa66559) |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |

## Setup Instructions

### Prerequisites

- Node.js installed
- Git installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sherif-jr/rn-simple-store.git
   cd rn-simple-store
   ```
2. Install dependencies:
   ```bash
   yarn
   ```
3. Run the app (Expo Go):
   ```bash
   yarn start
   ```
4. Scan the QR code with the Camera/Expo Go app (iOS or Android).

Approach

1. Navigation: Implemented using Expo Router for file-based navigation. It's build on top of react-navigation and provides a simple and efficient way to navigate between screens.
2. State Management: Used React's useState and redux-toolkit for state management.
3. UI: Designed with React Native components and styled using StyleSheet.
4. Favorites Feature: Added functionality to mark and view favorite products.
5. API Integration: Used the Fake Store API to dynamically fetch product data, with graceful error handling and caching.
6. Responsive UI: Implemented responsive design to ensure a consistent user experience across different screen sizes.
7. User-Friendly UI: Designed a clean and modern UI with a consistent color scheme and typography.

## Demo & Links

- [Screenshots, Demo APK, and coding video](https://drive.google.com/drive/folders/1mQ16i-08yLPMbcjgNUhz7Woa5w2U8aLz)
  ![google drive](https://github.com/user-attachments/assets/f5526ddf-b9db-4e0a-9698-0a77075730d7)

- [Download demo apk directly from eas](https://expo.dev/artifacts/eas/ifSoyK4eGGsrkwHzfa5ciE.apk)
