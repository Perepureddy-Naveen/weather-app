import React, { memo } from 'react';
import { motion } from 'framer-motion';
import UVMeter from './UVMeter';
import AQIMeter from './AQIMeter';
import HumidityRing from './HumidityRing';
import WindDirection from './WindDirection';
import SunriseSunset from './SunriseSunset';
import { FiActivity } from 'react-icons/fi';

const WeatherInsights = memo(({ currentWeather, airQuality, theme }) => {
  if (!currentWeather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: theme === 'dark'
              ? 'rgba(59, 130, 246, 0.2)'
              : 'rgba(59, 130, 246, 0.15)',
          }}
        >
          <FiActivity className="w-5 h-5" style={{ color: '#3b82f6' }} />
        </div>
        <div>
          <h2
            className="text-xl font-semibold"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          >
            Weather Insights
          </h2>
          <p
            className="text-sm"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            Detailed environmental metrics
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <UVMeter uv={currentWeather.uv} theme={theme} />
        <AQIMeter airQuality={airQuality} theme={theme} />
        <HumidityRing humidity={currentWeather.humidity} theme={theme} />
        <WindDirection
          windDir={currentWeather.wind_dir}
          windKph={currentWeather.wind_kph}
          theme={theme}
        />
        <SunriseSunset
          sunrise={currentWeather.sunrise}
          sunset={currentWeather.sunset}
          theme={theme}
        />
      </div>
    </motion.div>
  );
});

export default WeatherInsights;
