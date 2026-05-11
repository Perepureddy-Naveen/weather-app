import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiMapPin, FiMail, FiGithub, FiLinkedin, FiDownload, FiExternalLink } from 'react-icons/fi';

const About = ({ isOpen, onClose, theme }) => {
  const skills = [
    'HTML', 'CSS', 'JavaScript', 'ReactJS', 'Tailwind CSS', 'Vite', 'API Integration'
  ];

  const socialLinks = [
    { icon: FiGithub, label: 'GitHub', url: '#' },
    { icon: FiLinkedin, label: 'LinkedIn', url: '#' },
    { icon: FiMail, label: 'Email', url: 'mailto:naveen@example.com' }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors z-10 ${
              theme === 'dark'
                ? 'hover:bg-gray-800 text-gray-400'
                : 'hover:bg-gray-200 text-gray-600'
            }`}
          >
            <FiX className="w-5 h-5" />
          </motion.button>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Profile Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
              >
                <FiUser className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Naveen Perepureddy
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-lg ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                Frontend Developer | ReactJS Developer
              </motion.p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FiMapPin className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                  }`} />
                  <div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Location
                    </p>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Kakinada, Andhra Pradesh
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FiUser className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
                  }`} />
                  <div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Education
                    </p>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      B.Tech in Computer Science Engineering
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* About Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`p-4 rounded-lg mb-8 ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'
              }`}
            >
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Passionate frontend developer focused on building modern responsive web applications with beautiful UI/UX and interactive user experiences.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-8"
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      theme === 'dark'
                        ? 'bg-blue-900/50 text-blue-300 border-blue-700'
                        : 'bg-blue-100 text-blue-700 border-blue-200'
                    } border`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-4 justify-center mb-6"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <social.icon className="w-4 h-4" />
                  <span>{social.label}</span>
                  <FiExternalLink className="w-3 h-3" />
                </motion.a>
              ))}
            </motion.div>

            {/* Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                }`}
              >
                <FiDownload className="inline w-4 h-4 mr-2" />
                Download Resume
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default About;
