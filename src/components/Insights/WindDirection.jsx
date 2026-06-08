import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FiNavigation } from 'react-icons/fi';

const WindDirection = memo(({ windDir, windKph, theme }) => {
  const direction = windDir || 'N';
  const speed = windKph || 0;

  const getDirectionAngle = (dir) => {
    const directions = {
      'N': 0,
      'NNE': 22.5,
      'NE': 45,
      'ENE': 67.5,
      'E': 90,
      'ESE': 112.5,
      'SE': 135,
      'SSE': 157.5,
      'S': 180,
      'SSW': 202.5,
      'SW': 225,
      'WSW': 247.5,
      'W': 270,
      'WNW': 292.5,
      'NW': 315,
      'NNW': 337.5,
    };
    return directions[dir] || 0;
  };

  const angle = getDirectionAngle(direction);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="p-5 rounded-2xl border backdrop-blur-xl"
      style={{
        background: theme === 'dark'
          ? 'rgba(59, 130, 246, 0.08)'
          : 'rgba(255, 255, 255, 0.7)',
        border: theme === 'dark'
          ? '1px solid rgba(59, 130, 246, 0.2)'
          : '1px solid rgba(59, 130, 246, 0.15)',
        boxShadow: theme === 'dark'
          ? '0 12px 40px rgba(59, 130, 246, 0.15)'
          : '0 12px 40px rgba(59, 130, 246, 0.1)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: theme === 'dark'
              ? 'rgba(59, 130, 246, 0.2)'
              : 'rgba(59, 130, 246, 0.15)',
          }}
        >
          <FiNavigation className="w-5 h-5" style={{ color: '#3b82f6' }} />
        </div>
        <div>
          <h3
            className="font-semibold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            Wind Direction
          </h3>
          <p
            className="text-sm"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            Current wind flow
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Compass Circle */}
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center relative"
            style={{
              background: theme === 'dark'
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(59, 130, 246, 0.05)',
              border: `2px solid ${theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
            }}
          >
            {/* Direction Labels */}
            <span
              className="absolute top-1 text-xs font-bold"
              style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
            >
              N
            </span>
            <span
              className="absolute bottom-1 text-xs font-bold"
              style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
            >
              S
            </span>
            <span
              className="absolute left-1 text-xs font-bold"
              style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
            >
              W
            </span>
            <span
              className="absolute right-1 text-xs font-bold"
              style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
            >
              E
            </span>

            {/* Arrow */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: angle }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              }}
            >
              <FiNavigation className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <div className="flex items-center justify-center gap-2">
          <span
            className="text-2xl font-bold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            {direction}
          </span>
          <span
            className="text-sm"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            ({speed} km/h)
          </span>
        </div>
      </div>
    </motion.div>
  );
});

export default WindDirection;
