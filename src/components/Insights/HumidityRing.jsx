import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FiDroplet } from 'react-icons/fi';

const HumidityRing = memo(({ humidity, theme }) => {
  const humidityValue = humidity || 0;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (humidityValue / 100) * circumference;

  const getHumidityColor = (value) => {
    if (value < 30) return '#ef4444';
    if (value < 50) return '#f97316';
    if (value < 70) return '#22c55e';
    if (value < 85) return '#3b82f6';
    return '#06b6d4';
  };

  const humidityColor = getHumidityColor(humidityValue);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="p-5 rounded-2xl border backdrop-blur-xl"
      style={{
        background: theme === 'dark'
          ? 'rgba(6, 182, 212, 0.08)'
          : 'rgba(255, 255, 255, 0.7)',
        border: theme === 'dark'
          ? '1px solid rgba(6, 182, 212, 0.2)'
          : '1px solid rgba(6, 182, 212, 0.15)',
        boxShadow: theme === 'dark'
          ? '0 12px 40px rgba(6, 182, 212, 0.15)'
          : '0 12px 40px rgba(6, 182, 212, 0.1)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: theme === 'dark'
              ? 'rgba(6, 182, 212, 0.2)'
              : 'rgba(6, 182, 212, 0.15)',
          }}
        >
          <FiDroplet className="w-5 h-5" style={{ color: humidityColor }} />
        </div>
        <div>
          <h3
            className="font-semibold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            Humidity
          </h3>
          <p
            className="text-sm"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            Moisture level
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          <svg width="120" height="120" className="transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
              strokeWidth="8"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={humidityColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              style={{
                filter: `drop-shadow(0 0 8px ${humidityColor}60)`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span
                className="text-3xl font-bold"
                style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
              >
                {humidityValue}
              </span>
              <span
                className="text-lg"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
              >
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Humidity Scale */}
      <div className="flex justify-between text-xs mt-4">
        <span style={{ color: '#ef4444' }}>Dry</span>
        <span style={{ color: '#f97316' }}>Low</span>
        <span style={{ color: '#22c55e' }}>Optimal</span>
        <span style={{ color: '#3b82f6' }}>High</span>
        <span style={{ color: '#06b6d4' }}>Very High</span>
      </div>
    </motion.div>
  );
});

export default HumidityRing;
