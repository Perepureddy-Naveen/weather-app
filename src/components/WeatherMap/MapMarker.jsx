import React from 'react';
import { Marker } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';

const MapMarker = ({ position, type, title, weather }) => {
  const getMarkerIcon = (markerType) => {
    const iconConfig = {
      current: {
        color: '#06b6d4',
        glowColor: 'rgba(6, 182, 212, 0.5)',
        size: 24,
        pulseColor: 'rgba(6, 182, 212, 0.3)'
      },
      selected: {
        color: '#7c3aed',
        glowColor: 'rgba(124, 58, 237, 0.5)',
        size: 20,
        pulseColor: 'rgba(124, 58, 237, 0.3)'
      },
      clicked: {
        color: '#ec4899',
        glowColor: 'rgba(236, 72, 153, 0.5)',
        size: 20,
        pulseColor: 'rgba(236, 72, 153, 0.3)'
      }
    };

    const config = iconConfig[markerType] || iconConfig.selected;

    // Create custom HTML icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          position: relative;
          width: ${config.size}px;
          height: ${config.size}px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            position: absolute;
            width: ${config.size}px;
            height: ${config.size}px;
            background: ${config.glowColor};
            border-radius: 50%;
            animation: pulse-glow 2s ease-in-out infinite;
          "></div>
          <div style="
            position: absolute;
            width: ${config.size * 0.8}px;
            height: ${config.size * 0.8}px;
            background: ${config.color};
            border: 2px solid ${config.color};
            border-radius: 50%;
            z-index: 1;
          "></div>
          <div style="
            position: absolute;
            width: ${config.size * 0.4}px;
            height: ${config.size * 0.4}px;
            background: white;
            border-radius: 50%;
            z-index: 2;
          "></div>
        </div>
      `,
      iconSize: [config.size, config.size],
      iconAnchor: [config.size / 2, config.size / 2],
      popupAnchor: [0, -config.size / 2],
    });

    return customIcon;
  };

  return (
    <Marker
      position={position}
      icon={getMarkerIcon(type)}
      title={title}
    />
  );
};

export default MapMarker;
