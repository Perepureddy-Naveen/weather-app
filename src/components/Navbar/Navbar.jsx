import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiMapPin, FiSettings, FiHeart, FiSearch, FiUser, FiInfo, FiMap, FiCloud, FiX, FiChevronRight, FiSliders } from 'react-icons/fi';
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
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Mobile search state
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Handle ESC key to close quick actions panel
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isQuickActionsOpen) {
        setIsQuickActionsOpen(false);
      }
    };

    if (isQuickActionsOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isQuickActionsOpen]);

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

  // Mobile search handlers
  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    setIsSearchExpanded(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setIsSearchExpanded(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
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
              ? 'rgba(15, 23, 42, 0.9)' 
              : 'rgba(15, 23, 42, 0.8)'
            : isScrolled
              ? 'rgba(255,255,255,0.85)' 
              : 'rgba(255,255,255,0.75)',
          borderBottom: theme === 'dark' 
            ? '1px solid rgba(255,255,255,0.15)' 
            : '1px solid rgba(255,255,255,0.5)',
          boxShadow: theme === 'dark' 
            ? '0 12px 40px rgba(15,23,42,0.12)' 
            : '0 12px 40px rgba(15,23,42,0.08)',
          backdropFilter: isScrolled ? 'blur(24px)' : 'blur(16px)'
        }}
      >
        <div className="container mx-auto px-2.5 sm:px-6 lg:px-8">
          {/* MOBILE NAVBAR - Single Row */}
          <div className="flex items-center justify-between w-full h-16 lg:hidden overflow-x-hidden">
            {/* LEFT - Logo */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center`}
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    boxShadow: theme === 'dark' 
                      ? '0 4px 20px rgba(6, 182, 212, 0.4)' 
                      : '0 4px 20px rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <FiCloud className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col items-center">
                  <h1 className={`text-xs font-bold`} style={{ color: theme === 'dark' ? '#ffffff' : '#1e293b' }}>Weather</h1>
                  <p className={`text-xs`} style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(71,85,105,0.8)' }}>Forecast</p>
                </div>
              </motion.div>
            </div>

            {/* CENTER - Expandable Search */}
            <div className="flex-1 justify-center mx-2">
              <motion.div
                animate={{ 
                  width: isSearchExpanded ? 'calc(100vw - 130px)' : '150px',
                  height: '42px'
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="relative"
                style={{
                  background: isSearchExpanded
                    ? 'rgba(255,255,255,0.92)' 
                    : 'rgba(255,255,255,0.58)',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: isSearchExpanded
                    ? '0 12px 40px rgba(79,70,229,0.15)' 
                    : '0 4px 16px rgba(99,102,241,0.08)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search city..."
                  className="w-full h-full px-4 pr-10 bg-transparent outline-none"
                  style={{
                    color: theme === 'dark' ? '#ffffff' : '#1e293b',
                    fontSize: '14px'
                  }}
                />
                <FiSearch 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{
                    color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6b7280'
                  }}
                />
                {searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSearchClear}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center"
                    style={{
                      color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6b7280'
                    }}
                  >
                    <FiX />
                  </motion.button>
                )}

                {/* Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 z-50"
                      style={{
                        background: 'rgba(255,255,255,0.82)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        boxShadow: '0 20px 50px rgba(15,23,42,0.12)'
                      }}
                    >
                      <div className="p-4">
                        <div className="text-xs font-medium mb-2" style={{ color: '#6b7280' }}>Recent Searches</div>
                        <div className="space-y-2">
                          {['New York', 'London', 'Tokyo', 'Paris'].map((city, index) => (
                            <motion.div
                              key={city}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => handleSuggestionClick(city)}
                              className="p-2 rounded-lg cursor-pointer"
                              style={{
                                background: 'rgba(255,255,255,0.6)',
                                color: '#1e293b'
                              }}
                            >
                              {city}
                            </motion.div>
                          ))}
                        </div>
                        <div className="text-xs font-medium mb-2" style={{ color: '#6b7280' }}>Current Location</div>
                        <motion.div
                              whileHover={{ scale: 1.02 }}
                              onClick={() => handleSuggestionClick('Current Location')}
                              className="p-2 rounded-lg cursor-pointer"
                              style={{
                                background: 'rgba(255,255,255,0.6)',
                                color: '#1e293b'
                              }}
                            >
                              <FiMapPin className="w-4 h-4" />
                              <span className="ml-2">Current Location</span>
                            </motion.div>
                        <div className="text-xs font-medium mb-2" style={{ color: '#6b7280' }}>Popular Cities</div>
                        <div className="space-y-2">
                          {['Dubai', 'Singapore', 'Hong Kong'].map((city, index) => (
                            <motion.div
                              key={city}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => handleSuggestionClick(city)}
                              className="p-2 rounded-lg cursor-pointer"
                              style={{
                                background: 'rgba(255,255,255,0.6)',
                                color: '#1e293b'
                              }}
                            >
                              {city}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* RIGHT - Quick Actions + Menu */}
            <div className="flex items-center space-x-3">
              {/* Quick Actions Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsQuickActionsOpen(true)}
                className={`p-2 rounded-xl transition-all duration-300`}
                style={{
                  background: theme === 'dark' 
                    ? 'rgba(255,255,255,0.55)' 
                    : 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(8px)',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255,255,255,0.6)' 
                    : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: theme === 'dark' 
                    ? '0 6px 18px rgba(79,70,229,0.08)' 
                    : '0 6px 18px rgba(79,70,229,0.08)',
                  color: theme === 'dark' ? '#ffffff' : '#1e293b'
                }}
              >
                <FiSliders className="w-4 h-4" />
              </motion.button>

              {/* Hamburger Menu */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSidebar}
                className={`p-2 rounded-xl transition-all duration-300`}
                style={{
                  background: theme === 'dark' 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255,255,255,0.6)' 
                    : '1px solid rgba(255,255,255,0.6)',
                  boxShadow: theme === 'dark' 
                    ? '0 6px 18px rgba(79,70,229,0.08)' 
                    : '0 6px 18px rgba(79,70,229,0.08)',
                  color: theme === 'dark' ? '#ffffff' : '#1e293b'
                }}
              >
                <FiMenu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* MOBILE QUICK-ACTION SIDE-SHEET */}
          <AnimatePresence>
            {isQuickActionsOpen && (
              <>
                {/* Premium Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-40 lg:hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    backdropFilter: 'blur(2px)',
                    WebkitBackdropFilter: 'blur(2px)'
                  }}
                  onClick={() => setIsQuickActionsOpen(false)}
                />
                
                {/* Premium Floating Side-Sheet */}
                <motion.div
                  initial={{ opacity: 0, transform: 'translateY(-8px) scale(0.96)' }}
                  animate={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
                  exit={{ opacity: 0, transform: 'translateY(-8px) scale(0.96)' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="fixed z-50 lg:hidden"
                  style={{
                    top: '76px',
                    right: '16px',
                    width: '88vw',
                    maxWidth: '320px',
                    maxHeight: '75vh',
                    background: 'rgba(15, 23, 42, 0.72)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '28px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                  }}
                >
                  {/* Premium Header Section */}
                  <div style={{ padding: '20px 20px 14px' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 style={{
                          fontWeight: '700',
                          fontSize: '20px',
                          color: '#ffffff',
                          margin: '0 0 4px 0'
                        }}>
                          Quick Actions
                        </h3>
                        <p style={{
                          fontSize: '14px',
                          color: 'rgba(255, 255, 255, 0.6)',
                          margin: 0
                        }}>
                          Manage weather experience
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsQuickActionsOpen(false)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        <FiX className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Subtle Divider */}
                  <div style={{
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    margin: '0 20px'
                  }} />

                  {/* Premium Action Items */}
                  <div style={{ padding: '8px 0' }}>
                    {/* Theme Toggle */}
                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setTheme(theme === 'dark' ? 'light' : 'dark');
                        setIsQuickActionsOpen(false);
                      }}
                      className="w-full flex items-center transition-all duration-180"
                      style={{
                        height: '72px',
                        padding: '14px 16px',
                        borderRadius: '0',
                        background: 'transparent',
                        color: '#ffffff',
                        position: 'relative'
                      }}
                    >
                      {/* Yellow Glow Icon Container */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'rgba(255, 204, 0, 0.15)',
                          boxShadow: theme === 'dark' ? '0 0 20px rgba(255, 204, 0, 0.3)' : 'none'
                        }}
                      >
                        {theme === 'dark' ? 
                          <FiMoon className="w-5 h-5" style={{ color: '#ffcc00' }} /> : 
                          <FiSun className="w-5 h-5" style={{ color: '#ffcc00' }} />
                        }
                      </div>
                      
                      <div className="flex-1 text-left ml-4">
                        <div className="font-medium text-base">Theme</div>
                        <div style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}>
                          {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                        </div>
                      </div>

                      {/* Active State Glow */}
                      {theme === 'dark' && (
                        <div style={{
                          position: 'absolute',
                          left: '0',
                          top: '0',
                          bottom: '0',
                          width: '3px',
                          background: 'linear-gradient(to bottom, #ffcc00, #ff9900)',
                          borderRadius: '0 3px 3px 0'
                        }} />
                      )}
                    </motion.button>

                    {/* Favorites */}
                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        toggleFavorites();
                        setIsQuickActionsOpen(false);
                      }}
                      className="w-full flex items-center transition-all duration-180"
                      style={{
                        height: '72px',
                        padding: '14px 16px',
                        borderRadius: '0',
                        background: 'transparent',
                        color: '#ffffff'
                      }}
                    >
                      {/* Red Glow Icon Container */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        <FiHeart className="w-5 h-5" style={{ color: '#ef4444' }} />
                      </div>
                      
                      <div className="flex-1 text-left ml-4">
                        <div className="font-medium text-base">Favorites</div>
                        <div style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}>
                          {favorites.length} saved locations
                        </div>
                      </div>
                    </motion.button>

                    {/* Map View */}
                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        toggleMap();
                        setIsQuickActionsOpen(false);
                      }}
                      className="w-full flex items-center transition-all duration-180"
                      style={{
                        height: '72px',
                        padding: '14px 16px',
                        borderRadius: '0',
                        background: 'transparent',
                        color: '#ffffff'
                      }}
                    >
                      {/* Green Glow Icon Container */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'rgba(34, 197, 94, 0.15)',
                          boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
                        }}
                      >
                        <FiMap className="w-5 h-5" style={{ color: '#22c55e' }} />
                      </div>
                      
                      <div className="flex-1 text-left ml-4">
                        <div className="font-medium text-base">Map View</div>
                        <div style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}>
                          View weather map
                        </div>
                      </div>
                    </motion.button>

                    {/* Weather Details */}
                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsQuickActionsOpen(false);
                      }}
                      className="w-full flex items-center transition-all duration-180"
                      style={{
                        height: '72px',
                        padding: '14px 16px',
                        borderRadius: '0',
                        background: 'transparent',
                        color: '#ffffff'
                      }}
                    >
                      {/* Blue Glow Icon Container */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'rgba(59, 130, 246, 0.15)',
                          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                        }}
                      >
                        <FiCloud className="w-5 h-5" style={{ color: '#3b82f6' }} />
                      </div>
                      
                      <div className="flex-1 text-left ml-4">
                        <div className="font-medium text-base">Weather Details</div>
                        <div style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}>
                          View current weather
                        </div>
                      </div>
                    </motion.button>

                    {/* About App */}
                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        onAboutClick();
                        setIsQuickActionsOpen(false);
                      }}
                      className="w-full flex items-center transition-all duration-180"
                      style={{
                        height: '72px',
                        padding: '14px 16px',
                        borderRadius: '0',
                        background: 'transparent',
                        color: '#ffffff'
                      }}
                    >
                      {/* Purple Glow Icon Container */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'rgba(168, 85, 247, 0.15)',
                          boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
                        }}
                      >
                        <FiInfo className="w-5 h-5" style={{ color: '#a855f7' }} />
                      </div>
                      
                      <div className="flex-1 text-left ml-4">
                        <div className="font-medium text-base">About App</div>
                        <div style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}>
                          Version 1.0.0
                        </div>
                      </div>
                    </motion.button>

                    {/* Settings */}
                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setIsSettingsOpen(true);
                        setIsQuickActionsOpen(false);
                      }}
                      className="w-full flex items-center transition-all duration-180"
                      style={{
                        height: '72px',
                        padding: '14px 16px',
                        borderRadius: '0',
                        background: 'transparent',
                        color: '#ffffff'
                      }}
                    >
                      {/* Orange Glow Icon Container */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'rgba(251, 146, 60, 0.15)',
                          boxShadow: '0 0 20px rgba(251, 146, 60, 0.3)'
                        }}
                      >
                        <FiSliders className="w-5 h-5" style={{ color: '#fb923c' }} />
                      </div>
                      
                      <div className="flex-1 text-left ml-4">
                        <div className="font-medium text-base">Settings</div>
                        <div style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}>
                          Units & preferences
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* DESKTOP NAVBAR - Original Layout */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* LEFT - Logo */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center`}
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    boxShadow: theme === 'dark' 
                      ? '0 4px 20px rgba(6, 182, 212, 0.4)' 
                      : '0 4px 20px rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <FiCloud className="w-4 h-4 text-white" />
                </div>
                <h1 className={`text-xs font-bold mt-1`}
                  style={{
                    color: theme === 'dark' ? '#ffffff' : '#1e293b'
                  }}>
                  Weather
                </h1>
                <p className={`text-xs`}
                  style={{
                    color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(71,85,105,0.8)'
                  }}>
                  Forecast
                </p>
              </motion.div>
            </div>

            {/* CENTER - Search Bar */}
            <div className="flex-1 max-w-md mx-8">
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
                backdropFilter: 'blur(24px)',
                borderLeft: theme === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid rgba(255,255,255,0.6)',
                boxShadow: theme === 'dark' 
                  ? '-8px 0 32px rgba(0,0,0,0.4)' 
                  : '-8px 0 32px rgba(31,38,135,0.15)',
                borderRadius: '28px 28px 0 0'
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
                        : '1px solid rgba(255,255,255,0.6)',
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
                  <div className="relative w-full">
                    <SearchBar />
                  </div>
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
