export const storageService = {
  // Favorites management
  getFavorites: () => {
    try {
      const favorites = localStorage.getItem('weatherFavorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  },

  addFavorite: (city) => {
    try {
      const favorites = storageService.getFavorites();
      const exists = favorites.find(fav => fav.id === city.id || fav.name === city.name);
      
      if (!exists) {
        favorites.push({
          id: city.id || `${city.name}-${Date.now()}`,
          name: city.name,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
          addedAt: new Date().toISOString(),
        });
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  },

  removeFavorite: (cityId) => {
    try {
      const favorites = storageService.getFavorites();
      const filteredFavorites = favorites.filter(fav => fav.id !== cityId);
      localStorage.setItem('weatherFavorites', JSON.stringify(filteredFavorites));
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  },

  // Search history management
  getSearchHistory: () => {
    try {
      const history = localStorage.getItem('weatherSearchHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error loading search history:', error);
      return [];
    }
  },

  addToSearchHistory: (query) => {
    try {
      const history = storageService.getSearchHistory();
      const existingIndex = history.findIndex(item => item.query === query);
      
      // Remove existing entry if it exists
      if (existingIndex > -1) {
        history.splice(existingIndex, 1);
      }
      
      // Add to beginning of array
      history.unshift({
        query,
        timestamp: new Date().toISOString(),
      });
      
      // Keep only last 10 searches
      const trimmedHistory = history.slice(0, 10);
      
      localStorage.setItem('weatherSearchHistory', JSON.stringify(trimmedHistory));
      return true;
    } catch (error) {
      console.error('Error adding to search history:', error);
      return false;
    }
  },

  clearSearchHistory: () => {
    try {
      localStorage.removeItem('weatherSearchHistory');
      return true;
    } catch (error) {
      console.error('Error clearing search history:', error);
      return false;
    }
  },

  // Theme management
  getTheme: () => {
    try {
      return localStorage.getItem('weatherTheme') || 'light';
    } catch (error) {
      console.error('Error loading theme:', error);
      return 'light';
    }
  },

  setTheme: (theme) => {
    try {
      localStorage.setItem('weatherTheme', theme);
      return true;
    } catch (error) {
      console.error('Error setting theme:', error);
      return false;
    }
  },

  // Settings management
  getSettings: () => {
    try {
      const settings = localStorage.getItem('weatherSettings');
      return settings ? JSON.parse(settings) : {
        temperatureUnit: 'celsius',
        windSpeedUnit: 'kmh',
        pressureUnit: 'mb',
        notifications: true,
        autoLocation: true,
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        temperatureUnit: 'celsius',
        windSpeedUnit: 'kmh',
        pressureUnit: 'mb',
        notifications: true,
        autoLocation: true,
      };
    }
  },

  updateSettings: (newSettings) => {
    try {
      const currentSettings = storageService.getSettings();
      const updatedSettings = { ...currentSettings, ...newSettings };
      localStorage.setItem('weatherSettings', JSON.stringify(updatedSettings));
      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  },
};
