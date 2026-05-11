import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { weatherService } from '../services/weatherService';

// Initial state
const initialState = {
  favorites: [],
  loading: false,
  error: null,
  sidebarOpen: false,
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_FAVORITES: 'SET_FAVORITES',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SIDEBAR_OPEN: 'SET_SIDEBAR_OPEN',
  UPDATE_FAVORITE_WEATHER: 'UPDATE_FAVORITE_WEATHER',
};

// Reducer
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    case actionTypes.SET_FAVORITES:
      return { ...state, favorites: action.payload };
    
    case actionTypes.ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    
    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload),
      };
    
    case actionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    case actionTypes.SET_SIDEBAR_OPEN:
      return { ...state, sidebarOpen: action.payload };
    
    case actionTypes.UPDATE_FAVORITE_WEATHER:
      return {
        ...state,
        favorites: state.favorites.map(fav =>
          fav.id === action.payload.id
            ? { ...fav, ...action.payload.data }
            : fav
        ),
      };
    
    default:
      return state;
  }
};

// Create context
const FavoritesContext = createContext();

// Provider component
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem('weatherFavorites');
        const favorites = stored ? JSON.parse(stored) : [];
        dispatch({ type: actionTypes.SET_FAVORITES, payload: favorites });
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    const saveFavorites = () => {
      try {
        localStorage.setItem('weatherFavorites', JSON.stringify(state.favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    };

    saveFavorites();
  }, [state.favorites]);

  // Actions
  const actions = {
    setLoading: (loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    },

    clearError: () => {
      dispatch({ type: actionTypes.CLEAR_ERROR });
    },

    // Toggle favorite city (add or remove)
    toggleFavorite: async (cityData) => {
      try {
        actions.setLoading(true);
        actions.clearError();

        // Check if already exists
        const existingIndex = state.favorites.findIndex(
          fav => fav.name === cityData.name && fav.country === cityData.country
        );

        if (existingIndex !== -1) {
          // Remove existing favorite
          const favorite = state.favorites[existingIndex];
          dispatch({ type: actionTypes.REMOVE_FAVORITE, payload: favorite.id });
          
          // Show success toast
          if (window.showToast && typeof window.showToast === 'function' && favorite.name) {
            window.showToast(`${favorite.name} removed from favorites`, 'success');
          }
          
          return { action: 'removed', favorite };
        } else {
          // Add new favorite
          const favorite = {
            id: `${cityData.name}-${cityData.country}-${Date.now()}`,
            name: cityData.name,
            country: cityData.country,
            region: cityData.region || '',
            lat: cityData.lat,
            lon: cityData.lon,
            addedAt: new Date().toISOString(),
          };

          // Get current weather for this favorite
          try {
            const weatherData = await weatherService.getCurrentWeather(`${cityData.name},${cityData.country}`);
            favorite.currentTemp = weatherData.current.temp_c;
            favorite.currentCondition = weatherData.current.condition.text;
            favorite.currentIcon = weatherData.current.condition.icon;
            favorite.lastUpdated = new Date().toISOString();
          } catch (error) {
            console.warn('Could not fetch weather for favorite:', error);
          }

          dispatch({ type: actionTypes.ADD_FAVORITE, payload: favorite });
          
          // Show success toast
          if (window.showToast && typeof window.showToast === 'function' && favorite.name) {
            window.showToast(`${favorite.name} added to favorites`, 'success');
          }
          
          return { action: 'added', favorite };
        }
      } catch (error) {
        actions.setError('Failed to toggle favorite');
        return { action: 'error', error };
      } finally {
        actions.setLoading(false);
      }
    },

    // Add favorite city (kept for backward compatibility)
    addFavorite: async (cityData) => {
      return actions.toggleFavorite(cityData);
    },

    // Remove favorite
    removeFavorite: (favoriteId) => {
      try {
        const favorite = state.favorites.find(fav => fav.id === favoriteId);
        dispatch({ type: actionTypes.REMOVE_FAVORITE, payload: favoriteId });
        
        // Show success toast
        if (window.showToast && typeof window.showToast === 'function' && favorite && favorite.name) {
          window.showToast(`${favorite.name} removed from favorites`, 'success');
        }
        
        return true;
      } catch (error) {
        actions.setError('Failed to remove favorite');
        return false;
      }
    },

    // Toggle sidebar
    toggleSidebar: () => {
      dispatch({ type: actionTypes.TOGGLE_SIDEBAR });
    },

    // Set sidebar open state
    setSidebarOpen: (open) => {
      dispatch({ type: actionTypes.SET_SIDEBAR_OPEN, payload: open });
    },

    // Update favorite weather data
    updateFavoriteWeather: async (favoriteId) => {
      try {
        const favorite = state.favorites.find(fav => fav.id === favoriteId);
        if (!favorite) return;

        const weatherData = await weatherService.getCurrentWeather(
          `${favorite.name},${favorite.country}`
        );

        dispatch({
          type: actionTypes.UPDATE_FAVORITE_WEATHER,
          payload: {
            id: favoriteId,
            data: {
              currentTemp: weatherData.current.temp_c,
              currentCondition: weatherData.current.condition.text,
              currentIcon: weatherData.current.condition.icon,
              lastUpdated: new Date().toISOString(),
            },
          },
        });
      } catch (error) {
        console.warn('Failed to update favorite weather:', error);
      }
    },

    // Update all favorites weather
    updateAllFavoritesWeather: async () => {
      try {
        actions.setLoading(true);
        
        const updatePromises = state.favorites.map(favorite =>
          actions.updateFavoriteWeather(favorite.id)
        );

        await Promise.allSettled(updatePromises);
      } catch (error) {
        console.error('Failed to update favorites weather:', error);
      } finally {
        actions.setLoading(false);
      }
    },

    // Check if city is favorite
    isFavorite: (cityName, country) => {
      return state.favorites.some(
        fav => fav.name === cityName && fav.country === country
      );
    },

    // Get favorite by id
    getFavoriteById: (id) => {
      return state.favorites.find(fav => fav.id === id);
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook to use the context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
