import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiDroplet, FiWind, FiEye } from 'react-icons/fi';
import { useWeather } from '../../context/WeatherContext';

const WeeklyForecast = () => {
  const { forecast, theme, settings } = useWeather();
  const [expandedDay, setExpandedDay] = useState(null);

  if (!forecast || !forecast.forecastday) return null;

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

  const getTemperature = (temp) => {
    return settings.temperatureUnit === 'fahrenheit' 
      ? Math.round(temp)
      : Math.round(temp);
  };

  const getDayName = (date) => {
    const day = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (day.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (day.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return day.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  const getDayNumber = (date) => {
    return new Date(date).getDate();
  };

  const getMonthName = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl p-4"
      style={{
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
      }}
    >
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <FiCalendar className={`w-5 h-5 ${
          theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
        }`} />
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          7-Day Forecast
        </h3>
      </div>

      {/* Forecast Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {forecast.forecastday.map((day, index) => {
          const isExpanded = expandedDay === index;
          const maxTemp = getTemperature(day.day.maxtemp_c);
          const minTemp = getTemperature(day.day.mintemp_c);
          const avgTemp = getTemperature(day.day.avgtemp_c);
          const rainChance = day.day.daily_chance_of_rain;
          const snowChance = day.day.daily_chance_of_snow;
          const avgHumidity = day.day.avghumidity;
          const maxWind = settings.windSpeedUnit === 'mph' 
            ? Math.round(day.day.maxwind_mph)
            : Math.round(day.day.maxwind_kph);
          const avgVisibility = day.day.avgvis_km;
          const uvIndex = day.day.uv;

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setExpandedDay(isExpanded ? null : index)}
              className="p-3 rounded-lg cursor-pointer transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 20px rgba(31, 38, 135, 0.2)'
              }}
            >
              {/* Main Day Info */}
              <div className="flex items-center justify-between">
                {/* Date and Day */}
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div 
                      className="text-xs font-medium"
                      style={{
                        color: theme === 'dark' ? '#d1d5db' : '#4b5563'
                      }}
                    >
                      {getMonthName(day.date)}
                    </div>
                    <div 
                      className="text-lg font-bold"
                      style={{
                        color: theme === 'dark' ? '#ffffff' : '#111827'
                      }}
                    >
                      {getDayNumber(day.date)}
                    </div>
                  </div>
                  <div>
                    <div 
                      className="text-sm font-medium"
                      style={{
                        color: theme === 'dark' ? '#ffffff' : '#111827'
                      }}
                    >
                      {getDayName(day.date)}
                    </div>
                    <div 
                      className="text-xs"
                      style={{
                        color: theme === 'dark' ? '#9ca3af' : '#4b5563'
                      }}
                    >
                      {day.day.condition.text}
                    </div>
                  </div>
                </div>

                {/* Weather Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: index * 0.2 }}
                  className="text-3xl"
                >
                  {getWeatherIcon(day.day.condition.text)}
                </motion.div>

                {/* Temperature Range */}
                <div className="text-right">
                  <div 
                    className="text-lg font-bold"
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#111827'
                    }}
                  >
                    {maxTemp}°
                  </div>
                  <div 
                    className="text-sm"
                    style={{
                      color: theme === 'dark' ? '#9ca3af' : '#4b5563'
                    }}
                  >
                    {minTemp}°
                  </div>
                </div>

                {/* Rain/Snow Chance */}
                <div className="text-center">
                  {(rainChance > 0 || snowChance > 0) && (
                    <div 
                      className="text-xs font-medium"
                      style={{
                        background: rainChance > snowChance 
                          ? 'rgba(59, 130, 246, 0.2)' 
                          : 'rgba(6, 182, 212, 0.2)',
                        color: rainChance > snowChance 
                          ? '#93c5fd' 
                          : '#67e8f9'
                      }}
                    >
                      {rainChance > 0 && `💧 ${rainChance}%`}
                      {snowChance > 0 && `❄️ ${snowChance}%`}
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t"
                  style={{
                    borderTopColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Average Temperature */}
                    <div 
                      className="p-3 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 4px 20px rgba(31, 38, 135, 0.2)'
                      }}
                    >
                      <div 
                        className="text-xs font-medium"
                        style={{
                          color: theme === 'dark' ? '#d1d5db' : '#4b5563'
                        }}
                      >
                        Average
                      </div>
                      <div 
                        className="text-lg font-semibold"
                        style={{
                          color: theme === 'dark' ? '#ffffff' : '#111827'
                        }}
                      >
                        {avgTemp}°
                      </div>
                    </div>
                    {/* Humidity */}
                    <div 
                      className="p-3 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 4px 20px rgba(31, 38, 135, 0.2)'
                      }}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        <FiDroplet 
                          className="w-3 h-3" 
                          style={{
                            color: '#3b82f6'
                          }}
                        />
                        <span 
                          className="text-xs font-medium"
                          style={{
                            color: theme === 'dark' ? '#d1d5db' : '#4b5563'
                          }}
                        >
                          Humidity
                        </span>
                      </div>
                      <div 
                        className="text-lg font-semibold"
                        style={{
                          color: theme === 'dark' ? '#ffffff' : '#111827'
                        }}
                      >
                        {avgHumidity}%
                      </div>
                    </div>
                    {/* Wind */}
                    <div 
                      className="p-3 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 4px 20px rgba(31, 38, 135, 0.2)'
                      }}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        <FiWind 
                          className="w-3 h-3" 
                          style={{
                            color: '#10b981'
                          }}
                        />
                        <span 
                          className="text-xs font-medium"
                          style={{
                            color: theme === 'dark' ? '#d1d5db' : '#4b5563'
                          }}
                        >
                          Wind
                        </span>
                      </div>
                      <div 
                        className="text-lg font-semibold"
                        style={{
                          color: theme === 'dark' ? '#ffffff' : '#111827'
                        }}
                      >
                        {maxWind} {settings.windSpeedUnit === 'mph' ? 'mph' : 'km/h'}
                      </div>
                    </div>
                    {/* UV Index */}
                    <div 
                      className="p-3 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 4px 20px rgba(31, 38, 135, 0.2)'
                      }}
                    >
                      <div 
                        className="text-xs mb-1"
                        style={{
                          color: theme === 'dark' ? '#d1d5db' : '#4b5563'
                        }}
                      >
                        UV Index
                      </div>
                      <div 
                        className="text-lg font-semibold"
                        style={{
                          color: uvIndex <= 2
                            ? '#10b981'
                            : uvIndex <= 5
                            ? '#f59e0b'
                            : uvIndex <= 7
                            ? '#f97316'
                            : '#ef4444'
                        }}
                      >
                        {uvIndex}
                      </div>
                      <div 
                        className="text-xs"
                        style={{
                          color: theme === 'dark' ? '#9ca3af' : '#4b5563'
                        }}
                      >
                        {uvIndex <= 2 ? 'Low' : uvIndex <= 5 ? 'Moderate' : uvIndex <= 7 ? 'High' : 'Very High'}
                      </div>
                    </div>
                  </div>

                  {/* Hourly Preview */}
                  <div className="mt-4">
                    <div 
                      className="text-sm font-medium mb-2"
                      style={{
                        color: theme === 'dark' ? '#d1d5db' : '#4b5563'
                      }}
                    >
                      Hourly Preview
                    </div>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {day.hour.slice(0, 8).map((hour) => (
                        <div
                          key={hour.time}
                          className="flex-shrink-0 p-2 rounded-lg text-center"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 4px 20px rgba(31, 38, 135, 0.2)'
                          }}
                        >
                          <div 
                            className="text-xs"
                            style={{
                              color: theme === 'dark' ? '#d1d5db' : '#4b5563'
                            }}
                          >
                            {new Date(hour.time).toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              hour12: true 
                            })}
                          </div>
                          <div className="text-lg my-1">
                            {getWeatherIcon(hour.condition.text)}
                          </div>
                          <div 
                            className="text-sm font-semibold"
                            style={{
                              color: theme === 'dark' ? '#ffffff' : '#111827'
                            }}
                          >
                            {getTemperature(hour.temp_c)}°
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WeeklyForecast;
