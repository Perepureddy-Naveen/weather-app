import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiMapPin, FiSettings, FiHeart, FiSearch, FiUser, FiInfo, FiMap, FiCloud, FiX, FiChevronRight } from 'react-icons/fi';
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
  const { favorites, sidebarOpen } = useFavorites();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Handle scroll behavior for navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 20);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleLocationClick = () => {
    if (!loading) {
      getCurrentLocation();
    }
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(12px)'
        }}
        transition={{ 
          type: 'spring', 
          damping: 25, 
          stiffness: 400,
          backdropFilter: { duration: 0.3 }
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b' : ''}`}
        style={{
          background: theme === 'dark' 
            ? isScrolled
              ? 'rgba(15, 23, 42, 0.85)' 
              : 'rgba(15, 23, 42, 0.75)'
            : isScrolled
              ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,247,255,0.95), rgba(240,244,255,0.95))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,247,255,0.9), rgba(240,244,255,0.9))',
          borderBottom: theme === 'dark' 
            ? '1px solid rgba(255,255,255,0.1)' 
            : '1px solid rgba(255,255,255,0.4)',
          boxShadow: theme === 'dark' 
            ? isScrolled
              ? '0 8px 32px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.2)'
            : isScrolled
              ? '0 8px 32px rgba(31,38,135,0.12)' 
              : '0 4px 20px rgba(31,38,135,0.08)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LEFT SIDE - Logo and Title */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg`}
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    boxShadow: theme === 'dark' 
                      ? '0 4px 20px rgba(6, 182, 212, 0.4)'
                      : '0 4px 20px rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <FiCloud className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className={`text-lg sm:text-xl font-bold`}
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#1e293b',
                      background: theme === 'light' 
                        ? 'linear-gradient(135deg, #1e293b, #334155)'
                        : 'none',
                      WebkitBackgroundClip: theme === 'light' ? 'text' : 'none',
                      WebkitTextFillColor: theme === 'light' ? 'transparent' : '#ffffff'
                    }}>
                    Weather Pro
                  </h1>
                  <p className={`text-xs hidden sm:block`}
                    style={{
                      color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(71,85,105,0.8)'
                    }}>
                    Real-time Weather
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CENTER - Search Bar (Desktop Only) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <SearchBar />
              </div>
            </div>

            {/* RIGHT SIDE - Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Location Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLocationClick}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300 hidden sm:flex items-center`}
                style={{
                  background: theme === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255,255,255,0.15)' 
                    : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.2)' 
                    : '0 4px 20px rgba(31,38,135,0.1)',
                  color: theme === 'dark' ? '#ffffff' : '#1e293b'
                }}
                title="Current Location"
              >
                <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleThemeToggle}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300`}
                style={{
                  background: theme === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255,255,255,0.15)' 
                    : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.2)' 
                    : '0 4px 20px rgba(31,38,135,0.1)',
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
                onClick={() => {}}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300 hidden sm:flex`}
                style={{
                  background: theme === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255,255,255,0.15)' 
                    : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.2)' 
                    : '0 4px 20px rgba(31,38,135,0.1)',
                  color: theme === 'dark' ? '#ef4444' : '#ef4444'
                }}
                title="Favorites"
              >
                <FiHeart className="w-4 h-4" />
              </motion.button>

              {/* Map Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMap}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300 hidden sm:flex`}
                style={{
                  background: isMapVisible
                    ? theme === 'dark'
                      ? 'rgba(6, 182, 212, 0.2)'
                      : 'rgba(6, 182, 212, 0.15)'
                    : theme === 'dark'
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: isMapVisible
                    ? '1px solid rgba(6, 182, 212, 0.5)'
                    : theme === 'dark'
                      ? '1px solid rgba(255,255,255,0.15)'
                      : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.2)' 
                    : '0 4px 20px rgba(31,38,135,0.1)',
                  color: theme === 'dark' 
                    ? (isMapVisible ? '#06b6d4' : '#ffffff')
                    : (isMapVisible ? '#06b6d4' : '#1e293b')
                }}
                title="Toggle Map"
              >
                <FiMap className="w-4 h-4" />
              </motion.button>

              {/* About */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAboutClick}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300 hidden sm:flex`}
                style={{
                  background: theme === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255,255,255,0.15)' 
                    : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.2)' 
                    : '0 4px 20px rgba(31,38,135,0.1)',
                  color: theme === 'dark' ? '#06b6d4' : '#0ea5e9'
                }}
                title="About"
              >
                <FiInfo className="w-4 h-4" />
              </motion.button>

              {/* Settings */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSettingsClick}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300`}
                style={{
                  background: theme === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255,255,255,0.15)' 
                    : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.2)' 
                    : '0 4px 20px rgba(31,38,135,0.1)',
                  color: theme === 'dark' ? '#d1d5db' : '#64748b'
                }}
                title="Settings"
              >
                <FiSettings className="w-4 h-4" />
              </motion.button>

              {/* Hamburger Menu - Mobile Only */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSidebar}
                className={`p-2 rounded-xl transition-colors lg:hidden`}
                style={{
                  background: theme === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255,255,255,0.15)' 
                    : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.2)' 
                    : '0 4px 20px rgba(31,38,135,0.1)',
                  color: theme === 'dark' ? '#ffffff' : '#1e293b'
                }}
                title="Menu"
              >
                <FiMenu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Right Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{
                background: 'rgba(0, 0, 0, 0.5)'
              }}
              onClick={toggleSidebar}
            />
            
            {/* Right Sidebar Drawer */}
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className="fixed top-0 right-0 h-full w-72 z-50 lg:hidden"
              style={{
                background: theme === 'dark' 
                  ? 'rgba(15, 23, 42, 0.98)' 
                  : 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(245,247,255,0.98))',
                backdropFilter: 'blur(20px)',
                borderLeft: theme === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid rgba(255,255,255,0.6)',
                boxShadow: theme === 'dark' 
                  ? '-8px 0 32px rgba(0,0,0,0.4)' 
                  : '-8px 0 32px rgba(31,38,135,0.15)'
              }}
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b" style={{
                  borderColor: theme === 'dark' 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'rgba(255,255,255,0.6)'
                }}>
                  <div>
                    <h3 className="text-lg font-semibold" style={{
                      color: theme === 'dark' ? '#ffffff' : '#1e293b'
                    }}>
                      Menu
                    </h3>
                    <p className="text-sm" style={{
                      color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(71,85,105,0.8)'
                    }}>
                      Weather settings
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSidebar}
                    className="p-2 rounded-xl"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.1)' 
                        : 'rgba(0,0,0,0.05)',
                      border: theme === 'dark' 
                        ? '1px solid rgba(255,255,255,0.2)' 
                        : '1px solid rgba(0,0,0,0.1)',
                      color: theme === 'dark' ? '#ffffff' : '#1e293b'
                    }}
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Mobile Search */}
                <div className="p-4 border-b" style={{
                  borderColor: theme === 'dark' 
                    ? 'rgba(255,255,255,0.1)' 
                    : 'rgba(255,255,255,0.6)'
                }}>
                  <SearchBar />
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {/* Location */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLocationClick}
                    className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-all"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.08)' 
                        : 'rgba(255,255,255,0.6)',
                      border: theme === 'dark' 
                        ? '1px solid rgba(255,255,255,0.15)' 
                        : '1px solid rgba(255,255,255,0.6)',
                      color: theme === 'dark' ? '#ffffff' : '#1e293b'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <FiMapPin className="w-5 h-5" style={{color: theme === 'dark' ? '#06b6d4' : '#0ea5e9'}} />
                      <div>
                        <span className="font-medium">Current Location</span>
                        <p className="text-xs opacity-70">Get weather for your location</p>
                      </div>
                    </div>
                    <FiChevronRight className="w-4 h-4 opacity-50" />
                  </motion.button>

                  {/* Favorites */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {}}
                    className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-all"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.08)' 
                        : 'rgba(255,255,255,0.6)',
                      border: theme === 'dark' 
                        ? '1px solid rgba(255,255,255,0.15)' 
                        : '1px solid rgba(255,255,255,0.6)',
                      color: theme === 'dark' ? '#ffffff' : '#1e293b'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <FiHeart className="w-5 h-5" style={{color: '#ef4444'}} />
                      <div>
                        <span className="font-medium">Favorites</span>
                        {favorites.length > 0 && (
                          <span className="ml-2 text-xs px-2 py-1 rounded-full" style={{
                            background: '#ef4444',
                            color: 'white'
                          }}>
                            {favorites.length}
                          </span>
                        )}
                      </div>
                    </div>
                    <FiChevronRight className="w-4 h-4 opacity-50" />
                  </motion.button>

                  {/* Map View Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleMap}
                    className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-all"
                    style={{
                      background: isMapVisible 
                        ? 'rgba(6, 182, 212, 0.2)' 
                        : theme === 'dark' 
                        ? 'rgba(255,255,255,0.08)' 
                        : 'rgba(255,255,255,0.6)',
                      border: isMapVisible 
                        ? '1px solid rgba(6, 182, 212, 0.5)' 
                        : theme === 'dark' 
                        ? '1px solid rgba(255,255,255,0.15)' 
                        : '1px solid rgba(255,255,255,0.6)',
                      color: theme === 'dark' 
                        ? (isMapVisible ? '#06b6d4' : '#ffffff')
                        : (isMapVisible ? '#06b6d4' : '#1e293b')
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <FiMap className="w-5 h-5" />
                      <div>
                        <span className="font-medium">Map View</span>
                        <p className="text-xs opacity-70">{isMapVisible ? 'Hide' : 'Show'} weather map</p>
                      </div>
                    </div>
                    <FiChevronRight className="w-4 h-4 opacity-50" />
                  </motion.button>

                  {/* Theme Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleThemeToggle}
                    className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-all"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.08)' 
                        : 'rgba(255,255,255,0.6)',
                      border: theme === 'dark' 
                        ? '1px solid rgba(255,255,255,0.15)' 
                        : '1px solid rgba(255,255,255,0.6)',
                      color: theme === 'dark' ? '#ffffff' : '#1e293b'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {theme === 'dark' ? <FiSun className="w-5 h-5" style={{color: '#fbbf24'}} /> : <FiMoon className="w-5 h-5" style={{color: '#f59e0b'}} />}
                      <div>
                        <span className="font-medium">Theme</span>
                        <p className="text-xs opacity-70">{theme === 'dark' ? 'Light' : 'Dark'} mode</p>
                      </div>
                    </div>
                    <FiChevronRight className="w-4 h-4 opacity-50" />
                  </motion.button>

                  {/* About */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onAboutClick}
                    className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-all"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.08)' 
                        : 'rgba(255,255,255,0.6)',
                      border: theme === 'dark' 
                        ? '1px solid rgba(255,255,255,0.15)' 
                        : '1px solid rgba(255,255,255,0.6)',
                      color: theme === 'dark' ? '#ffffff' : '#1e293b'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <FiInfo className="w-5 h-5" style={{color: theme === 'dark' ? '#06b6d4' : '#0ea5e9'}} />
                      <div>
                        <span className="font-medium">About</span>
                        <p className="text-xs opacity-70">App information</p>
                      </div>
                    </div>
                    <FiChevronRight className="w-4 h-4 opacity-50" />
                  </motion.button>

                  {/* Settings */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSettingsClick}
                    className="w-full flex items-center justify-between p-4 rounded-xl text-left transition-all"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255,255,255,0.08)' 
                        : 'rgba(255,255,255,0.6)',
                      border: theme === 'dark' 
                        ? '1px solid rgba(255,255,255,0.15)' 
                        : '1px solid rgba(255,255,255,0.6)',
                      color: theme === 'dark' ? '#ffffff' : '#1e293b'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <FiSettings className="w-5 h-5" style={{color: theme === 'dark' ? '#d1d5db' : '#64748b'}} />
                      <div>
                        <span className="font-medium">Settings</span>
                        <p className="text-xs opacity-70">App preferences</p>
                      </div>
                    </div>
                    <FiChevronRight className="w-4 h-4 opacity-50" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Dropdown */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-16 w-64 rounded-xl shadow-xl border z-50"
            style={{
              background: theme === 'dark' 
                ? 'rgba(15, 23, 42, 0.95)' 
                : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,247,255,0.95))',
              backdropFilter: 'blur(12px)',
              border: theme === 'dark' 
                ? '1px solid rgba(255,255,255,0.1)' 
                : '1px solid rgba(255,255,255,0.6)',
              boxShadow: theme === 'dark' 
                ? '0 20px 40px rgba(0,0,0,0.4)' 
                : '0 20px 40px rgba(31,38,135,0.15)'
            }}
          >
            <div className="p-4">
              <h3 className="font-semibold mb-3" style={{
                color: theme === 'dark' ? '#ffffff' : '#1e293b'
              }}>
                Quick Settings
              </h3>
              <div className="space-y-2">
                <button
                  className="w-full text-left px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: theme === 'dark' 
                      ? 'transparent' 
                      : 'transparent',
                    color: theme === 'dark' 
                      ? '#d1d5db' 
                      : '#64748b',
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
                  className="w-full text-left px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: theme === 'dark' 
                      ? 'transparent' 
                      : 'transparent',
                    color: theme === 'dark' 
                      ? '#d1d5db' 
                      : '#64748b',
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
                  className="w-full text-left px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: theme === 'dark' 
                      ? 'transparent' 
                      : 'transparent',
                    color: theme === 'dark' 
                      ? '#d1d5db' 
                      : '#64748b',
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
      </AnimatePresence>
    </>
  );
};

export default Navbar;
