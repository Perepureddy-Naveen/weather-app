export const locationService = {
  // Get current position
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Location permission denied'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information unavailable'));
              break;
            case error.TIMEOUT:
              reject(new Error('Location request timed out'));
              break;
            default:
              reject(new Error('An unknown error occurred'));
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  },

  // Watch position for continuous updates
  watchPosition: (callback, errorCallback) => {
    if (!navigator.geolocation) {
      errorCallback(new Error('Geolocation is not supported by this browser'));
      return null;
    }

    return navigator.geolocation.watchPosition(
      callback,
      errorCallback,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  },

  // Clear watch
  clearWatch: (watchId) => {
    if (watchId && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
  },
};
