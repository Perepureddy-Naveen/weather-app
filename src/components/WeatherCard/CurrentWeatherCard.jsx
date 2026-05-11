import React from "react";
import { motion } from "framer-motion";
import {
  FiDroplet,
  FiWind,
  FiEye,
  FiSun,
  FiThermometer,
  FiMapPin,
  FiHeart,
  FiStar,
} from "react-icons/fi";
import { useWeather } from "../../context/WeatherContext";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const CurrentWeatherCard = () => {
  const { currentWeather, selectedCity, theme, settings } = useWeather();

  if (!currentWeather || !selectedCity) return null;

  const temperature =
    settings.temperatureUnit === "fahrenheit"
      ? Math.round(currentWeather.temp_f)
      : Math.round(currentWeather.temp_c);

  const feelsLike =
    settings.temperatureUnit === "fahrenheit"
      ? Math.round(currentWeather.feelslike_f)
      : Math.round(currentWeather.feelslike_c);

  const windSpeed =
    settings.windSpeedUnit === "mph"
      ? Math.round(currentWeather.wind_mph)
      : Math.round(currentWeather.wind_kph);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      sunny: "☀️",
      clear: "🌙",
      "partly-cloudy": "⛅",
      cloudy: "☁️",
      overcast: "☁️",
      mist: "🌫️",
      fog: "🌫️",
      rain: "🌧️",
      "light-rain": "🌦️",
      "heavy-rain": "⛈️",
      snow: "❄️",
      "light-snow": "🌨️",
      "heavy-snow": "🌨️",
      thunderstorm: "⛈️",
    };

    const lowerCondition = condition.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerCondition.includes(key)) {
        return icon;
      }
    }
    return "🌤️";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-xl current-weather-card"
      style={{
        background:
          theme === "dark"
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(18px)",
        border:
          theme === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.08)",
        boxShadow:
          theme === "dark"
            ? "0 8px 32px rgba(31, 38, 135, 0.37)"
            : "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex items-start justify-between mb-6">
        {/* LEFT SIDE - Weather Info */}
        <div className="flex items-center space-x-6">
          <div className="text-6xl">
            {getWeatherIcon(currentWeather.condition.text)}
          </div>
          <div>
            <h2
              className="text-5xl font-bold"
              style={{
                color:
                  theme === "dark" ? "#ffffff" : "var(--light-text-primary)",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {Math.round(currentWeather.temp_c)}°C
            </h2>
            <p
              className="text-lg"
              style={{
                color:
                  theme === "dark"
                    ? "rgba(255,255,255,0.7)"
                    : "var(--light-text-secondary)",
              }}
            >
              Feels like {Math.round(currentWeather.feelslike_c)}°C
            </p>
            <p
              className="text-base font-medium"
              style={{
                color:
                  theme === "dark"
                    ? "rgba(255,255,255,0.5)"
                    : "var(--light-text-muted)",
              }}
            >
              {currentWeather.condition.text}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <FiMapPin
                className="w-4 h-4"
                style={{
                  color: theme === "dark" ? "#06b6d4" : "var(--light-accent)",
                }}
              />
              <span
                className="text-sm font-medium"
                style={{
                  color:
                    theme === "dark"
                      ? "rgba(255,255,255,0.7)"
                      : "var(--light-text-secondary)",
                }}
              >
                {selectedCity?.name || "Unknown Location"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Compact Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="p-3 rounded-lg"
            style={{
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "var(--light-bg-glass)",
              backdropFilter: "blur(8px)",
              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid var(--light-border)",
              boxShadow:
                theme === "dark"
                  ? "0 4px 20px rgba(0,0,0,0.2)"
                  : "var(--light-shadow)",
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <FiDroplet
                className="w-3 h-3"
                style={{
                  color: theme === "dark" ? "#3b82f6" : "var(--light-humidity)",
                }}
              />
              <span
                className="text-xs font-medium"
                style={{
                  color:
                    theme === "dark"
                      ? "rgba(255,255,255,0.7)"
                      : "var(--light-text-secondary)",
                }}
              >
                Humidity
              </span>
            </div>
            <p
              className="text-lg font-bold"
              style={{
                color:
                  theme === "dark" ? "#ffffff" : "var(--light-text-primary)",
              }}
            >
              {currentWeather.humidity}%
            </p>
          </div>
          <div
            className="p-3 rounded-lg"
            style={{
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "var(--light-bg-glass)",
              backdropFilter: "blur(8px)",
              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid var(--light-border)",
              boxShadow:
                theme === "dark"
                  ? "0 4px 20px rgba(0,0,0,0.2)"
                  : "var(--light-shadow)",
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <FiWind
                className="w-3 h-3"
                style={{
                  color: theme === "dark" ? "#10b981" : "var(--light-wind)",
                }}
              />
              <span
                className="text-xs font-medium"
                style={{
                  color:
                    theme === "dark"
                      ? "rgba(255,255,255,0.7)"
                      : "var(--light-text-secondary)",
                }}
              >
                Wind
              </span>
            </div>
            <p
              className="text-lg font-bold"
              style={{
                color:
                  theme === "dark" ? "#ffffff" : "var(--light-text-primary)",
              }}
            >
              {currentWeather.wind_kph} km/h
            </p>
          </div>
          <div
            className="p-3 rounded-lg"
            style={{
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "var(--light-bg-glass)",
              backdropFilter: "blur(8px)",
              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid var(--light-border)",
              boxShadow:
                theme === "dark"
                  ? "0 4px 20px rgba(0,0,0,0.2)"
                  : "var(--light-shadow)",
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <FiThermometer
                className="w-3 h-3"
                style={{
                  color: theme === "dark" ? "#f59e0b" : "var(--light-pressure)",
                }}
              />
              <span
                className="text-xs font-medium"
                style={{
                  color:
                    theme === "dark"
                      ? "rgba(255,255,255,0.7)"
                      : "var(--light-text-secondary)",
                }}
              >
                Pressure
              </span>
            </div>
            <p
              className="text-lg font-bold"
              style={{
                color:
                  theme === "dark" ? "#ffffff" : "var(--light-text-primary)",
              }}
            >
              {currentWeather.pressure_mb} mb
            </p>
          </div>
          <div
            className="p-3 rounded-lg"
            style={{
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "var(--light-bg-glass)",
              backdropFilter: "blur(8px)",
              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid var(--light-border)",
              boxShadow:
                theme === "dark"
                  ? "0 4px 20px rgba(0,0,0,0.2)"
                  : "var(--light-shadow)",
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <FiEye
                className="w-3 h-3"
                style={{
                  color:
                    theme === "dark" ? "#8b5cf6" : "var(--light-visibility)",
                }}
              />
              <span
                className="text-xs font-medium"
                style={{
                  color:
                    theme === "dark"
                      ? "rgba(255,255,255,0.7)"
                      : "var(--light-text-secondary)",
                }}
              >
                Visibility
              </span>
            </div>
            <p
              className="text-lg font-bold"
              style={{
                color:
                  theme === "dark" ? "#ffffff" : "var(--light-text-primary)",
              }}
            >
              {currentWeather.vis_km} km
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <FavoriteButton location={selectedCity} />
      </div>
    </motion.div>
  );
};

export default CurrentWeatherCard;
