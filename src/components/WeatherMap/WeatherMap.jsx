import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { motion } from 'framer-motion';
import { FiMapPin, FiMaximize, FiHome, FiLayers } from 'react-icons/fi';
import L from 'leaflet';
import { useWeather } from '../../context/WeatherContext';
import MapControls from './MapControls';
import MapMarker from './MapMarker';

// Fix default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Standard OpenStreetMap tiles (more reliable)
const standardTileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const WeatherMap = () => {
  const { 
    currentWeather, 
    selectedCity, 
    getCurrentLocation, 
    getWeatherByCoordinates,
    loading 
  } = useWeather();
  
  const [mapCenter, setMapCenter] = useState([17.3850, 78.4867]); // Default to Hyderabad
  const [mapZoom, setMapZoom] = useState(10);
  const [userLocation, setUserLocation] = useState(null);
  const [isShowingCurrentLocation, setIsShowingCurrentLocation] = useState(true); // Track if showing current GPS or selected location
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef(null);

  // Update map center when selected city changes (from search)
  useEffect(() => {
    if (selectedCity && selectedCity.lat && selectedCity.lon) {
      setMapCenter([selectedCity.lat, selectedCity.lon]);
      setMapZoom(12);
      setIsShowingCurrentLocation(false); // Switch to selected location mode
    }
  }, [selectedCity]);

  // Get user location on mount and fetch weather
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            setMapCenter([latitude, longitude]);
            setIsShowingCurrentLocation(true); // Start in current location mode
            // Fetch weather for detected location
            try {
              await getWeatherByCoordinates(latitude, longitude);
            } catch (error) {
              console.error('Error fetching weather for current location:', error);
            }
          },
          (error) => {
            console.log('Location access denied:', error);
            // Default to Hyderabad if permission denied
            setMapCenter([17.3850, 78.4867]);
            setIsShowingCurrentLocation(false); // Switch to selected location mode (default city)
          }
        );
      }
    };

    getUserLocation();
  }, []);

  // Map event handlers
  const MapEvents = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setMapCenter([lat, lng]);
        setIsShowingCurrentLocation(false); // Switch to selected location mode

        try {
          await getWeatherByCoordinates(lat, lng);
        } catch (error) {
          console.error('Error fetching weather for clicked location:', error);
        }
      },
    });

    return null;
  };

  // Map controller component
  const MapController = () => {
    const map = useMap();

    useEffect(() => {
      if (mapCenter[0] !== map.getCenter().lat || mapCenter[1] !== map.getCenter().lng) {
        // Use flyTo for smooth animation
        map.flyTo(mapCenter, mapZoom, {
          animate: true,
          duration: 1.5
        });
      }
    }, [mapCenter, mapZoom, map]);

    return null;
  };

  // Handle controls
  const handleCurrentLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            setMapCenter([latitude, longitude]);
            setMapZoom(14);
            setIsShowingCurrentLocation(true); // Switch back to current location mode
            // Refresh weather for current location
            try {
              await getWeatherByCoordinates(latitude, longitude);
            } catch (error) {
              console.error('Error fetching weather for current location:', error);
            }
          },
          (error) => {
            console.error('Error getting current location:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleResetView = () => {
    setMapCenter([17.3850, 78.4867]);
    setMapZoom(10);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`map-section ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      style={{ 
        height: '100%', 
        width: '100%',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="relative w-full h-full">
        {/* Map Container */}
        <MapContainer
          ref={mapRef}
          center={mapCenter}
          zoom={mapZoom}
          style={{ 
            height: '100%', 
            width: '100%',
            borderRadius: '16px',
            overflow: 'hidden'
          }}
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            url={standardTileLayer}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            style={{
              filter: 'brightness(0.8) contrast(1.2) saturate(0.8)',
              borderRadius: '16px'
            }}
          />

          <MapEvents />
          <MapController />

          {/* Single Active Marker - Either current location (pulsing dot) or selected location (pin) */}
          {isShowingCurrentLocation && userLocation ? (
            <MapMarker
              position={userLocation}
              type="current"
              title="Your Location"
            />
          ) : selectedCity && selectedCity.lat && selectedCity.lon ? (
            <MapMarker
              position={[selectedCity.lat, selectedCity.lon]}
              type="pin"
              title={selectedCity.name}
            />
          ) : null}
        </MapContainer>

        {/* Premium Map Controls */}
        <MapControls
          onCurrentLocation={handleCurrentLocation}
          onFullscreen={handleFullscreen}
          onResetView={handleResetView}
          isFullscreen={isFullscreen}
        />

        {/* Floating Locate Me Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCurrentLocation}
          className="absolute bottom-6 right-6 z-[1000] p-3 rounded-full shadow-lg"
          style={{
            background: 'rgba(59, 130, 246, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
            color: '#ffffff'
          }}
          title="Locate Me"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </motion.button>

        {/* Loading Overlay */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)',
              borderRadius: '16px'
            }}
          >
            <div className="text-white text-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm">Loading weather data...</p>
            </div>
          </motion.div>
        )}

        {/* Map Info */}
        <div 
          className="absolute bottom-4 left-4 text-white text-xs"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '8px',
            padding: '8px 12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <p>Click map to get weather</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherMap;
