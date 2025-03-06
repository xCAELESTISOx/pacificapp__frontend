'use client';

import React, { ReactNode } from 'react';

interface DarkModeProviderProps {
  children: ReactNode;
  selector?: string; // CSS селектор для элементов, которые нужно адаптировать
}

/**
 * Провайдер, который автоматически находит и применяет темную тему 
 * к компонентам с белым фоном в своих дочерних элементах
 */
const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ 
  children, 
  selector = '[class*="bg-white"]' 
}) => {
  React.useEffect(() => {
    // Находим все элементы с белым фоном
    const elements = document.querySelectorAll(selector);
    
    // Добавляем классы темной темы
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        // Добавляем классы для темной темы
        if (el.className.includes('bg-white') && !el.className.includes('dark:bg-')) {
          el.classList.add('dark:bg-gray-800');
        }
        
        // Добавляем переходы для плавного изменения темы
        if (!el.className.includes('transition-')) {
          el.classList.add('transition-colors', 'duration-300');
        }
        
        // Обрабатываем текст
        const textElements = el.querySelectorAll('[class*="text-gray-"]');
        textElements.forEach(textEl => {
          if (textEl instanceof HTMLElement) {
            if (textEl.className.includes('text-gray-900') && !textEl.className.includes('dark:text-')) {
              textEl.classList.add('dark:text-gray-100');
            } else if (textEl.className.includes('text-gray-800') && !textEl.className.includes('dark:text-')) {
              textEl.classList.add('dark:text-gray-100');
            } else if (textEl.className.includes('text-gray-700') && !textEl.className.includes('dark:text-')) {
              textEl.classList.add('dark:text-gray-200');
            } else if (textEl.className.includes('text-gray-600') && !textEl.className.includes('dark:text-')) {
              textEl.classList.add('dark:text-gray-300');
            } else if (textEl.className.includes('text-gray-500') && !textEl.className.includes('dark:text-')) {
              textEl.classList.add('dark:text-gray-400');
            }
          }
        });
        
        // Обрабатываем границы
        if (el.className.includes('border-gray-200') && !el.className.includes('dark:border-')) {
          el.classList.add('dark:border-gray-700');
        }
      }
    });
  }, [selector]);

  return <>{children}</>;
};

export default DarkModeProvider; 