import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FiSunrise, FiSunset } from 'react-icons/fi';

const SunriseSunset = memo(({ sunrise, sunset, theme }) => {
  const formatTime = (timeStr) => {
    if (!timeStr) return '--:--';
    try {
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  const sunriseTime = formatTime(sunrise);
  const sunsetTime = formatTime(sunset);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="p-5 rounded-2xl border backdrop-blur-xl"
      style={{
        background: theme === 'dark'
          ? 'rgba(251, 146, 60, 0.08)'
          : 'rgba(255, 255, 255, 0.7)',
        border: theme === 'dark'
          ? '1px solid rgba(251, 146, 60, 0.2)'
          : '1px solid rgba(251, 146, 60, 0.15)',
        boxShadow: theme === 'dark'
          ? '0 12px 40px rgba(251, 146, 60, 0.15)'
          : '0 12px 40px rgba(251, 146, 60, 0.1)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: theme === 'dark'
              ? 'rgba(251, 146, 60, 0.2)'
              : 'rgba(251, 146, 60, 0.15)',
          }}
        >
          <FiSunrise className="w-5 h-5" style={{ color: '#fb923c' }} />
        </div>
        <div>
          <h3
            className="font-semibold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            Sunrise & Sunset
          </h3>
          <p
            className="text-sm"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            Daylight hours
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Sunrise */}
        <div className="flex items-center justify-between p-3 rounded-xl"
          style={{
            background: theme === 'dark'
              ? 'rgba(251, 146, 60, 0.1)'
              : 'rgba(251, 146, 60, 0.05)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #fb923c, #f59e0b)',
                boxShadow: '0 0 15px rgba(251, 146, 60, 0.4)',
              }}
            >
              <FiSunrise className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-medium"
              style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
            >
              Sunrise
            </span>
          </div>
          <span
            className="text-lg font-bold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            {sunriseTime}
          </span>
        </div>

        {/* Sunset */}
        <div className="flex items-center justify-between p-3 rounded-xl"
          style={{
            background: theme === 'dark'
              ? 'rgba(251, 146, 60, 0.1)'
              : 'rgba(251, 146, 60, 0.05)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #dc2626)',
                boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)',
              }}
            >
              <FiSunset className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-medium"
              style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
            >
              Sunset
            </span>
          </div>
          <span
            className="text-lg font-bold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            {sunsetTime}
          </span>
        </div>

        {/* Daylight Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Daylight progress
            </span>
            <span style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              ~12h
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{
              background: theme === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #fb923c, #dc2626)',
                boxShadow: '0 0 15px rgba(251, 146, 60, 0.5)',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default SunriseSunset;
