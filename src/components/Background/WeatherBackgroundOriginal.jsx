import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../../context/WeatherContext';

const WeatherBackground = () => {
  const { currentWeather, theme } = useWeather();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!currentWeather) return;

    const condition = currentWeather.condition.text.toLowerCase();
    const newParticles = [];

    // Rain particles
    if (condition.includes('rain') || condition.includes('drizzle')) {
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          id: `rain-${i}`,
          type: 'rain',
          x: Math.random() * 100,
          y: Math.random() * 100 - 100,
          delay: Math.random() * 2,
          duration: 0.5 + Math.random() * 0.5,
          opacity: 0.1 + Math.random() * 0.3,
        });
      }
    }

    // Snow particles
    if (condition.includes('snow')) {
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: `snow-${i}`,
          type: 'snow',
          x: Math.random() * 100,
          y: Math.random() * 100 - 100,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 2,
          size: 2 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.7,
        });
      }
    }

    setParticles(newParticles);
  }, [currentWeather]);

  const getBackgroundGradient = (condition, isDay, theme) => {
    const lowerCondition = condition.toLowerCase();

    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
      if (isDay) {
        return 'from-blue-900 via-cyan-800 to-purple-900';
      } else {
        return 'from-indigo-900 via-purple-900 to-pink-900';
      }
    }

    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return 'from-gray-900 via-blue-900 to-gray-800';
    }

    if (lowerCondition.includes('snow')) {
      return 'from-gray-800 via-blue-800 to-gray-700';
    }

    if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return 'from-gray-800 via-gray-700 to-gray-800';
    }

    if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return 'from-gray-900 via-purple-900 to-gray-800';
    }

    // Default gradient
    return 'from-blue-900 via-purple-900 to-pink-900';
  };

  const renderParticle = (particle) => {
    switch (particle.type) {
      case 'rain':
        return (
          <motion.div
            key={particle.id}
            className="absolute w-0.5 h-4 bg-blue-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              opacity: particle.opacity,
            }}
            initial={{ y: -20 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );

      case 'snow':
        return (
          <motion.div
            key={particle.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            initial={{ y: -20, x: 0 }}
            animate={{ 
              y: '100vh',
              x: [0, 20, -20, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );

      default:
        return null;
    }
  };

  const isDay = currentWeather && currentWeather.is_day === 1;

  return (
    <div className={`fixed inset-0 transition-all duration-1000 ${
      currentWeather
        ? `bg-gradient-to-br ${getBackgroundGradient(currentWeather.condition.text, isDay, theme)}`
        : theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 to-gray-800'
        : 'bg-gradient-to-br from-blue-200 to-purple-200'
    }`}>
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 50%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Weather particles */}
      <AnimatePresence>
        {particles.map((particle) => renderParticle(particle))}
      </AnimatePresence>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            top: '10%',
            left: '10%',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-purple-500 opacity-10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            bottom: '10%',
            right: '10%',
          }}
        />
      </div>
    </div>
  );
};

export default WeatherBackground;
