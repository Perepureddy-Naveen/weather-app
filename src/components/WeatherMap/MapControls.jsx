import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiMaximize, FiMinimize, FiLayers, FiCrosshair } from 'react-icons/fi';

const MapControls = ({ 
  onCurrentLocation, 
  onFullscreen, 
  onResetView, 
  isFullscreen 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="map-controls"
    >
      {/* Current Location Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCurrentLocation}
        className="map-control-btn"
        title="Go to current location"
      >
        <FiCrosshair className="w-4 h-4" />
      </motion.button>

      {/* Reset View Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onResetView}
        className="map-control-btn"
        title="Reset view"
      >
        <FiHome className="w-4 h-4" />
      </motion.button>

      {/* Layers Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="map-control-btn"
        title="Map layers"
      >
        <FiLayers className="w-4 h-4" />
      </motion.button>

      {/* Fullscreen Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onFullscreen}
        className="map-control-btn"
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <FiMinimize className="w-4 h-4" />
        ) : (
          <FiMaximize className="w-4 h-4" />
        )}
      </motion.button>
    </motion.div>
  );
};

export default MapControls;
