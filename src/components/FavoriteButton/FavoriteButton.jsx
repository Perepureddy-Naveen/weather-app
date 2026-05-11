import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiStar, FiPlus, FiCheck } from 'react-icons/fi';
import { useFavorites } from '../../context/FavoritesContext';
import { useWeather } from '../../context/WeatherContext';

const FavoriteButton = ({ cityData, size = 'medium', showText = false, className = '' }) => {
  const { toggleFavorite, isFavorite, loading } = useFavorites();
  const { selectedCity, theme } = useWeather();
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if current city is a favorite
  const isCurrentFavorite = selectedCity && isFavorite(selectedCity.name, selectedCity.country);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    
    if (loading || isAnimating || !selectedCity) return;

    setIsAnimating(true);

    try {
      await toggleFavorite({
        name: selectedCity.name,
        country: selectedCity.country,
        region: selectedCity.region,
        lat: selectedCity.lat,
        lon: selectedCity.lon,
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsAnimating(false);
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    loading: { scale: 1 },
  };

  const heartVariants = {
    idle: { scale: 1, rotate: 0 },
    active: { 
      scale: [1, 1.3, 1], 
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.6, ease: 'easeInOut' }
    },
    loading: { 
      scale: [1, 1.2, 1], 
      transition: { repeat: Infinity, duration: 1 }
    },
  };

  return (
    <div className={`relative ${className}`}>
      {/* Favorite Button */}
      <motion.button
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        animate={loading ? 'loading' : 'idle'}
        onClick={handleToggleFavorite}
        disabled={loading || isAnimating || !selectedCity}
        className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ${
          isCurrentFavorite
            ? theme === 'dark'
              ? 'bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30'
              : 'bg-red-100 border-red-300 text-red-500 hover:bg-red-200'
            : theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white'
            : 'bg-white/50 border-gray-300 text-gray-600 hover:bg-white/70 hover:text-gray-900'
        } border backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed group`}
        title={isCurrentFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {/* Background Glow */}
        {isCurrentFavorite && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Icon */}
        <motion.div
          variants={heartVariants}
          animate={
            loading
              ? 'loading'
              : isAnimating
              ? 'active'
              : 'idle'
          }
          className="relative"
        >
          {isCurrentFavorite ? (
            <FiStar className={`${iconSizes[size]} fill-current`} />
          ) : (
            <FiHeart className={iconSizes[size]} />
          )}
        </motion.div>

        {/* Loading Spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className={`w-3/4 h-3/4 border-2 border-t-transparent rounded-full ${
                theme === 'dark' ? 'border-white' : 'border-gray-600'
              }`}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            />
          </motion.div>
        )}
      </motion.button>

      {/* Text Label */}
      {showText && (
        <span className={`ml-2 text-sm font-medium ${
          isCurrentFavorite
            ? theme === 'dark' ? 'text-red-400' : 'text-red-500'
            : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {isCurrentFavorite ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: isCurrentFavorite
            ? 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)'
            : theme === 'dark'
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default FavoriteButton;
