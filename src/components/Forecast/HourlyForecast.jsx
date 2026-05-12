import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useWeather } from '../../context/WeatherContext';

const HourlyForecast = () => {
  const { forecast, theme, settings } = useWeather();
  const [scrollIndex, setScrollIndex] = useState(0);

  if (!forecast || !forecast.forecastday || !forecast.forecastday[0]) return null;

  const hourlyData = forecast.forecastday[0].hour;
  const visibleHours = 8; // Show 8 hours at a time
  const maxScrollIndex = Math.max(0, hourlyData.length - visibleHours);

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

  const getTemperature = (hour) => {
    return settings.temperatureUnit === 'fahrenheit' 
      ? Math.round(hour.temp_f)
      : Math.round(hour.temp_c);
  };

  const getChanceOfRain = (hour) => {
    return hour.chance_of_rain || 0;
  };

  const scrollLeft = () => {
    setScrollIndex(Math.max(0, scrollIndex - 4));
  };

  const scrollRight = () => {
    setScrollIndex(Math.min(maxScrollIndex, scrollIndex + 4));
  };

  const visibleHourlyData = hourlyData.slice(scrollIndex, scrollIndex + visibleHours);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl p-6 hourly-forecast-card"
      whileHover={{ 
        y: -2,
        transition: { duration: 0.3 }
      }}
      style={{
        background: theme === 'dark' 
          ? 'rgba(255,255,255,0.06)' 
          : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,247,255,0.9))',
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
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 
          className="text-lg font-semibold"
          style={{
            color: theme === 'dark' ? '#ffffff' : '#111827'
          }}
        >
          Hourly Forecast
        </h3>
        
        {/* Scroll Controls */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollLeft}
            disabled={scrollIndex === 0}
            className="p-2 rounded-lg transition-all duration-300"
            style={{
              background: scrollIndex === 0 
                ? (theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)')
                : (theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)'),
              backdropFilter: 'blur(8px)',
              border: theme === 'dark' 
                ? '1px solid rgba(255,255,255,0.1)' 
                : '1px solid rgba(255,255,255,0.6)',
              opacity: scrollIndex === 0 ? 0.5 : 1
            }}
          >
            <FiChevronLeft 
              className="w-4 h-4" 
              style={{
                color: theme === 'dark' ? '#9ca3af' : '#6b7280'
              }}
            />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollRight}
            disabled={scrollIndex === maxScrollIndex}
            className="p-2 rounded-lg transition-all duration-300"
            style={{
              background: scrollIndex === maxScrollIndex 
                ? (theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)')
                : (theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)'),
              backdropFilter: 'blur(8px)',
              border: theme === 'dark' 
                ? '1px solid rgba(255,255,255,0.1)' 
                : '1px solid rgba(255,255,255,0.6)',
              opacity: scrollIndex === maxScrollIndex ? 0.5 : 1
            }}
          >
            <FiChevronRight 
              className="w-4 h-4" 
              style={{
                color: theme === 'dark' ? '#9ca3af' : '#6b7280'
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Hourly Cards */}
      <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
        {visibleHourlyData.map((hour, index) => (
          <motion.div
            key={scrollIndex + index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex-shrink-0 p-3 rounded-xl w-[140px] sm:w-[160px]"
            style={{
              background: theme === 'dark' 
                ? 'rgba(255,255,255,0.04)' 
                : 'var(--light-bg-glass)',
              backdropFilter: 'blur(8px)',
              border: theme === 'dark' 
                ? '1px solid rgba(255,255,255,0.08)' 
                : '1px solid rgba(0,0,0,0.08)',
              boxShadow: theme === 'dark' 
                ? '0 4px 20px rgba(31, 38, 135, 0.2)' 
                : '0 8px 24px rgba(0,0,0,0.08)'
            }}
          >
            <div className="text-center">
              <p 
                className="text-xs font-medium mb-1"
                style={{
                  color: theme === 'dark' ? '#d1d5db' : 'var(--light-text-secondary)'
                }}
              >
                {new Date(hour.time).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
              <div className="text-xl mb-1">
                {getWeatherIcon(hour.condition.text)}
              </div>
              <p 
                className="text-base font-bold"
                style={{
                  color: theme === 'dark' ? '#ffffff' : 'var(--light-text-primary)'
                }}
              >
                {getTemperature(hour)}°
              </p>
              <p 
                className="text-xs"
                style={{
                  color: theme === 'dark' ? '#9ca3af' : 'var(--light-text-secondary)'
                }}
              >
                {hour.condition.text}
              </p>
              {hour.chance_of_rain > 0 && (
                <div 
                  className="mt-2 px-2 py-1 rounded-full text-xs"
                  style={{
                    background: theme === 'dark' 
                      ? 'rgba(59, 130, 246, 0.2)' 
                      : 'rgba(59, 130, 246, 0.1)',
                    color: theme === 'dark' 
                      ? '#93c5fd' 
                      : '#1e40af'
                  }}
                >
                  {hour.chance_of_rain}% rain
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HourlyForecast;
