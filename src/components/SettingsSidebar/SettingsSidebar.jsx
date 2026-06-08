import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiSettings,
  FiSun,
  FiMoon,
  FiMonitor,
  FiThermometer,
  FiWind,
  FiMapPin,
  FiPlay,
  FiGrid,
  FiZap
} from 'react-icons/fi';
import { useWeather } from '../../context/WeatherContext';

const SettingsSidebar = () => {
  const {
    sidebarOpen,
    toggleSidebar,
    theme,
    setTheme,
    settings,
    updateSettings,
  } = useWeather();

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        toggleSidebar();
      }
    };

    if (sidebarOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [sidebarOpen, toggleSidebar]);

  const handleSettingChange = (key, value) => {
    updateSettings({ [key]: value });
  };

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const ToggleSwitch = ({ enabled, onChange, label }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
        enabled
          ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
          : theme === 'dark'
            ? 'bg-gray-700'
            : 'bg-gray-300'
      }`}
      style={{
        boxShadow: enabled ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
      }}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-5 h-5 rounded-full absolute top-0.5 bg-white shadow-md"
      />
    </motion.button>
  );

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-full md:w-96 z-50 border-l shadow-2xl backdrop-blur-xl overflow-hidden`}
            style={{
              background: theme === 'dark'
                ? 'rgba(17,24,39,0.95)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,247,255,0.9))',
              borderLeftColor: theme === 'dark' ? 'rgba(75,85,99,0.5)' : 'rgba(255,255,255,0.7)',
              boxShadow: theme === 'dark'
                ? '0 0 50px rgba(0,0,0,0.5)'
                : '0 0 50px rgba(99,102,241,0.15)'
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className={`flex items-center justify-between p-6 border-b backdrop-blur-sm`}
                style={{
                  borderBottomColor: theme === 'dark' ? 'rgba(75,85,99,0.5)' : 'rgba(255,255,255,0.7)',
                  background: theme === 'dark' ? 'rgba(31,41,55,0.5)' : 'rgba(255,255,255,0.6)'
                }}>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: theme === 'dark'
                        ? 'rgba(59, 130, 246, 0.2)'
                        : 'rgba(59, 130, 246, 0.15)',
                    }}
                  >
                    <FiSettings className="w-5 h-5" style={{ color: '#3b82f6' }} />
                  </div>
                  <h2 className={`text-lg font-semibold`}
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#111827'
                    }}>
                    Settings
                  </h2>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSidebar}
                  className={`p-2 rounded-lg transition-all duration-200`}
                  style={{
                    background: theme === 'dark'
                      ? 'rgba(75,85,99,0.3)'
                      : 'rgba(255,255,255,0.6)',
                    color: theme === 'dark' ? '#d1d5db' : '#6b7280',
                    border: theme === 'dark'
                      ? '1px solid rgba(75,85,99,0.5)'
                      : '1px solid rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <FiX className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Theme Mode */}
                <div className="space-y-3">
                  <h3 className={`font-medium flex items-center gap-2`}
                    style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                    <FiSun className="w-4 h-4" style={{ color: '#fbbf24' }} />
                    Theme Mode
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'light', label: 'Light', icon: FiSun },
                      { value: 'dark', label: 'Dark', icon: FiMoon },
                      { value: 'system', label: 'System', icon: FiMonitor }
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTheme(option.value)}
                        className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all duration-200 ${
                          theme === option.value
                            ? 'ring-2 ring-blue-500'
                            : ''
                        }`}
                        style={{
                          background: theme === option.value
                            ? 'rgba(59, 130, 246, 0.2)'
                            : theme === 'dark'
                              ? 'rgba(75,85,99,0.3)'
                              : 'rgba(255,255,255,0.6)',
                          border: theme === 'dark'
                            ? '1px solid rgba(75,85,99,0.5)'
                            : '1px solid rgba(255,255,255,0.7)',
                          color: theme === 'dark' ? '#ffffff' : '#111827',
                        }}
                      >
                        <option.icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Temperature Unit */}
                <div className="space-y-3">
                  <h3 className={`font-medium flex items-center gap-2`}
                    style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                    <FiThermometer className="w-4 h-4" style={{ color: '#ef4444' }} />
                    Temperature Unit
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'celsius', label: 'Celsius (°C)' },
                      { value: 'fahrenheit', label: 'Fahrenheit (°F)' }
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSettingChange('temperatureUnit', option.value)}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          settings.temperatureUnit === option.value
                            ? 'ring-2 ring-blue-500'
                            : ''
                        }`}
                        style={{
                          background: settings.temperatureUnit === option.value
                            ? 'rgba(59, 130, 246, 0.2)'
                            : theme === 'dark'
                              ? 'rgba(75,85,99,0.3)'
                              : 'rgba(255,255,255,0.6)',
                          border: theme === 'dark'
                            ? '1px solid rgba(75,85,99,0.5)'
                            : '1px solid rgba(255,255,255,0.7)',
                          color: theme === 'dark' ? '#ffffff' : '#111827',
                        }}
                      >
                        <span className="text-sm font-medium">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Wind Speed Unit */}
                <div className="space-y-3">
                  <h3 className={`font-medium flex items-center gap-2`}
                    style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                    <FiWind className="w-4 h-4" style={{ color: '#3b82f6' }} />
                    Wind Speed Unit
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'kmh', label: 'km/h' },
                      { value: 'mph', label: 'mph' }
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSettingChange('windSpeedUnit', option.value)}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          settings.windSpeedUnit === option.value
                            ? 'ring-2 ring-blue-500'
                            : ''
                        }`}
                        style={{
                          background: settings.windSpeedUnit === option.value
                            ? 'rgba(59, 130, 246, 0.2)'
                            : theme === 'dark'
                              ? 'rgba(75,85,99,0.3)'
                              : 'rgba(255,255,255,0.6)',
                          border: theme === 'dark'
                            ? '1px solid rgba(75,85,99,0.5)'
                            : '1px solid rgba(255,255,255,0.7)',
                          color: theme === 'dark' ? '#ffffff' : '#111827',
                        }}
                      >
                        <span className="text-sm font-medium">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Auto Location */}
                <div className="flex items-center justify-between p-4 rounded-xl"
                  style={{
                    background: theme === 'dark'
                      ? 'rgba(75,85,99,0.3)'
                      : 'rgba(255,255,255,0.6)',
                    border: theme === 'dark'
                      ? '1px solid rgba(75,85,99,0.5)'
                      : '1px solid rgba(255,255,255,0.7)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FiMapPin className="w-5 h-5" style={{ color: '#10b981' }} />
                    <div>
                      <div className={`font-medium text-sm`}
                        style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                        Auto Location
                      </div>
                      <div className={`text-xs`}
                        style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        Detect location on startup
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.autoLocation}
                    onChange={(value) => handleSettingChange('autoLocation', value)}
                  />
                </div>

                {/* Weather Animations */}
                <div className="flex items-center justify-between p-4 rounded-xl"
                  style={{
                    background: theme === 'dark'
                      ? 'rgba(75,85,99,0.3)'
                      : 'rgba(255,255,255,0.6)',
                    border: theme === 'dark'
                      ? '1px solid rgba(75,85,99,0.5)'
                      : '1px solid rgba(255,255,255,0.7)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FiZap className="w-5 h-5" style={{ color: '#f59e0b' }} />
                    <div>
                      <div className={`font-medium text-sm`}
                        style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                        Weather Animations
                      </div>
                      <div className={`text-xs`}
                        style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        Enable background effects
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.animations !== false}
                    onChange={(value) => handleSettingChange('animations', value)}
                  />
                </div>

                {/* Default Map Mode */}
                <div className="space-y-3">
                  <h3 className={`font-medium flex items-center gap-2`}
                    style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                    <FiGrid className="w-4 h-4" style={{ color: '#8b5cf6' }} />
                    Default Map Mode
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'dashboard', label: 'Dashboard Only' },
                      { value: 'split', label: 'Split Screen' }
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSettingChange('defaultMapMode', option.value)}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          settings.defaultMapMode === option.value
                            ? 'ring-2 ring-blue-500'
                            : ''
                        }`}
                        style={{
                          background: settings.defaultMapMode === option.value
                            ? 'rgba(59, 130, 246, 0.2)'
                            : theme === 'dark'
                              ? 'rgba(75,85,99,0.3)'
                              : 'rgba(255,255,255,0.6)',
                          border: theme === 'dark'
                            ? '1px solid rgba(75,85,99,0.5)'
                            : '1px solid rgba(255,255,255,0.7)',
                          color: theme === 'dark' ? '#ffffff' : '#111827',
                        }}
                      >
                        <span className="text-sm font-medium">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={`p-4 border-t`}
                style={{
                  borderColor: theme === 'dark'
                    ? 'rgba(75,85,99,0.5)'
                    : 'rgba(255,255,255,0.7)',
                  background: theme === 'dark'
                    ? 'rgba(31,41,55,0.5)'
                    : 'rgba(255,255,255,0.6)'
                }}>
                <div className={`text-xs text-center`}
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Settings are saved automatically
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsSidebar;
