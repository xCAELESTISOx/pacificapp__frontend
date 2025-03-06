'use client';

import React from 'react';

/**
 * HOC для обертывания компонентов в поддержку темной темы
 * @param WrappedComponent Компонент, который нужно обернуть
 * @returns Новый компонент с поддержкой темной темы
 */
export function withDarkMode<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & { className?: string }> {
  return function WithDarkMode(props: P & { className?: string }) {
    // Берем className из props и добавляем классы для темной темы
    const { className = '', ...restProps } = props;
    
    // Применяем классы для темной темы к компоненту
    const darkModeClassName = `dark-mode-card ${className}`;
    
    return <WrappedComponent {...restProps as P} className={darkModeClassName} />;
  };
}

/**
 * Функция для преобразования обычных CSS классов в классы с поддержкой темной темы
 * @param className Исходный класс
 * @returns Класс с поддержкой темной темы
 */
export const darkModeClass = (className: string): string => {
  // Заменяем обычные классы на их темные аналоги
  return className
    .replace('bg-white', 'bg-white dark:bg-gray-800')
    .replace('text-gray-900', 'text-gray-900 dark:text-gray-100')
    .replace('text-gray-800', 'text-gray-800 dark:text-gray-100')
    .replace('text-gray-700', 'text-gray-700 dark:text-gray-200')
    .replace('text-gray-600', 'text-gray-600 dark:text-gray-300')
    .replace('text-gray-500', 'text-gray-500 dark:text-gray-400')
    .replace('border-gray-200', 'border-gray-200 dark:border-gray-700')
    .replace('shadow-sm', 'shadow-sm dark:shadow-lg')
    .replace('shadow-md', 'shadow-md dark:shadow-lg');
}; 