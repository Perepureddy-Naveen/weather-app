import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiWind, FiEye, FiThermometer } from "react-icons/fi";

import { WeatherProvider, useWeather } from "./context/WeatherContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import Navbar from "./components/Navbar/Navbar";
import CurrentWeatherCard from "./components/WeatherCard/CurrentWeatherCard";
import AirQualityCard from "./components/WeatherCard/AirQualityCard";
import HourlyForecast from "./components/Forecast/HourlyForecast";
import WeeklyForecast from "./components/Forecast/WeeklyForecast";
import Sidebar from "./components/Sidebar/Sidebar";
import FavoritesSidebar from "./components/FavoritesSidebar/FavoritesSidebar";
import ToastContainer from "./components/Toast/ToastContainer";
import WeatherBackground from "./components/Background/WeatherBackground";
import WeatherMap from "./components/WeatherMap/WeatherMap";
import LoadingSpinner from "./components/Loader/LoadingSpinner";
import ErrorDisplay from "./components/Loader/ErrorDisplay";
import About from "./components/About/About";

const AppContent = () => {
  const {
    loading,
    isDetectingLocation,
    error,
    currentWeather,
    forecast,
    theme,
    getCurrentLocation,
    clearError,
    isMapVisible,
  } = useWeather();

  const hourlyForecast = forecast?.forecastday?.[0]?.hour || [];
  const weeklyForecast = forecast?.forecastday || [];

  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await getCurrentLocation();
      } catch (error) {
        console.log("Location access denied or failed");
      }
    };

    initializeApp();
  }, []);

  const metricCardStyle = (bgColor, borderColor, shadowColor) => ({
    background: theme === "dark" ? bgColor : "var(--light-bg-glass)",
    backdropFilter: "blur(18px)",
    border:
      theme === "dark"
        ? `1px solid ${borderColor}`
        : "1px solid var(--light-border)",
    boxShadow:
      theme === "dark" ? `0 12px 40px ${shadowColor}` : "var(--light-shadow)",
    minHeight: "140px",
  });

  return (
    <div className="min-h-screen relative">
      <WeatherBackground />

      <div className="relative z-10">
        <Navbar onAboutClick={() => setIsAboutOpen(true)} />

        <AnimatePresence mode="wait">
          {isMapVisible ? (
            <motion.div
              key="map-layout"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="fixed top-20 left-0 right-0 bottom-0 z-20 weather-dashboard"
            >
              <div className="map-section">
                <WeatherMap />
              </div>

              <div className="weather-section overflow-y-auto">
                <div className="container mx-auto px-4 py-6">
                  {error && <ErrorDisplay error={error} />}

                  {loading && !currentWeather && (
                    <LoadingSpinner
                      text={
                        isDetectingLocation
                          ? "Detecting your location..."
                          : "Loading weather data..."
                      }
                    />
                  )}

                  {!loading && currentWeather && (
                    <div className="space-y-6">
                      <CurrentWeatherCard />

                      <AirQualityCard />

                      <div
                        className="grid gap-6"
                        style={{
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(240px, 1fr))",
                        }}
                      >
                        {/* Wind */}
                        <div
                          className="p-5 rounded-2xl border backdrop-blur-xl weather-metric-card"
                          style={metricCardStyle(
                            "rgba(59,130,246,0.15)",
                            "rgba(59,130,246,0.3)",
                            "rgba(59,130,246,0.3)"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <FiWind
                              className="w-6 h-6"
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#60a5fa"
                                    : "var(--light-wind)",
                              }}
                            />
                            <span
                              className="font-semibold"
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#ffffff"
                                    : "var(--light-text-primary)",
                              }}
                            >
                              Wind Speed
                            </span>
                          </div>

                          <p
                            className="text-2xl font-bold"
                            style={{
                              color:
                                theme === "dark"
                                  ? "#ffffff"
                                  : "var(--light-text-primary)",
                            }}
                          >
                            {currentWeather.wind_kph} km/h
                          </p>
                        </div>

                        {/* Visibility */}
                        <div
                          className="p-5 rounded-2xl border backdrop-blur-xl"
                          style={metricCardStyle(
                            "rgba(16,185,129,0.15)",
                            "rgba(16,185,129,0.3)",
                            "rgba(16,185,129,0.3)"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <FiEye
                              className="w-6 h-6"
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#34d399"
                                    : "var(--light-visibility)",
                              }}
                            />
                            <span
                              className="font-semibold"
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#ffffff"
                                    : "var(--light-text-primary)",
                              }}
                            >
                              Visibility
                            </span>
                          </div>

                          <p
                            className="text-2xl font-bold"
                            style={{
                              color:
                                theme === "dark"
                                  ? "#ffffff"
                                  : "var(--light-text-primary)",
                            }}
                          >
                            {currentWeather.vis_km} km
                          </p>
                        </div>

                        {/* Pressure */}
                        <div
                          className="p-5 rounded-2xl border backdrop-blur-xl"
                          style={metricCardStyle(
                            "rgba(245,158,11,0.15)",
                            "rgba(245,158,11,0.3)",
                            "rgba(245,158,11,0.3)"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <FiThermometer
                              className="w-6 h-6"
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#fbbf24"
                                    : "var(--light-pressure)",
                              }}
                            />
                            <span
                              className="font-semibold"
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#ffffff"
                                    : "var(--light-text-primary)",
                              }}
                            >
                              Pressure
                            </span>
                          </div>

                          <p
                            className="text-2xl font-bold"
                            style={{
                              color:
                                theme === "dark"
                                  ? "#ffffff"
                                  : "var(--light-text-primary)",
                            }}
                          >
                            {currentWeather.pressure_mb} mb
                          </p>
                        </div>

                        {/* Humidity */}
                        <div
                          className="p-5 rounded-2xl border backdrop-blur-xl"
                          style={metricCardStyle(
                            "rgba(99,102,241,0.15)",
                            "rgba(99,102,241,0.3)",
                            "rgba(99,102,241,0.3)"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">💧</span>
                            <span
                              className="font-semibold"
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#ffffff"
                                    : "var(--light-text-primary)",
                              }}
                            >
                              Humidity
                            </span>
                          </div>

                          <p
                            className="text-2xl font-bold"
                            style={{
                              color:
                                theme === "dark"
                                  ? "#ffffff"
                                  : "var(--light-text-primary)",
                            }}
                          >
                            {currentWeather.humidity}%
                          </p>
                        </div>

                        {/* UV */}
                        <div
                          className="p-5 rounded-2xl border backdrop-blur-xl"
                          style={metricCardStyle(
                            "rgba(168,85,247,0.15)",
                            "rgba(168,85,247,0.3)",
                            "rgba(168,85,247,0.3)"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">☀️</span>
                            <span
                              className="font-semibold"
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#ffffff"
                                    : "var(--light-text-primary)",
                              }}
                            >
                              UV Index
                            </span>
                          </div>

                          <p
                            className="text-2xl font-bold"
                            style={{
                              color:
                                theme === "dark"
                                  ? "#ffffff"
                                  : "var(--light-text-primary)",
                            }}
                          >
                            {currentWeather.uv || "N/A"}
                          </p>
                        </div>

                        {/* Sunrise Sunset */}
                        <div
                          className="p-5 rounded-2xl border backdrop-blur-xl"
                          style={metricCardStyle(
                            "rgba(251,146,60,0.15)",
                            "rgba(251,146,60,0.3)",
                            "rgba(251,146,60,0.3)"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">🌅</span>
                            <span
                              className="font-semibold"
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#ffffff"
                                    : "var(--light-text-primary)",
                              }}
                            >
                              Sunrise / Sunset
                            </span>
                          </div>

                          <div className="space-y-2">
                            <p
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#ffffff"
                                    : "var(--light-text-primary)",
                              }}
                            >
                              Sunrise: {currentWeather.sunrise || "N/A"}
                            </p>

                            <p
                              style={{
                                color:
                                  theme === "dark"
                                    ? "#ffffff"
                                    : "var(--light-text-primary)",
                              }}
                            >
                              Sunset: {currentWeather.sunset || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {hourlyForecast.length > 0 && (
                        <HourlyForecast hourlyForecast={hourlyForecast} />
                      )}

                      {weeklyForecast.length > 0 && (
                        <WeeklyForecast weeklyForecast={weeklyForecast} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="full-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="container mx-auto px-4 py-6"
            >
              {error && <ErrorDisplay error={error} />}

              {loading && !currentWeather && <LoadingSpinner />}

              {!loading && currentWeather && (
                <div className="space-y-6">
                  <CurrentWeatherCard />

                  <AirQualityCard />

                  {hourlyForecast.length > 0 && (
                    <HourlyForecast hourlyForecast={hourlyForecast} />
                  )}

                  {weeklyForecast.length > 0 && (
                    <WeeklyForecast weeklyForecast={weeklyForecast} />
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Sidebar />

      <FavoritesSidebar />

      <ToastContainer />

      <About
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        theme={theme}
      />

      <AnimatePresence>
        {loading && currentWeather && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  return (
    <WeatherProvider>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </WeatherProvider>
  );
};

export default App;
