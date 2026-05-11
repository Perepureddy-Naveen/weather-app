import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiMapPin, FiSettings, FiHeart, FiSearch, FiUser, FiInfo, FiMap, FiCloud } from 'react-icons/fi';
import { useWeather } from '../../context/WeatherContext';
import { useFavorites } from '../../context/FavoritesContext';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ onAboutClick }) => {
  const { 
    theme, 
    setTheme, 
    toggleSidebar, 
    getCurrentLocation, 
    loading, 
    isMapVisible, 
    toggleMap,
    selectedCity 
  } = useWeather();
  const { favorites, sidebarOpen, toggleSidebar: toggleFavoritesSidebar } = useFavorites();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleLocationClick = () => {
    if (!loading) {
      getCurrentLocation();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300`}
      style={{
        background: theme === 'dark' 
          ? 'rgba(255,255,255,0.06)' 
          : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(18px)',
        borderBottom: theme === 'dark' 
          ? '1px solid rgba(255,255,255,0.1)' 
          : '1px solid rgba(255,255,255,0.4)',
        boxShadow: theme === 'dark' 
          ? '0 4px 20px rgba(0,0,0,0.3)' 
          : '0 4px 20px rgba(15,23,42,0.08)'
      }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* LEFT SIDE - Logo and Title */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`}
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)'
                }}
              >
                <FiCloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold`}
                  style={{
                    color: theme === 'dark' ? '#ffffff' : 'var(--light-text-primary)'
                  }}>
                  Weather Pro
                </h1>
                <p className={`text-xs`}
                  style={{
                    color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'var(--light-text-secondary)'
                  }}>
                  Real-time Weather Dashboard
                </p>
              </div>
            </motion.div>
          </div>

          {/* CENTER - Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* RIGHT SIDE - Action Buttons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Location + City Name */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer`}
              onClick={handleLocationClick}
              style={{
                background: theme === 'dark' 
                  ? 'rgba(255,255,255,0.06)' 
                  : 'var(--light-bg-glass)',
                backdropFilter: 'blur(8px)',
                border: theme === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid var(--light-border)',
                boxShadow: theme === 'dark' 
                  ? '0 4px 20px rgba(0,0,0,0.2)' 
                  : 'var(--light-shadow)'
              }}
            >
              <FiMapPin className={`w-4 h-4`}
                style={{
                  color: theme === 'dark' ? '#06b6d4' : 'var(--light-accent)'
                }} />
              <span className={`text-sm font-medium`}
                style={{
                  color: theme === 'dark' ? '#ffffff' : 'var(--light-text-primary)'
                }}>
                {selectedCity?.name || 'Location'}
              </span>
            </motion.div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeToggle}
              className={`p-2.5 rounded-lg transition-all duration-300`}
              style={{
                background: theme === 'dark' 
                  ? 'rgba(255,255,255,0.06)' 
                  : 'var(--light-bg-glass)',
                backdropFilter: 'blur(8px)',
                border: theme === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid var(--light-border)',
                boxShadow: theme === 'dark' 
                  ? '0 4px 20px rgba(0,0,0,0.2)' 
                  : 'var(--light-shadow)',
                color: theme === 'dark' ? '#fbbf24' : '#f59e0b'
              }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </motion.button>

            {/* Favorites */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFavoritesSidebar}
              className={`p-2.5 rounded-lg transition-all duration-300 relative`}
              style={{
                background: theme === 'dark' 
                  ? 'rgba(255,255,255,0.06)' 
                  : 'var(--light-bg-glass)',
                backdropFilter: 'blur(8px)',
                border: theme === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid var(--light-border)',
                boxShadow: theme === 'dark' 
                  ? '0 4px 20px rgba(0,0,0,0.2)' 
                  : 'var(--light-shadow)',
                color: theme === 'dark' ? '#ef4444' : '#ef4444'
              }}
              title="Favorites"
            >
              <FiHeart className="w-4 h-4" />
              {favorites.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center`}
                  style={{
                    background: '#ef4444',
                    color: 'white'
                  }}
                >
                  {favorites.length > 9 ? '9+' : favorites.length}
                </motion.span>
              )}
            </motion.button>

            {/* Map View Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMap}
              className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2`}
              style={{
                background: isMapVisible 
                  ? 'rgba(6, 182, 212, 0.2)' 
                  : theme === 'dark' 
                  ? 'rgba(255,255,255,0.06)' 
                  : 'var(--light-bg-glass)',
                backdropFilter: 'blur(8px)',
                border: isMapVisible 
                  ? '1px solid rgba(6, 182, 212, 0.5)' 
                  : theme === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid var(--light-border)',
                boxShadow: isMapVisible 
                  ? '0 0 20px rgba(6, 182, 212, 0.3)' 
                  : theme === 'dark' 
                  ? '0 4px 20px rgba(0,0,0,0.2)' 
                  : 'var(--light-shadow)',
                color: isMapVisible 
                  ? '#06b6d4' 
                  : theme === 'dark' 
                  ? '#d1d5db' 
                  : 'var(--light-text-primary)'
              }}
              title={isMapVisible ? "Hide Map" : "Show Map"}
            >
              <FiMap className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isMapVisible ? "Map View" : "Weather"}
              </span>
            </motion.button>

            {/* About */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAboutClick}
              className={`p-2.5 rounded-lg transition-all duration-300`}
              style={{
                background: theme === 'dark' 
                  ? 'rgba(255,255,255,0.06)' 
                  : 'var(--light-bg-glass)',
                backdropFilter: 'blur(8px)',
                border: theme === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid var(--light-border)',
                boxShadow: theme === 'dark' 
                  ? '0 4px 20px rgba(0,0,0,0.2)' 
                  : 'var(--light-shadow)',
                color: theme === 'dark' ? '#06b6d4' : 'var(--light-accent)'
              }}
              title="About"
            >
              <FiInfo className="w-4 h-4" />
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2.5 rounded-lg transition-all duration-300`}
              style={{
                background: theme === 'dark' 
                  ? 'rgba(255,255,255,0.06)' 
                  : 'var(--light-bg-glass)',
                backdropFilter: 'blur(8px)',
                border: theme === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid var(--light-border)',
                boxShadow: theme === 'dark' 
                  ? '0 4px 20px rgba(0,0,0,0.2)' 
                  : 'var(--light-shadow)',
                color: theme === 'dark' ? '#d1d5db' : 'var(--light-text-primary)'
              }}
              title="Settings"
            >
              <FiSettings className="w-5 h-5" />
            </motion.button>

            {/* Menu Button (Mobile) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              className={`p-2 rounded-lg transition-colors md:hidden`}
              style={{
                background: theme === 'dark' 
                  ? 'rgba(255,255,255,0.06)' 
                  : 'var(--light-bg-glass)',
                backdropFilter: 'blur(8px)',
                border: theme === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid var(--light-border)',
                boxShadow: theme === 'dark' 
                  ? '0 4px 20px rgba(0,0,0,0.2)' 
                  : 'var(--light-shadow)',
                color: theme === 'dark' ? '#d1d5db' : 'var(--light-text-primary)'
              }}
              title="Menu"
            >
              <FiMenu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Settings Dropdown */}
      {isSettingsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute right-4 top-16 w-64 rounded-xl shadow-xl border`}
          style={{
            background: theme === 'dark' 
              ? 'rgba(31,41,55,0.95)' 
              : 'var(--light-bg-secondary)',
            backdropFilter: 'blur(12px)',
            border: theme === 'dark' 
              ? '1px solid rgba(255,255,255,0.1)' 
              : '1px solid var(--light-border)',
            boxShadow: theme === 'dark' 
              ? '0 20px 40px rgba(0,0,0,0.4)' 
              : 'var(--light-shadow-hover)'
          }}
        >
          <div className="p-4">
            <h3 className={`font-semibold mb-3`}
              style={{
                color: theme === 'dark' ? '#ffffff' : 'var(--light-text-primary)'
              }}>
              Quick Settings
            </h3>
            <div className="space-y-2">
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors`}
                style={{
                  background: theme === 'dark' 
                    ? 'transparent' 
                    : 'transparent',
                  color: theme === 'dark' 
                    ? '#d1d5db' 
                    : 'var(--light-text-secondary)',
                  borderRadius: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = theme === 'dark' 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'rgba(59,130,246,0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                Temperature Unit
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors`}
                style={{
                  background: theme === 'dark' 
                    ? 'transparent' 
                    : 'transparent',
                  color: theme === 'dark' 
                    ? '#d1d5db' 
                    : 'var(--light-text-secondary)',
                  borderRadius: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = theme === 'dark' 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'rgba(59,130,246,0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                Wind Speed Unit
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors`}
                style={{
                  background: theme === 'dark' 
                    ? 'transparent' 
                    : 'transparent',
                  color: theme === 'dark' 
                    ? '#d1d5db' 
                    : 'var(--light-text-secondary)',
                  borderRadius: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = theme === 'dark' 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'rgba(59,130,246,0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                Notifications
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
