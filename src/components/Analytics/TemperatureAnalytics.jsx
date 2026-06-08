import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { FiTrendingUp, FiCalendar } from 'react-icons/fi';

const TemperatureAnalytics = memo(({ hourlyForecast, weeklyForecast, theme }) => {
  // Process hourly data for the chart
  const hourlyData = useMemo(() => {
    if (!hourlyForecast || hourlyForecast.length === 0) return [];

    return hourlyForecast
      .filter((_, index) => index % 3 === 0) // Show every 3rd hour to avoid overcrowding
      .map((hour) => ({
        time: new Date(hour.time).toLocaleTimeString('en-US', {
          hour: 'numeric',
          hour12: true
        }),
        temperature: Math.round(hour.temp_c),
        feelsLike: Math.round(hour.feelslike_c),
      }));
  }, [hourlyForecast]);

  // Process weekly data for the chart
  const weeklyData = useMemo(() => {
    if (!weeklyForecast || weeklyForecast.length === 0) return [];

    return weeklyForecast.map((day) => ({
      day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      maxTemp: Math.round(day.day.maxtemp_c),
      minTemp: Math.round(day.day.mintemp_c),
      avgTemp: Math.round((day.day.maxtemp_c + day.day.mintemp_c) / 2),
    }));
  }, [weeklyForecast]);

  const chartColors = {
    stroke: theme === 'dark' ? '#06b6d4' : '#3b82f6',
    fill: theme === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(59, 130, 246, 0.2)',
    grid: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    text: theme === 'dark' ? '#9ca3af' : '#6b7280',
    tooltip: {
      background: theme === 'dark' ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      border: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      text: theme === 'dark' ? '#ffffff' : '#111827',
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-4 py-3 rounded-lg shadow-xl"
          style={{
            background: chartColors.tooltip.background,
            border: `1px solid ${chartColors.tooltip.border}`,
            backdropFilter: 'blur(12px)',
          }}
        >
          <p className="text-sm font-medium mb-2" style={{ color: chartColors.tooltip.text }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: chartColors.tooltip.text }}>
              <span className="font-medium">{entry.name}:</span> {entry.value}°C
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!hourlyData.length && !weeklyData.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Hourly Temperature Chart */}
      {hourlyData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-2xl border backdrop-blur-xl"
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: theme === 'dark'
                    ? 'rgba(6, 182, 212, 0.2)'
                    : 'rgba(59, 130, 246, 0.15)',
                }}
              >
                <FiTrendingUp
                  className="w-5 h-5"
                  style={{ color: chartColors.stroke }}
                />
              </div>
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
                >
                  Hourly Temperature
                </h3>
                <p
                  className="text-sm"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
                >
                  Next 24 hours forecast
                </p>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  stroke={chartColors.text}
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke={chartColors.text}
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke={chartColors.stroke}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: chartColors.stroke,
                    stroke: chartColors.stroke,
                    strokeWidth: 2,
                  }}
                  name="Temperature"
                />
                <Line
                  type="monotone"
                  dataKey="feelsLike"
                  stroke={theme === 'dark' ? '#a855f7' : '#8b5cf6'}
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                  name="Feels Like"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Weekly Temperature Chart */}
      {weeklyData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-2xl border backdrop-blur-xl"
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: theme === 'dark'
                    ? 'rgba(168, 85, 247, 0.2)'
                    : 'rgba(168, 85, 247, 0.15)',
                }}
              >
                <FiCalendar
                  className="w-5 h-5"
                  style={{ color: theme === 'dark' ? '#a855f7' : '#8b5cf6' }}
                />
              </div>
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
                >
                  Weekly Temperature
                </h3>
                <p
                  className="text-sm"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
                >
                  7-day temperature comparison
                </p>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartColors.grid}
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke={chartColors.text}
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke={chartColors.text}
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                  domain={['dataMin - 3', 'dataMax + 3']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="maxTemp"
                  stroke={theme === 'dark' ? '#ef4444' : '#f97316'}
                  strokeWidth={2}
                  fill={theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(249, 115, 22, 0.2)'}
                  name="Max Temp"
                />
                <Area
                  type="monotone"
                  dataKey="minTemp"
                  stroke={theme === 'dark' ? '#3b82f6' : '#06b6d4'}
                  strokeWidth={2}
                  fill={theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(6, 182, 212, 0.2)'}
                  name="Min Temp"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </div>
  );
});

export default TemperatureAnalytics;
