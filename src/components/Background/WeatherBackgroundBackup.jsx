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

  const getWeatherColor = (condition) => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
      return 'rgba(255, 200, 50, 0.3)';
    }
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return 'rgba(100, 150, 200, 0.3)';
    }
    if (lowerCondition.includes('snow')) {
      return 'rgba(200, 220, 255, 0.3)';
    }
    if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return 'rgba(150, 150, 180, 0.3)';
    }
    if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return 'rgba(150, 100, 200, 0.3)';
    }
    
    return 'rgba(100, 150, 255, 0.3)';
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

  return (
    <div className="premium-bg fixed inset-0">
      {/* Premium animated gradient blobs */}
      <div className="bg-gradient-blob bg-gradient-blob-1" />
      <div className="bg-gradient-blob bg-gradient-blob-2" />
      <div className="bg-gradient-blob bg-gradient-blob-3" />
      
      {/* Weather-specific gradient overlay */}
      {currentWeather && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
          style={{
            background: `linear-gradient(135deg, 
              ${getWeatherColor(currentWeather.condition.text)} 0%, 
              transparent 70%)`
          }}
        />
      )}

      {/* Premium floating orbs with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 150, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            top: '10%',
            left: '10%',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 120, -80, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            bottom: '15%',
            right: '15%',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-15 blur-3xl"
          animate={{
            x: [0, 80, -80, 0],
            y: [0, 80, -80, 0],
            scale: [1, 1.3, 0.7, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
            top: '50%',
            left: '60%',
          }}
        />
      </div>

      {/* Weather particles with enhanced effects */}
      <AnimatePresence>
        {particles.map((particle) => renderParticle(particle))}
      </AnimatePresence>

      {/* Premium light rays */}
      {currentWeather && currentWeather.condition.text.toLowerCase().includes('sunny') && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute"
              style={{
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                width: '200%',
                height: '2px',
                transformOrigin: 'center',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default WeatherBackground;
