import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ 
  id, 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheck className="w-5 h-5" />;
      case 'error':
        return <FiAlertCircle className="w-5 h-5" />;
      case 'info':
        return <FiInfo className="w-5 h-5" />;
      default:
        return <FiCheck className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          border: 'border-green-600',
          icon: 'text-white',
          text: 'text-white',
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          border: 'border-red-600',
          icon: 'text-white',
          text: 'text-white',
        };
      case 'info':
        return {
          bg: 'bg-blue-500',
          border: 'border-blue-600',
          icon: 'text-white',
          text: 'text-white',
        };
      default:
        return {
          bg: 'bg-gray-500',
          border: 'border-gray-600',
          icon: 'text-white',
          text: 'text-white',
        };
    }
  };

  const colors = getColors();

  const toastVariants = {
    initial: { 
      opacity: 0, 
      y: -50, 
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && message && message.trim() !== '' && (
        <motion.div
          variants={toastVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className={`${colors.bg} ${colors.border} border rounded-lg shadow-lg backdrop-blur-xl`}>
            <div className="flex items-center p-4">
              {/* Icon */}
              <div className={`flex-shrink-0 mr-3 ${colors.icon}`}>
                {getIcon()}
              </div>
              
              {/* Message */}
              <div className="flex-1 mr-3">
                <p className={`text-sm font-medium ${colors.text}`}>
                  {message}
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => onClose(id), 300);
                }}
                className={`flex-shrink-0 p-1 rounded-md transition-colors ${
                  type === 'success'
                    ? 'hover:bg-green-600'
                    : type === 'error'
                    ? 'hover:bg-red-600'
                    : 'hover:bg-blue-600'
                }`}
              >
                <FiX className={`w-4 h-4 ${colors.icon}`} />
              </button>
            </div>
            
            {/* Progress Bar */}
            <motion.div
              className="h-1 bg-white/20"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
