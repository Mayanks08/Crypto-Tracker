# Crypto-Tracker
A React Native Android app to track real-time cryptocurrency data using the CoinGecko API. 
Built with Expo and Android Studio, the app provides charts, historical data, and lets users select currencies dynamically using a picker.
Also Putted Costume Icon on App

🚀 Features]

📊 Real-time price tracking with CoinGecko API

📈 Interactive charts using chart.js

🌐 Currency selector with react-native-picker-select

📆 Time formatting using dayjs

🔐 Permission management via expo-permissions

📲 Android development and testing with Android Studio

🧭 Navigation using @react-navigation/native-stack

🌙 Native StatusBar integration

⚡ Built with Expo for fast development

<h3>Tech Stack</h3>

| Tool / Library             | Purpose                     |
| -------------------------- | --------------------------- |
| React Native + Expo        | Cross-platform development  |
| Android Studio             | Android build + emulator    |
| CoinGecko API              | Real-time crypto data       |
| chart.js + react-chartjs-2 | Interactive charts          |
| react-native-picker-select | Currency selection dropdown |
| dayjs                      | Lightweight date formatting |
| @react-navigation/native   | Navigation system           |
| Native Stack               | Stack-based screen routing  |
| expo-status-bar            | Native status bar control   |
| axios                      | API calls                   |


<h3>📸 Screenshots</h3>
![Screenshot 2025-05-13 220724](https://github.com/user-attachments/assets/a074f502-7685-46c1-8dac-193c9aedd60f)
![Screenshot 2025-05-13 221331](https://github.com/user-attachments/assets/18afcca4-5bfb-4093-afe5-d57d8cdc76a7)
![Screenshot 2025-05-13 221501](https://github.com/user-attachments/assets/3a3ea7d6-38a3-4ae8-828c-91b6e7dabe39)
![Screenshot 2025-05-13 221520](https://github.com/user-attachments/assets/cbf1b809-fec0-4209-941a-b7d58482c26f)
![Screenshot 2025-05-13 221627](https://github.com/user-attachments/assets/1a9c9025-1db3-44f5-9f84-3a1cf6b10fa7)

<h3>📦 Installation</h3>

``` bash
# Clone the repo
git clone https://github.com/your-username/CryptoTrackerApp.git
cd CryptoTrackerApp

# Install dependencies
npm install

# Start the Expo dev server
npx expo start
```

<h3>📱 Run on Android</h3>

```bash
npx expo start --android

```
🧪 Key Modules
Currency Picker – lets users select fiat currencies like USD, EUR, INR, etc.

Chart.js Integration – displays price trends over time.

Permissions – (optional) for future features like push notifications or storage.

Day.js – used for displaying updated timestamps.

🔗 API Used
CoinGecko Public API

Endpoint: https://api.coingecko.com/api/v3/

No API key required (rate-limited)

<h3>🛠️ Project Structure</h3>

```bash
CryptoTrackerApp/
├── components/       # Reusable UI components
├── screens/          # Home, Details screens
├── assets/           # Images, icons

├── App.js            # Entry point

```

<h2>App Icon</h2>
![icon](https://github.com/user-attachments/assets/814d4235-776b-437c-b2c8-a74d2901dadd)
