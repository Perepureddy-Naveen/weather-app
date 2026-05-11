import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiRefreshCw, FiHome } from 'react-icons/fi';
import { useWeather } from '../../context/WeatherContext';

const ErrorDisplay = ({ error, onRetry, onHome }) => {
  const { theme } = useWeather();

  const getErrorMessage = (error) => {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.message) {
      return error.message;
    }

    if (error?.response?.data?.error?.message) {
      return error.response.data.error.message;
    }

    return 'An unexpected error occurred. Please try again.';
  };

  const getErrorIcon = () => {
    return <FiAlertCircle className="w-12 h-12 text-red-500" />;
  };

  const getErrorSuggestion = (error) => {
    const message = getErrorMessage(error).toLowerCase();
    
    if (message.includes('network') || message.includes('fetch')) {
      return 'Check your internet connection and try again.';
    }
    
    if (message.includes('api key') || message.includes('unauthorized')) {
      return 'Please check your API key configuration.';
    }
    
    if (message.includes('not found') || message.includes('location')) {
      return 'Try searching for a different city or check the spelling.';
    }
    
    if (message.includes('permission') || message.includes('denied')) {
      return 'Please enable location permissions in your browser settings.';
    }
    
    if (message.includes('timeout')) {
      return 'The request timed out. Please try again.';
    }
    
    return 'Please check your connection and try again.';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center min-h-[400px] p-8 rounded-2xl border backdrop-blur-xl ${
        theme === 'dark'
          ? 'bg-red-900/10 border-red-800/30'
          : 'bg-red-50 border-red-200'
      }`}
    >
      {/* Error Icon */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ 
          scale: { repeat: Infinity, duration: 2 },
          rotate: { repeat: Infinity, duration: 4 },
        }}
        className="mb-6"
      >
        {getErrorIcon()}
      </motion.div>

      {/* Error Message */}
      <div className="text-center mb-6">
        <h2 className={`text-xl font-semibold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Oops! Something went wrong
        </h2>
        <p className={`text-sm mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {getErrorMessage(error)}
        </p>
        <p className={`text-xs ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {getErrorSuggestion(error)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </motion.button>
        )}

        {onHome && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onHome}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            <FiHome className="w-4 h-4" />
            <span>Go Home</span>
          </motion.button>
        )}
      </div>

      {/* Additional Help */}
      <div className={`mt-8 p-4 rounded-lg ${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-gray-100/50 border-gray-200'
      } border`}>
        <h3 className={`text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Still having trouble?
        </h3>
        <ul className={`text-xs space-y-1 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <li>• Check your internet connection</li>
          <li>• Verify the city name spelling</li>
          <li>• Try using GPS location</li>
          <li>• Clear your browser cache</li>
          <li>• Contact support if the issue persists</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ErrorDisplay;
