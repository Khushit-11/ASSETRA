import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <motion.div 
      className={`min-h-screen bg-gray-50 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export const Container: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export const Card: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}
      whileHover={{ y: -2, shadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};