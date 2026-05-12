import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiDroplet, 
  FiWind, 
  FiEye, 
  FiSun, 
  FiThermometer,
  FiMapPin,
  FiHeart,
  FiStar
} from 'react-icons/fi';
import { useWeather } from '../../context/WeatherContext';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const CurrentWeatherCard = () => {
  const { 
    currentWeather, 
    selectedCity, 
    theme, 
    settings 
  } = useWeather();

  if (!currentWeather || !selectedCity) return null;
  
  const temperature = settings.temperatureUnit === 'fahrenheit' 
    ? Math.round(currentWeather.temp_f)
    : Math.round(currentWeather.temp_c);
    
  const feelsLike = settings.temperatureUnit === 'fahrenheit'
    ? Math.round(currentWeather.feelslike_f)
    : Math.round(currentWeather.feelslike_c);

  const windSpeed = settings.windSpeedUnit === 'mph'
    ? Math.round(currentWeather.wind_mph)
    : Math.round(currentWeather.wind_kph);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'sunny': '☀️',
      'clear': '🌙',
      'partly-cloudy': '⛅',
      'cloudy': '☁️',
      'overcast': '☁️',
      'mist': '🌫️',
      'fog': '🌫️',
      'rain': '🌧️',
      'light-rain': '🌦️',
      'heavy-rain': '⛈️',
      'snow': '❄️',
      'light-snow': '🌨️',
      'heavy-snow': '🌨️',
      'thunderstorm': '⛈️',
    };

    const lowerCondition = condition.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerCondition.includes(key)) {
        return icon;
      }
    }
    return '🌤️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 sm:p-8 rounded-2xl"
      whileHover={{ 
        y: -2,
        transition: { duration: 0.3 }
      }}
      style={{
        background: theme === 'dark' 
          ? 'rgba(255,255,255,0.06)' 
          : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,245,255,0.9))',
        backdropFilter: 'blur(18px)',
        border: theme === 'dark' 
          ? '1px solid rgba(255,255,255,0.1)' 
          : '1px solid rgba(255,255,255,0.7)',
        boxShadow: theme === 'dark' 
          ? '0 8px 32px rgba(31, 38, 135, 0.37)' 
          : '0 8px 32px rgba(99,102,241,0.08)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="flex flex-col lg:flex-row items-start justify-between mb-6 gap-6">
        {/* LEFT SIDE - Weather Info */}
        <div className="flex flex-col lg:flex-row items-center space-x-6 gap-4">
          <div className="text-6xl">
            {getWeatherIcon(currentWeather.condition.text)}
          </div>
          <div>
            <h2 
              className="text-5xl font-bold"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#111827',
                textShadow: theme === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {Math.round(currentWeather.temp_c)}°C
            </h2>
            <p 
              className="text-lg"
              style={{
                color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#6b7280'
              }}
            >
              Feels like {Math.round(currentWeather.feelslike_c)}°C
            </p>
            <p 
              className="text-base font-medium"
              style={{
                color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#9ca3af'
              }}
            >
              {currentWeather.condition.text}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <FiMapPin 
                className="w-4 h-4" 
                style={{
                  color: theme === 'dark' ? '#06b6d4' : '#4f46e5'
                }}
              />
              <span 
                className="text-sm font-medium"
                style={{
                  color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#6b7280'
                }}
              >
                {selectedCity?.name || 'Unknown Location'}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Compact Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
          {/* Humidity */}
          <motion.div 
            className="p-4 rounded-2xl"
            whileHover={{ 
              y: -2,
              transition: { duration: 0.2 }
            }}
            style={{
              background: theme === 'dark' 
                ? 'rgba(99,102,241,0.15)' 
                : 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(12px)',
              border: theme === 'dark' 
                ? '1px solid rgba(99,102,241,0.3)' 
                : '1px solid rgba(255,255,255,0.7)',
              boxShadow: theme === 'dark' 
                ? '0 8px 24px rgba(99,102,241,0.3)' 
                : '0 8px 24px rgba(99,102,241,0.08)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <FiDroplet 
                className="w-4 h-4" 
                style={{
                  color: theme === 'dark' ? '#3b82f6' : '#3b82f6'
                }}
              />
              <span 
                className="text-xs font-medium"
                style={{
                  color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#6b7280'
                }}
              >
                Humidity
              </span>
            </div>
            <p 
              className="text-lg font-bold"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}
            >
              {currentWeather.humidity}%
            </p>
          </motion.div>

          {/* Wind */}
          <motion.div 
            className="p-4 rounded-2xl"
            whileHover={{ 
              y: -2,
              transition: { duration: 0.2 }
            }}
            style={{
              background: theme === 'dark' 
                ? 'rgba(59,130,246,0.15)' 
                : 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(12px)',
              border: theme === 'dark' 
                ? '1px solid rgba(59,130,246,0.3)' 
                : '1px solid rgba(255,255,255,0.7)',
              boxShadow: theme === 'dark' 
                ? '0 8px 24px rgba(59,130,246,0.3)' 
                : '0 8px 24px rgba(99,102,241,0.08)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <FiWind 
                className="w-4 h-4" 
                style={{
                  color: theme === 'dark' ? '#60a5fa' : '#60a5fa'
                }}
              />
              <span 
                className="text-xs font-medium"
                style={{
                  color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#6b7280'
                }}
              >
                Wind
              </span>
            </div>
            <p 
              className="text-lg font-bold"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}
            >
              {windSpeed} {settings.windSpeedUnit === 'mph' ? 'mph' : 'km/h'}
            </p>
          </motion.div>

          {/* Pressure */}
          <motion.div 
            className="p-4 rounded-2xl"
            whileHover={{ 
              y: -2,
              transition: { duration: 0.2 }
            }}
            style={{
              background: theme === 'dark' 
                ? 'rgba(34,197,94,0.15)' 
                : 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(12px)',
              border: theme === 'dark' 
                ? '1px solid rgba(34,197,94,0.3)' 
                : '1px solid rgba(255,255,255,0.7)',
              boxShadow: theme === 'dark' 
                ? '0 8px 24px rgba(34,197,94,0.3)' 
                : '0 8px 24px rgba(99,102,241,0.08)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <FiThermometer 
                className="w-4 h-4" 
                style={{
                  color: theme === 'dark' ? '#22c55e' : '#22c55e'
                }}
              />
              <span 
                className="text-xs font-medium"
                style={{
                  color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#6b7280'
                }}
              >
                Pressure
              </span>
            </div>
            <p 
              className="text-lg font-bold"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}
            >
              {currentWeather.pressure_mb} mb
            </p>
          </motion.div>

          {/* Visibility */}
          <motion.div 
            className="p-4 rounded-2xl"
            whileHover={{ 
              y: -2,
              transition: { duration: 0.2 }
            }}
            style={{
              background: theme === 'dark' 
                ? 'rgba(251,146,60,0.15)' 
                : 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(12px)',
              border: theme === 'dark' 
                ? '1px solid rgba(251,146,60,0.3)' 
                : '1px solid rgba(255,255,255,0.7)',
              boxShadow: theme === 'dark' 
                ? '0 8px 24px rgba(251,146,60,0.3)' 
                : '0 8px 24px rgba(99,102,241,0.08)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <FiEye 
                className="w-4 h-4" 
                style={{
                  color: theme === 'dark' ? '#fb923c' : '#fb923c'
                }}
              />
              <span 
                className="text-xs font-medium"
                style={{
                  color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#6b7280'
                }}
              >
                Visibility
              </span>
            </div>
            <p 
              className="text-lg font-bold"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}
            >
              {currentWeather.vis_km} km
            </p>
          </motion.div>
        </div>
        <div className="flex justify-end mt-4">
          <FavoriteButton location={selectedCity} />
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeatherCard;
