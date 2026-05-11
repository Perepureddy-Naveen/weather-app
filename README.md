# Weather Forecast App

A premium, modern weather forecast web application built with ReactJS + Vite, featuring beautiful UI/UX with glassmorphism design, real-time weather data, and advanced features.

## 🌟 Features

### Core Features
- **Real-time Weather Data** - Current weather conditions with detailed metrics
- **7-Day Forecast** - Comprehensive weekly weather predictions
- **Hourly Forecast** - 24-hour detailed weather breakdown
- **Air Quality Monitoring** - Real-time AQI data with health recommendations
- **Smart Search** - Google-like autocomplete with city suggestions
- **GPS Location** - Automatic weather detection for current location
- **Favorites System** - Save and quickly access favorite cities
- **Search History** - Track and revisit recent searches
- **Voice Search** - Hands-free city search using Web Speech API

### Advanced Features
- **Dynamic Weather Backgrounds** - Animated backgrounds based on weather conditions
- **Dark/Light Theme** - Smooth animated theme toggle
- **Responsive Design** - Perfect experience on mobile, tablet, and desktop
- **Glassmorphism UI** - Modern frosted glass card design
- **Micro-interactions** - Smooth hover effects and transitions
- **Loading States** - Beautiful skeleton loaders and animations
- **Error Handling** - Comprehensive error states with helpful messages
- **Settings Management** - Customizable temperature and wind speed units

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS 3.x
- **Animations**: Framer Motion
- **Icons**: React Icons
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Storage**: LocalStorage
- **API**: WeatherAPI.com

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your WeatherAPI.com key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Background/      # Dynamic weather backgrounds
│   ├── Forecast/        # Hourly and weekly forecasts
│   ├── Loader/          # Loading and error states
│   ├── Navbar/          # Main navigation bar
│   ├── SearchBar/       # Search with autocomplete
│   ├── Sidebar/         # Favorites and settings
│   └── WeatherCard/     # Current weather display
├── context/             # React Context for state management
├── services/            # API and utility services
├── styles/              # Global styles and Tailwind CSS
├── hooks/               # Custom React hooks
├── utils/               # Helper functions
└── assets/              # Static assets
```

## 🎨 Design Features

### UI/UX Highlights
- **Glassmorphism Design** - Modern frosted glass effects
- **Gradient Backgrounds** - Dynamic color schemes based on weather
- **Smooth Animations** - Micro-interactions and page transitions
- **Responsive Layout** - Mobile-first responsive design
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized rendering and lazy loading

### Weather Animations
- **Rain Effect** - Animated rain particles
- **Snow Effect** - Falling snow animations
- **Cloud Movement** - Drifting cloud animations
- **Lightning** - Thunderstorm effects
- **Sun/Moon** - Celestial body animations
- **Fog/Mist** - Atmospheric effects

## 🔧 Configuration

### API Setup
1. Sign up at [WeatherAPI.com](https://www.weatherapi.com/)
2. Get your free API key
3. Add it to your `.env` file

### Environment Variables
```env
VITE_WEATHER_API_KEY=your_weather_api_key_here
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🌐 Features in Detail

### Search Functionality
- **Autocomplete**: Real-time city suggestions as you type
- **Voice Search**: Click microphone to search by voice
- **History**: Recent searches saved locally
- **Keyboard Navigation**: Arrow keys to navigate suggestions

### Weather Data
- **Current Conditions**: Temperature, humidity, wind, pressure, UV index
- **Air Quality**: PM2.5, PM10, O3, NO2, SO2, CO levels
- **Astronomy**: Sunrise, sunset, moon phases
- **Forecasts**: Hourly (24h) and weekly (7-day) predictions

### Customization
- **Temperature Units**: Celsius/Fahrenheit
- **Wind Speed**: km/h or mph
- **Themes**: Dark/Light mode with smooth transitions
- **Favorites**: Quick access to saved cities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for providing weather data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for beautiful animations
- [React Icons](https://react-icons.github.io/react-icons/) for the icon library

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include screenshots if applicable

---

**Made with ❤️ using React, Vite, and modern web technologies**
