import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from './Toast';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    // Guard against empty messages
    if (!toast.message || toast.message.trim() === '') {
      console.warn('Toast with empty message prevented:', toast);
      return;
    }
    
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Make addToast available globally
  React.useEffect(() => {
    window.showToast = addToast;
    window.removeToast = removeToast;
    
    return () => {
      delete window.showToast;
      delete window.removeToast;
    };
  }, [addToast, removeToast]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="pointer-events-auto"
          >
            <Toast
              {...toast}
              onClose={removeToast}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
