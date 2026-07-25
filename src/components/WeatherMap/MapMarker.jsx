import React, { memo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const MapMarker = memo(({ position, type, title, weather }) => {
  const getMarkerIcon = (markerType) => {
    const iconConfig = {
      current: {
        color: '#4285f4', // Google Maps blue for current location
        glowColor: 'rgba(66, 133, 244, 0.5)',
        size: 20,
        pulseColor: 'rgba(66, 133, 244, 0.3)'
      },
      selected: {
        color: '#3b82f6', // Blue for selected city
        glowColor: 'rgba(59, 130, 246, 0.5)',
        size: 20,
        pulseColor: 'rgba(59, 130, 246, 0.3)'
      },
      clicked: {
        color: '#ec4899', // Pink for clicked location
        glowColor: 'rgba(236, 72, 153, 0.5)',
        size: 20,
        pulseColor: 'rgba(236, 72, 153, 0.3)'
      },
      pin: {
        color: '#3b82f6', // Blue for location pin
        glowColor: 'rgba(59, 130, 246, 0.5)',
        size: 32,
        pulseColor: 'rgba(59, 130, 246, 0.3)'
      }
    };

    const config = iconConfig[markerType] || iconConfig.selected;

    // Blue location pin for selected weather location (Apple Weather / Google Weather style)
    if (markerType === 'pin') {
      const customIcon = L.divIcon({
        className: 'location-pin-marker',
        html: `
          <style>
            @keyframes pin-drop {
              0% {
                transform: translateY(-20px);
                opacity: 0;
              }
              60% {
                transform: translateY(5px);
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
            .pin-wrapper {
              animation: pin-drop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
          </style>
          <div class="pin-wrapper" style="
            position: relative;
            width: ${config.size}px;
            height: ${config.size * 1.4}px;
            display: flex;
            flex-direction: column;
            align-items: center;
          ">
            <!-- Pin head -->
            <div style="
              position: relative;
              width: ${config.size}px;
              height: ${config.size}px;
              background: ${config.color};
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
              z-index: 2;
            ">
              <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(45deg);
                width: ${config.size * 0.4}px;
                height: ${config.size * 0.4}px;
                background: white;
                border-radius: 50%;
              "></div>
            </div>
            <!-- Pin shadow -->
            <div style="
              position: absolute;
              bottom: 0;
              width: ${config.size * 0.5}px;
              height: 4px;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 50%;
              z-index: 1;
            "></div>
          </div>
        `,
        iconSize: [config.size, config.size * 1.4],
        iconAnchor: [config.size / 2, config.size * 1.4],
      });

      return customIcon;
    }

    // Blue pulsing dot for current device location (Google Maps style)
    if (markerType === 'current') {
      const customIcon = L.divIcon({
        className: 'current-location-dot',
        html: `
          <style>
            @keyframes pulse-ring {
              0% {
                transform: scale(0.8);
                opacity: 0.8;
              }
              100% {
                transform: scale(2.5);
                opacity: 0;
              }
            }
            .pulse-ring {
              animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            }
          </style>
          <div style="
            position: relative;
            width: ${config.size}px;
            height: ${config.size}px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div class="pulse-ring" style="
              position: absolute;
              width: ${config.size}px;
              height: ${config.size}px;
              background: ${config.glowColor};
              border-radius: 50%;
            "></div>
            <div style="
              position: absolute;
              width: ${config.size}px;
              height: ${config.size}px;
              background: ${config.color};
              border-radius: 50%;
              z-index: 1;
              box-shadow: 0 0 0 4px white, 0 4px 12px rgba(0,0,0,0.3);
            "></div>
            <div style="
              position: absolute;
              width: ${config.size * 0.5}px;
              height: ${config.size * 0.5}px;
              background: white;
              border-radius: 50%;
              z-index: 2;
            "></div>
          </div>
        `,
        iconSize: [config.size, config.size],
        iconAnchor: [config.size / 2, config.size / 2],
      });

      return customIcon;
    }

    // Create custom HTML icon with bounce animation for other types
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <style>
          @keyframes marker-bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          @keyframes pulse-glow {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.5;
            }
          }
          .marker-wrapper {
            animation: marker-bounce 2s ease-in-out infinite;
          }
          .pulse-ring {
            animation: pulse-glow 2s ease-in-out infinite;
          }
        </style>
        <div class="marker-wrapper" style="
          position: relative;
          width: ${config.size}px;
          height: ${config.size}px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div class="pulse-ring" style="
            position: absolute;
            width: ${config.size}px;
            height: ${config.size}px;
            background: ${config.glowColor};
            border-radius: 50%;
          "></div>
          <div style="
            position: absolute;
            width: ${config.size * 0.8}px;
            height: ${config.size * 0.8}px;
            background: ${config.color};
            border: 2px solid ${config.color};
            border-radius: 50%;
            z-index: 1;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
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
});

export default MapMarker;
