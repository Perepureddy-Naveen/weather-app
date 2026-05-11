import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { weatherService } from '../services/weatherService';
import { locationService } from '../services/locationService';
import { storageService } from '../services/storageService';

// Initial state
const initialState = {
  // Weather data
  currentWeather: null,
  forecast: null,
  airQuality: null,
  astronomy: null,
  
  // Location
  currentLocation: null,
  selectedCity: null,
  mapCenter: [17.3850, 78.4867], // Default to Hyderabad
  mapZoom: 10,
  isMapVisible: false, // Map toggle state
  
  // Search
  searchQuery: '',
  searchSuggestions: [],
  searchHistory: [],
  isSearching: false,
  
  // Favorites
  favorites: [],
  
  // UI State
  loading: false,
  isDetectingLocation: false, // New state for location detection
  error: null,
  sidebarOpen: false,
  theme: 'light',
  
  // Settings
  settings: {
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    pressureUnit: 'mb',
    notifications: true,
    autoLocation: true,
  },
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_DETECTING_LOCATION: 'SET_DETECTING_LOCATION',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  SET_CURRENT_WEATHER: 'SET_CURRENT_WEATHER',
  SET_FORECAST: 'SET_FORECAST',
  SET_AIR_QUALITY: 'SET_AIR_QUALITY',
  SET_ASTRONOMY: 'SET_ASTRONOMY',
  
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
  SET_SELECTED_CITY: 'SET_SELECTED_CITY',
  SET_MAP_CENTER: 'SET_MAP_CENTER',
  SET_MAP_ZOOM: 'SET_MAP_ZOOM',
  TOGGLE_MAP: 'TOGGLE_MAP',
  
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_SUGGESTIONS: 'SET_SEARCH_SUGGESTIONS',
  SET_SEARCH_HISTORY: 'SET_SEARCH_HISTORY',
  SET_IS_SEARCHING: 'SET_IS_SEARCHING',
  
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  SET_FAVORITES: 'SET_FAVORITES',
  
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_THEME: 'SET_THEME',
  
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  SET_SETTINGS: 'SET_SETTINGS',
};

// Reducer
const weatherReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case actionTypes.SET_DETECTING_LOCATION:
      return { ...state, isDetectingLocation: action.payload };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false, isDetectingLocation: false };
    
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    case actionTypes.SET_CURRENT_WEATHER:
      return { ...state, currentWeather: action.payload, loading: false };
    
    case actionTypes.SET_FORECAST:
      return { ...state, forecast: action.payload, loading: false };
    
    case actionTypes.SET_AIR_QUALITY:
      return { ...state, airQuality: action.payload };
    
    case actionTypes.SET_ASTRONOMY:
      return { ...state, astronomy: action.payload };
    
    case actionTypes.SET_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };
    
    case actionTypes.SET_SELECTED_CITY:
      return { ...state, selectedCity: action.payload };
    
    case actionTypes.SET_MAP_CENTER:
      return { ...state, mapCenter: action.payload };
    
    case actionTypes.SET_MAP_ZOOM:
      return { ...state, mapZoom: action.payload };
    
    case actionTypes.TOGGLE_MAP:
      return { ...state, isMapVisible: !state.isMapVisible };
    
    case actionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case actionTypes.SET_SEARCH_SUGGESTIONS:
      return { ...state, searchSuggestions: action.payload };
    
    case actionTypes.SET_SEARCH_HISTORY:
      return { ...state, searchHistory: action.payload };
    
    case actionTypes.SET_IS_SEARCHING:
      return { ...state, isSearching: action.payload };
    
    case actionTypes.ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    
    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload),
      };
    
    case actionTypes.SET_FAVORITES:
      return { ...state, favorites: action.payload };
    
    case actionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    case actionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    
    case actionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    
    case actionTypes.SET_SETTINGS:
      return { ...state, settings: action.payload };
    
    default:
      return state;
  }
};

// Create context
const WeatherContext = createContext();

// Provider component
export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // Load saved data on mount
  useEffect(() => {
    const loadSavedData = () => {
      // Load favorites
      const favorites = storageService.getFavorites();
      dispatch({ type: actionTypes.SET_FAVORITES, payload: favorites });

      // Load search history
      const searchHistory = storageService.getSearchHistory();
      dispatch({ type: actionTypes.SET_SEARCH_HISTORY, payload: searchHistory });

      // Load theme
      const theme = storageService.getTheme();
      dispatch({ type: actionTypes.SET_THEME, payload: theme });
      document.documentElement.className = theme;

      // Load settings
      const settings = storageService.getSettings();
      dispatch({ type: actionTypes.SET_SETTINGS, payload: settings });
    };

    loadSavedData();
  }, []);

  // Actions
  const actions = {
    setLoading: (loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    },

    setDetectingLocation: (detecting) => {
      dispatch({ type: actionTypes.SET_DETECTING_LOCATION, payload: detecting });
    },

    setError: (error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    },

    clearError: () => {
      dispatch({ type: actionTypes.CLEAR_ERROR });
    },

    // Weather actions
    fetchWeatherByLocation: async (location) => {
      try {
        actions.setLoading(true);
        actions.clearError();
        
        const data = await weatherService.getForecast(location, 7);
        
        dispatch({ type: actionTypes.SET_CURRENT_WEATHER, payload: data.current });
        dispatch({ type: actionTypes.SET_FORECAST, payload: data.forecast });
        dispatch({ type: actionTypes.SET_AIR_QUALITY, payload: data.current.air_quality });
        dispatch({ type: actionTypes.SET_SELECTED_CITY, payload: data.location });
        
        // Add to search history
        storageService.addToSearchHistory(location);
        const updatedHistory = storageService.getSearchHistory();
        dispatch({ type: actionTypes.SET_SEARCH_HISTORY, payload: updatedHistory });
        
      } catch (error) {
        actions.setError(error.message);
      }
    },

    fetchWeatherByCoords: async (lat, lon) => {
      try {
        actions.setLoading(true);
        actions.clearError();
        
        const data = await weatherService.getWeatherByCoords(lat, lon);
        
        dispatch({ type: actionTypes.SET_CURRENT_WEATHER, payload: data.current });
        dispatch({ type: actionTypes.SET_FORECAST, payload: data.forecast });
        dispatch({ type: actionTypes.SET_AIR_QUALITY, payload: data.current.air_quality });
        dispatch({ type: actionTypes.SET_SELECTED_CITY, payload: data.location });
        dispatch({ type: actionTypes.SET_CURRENT_LOCATION, payload: { lat, lon } });
        dispatch({ type: actionTypes.SET_MAP_CENTER, payload: [lat, lon] });
        dispatch({ type: actionTypes.SET_MAP_ZOOM, payload: 12 });
        
      } catch (error) {
        actions.setError(error.message);
      }
    },

    getWeatherByCoordinates: async (lat, lon) => {
      try {
        actions.setLoading(true);
        actions.clearError();
        
        const data = await weatherService.getWeatherByCoords(lat, lon);
        
        dispatch({ type: actionTypes.SET_CURRENT_WEATHER, payload: data.current });
        dispatch({ type: actionTypes.SET_FORECAST, payload: data.forecast });
        dispatch({ type: actionTypes.SET_AIR_QUALITY, payload: data.current.air_quality });
        dispatch({ type: actionTypes.SET_SELECTED_CITY, payload: data.location });
        dispatch({ type: actionTypes.SET_CURRENT_LOCATION, payload: { lat, lon } });
        dispatch({ type: actionTypes.SET_MAP_CENTER, payload: [lat, lon] });
        dispatch({ type: actionTypes.SET_MAP_ZOOM, payload: 12 });
        
      } catch (error) {
        actions.setError(error.message);
      }
    },

    toggleMap: () => {
      dispatch({ type: actionTypes.TOGGLE_MAP });
    },

    fetchAstronomy: async (location) => {
      try {
        const data = await weatherService.getAstronomy(location);
        dispatch({ type: actionTypes.SET_ASTRONOMY, payload: data });
      } catch (error) {
        console.error('Error fetching astronomy data:', error);
      }
    },

    // Location actions
    getCurrentLocation: async () => {
      try {
        actions.setLoading(true);
        actions.setDetectingLocation(true);
        actions.clearError();
        
        // Show locating toast only if toast is available
        if (window.showToast && typeof window.showToast === 'function') {
          window.showToast('Detecting your location...', 'info');
        }
        
        const position = await locationService.getCurrentPosition();
        
        // Reverse geocode to get city name
        const locationData = await weatherService.reverseGeocode(position.lat, position.lon);
        
        // Update map center and zoom for smooth animation
        dispatch({ type: actionTypes.SET_MAP_CENTER, payload: [position.lat, position.lon] });
        dispatch({ type: actionTypes.SET_MAP_ZOOM, payload: 14 });
        
        // Fetch weather for the location
        await actions.fetchWeatherByCoords(position.lat, position.lon);
        
        // Update selected city with reverse geocoded data
        if (locationData) {
          dispatch({ type: actionTypes.SET_SELECTED_CITY, payload: locationData });
        }
        
        // Show success toast only if toast is available
        if (window.showToast && typeof window.showToast === 'function') {
          const cityName = locationData?.name || 'Current Location';
          window.showToast(`Location found: ${cityName}`, 'success');
        }
      } catch (error) {
        let errorMessage = error.message || 'Unknown error occurred';
        
        if (error.message && error.message.includes('permission denied')) {
          errorMessage = 'Please allow location access';
          
          // Fallback to Hyderabad coordinates
          try {
            console.log('Falling back to Hyderabad');
            
            // Hyderabad coordinates
            const fallbackLat = 17.3850;
            const fallbackLon = 78.4867;
            
            // Reverse geocode Hyderabad
            const fallbackLocationData = await weatherService.reverseGeocode(fallbackLat, fallbackLon);
            
            // Update map center and zoom
            dispatch({ type: actionTypes.SET_MAP_CENTER, payload: [fallbackLat, fallbackLon] });
            dispatch({ type: actionTypes.SET_MAP_ZOOM, payload: 12 });
            
            // Fetch weather for Hyderabad
            await actions.fetchWeatherByCoords(fallbackLat, fallbackLon);
            
            // Update selected city
            if (fallbackLocationData) {
              dispatch({ type: actionTypes.SET_SELECTED_CITY, payload: fallbackLocationData });
            }
            
            // Show fallback toast
            if (window.showToast && typeof window.showToast === 'function') {
              window.showToast('Using default location (Hyderabad)', 'info');
            }
            
            return; // Success with fallback
          } catch (fallbackError) {
            console.error('Fallback to Hyderabad failed:', fallbackError);
            errorMessage = 'Unable to get your location or load default location';
          }
        } else if (error.message && error.message.includes('not supported')) {
          errorMessage = 'Geolocation is not supported by your browser';
        } else if (error.message && error.message.includes('timed out')) {
          errorMessage = 'Location request timed out. Please try again';
        } else if (error.message && error.message.includes('unavailable')) {
          errorMessage = 'Location information unavailable. Please try again later';
        }
        
        // Only set error and show toast if we have a valid message and fallback failed
        if (errorMessage && errorMessage.trim() !== '') {
          actions.setError(errorMessage);
          
          // Show error toast only if toast is available and message is valid
          if (window.showToast && typeof window.showToast === 'function') {
            window.showToast(errorMessage, 'error');
          }
        }
      } finally {
        actions.setLoading(false);
        actions.setDetectingLocation(false);
      }
    },

    // Search actions
    setSearchQuery: (query) => {
      dispatch({ type: actionTypes.SET_SEARCH_QUERY, payload: query });
    },

    searchCities: async (query) => {
      if (!query.trim()) {
        dispatch({ type: actionTypes.SET_SEARCH_SUGGESTIONS, payload: [] });
        return;
      }

      try {
        actions.setIsSearching(true);
        const suggestions = await weatherService.searchCities(query);
        dispatch({ type: actionTypes.SET_SEARCH_SUGGESTIONS, payload: suggestions });
      } catch (error) {
        console.error('Error searching cities:', error);
        dispatch({ type: actionTypes.SET_SEARCH_SUGGESTIONS, payload: [] });
      } finally {
        actions.setIsSearching(false);
      }
    },

    setIsSearching: (isSearching) => {
      dispatch({ type: actionTypes.SET_IS_SEARCHING, payload: isSearching });
    },

    // Favorites actions
    addFavorite: (city) => {
      if (storageService.addFavorite(city)) {
        const updatedFavorites = storageService.getFavorites();
        dispatch({ type: actionTypes.SET_FAVORITES, payload: updatedFavorites });
      }
    },

    removeFavorite: (cityId) => {
      if (storageService.removeFavorite(cityId)) {
        const updatedFavorites = storageService.getFavorites();
        dispatch({ type: actionTypes.SET_FAVORITES, payload: updatedFavorites });
      }
    },

    // UI actions
    toggleSidebar: () => {
      dispatch({ type: actionTypes.TOGGLE_SIDEBAR });
    },

    setTheme: (theme) => {
      storageService.setTheme(theme);
      dispatch({ type: actionTypes.SET_THEME, payload: theme });
      document.documentElement.className = theme;
    },

    // Settings actions
    updateSettings: (newSettings) => {
      storageService.updateSettings(newSettings);
      dispatch({ type: actionTypes.UPDATE_SETTINGS, payload: newSettings });
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

// Hook to use the context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
