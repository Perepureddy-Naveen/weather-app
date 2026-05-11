// Weather utility functions

export const getWeatherIcon = (condition) => {
  const iconMap = {
    'sunny': '☀️',
    'clear': '🌙',
    'partly-cloudy': '⛅',
    'cloudy': '☁️',
    'overcast': '☁️',
    'mist': '🌫️',
    'fog': '🌫️',
    'rain': '🌧️',
    'light-rain': '🌦️',
    'heavy-rain': '⛈️',
    'snow': '❄️',
    'light-snow': '🌨️',
    'heavy-snow': '🌨️',
    'thunderstorm': '⛈️',
  };

  const lowerCondition = condition.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerCondition.includes(key)) {
      return icon;
    }
  }
  return '🌤️';
};

export const getTemperature = (temp, unit = 'celsius') => {
  if (unit === 'fahrenheit') {
    return Math.round(temp * 9/5 + 32);
  }
  return Math.round(temp);
};

export const getWindSpeed = (speed, unit = 'kmh') => {
  if (unit === 'mph') {
    return Math.round(speed * 0.621371);
  }
  return Math.round(speed);
};

export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const getDayName = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
};

export const getAQILevel = (aqi) => {
  if (aqi <= 50) return { level: 'Good', color: 'green', bg: 'bg-green-500' };
  if (aqi <= 100) return { level: 'Moderate', color: 'yellow', bg: 'bg-yellow-500' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'orange', bg: 'bg-orange-500' };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'red', bg: 'bg-red-500' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'purple', bg: 'bg-purple-500' };
  return { level: 'Hazardous', color: 'maroon', bg: 'bg-red-900' };
};

export const getUVIndexLevel = (uv) => {
  if (uv <= 2) return { level: 'Low', color: 'green' };
  if (uv <= 5) return { level: 'Moderate', color: 'yellow' };
  if (uv <= 7) return { level: 'High', color: 'orange' };
  if (uv <= 10) return { level: 'Very High', color: 'red' };
  return { level: 'Extreme', color: 'purple' };
};

export const getBackgroundGradient = (condition, isDay, theme) => {
  const lowerCondition = condition.toLowerCase();

  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
    if (isDay) {
      return theme === 'dark'
        ? 'from-blue-800 via-yellow-900 to-orange-900'
        : 'from-blue-400 via-yellow-300 to-orange-300';
    } else {
      return theme === 'dark'
        ? 'from-indigo-900 via-purple-900 to-pink-900'
        : 'from-indigo-200 via-purple-200 to-pink-200';
    }
  }

  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return theme === 'dark'
      ? 'from-gray-900 via-blue-900 to-gray-800'
      : 'from-gray-400 via-blue-400 to-gray-300';
  }

  if (lowerCondition.includes('snow')) {
    return theme === 'dark'
      ? 'from-gray-100 via-blue-100 to-white'
      : 'from-gray-200 via-blue-200 to-white';
  }

  if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
    return theme === 'dark'
      ? 'from-gray-800 via-gray-700 to-gray-800'
      : 'from-gray-300 via-gray-200 to-gray-300';
  }

  if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return theme === 'dark'
      ? 'from-gray-900 via-purple-900 to-gray-800'
      : 'from-gray-600 via-purple-400 to-gray-500';
  }

  // Default
  return theme === 'dark'
    ? 'from-blue-900 via-purple-900 to-pink-900'
    : 'from-blue-200 via-purple-200 to-pink-200';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
