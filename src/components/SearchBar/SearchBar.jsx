import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMic, FiX } from 'react-icons/fi';
import { useWeather } from '../../context/WeatherContext';

const SearchBar = () => {
  const {
    searchQuery,
    searchSuggestions,
    searchHistory,
    isSearching,
    setSearchQuery,
    searchCities,
    fetchWeatherByLocation,
    setIsSearching,
    theme,
  } = useWeather();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchCities(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchCities]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(true);
    setSelectedSuggestionIndex(-1);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const location = `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`;
    setSearchQuery(location);
    setShowSuggestions(false);
    fetchWeatherByLocation(location);
    inputRef.current?.blur();
  };

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeatherByLocation(searchQuery);
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    const suggestions = [...searchSuggestions, ...searchHistory.slice(0, 3)];
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          const suggestion = suggestions[selectedSuggestionIndex];
          if (suggestion.query) {
            // Search history item
            setSearchQuery(suggestion.query);
            fetchWeatherByLocation(suggestion.query);
          } else {
            // Search suggestion
            handleSuggestionClick(suggestion);
          }
        } else {
          handleSubmit(e);
        }
        setShowSuggestions(false);
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Voice search
  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      if (window.showToast) {
        window.showToast('Voice search is not supported in your browser', 'error');
      }
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setShowSuggestions(false);
      fetchWeatherByLocation(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allSuggestions = [...searchSuggestions, ...searchHistory.slice(0, 3)];

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {isListening ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </motion.div>
            ) : (
              <FiSearch className={`w-5 h-5`}
                style={{
                  color: theme === 'dark' 
                    ? 'rgba(255,255,255,0.5)' 
                    : 'var(--light-text-muted)'
                }} />
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for a city..."
            className={`w-full pl-10 pr-24 py-3 rounded-xl border transition-all duration-200 backdrop-blur-sm focus:outline-none`}
            style={{
              background: theme === 'dark' 
                ? 'rgba(31,41,55,0.5)' 
                : 'var(--light-bg-glass)',
              backdropFilter: 'blur(8px)',
              border: theme === 'dark' 
                ? '1px solid rgba(255,255,255,0.1)' 
                : '1px solid var(--light-border)',
              color: theme === 'dark' 
                ? '#ffffff' 
                : 'var(--light-text-primary)',
              placeholderColor: theme === 'dark' 
                ? 'rgba(255,255,255,0.5)' 
                : 'var(--light-text-muted)',
              boxShadow: theme === 'dark' 
                ? '0 4px 20px rgba(0,0,0,0.2)' 
                : 'var(--light-shadow)'
            }}
            onFocus={(e) => {
              setShowSuggestions(true);
              e.target.style.borderColor = theme === 'dark' 
                ? '#3b82f6' 
                : 'var(--light-accent)';
              e.target.style.boxShadow = theme === 'dark' 
                ? '0 0 20px rgba(59,130,246,0.3)' 
                : '0 0 20px rgba(59,130,246,0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme === 'dark' 
                ? 'rgba(255,255,255,0.1)' 
                : '1px solid var(--light-border)';
              e.target.style.boxShadow = theme === 'dark' 
                ? '0 4px 20px rgba(0,0,0,0.2)' 
                : 'var(--light-shadow)';
            }}
          />

          {/* Action Buttons */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {searchQuery && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                  inputRef.current?.focus();
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-gray-200 text-gray-500'
                }`}
              >
                <FiX className="w-4 h-4" />
              </motion.button>
            )}
            
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startVoiceSearch}
              disabled={isListening}
              className={`p-1.5 rounded-lg transition-colors ${
                isListening
                  ? 'bg-red-500 text-white'
                  : theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-200 text-gray-500'
              }`}
              title="Voice search"
            >
              <FiMic className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && allSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl border overflow-hidden backdrop-blur-xl z-50`}
            style={{
              background: theme === 'dark' 
                ? 'rgba(31,41,55,0.95)' 
                : 'var(--light-bg-secondary)',
              backdropFilter: 'blur(12px)',
              border: theme === 'dark' 
                ? '1px solid rgba(255,255,255,0.1)' 
                : '1px solid var(--light-border)',
              boxShadow: theme === 'dark' 
                ? '0 20px 40px rgba(0,0,0,0.4)' 
                : 'var(--light-shadow-hover)'
            }}
          >
            <div className="max-h-80 overflow-y-auto">
              {allSuggestions.map((suggestion, index) => {
                const isHistoryItem = suggestion.query;
                const isSelected = index === selectedSuggestionIndex;
                
                return (
                  <motion.div
                    key={isHistoryItem ? `history-${index}` : suggestion.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => isHistoryItem ? 
                      fetchWeatherByLocation(suggestion.query) : 
                      handleSuggestionClick(suggestion)
                    }
                    className={`px-4 py-3 cursor-pointer transition-colors border-b`}
                    style={{
                      background: isSelected
                        ? theme === 'dark'
                          ? 'rgba(59,130,246,0.2)'
                          : 'rgba(59,130,246,0.1)'
                        : 'transparent',
                      borderColor: theme === 'dark' 
                        ? 'rgba(255,255,255,0.1)' 
                        : 'var(--light-border)',
                      color: theme === 'dark' 
                        ? '#ffffff' 
                        : 'var(--light-text-primary)'
                    }}
                    onMouseOver={(e) => {
                      if (!isSelected) {
                        e.target.style.background = theme === 'dark' 
                          ? 'rgba(255,255,255,0.05)' 
                          : 'rgba(59,130,246,0.05)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSelected) {
                        e.target.style.background = 'transparent';
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <FiSearch className={`w-4 h-4`}
                        style={{
                          color: theme === 'dark' 
                            ? 'rgba(255,255,255,0.5)' 
                            : 'var(--light-text-muted)'
                        }} />
                      <div className="flex-1">
                        {isHistoryItem ? (
                          <div>
                            <p className="text-sm font-medium" style={{
                              color: theme === 'dark' 
                                ? '#ffffff' 
                                : 'var(--light-text-primary)'
                            }}>
                              {suggestion.query}
                            </p>
                            <p className="text-xs" style={{
                              color: theme === 'dark' 
                                ? 'rgba(255,255,255,0.5)' 
                                : 'var(--light-text-muted)'
                            }}>
                              Recent search
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-medium" style={{
                              color: theme === 'dark' 
                                ? '#ffffff' 
                                : 'var(--light-text-primary)'
                            }}>
                              {suggestion.name}, {suggestion.region}
                            </p>
                            <p className="text-xs" style={{
                              color: theme === 'dark' 
                                ? 'rgba(255,255,255,0.5)' 
                                : 'var(--light-text-muted)'
                            }}>
                              {suggestion.country}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
