'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card; 