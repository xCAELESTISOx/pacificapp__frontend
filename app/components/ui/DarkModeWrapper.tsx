'use client';

import React from 'react';

interface DarkModeWrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Компонент-обертка для адаптации существующих компонентов к темной теме.
 * Применяет классы темной темы к компоненту.
 */
const DarkModeWrapper: React.FC<DarkModeWrapperProps> = ({ 
  children, 
  className = '', 
  as: Component = 'div'
}) => {
  return (
    <Component 
      className={`dark-mode-card ${className}`}
    >
      {children}
    </Component>
  );
};

export default DarkModeWrapper; 