import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../../context/WeatherContext';

const LoadingSpinner = ({ size = 'medium', text = 'Loading weather data...', centered = false }) => {
  const { theme } = useWeather();

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const dotSize = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
  };

  const containerClasses = centered 
    ? "fixed inset-0 min-h-screen flex items-center justify-center z-50"
    : "flex flex-col items-center justify-center space-y-4";

  const cardStyle = {
    background: theme === 'dark' 
      ? 'rgba(15, 23, 42, 0.85)' 
      : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    border: theme === 'dark' 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '24px',
    boxShadow: theme === 'dark'
      ? '0 20px 50px rgba(0, 0, 0, 0.3)'
      : '0 20px 50px rgba(15, 23, 42, 0.1)',
  };

  return (
    <div className={containerClasses}>
      {centered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-8"
          style={cardStyle}
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Premium Spinner */}
            <div className={`relative ${sizeClasses[size]}`}>
              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${
                  theme === 'dark'
                    ? 'border-blue-500/20'
                    : 'border-blue-400/20'
                }`}
              />
              <motion.div
                className={`absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent`}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Animated dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className={`${dotSize[size]} rounded-full bg-blue-500`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Loading Text */}
            {text && (
              <motion.p
                className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {text}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}

      {!centered && (
        <>
          {/* Spinner */}
          <div className={`relative ${sizeClasses[size]}`}>
            <motion.div
              className={`absolute inset-0 rounded-full border-2 ${
                theme === 'dark'
                  ? 'border-blue-500/20'
                  : 'border-blue-400/20'
              }`}
            />
            <motion.div
              className={`absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent`}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Animated dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-1">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className={`${dotSize[size]} rounded-full bg-blue-500`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Loading Text */}
          {text && (
            <motion.p
              className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {text}
            </motion.p>
          )}
        </>
      )}
    </div>
  );
};

export default LoadingSpinner;
