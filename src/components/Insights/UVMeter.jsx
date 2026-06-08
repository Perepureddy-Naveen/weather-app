import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FiSun } from 'react-icons/fi';

const UVMeter = memo(({ uv, theme }) => {
  const uvValue = uv || 0;
  
  const getUVLevel = (value) => {
    if (value <= 2) return { level: 'Low', color: '#22c55e', percentage: 20 };
    if (value <= 5) return { level: 'Moderate', color: '#eab308', percentage: 40 };
    if (value <= 7) return { level: 'High', color: '#f97316', percentage: 60 };
    if (value <= 10) return { level: 'Very High', color: '#ef4444', percentage: 80 };
    return { level: 'Extreme', color: '#7c3aed', percentage: 100 };
  };

  const uvInfo = getUVLevel(uvValue);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-5 rounded-2xl border backdrop-blur-xl"
      style={{
        background: theme === 'dark'
          ? 'rgba(168, 85, 247, 0.08)'
          : 'rgba(255, 255, 255, 0.7)',
        border: theme === 'dark'
          ? '1px solid rgba(168, 85, 247, 0.2)'
          : '1px solid rgba(168, 85, 247, 0.15)',
        boxShadow: theme === 'dark'
          ? '0 12px 40px rgba(168, 85, 247, 0.15)'
          : '0 12px 40px rgba(168, 85, 247, 0.1)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: theme === 'dark'
              ? 'rgba(168, 85, 247, 0.2)'
              : 'rgba(168, 85, 247, 0.15)',
          }}
        >
          <FiSun className="w-5 h-5" style={{ color: uvInfo.color }} />
        </div>
        <div>
          <h3
            className="font-semibold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            UV Index
          </h3>
          <p
            className="text-sm"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            {uvInfo.level}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <span
            className="text-3xl font-bold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            {uvValue}
          </span>
          <span
            className="text-sm mb-1"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            of 11
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
            animate={{ width: `${Math.min(uvInfo.percentage, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${uvInfo.color}, ${uvInfo.color}dd)`,
              boxShadow: `0 0 20px ${uvInfo.color}40`,
            }}
          />
        </div>

        {/* UV Scale */}
        <div className="flex justify-between text-xs mt-2">
          <span style={{ color: '#22c55e' }}>Low</span>
          <span style={{ color: '#eab308' }}>Mod</span>
          <span style={{ color: '#f97316' }}>High</span>
          <span style={{ color: '#ef4444' }}>V.High</span>
          <span style={{ color: '#7c3aed' }}>Ext</span>
        </div>
      </div>
    </motion.div>
  );
});

export default UVMeter;
