import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FiWind } from 'react-icons/fi';

const AQIMeter = memo(({ airQuality, theme }) => {
  const aqiValue = airQuality?.['us-epa-index'] || 0;
  
  const getAQILevel = (value) => {
    if (value <= 50) return { level: 'Good', color: '#22c55e', percentage: 20 };
    if (value <= 100) return { level: 'Moderate', color: '#eab308', percentage: 40 };
    if (value <= 150) return { level: 'Unhealthy for Sensitive', color: '#f97316', percentage: 60 };
    if (value <= 200) return { level: 'Unhealthy', color: '#ef4444', percentage: 80 };
    if (value <= 300) return { level: 'Very Unhealthy', color: '#7c3aed', percentage: 90 };
    return { level: 'Hazardous', color: '#dc2626', percentage: 100 };
  };

  const aqiInfo = getAQILevel(aqiValue);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="p-5 rounded-2xl border backdrop-blur-xl"
      style={{
        background: theme === 'dark'
          ? 'rgba(34, 197, 94, 0.08)'
          : 'rgba(255, 255, 255, 0.7)',
        border: theme === 'dark'
          ? '1px solid rgba(34, 197, 94, 0.2)'
          : '1px solid rgba(34, 197, 94, 0.15)',
        boxShadow: theme === 'dark'
          ? '0 12px 40px rgba(34, 197, 94, 0.15)'
          : '0 12px 40px rgba(34, 197, 94, 0.1)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: theme === 'dark'
              ? 'rgba(34, 197, 94, 0.2)'
              : 'rgba(34, 197, 94, 0.15)',
          }}
        >
          <FiWind className="w-5 h-5" style={{ color: aqiInfo.color }} />
        </div>
        <div>
          <h3
            className="font-semibold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            Air Quality
          </h3>
          <p
            className="text-sm"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            {aqiInfo.level}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <span
            className="text-3xl font-bold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            {aqiValue}
          </span>
          <span
            className="text-sm mb-1"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            US EPA
          </span>
        </div>

        {/* Progress Bar */}
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
            animate={{ width: `${Math.min(aqiInfo.percentage, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${aqiInfo.color}, ${aqiInfo.color}dd)`,
              boxShadow: `0 0 20px ${aqiInfo.color}40`,
            }}
          />
        </div>

        {/* AQI Scale */}
        <div className="flex justify-between text-xs mt-2">
          <span style={{ color: '#22c55e' }}>Good</span>
          <span style={{ color: '#eab308' }}>Mod</span>
          <span style={{ color: '#f97316' }}>Sens.</span>
          <span style={{ color: '#ef4444' }}>Unh.</span>
          <span style={{ color: '#7c3aed' }}>V.Unh</span>
        </div>
      </div>
    </motion.div>
  );
});

export default AQIMeter;
