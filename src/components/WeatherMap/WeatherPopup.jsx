import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiDroplet, FiWind, FiEye, FiThermometer } from 'react-icons/fi';

const WeatherPopup = ({ weather, city }) => {
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

  if (!weather || !city) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="p-4 min-w-[240px] max-w-[280px]"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.15)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FiMapPin 
            className="w-4 h-4" 
            style={{ color: '#3B82F6' }}
          />
          <h3 
            className="font-semibold text-base"
            style={{ color: '#111827' }}
          >
            {city.name}
          </h3>
        </div>
        <button
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ color: '#6B7280' }}
          onClick={() => {/* Close popup */}}
        >
          ×
        </button>
      </div>

      {/* Weather Icon and Temperature */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">
          {getWeatherIcon(weather.condition.text)}
        </div>
        <div className="text-right">
          <div 
            className="text-3xl font-bold"
            style={{ color: '#111827' }}
          >
            {Math.round(weather.temp_c)}°
          </div>
          <div 
            className="text-sm"
            style={{ color: '#6B7280' }}
          >
            Feels like {Math.round(weather.feelslike_c)}°
          </div>
        </div>
      </div>

      {/* Weather Condition */}
      <div className="mb-4">
        <p 
          className="text-sm font-medium"
          style={{ color: '#374151' }}
        >
          {weather.condition.text}
        </p>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <FiDroplet 
            className="w-4 h-4" 
            style={{ color: '#3B82F6' }}
          />
          <div>
            <div 
              className="text-xs"
              style={{ color: '#6B7280' }}
            >
              Humidity
            </div>
            <div 
              className="text-sm font-semibold"
              style={{ color: '#111827' }}
            >
              {weather.humidity}%
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FiWind 
            className="w-4 h-4" 
            style={{ color: '#10B981' }}
          />
          <div>
            <div 
              className="text-xs"
              style={{ color: '#6B7280' }}
            >
              Wind
            </div>
            <div 
              className="text-sm font-semibold"
              style={{ color: '#111827' }}
            >
              {weather.wind_kph} km/h
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FiEye 
            className="w-4 h-4" 
            style={{ color: '#8B5CF6' }}
          />
          <div>
            <div 
              className="text-xs"
              style={{ color: '#6B7280' }}
            >
              Visibility
            </div>
            <div 
              className="text-sm font-semibold"
              style={{ color: '#111827' }}
            >
              {weather.vis_km} km
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FiThermometer 
            className="w-4 h-4" 
            style={{ color: '#F59E0B' }}
          />
          <div>
            <div 
              className="text-xs"
              style={{ color: '#6B7280' }}
            >
              Pressure
            </div>
            <div 
              className="text-sm font-semibold"
              style={{ color: '#111827' }}
            >
              {weather.pressure_mb} mb
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div 
        className="pt-3 border-t"
        style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        <p 
          className="text-xs"
          style={{ color: '#9CA3AF' }}
        >
          Updated: {new Date(weather.last_updated).toLocaleTimeString()}
        </p>
      </div>
    </motion.div>
  );
};

export default WeatherPopup;
