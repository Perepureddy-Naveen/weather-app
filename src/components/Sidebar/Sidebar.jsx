import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiHeart, 
  FiClock, 
  FiMapPin, 
  FiTrash2,
  FiStar,
  FiSettings
} from 'react-icons/fi';
import { useWeather } from '../../context/WeatherContext';

const Sidebar = () => {
  const { 
    sidebarOpen, 
    toggleSidebar, 
    favorites, 
    searchHistory, 
    fetchWeatherByLocation, 
    removeFavorite,
    theme,
    clearSearchHistory,
    settings,
    updateSettings
  } = useWeather();

  const handleFavoriteClick = (favorite) => {
    const location = `${favorite.name}, ${favorite.country}`;
    fetchWeatherByLocation(location);
    toggleSidebar();
  };

  const handleHistoryClick = (historyItem) => {
    fetchWeatherByLocation(historyItem.query);
    toggleSidebar();
  };

  const handleRemoveFavorite = (e, favoriteId) => {
    e.stopPropagation();
    removeFavorite(favoriteId);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all search history?')) {
      clearSearchHistory();
    }
  };

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleSidebar}
            />
            
            {/* Sidebar Content */}
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed right-0 top-0 h-full w-80 z-50 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-700'
                  : 'bg-white border-gray-200'
              } border-l shadow-2xl overflow-hidden`}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <h2 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Menu
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSidebar}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  {/* Settings Section */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2 mb-3">
                      <FiSettings className={`w-4 h-4 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <h3 className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Settings
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Temperature Unit */}
                      <div>
                        <label className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Temperature Unit
                        </label>
                        <select
                          value={settings.temperatureUnit}
                          onChange={(e) => handleSettingChange('temperatureUnit', e.target.value)}
                          className={`w-full mt-1 px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="celsius">Celsius (°C)</option>
                          <option value="fahrenheit">Fahrenheit (°F)</option>
                        </select>
                      </div>

                      {/* Wind Speed Unit */}
                      <div>
                        <label className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Wind Speed Unit
                        </label>
                        <select
                          value={settings.windSpeedUnit}
                          onChange={(e) => handleSettingChange('windSpeedUnit', e.target.value)}
                          className={`w-full mt-1 px-3 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="kmh">km/h</option>
                          <option value="mph">mph</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Favorites Section */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FiHeart className={`w-4 h-4 ${
                          theme === 'dark' ? 'text-red-400' : 'text-red-500'
                        }`} />
                        <h3 className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Favorites
                        </h3>
                      </div>
                      <span className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {favorites.length}
                      </span>
                    </div>

                    {favorites.length === 0 ? (
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        No favorite cities yet. Add some to see them here!
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {favorites.map((favorite) => (
                          <motion.div
                            key={favorite.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleFavoriteClick(favorite)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              theme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
                                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                            } border`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <FiMapPin className={`w-4 h-4 ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                                <div>
                                  <div className={`font-medium text-sm ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {favorite.name}
                                  </div>
                                  <div className={`text-xs ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                  }`}>
                                    {favorite.country}
                                  </div>
                                </div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => handleRemoveFavorite(e, favorite.id)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  theme === 'dark'
                                    ? 'hover:bg-red-900/50 text-red-400'
                                    : 'hover:bg-red-50 text-red-500'
                                }`}
                              >
                                <FiTrash2 className="w-3 h-3" />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Search History Section */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FiClock className={`w-4 h-4 ${
                          theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                        }`} />
                        <h3 className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Recent Searches
                        </h3>
                      </div>
                      {searchHistory.length > 0 && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleClearHistory}
                          className={`text-xs px-2 py-1 rounded-lg transition-colors ${
                            theme === 'dark'
                              ? 'hover:bg-gray-700 text-gray-400'
                              : 'hover:bg-gray-200 text-gray-600'
                          }`}
                        >
                          Clear
                        </motion.button>
                      )}
                    </div>

                    {searchHistory.length === 0 ? (
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        No recent searches yet.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {searchHistory.map((item, index) => (
                          <motion.div
                            key={`${item.query}-${index}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleHistoryClick(item)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              theme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
                                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                            } border`}
                          >
                            <div className="flex items-center space-x-3">
                              <FiClock className={`w-4 h-4 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                              }`} />
                              <div className="flex-1">
                                <div className={`font-medium text-sm ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {item.query}
                                </div>
                                <div className={`text-xs ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {new Date(item.timestamp).toLocaleDateString()} at{' '}
                                  {new Date(item.timestamp).toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
