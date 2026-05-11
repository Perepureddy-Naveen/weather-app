import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../../context/WeatherContext';

const SkeletonLoader = () => {
  const { theme } = useWeather();

  const skeletonBase = `rounded-lg ${
    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
  }`;

  const shimmerVariants = {
    initial: { x: -100 },
    animate: { x: 100 },
  };

  return (
    <div className="space-y-6">
      {/* Current Weather Card Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-6 rounded-2xl border backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/50 border-gray-200'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className={`h-6 w-32 ${skeletonBase} mb-2`}></div>
            <div className={`h-4 w-48 ${skeletonBase}`}></div>
          </div>
          <div className={`h-10 w-10 ${skeletonBase} rounded-full`}></div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 ${skeletonBase} rounded-full`}></div>
            <div>
              <div className={`h-8 w-20 ${skeletonBase} mb-2`}></div>
              <div className={`h-4 w-32 ${skeletonBase}`}></div>
            </div>
          </div>
          <div className="text-right">
            <div className={`h-6 w-24 ${skeletonBase} mb-1`}></div>
            <div className={`h-4 w-20 ${skeletonBase}`}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`p-3 ${skeletonBase}`}>
              <div className={`h-4 w-16 mb-1 ${skeletonBase}`}></div>
              <div className={`h-6 w-12 ${skeletonBase}`}></div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Air Quality Card Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`p-6 rounded-2xl border backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/50 border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-5 h-5 ${skeletonBase} rounded`}></div>
            <div className={`h-6 w-24 ${skeletonBase}`}></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 ${skeletonBase} rounded-full`}></div>
            <div className={`h-4 w-20 ${skeletonBase}`}></div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className={`w-24 h-24 ${skeletonBase} rounded-full`}></div>
        </div>

        <div className={`p-3 ${skeletonBase} mb-4`}>
          <div className={`h-4 w-full ${skeletonBase}`}></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`p-2 ${skeletonBase}`}>
              <div className={`h-3 w-8 mb-1 ${skeletonBase}`}></div>
              <div className={`h-4 w-12 ${skeletonBase}`}></div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Hourly Forecast Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`p-6 rounded-2xl border backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/50 border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-5 h-5 ${skeletonBase} rounded`}></div>
            <div className={`h-6 w-32 ${skeletonBase}`}></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 ${skeletonBase} rounded`}></div>
            <div className={`h-4 w-12 ${skeletonBase}`}></div>
            <div className={`w-6 h-6 ${skeletonBase} rounded`}></div>
          </div>
        </div>

        <div className="flex space-x-3 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`flex-1 min-w-[100px] p-4 ${skeletonBase} rounded-xl`}>
              <div className={`h-3 w-12 mb-2 ${skeletonBase}`}></div>
              <div className={`w-8 h-8 ${skeletonBase} rounded-full mx-auto mb-2`}></div>
              <div className={`h-6 w-8 mx-auto mb-1 ${skeletonBase}`}></div>
              <div className={`h-3 w-12 mx-auto ${skeletonBase}`}></div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Forecast Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-2xl border backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/50 border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-2 mb-4">
          <div className={`w-5 h-5 ${skeletonBase} rounded`}></div>
          <div className={`h-6 w-32 ${skeletonBase}`}></div>
        </div>

        <div className="space-y-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`p-4 ${skeletonBase} rounded-xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-10 ${skeletonBase}`}></div>
                  <div>
                    <div className={`h-4 w-16 mb-1 ${skeletonBase}`}></div>
                    <div className={`h-3 w-20 ${skeletonBase}`}></div>
                  </div>
                </div>
                <div className={`w-8 h-8 ${skeletonBase} rounded-full`}></div>
                <div className="text-right">
                  <div className={`h-6 w-8 mb-1 ${skeletonBase}`}></div>
                  <div className={`h-4 w-8 ${skeletonBase}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Shimmer Effect Overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div
          className={`h-full w-1/3 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-transparent via-gray-600/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
          }`}
        />
      </motion.div>
    </div>
  );
};

export default SkeletonLoader;
