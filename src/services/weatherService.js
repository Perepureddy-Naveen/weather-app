import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const weatherService = {
  // Get current weather
  getCurrentWeather: async (location) => {
    try {
      const response = await weatherApi.get('/current.json', {
        params: {
          key: API_KEY,
          q: location,
          aqi: 'yes',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch current weather data');
    }
  },

  // Get forecast data
  getForecast: async (location, days = 7) => {
    try {
      const response = await weatherApi.get('/forecast.json', {
        params: {
          key: API_KEY,
          q: location,
          days: days,
          aqi: 'yes',
          alerts: 'yes',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch forecast data');
    }
  },

  // Search for cities
  searchCities: async (query) => {
    try {
      const response = await weatherApi.get('/search.json', {
        params: {
          key: API_KEY,
          q: query,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to search cities');
    }
  },

  // Get air quality data
  getAirQuality: async (location) => {
    try {
      const response = await weatherApi.get('/current.json', {
        params: {
          key: API_KEY,
          q: location,
          aqi: 'yes',
        },
      });
      return response.data.current.air_quality;
    } catch (error) {
      throw new Error('Failed to fetch air quality data');
    }
  },

  // Get reverse geocoding
  reverseGeocode: async (lat, lon) => {
    try {
      const response = await weatherApi.get('/search.json', {
        params: {
          key: API_KEY,
          q: `${lat},${lon}`,
        },
      });
      
      // Return the first result or create a default location object
      if (response.data && response.data.length > 0) {
        return response.data[0];
      } else {
        // Fallback to coordinates-based location
        return {
          name: 'Current Location',
          region: '',
          country: '',
          lat: lat,
          lon: lon,
        };
      }
    } catch (error) {
      // If reverse geocoding fails, return a default location object
      return {
        name: 'Current Location',
        region: '',
        country: '',
        lat: lat,
        lon: lon,
      };
    }
  },

  // Get astronomy data
  getAstronomy: async (location) => {
    try {
      const response = await weatherApi.get('/astronomy.json', {
        params: {
          key: API_KEY,
          q: location,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch astronomy data');
    }
  },

  // Get weather by coordinates
  getWeatherByCoords: async (lat, lon) => {
    try {
      const response = await weatherApi.get('/forecast.json', {
        params: {
          key: API_KEY,
          q: `${lat},${lon}`,
          days: 7,
          aqi: 'yes',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather data for your location');
    }
  },
};
