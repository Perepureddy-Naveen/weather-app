import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiHeart, 
  FiMapPin, 
  FiTrash2, 
  FiRefreshCw,
  FiPlus,
  FiStar
} from 'react-icons/fi';
import { useFavorites } from '../../context/FavoritesContext';
import { useWeather } from '../../context/WeatherContext';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const FavoritesSidebar = () => {
  const { 
    favorites, 
    loading, 
    error, 
    sidebarOpen, 
    toggleSidebar, 
    setSidebarOpen,
    removeFavorite,
    updateFavoriteWeather,
    updateAllFavoritesWeather 
  } = useFavorites();
  
  const { fetchWeatherByLocation, theme } = useWeather();

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [sidebarOpen, setSidebarOpen]);

  // Handle favorite click
  const handleFavoriteClick = async (favorite) => {
    try {
      const location = `${favorite.name},${favorite.country}`;
      await fetchWeatherByLocation(location);
      setSidebarOpen(false);
    } catch (error) {
      console.error('Error fetching favorite weather:', error);
    }
  };

  // Handle remove favorite
  const handleRemoveFavorite = (e, favoriteId) => {
    e.stopPropagation();
    removeFavorite(favoriteId);
  };

  // Handle refresh favorite
  const handleRefreshFavorite = async (e, favorite) => {
    e.stopPropagation();
    await updateFavoriteWeather(favorite.id);
  };

  // Get weather icon
  const getWeatherIcon = (condition) => {
    if (!condition) return '🌤️';
    
    const iconMap = {
      'sunny': '☀️',
      'clear': '🌙',
      'partly-cloudy': '⛅',
      'cloudy': '☁️',
      'overcast': '☁️',
      'mist': '🌫️',
      'fog': '🌫️',
      'rain': '🌧️',
      'light-rain': '🌦️',
      'heavy-rain': '⛈️',
      'snow': '❄️',
      'light-snow': '🌨️',
      'heavy-snow': '🌨️',
      'thunderstorm': '⛈️',
    };

    const lowerCondition = condition.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerCondition.includes(key)) {
        return icon;
      }
    }
    return '🌤️';
  };

  // Format last updated time
  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
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

  const favoriteCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
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
                <div className="flex items-center space-x-2">
                  <FiHeart className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-500'
                  }`} />
                  <h2 className={`text-lg font-semibold`}
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#111827'
                    }}>
                    Favorites
                  </h2>
                  {favorites.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                        theme === 'dark'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : 'bg-red-100 text-red-600 border-red-200'
                      } border`}
                    >
                      {favorites.length}
                    </motion.span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {favorites.length > 0 && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={updateAllFavoritesWeather}
                      disabled={loading}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        loading
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
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
                      title="Refresh all favorites"
                    >
                      <motion.div
                        animate={loading ? { rotate: 360 } : {}}
                        transition={{ repeat: loading ? Infinity : 0, duration: 1, ease: 'linear' }}
                      >
                        <FiRefreshCw className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSidebarOpen(false)}
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
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`m-4 p-3 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-red-900/20 border-red-700/50 text-red-400'
                        : 'bg-red-50 border-red-200 text-red-600'
                    } border`}
                  >
                    {error}
                  </motion.div>
                )}

                {favorites.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full p-8 text-center"
                  >
                    <div className="text-6xl mb-4 animate-float">💝</div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      No Favorites Yet
                    </h3>
                    <p className={`text-sm mb-6 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Add cities to your favorites to quickly access their weather anytime.
                    </p>
                    <div className={`p-4 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-gray-800/50 border-gray-700'
                        : 'bg-gray-100/50 border-gray-200'
                    } border`}>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        💡 Tip: Click the heart icon on any weather card to add it to favorites
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-4 space-y-3">
                    {favorites.map((favorite, index) => (
                      <motion.div
                        key={favorite.id}
                        variants={favoriteCardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFavoriteClick(favorite)}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          theme === 'dark'
                            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'
                            : 'bg-white/50 border-gray-200 hover:bg-white/70'
                        } border backdrop-blur-sm group`}
                      >
                        <div className="flex items-center justify-between">
                          {/* City Info */}
                          <div className="flex items-center space-x-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl ${
                              theme === 'dark'
                                ? 'bg-gray-700/50'
                                : 'bg-gray-100/50'
                            }`}>
                              {getWeatherIcon(favorite.currentCondition)}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className={`font-medium ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {favorite.name}
                                </h3>
                                <FiStar className={`w-3 h-3 fill-current text-yellow-500`} />
                              </div>
                              <div className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {favorite.region && `${favorite.region}, `}{favorite.country}
                              </div>
                              
                              {favorite.currentTemp && (
                                <div className={`text-lg font-semibold mt-1 ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {Math.round(favorite.currentTemp)}°C
                                </div>
                              )}
                              
                              <div className={`text-xs mt-1 ${
                                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                Updated {formatLastUpdated(favorite.lastUpdated)}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleRefreshFavorite(e, favorite)}
                              className={`p-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'hover:bg-gray-600 text-gray-400'
                                  : 'hover:bg-gray-200 text-gray-500'
                              }`}
                              title="Refresh weather"
                            >
                              <FiRefreshCw className="w-3 h-3" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleRemoveFavorite(e, favorite.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                theme === 'dark'
                                  ? 'hover:bg-red-900/50 text-red-400'
                                  : 'hover:bg-red-50 text-red-500'
                              }`}
                              title="Remove favorite"
                            >
                              <FiTrash2 className="w-3 h-3" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                          style={{
                            background: theme === 'dark'
                              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                              : 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {favorites.length > 0 && (
                <div className={`p-4 border-t ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-800/50'
                    : 'border-gray-200 bg-white/50'
                } backdrop-blur-sm`}>
                  <div className={`text-xs text-center ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {favorites.length} {favorites.length === 1 ? 'city' : 'cities'} saved
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FavoritesSidebar;
