import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { motion } from 'framer-motion';
import { FiMapPin, FiMaximize, FiHome, FiLayers } from 'react-icons/fi';
import L from 'leaflet';
import { useWeather } from '../../context/WeatherContext';
import MapControls from './MapControls';
import WeatherPopup from './WeatherPopup';
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
  const [clickedLocation, setClickedLocation] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef(null);

  // Update map center when selected city changes
  useEffect(() => {
    if (selectedCity && selectedCity.lat && selectedCity.lon) {
      setMapCenter([selectedCity.lat, selectedCity.lon]);
      setMapZoom(12);
    }
  }, [selectedCity]);

  // Get user location on mount
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            setMapCenter([latitude, longitude]);
          },
          (error) => {
            console.log('Location access denied:', error);
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
        setClickedLocation([lat, lng]);
        
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
      await getCurrentLocation();
      if (userLocation) {
        setMapCenter(userLocation);
        setMapZoom(14);
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

          {/* Current Location Marker */}
          {userLocation && (
            <MapMarker
              position={userLocation}
              type="current"
              title="Your Location"
            />
          )}

          {/* Selected City Marker */}
          {selectedCity && selectedCity.lat && selectedCity.lon && (
            <MapMarker
              position={[selectedCity.lat, selectedCity.lon]}
              type="selected"
              title={selectedCity.name}
              weather={currentWeather}
            />
          )}

          {/* Clicked Location Marker */}
          {clickedLocation && (
            <MapMarker
              position={clickedLocation}
              type="clicked"
              title="Selected Location"
              weather={currentWeather}
            />
          )}

          {/* Weather Popup for selected location */}
          {selectedCity && selectedCity.lat && selectedCity.lon && currentWeather && (
            <Popup
              position={[selectedCity.lat, selectedCity.lon]}
              className="weather-popup"
            >
              <WeatherPopup weather={currentWeather} city={selectedCity} />
            </Popup>
          )}
        </MapContainer>

        {/* Premium Map Controls */}
        <MapControls
          onCurrentLocation={handleCurrentLocation}
          onFullscreen={handleFullscreen}
          onResetView={handleResetView}
          isFullscreen={isFullscreen}
        />

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
