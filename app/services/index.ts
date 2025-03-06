'use client';

import api from './api';
import authService from './authService';
import dashboardService from './dashboardService';
import stressService from './stressService';
import sleepService from './sleepService';
import workActivityService from './workActivityService';
import recommendationService from './recommendationService';
import userService from './userService';
import { mockConfig } from './mocks/mockConfig';

// Экспорт всех сервисов
export {
  api,
  authService,
  dashboardService,
  stressService,
  sleepService,
  workActivityService,
  recommendationService,
  userService,
};

// Экспорт конфигурации моков
export { mockConfig };

// Больше не экспортируем типы из сервисов, так как они определены в директории types
// и должны импортироваться оттуда

/**
 * Функция для переключения режима работы с моками
 * (может быть использована в настройках разработчика)
 */
export const toggleMockDataUsage = (enabled: boolean): void => {
  // В реальном приложении здесь мог бы быть более сложный код,
  // возможно с сохранением выбора в localStorage
  mockConfig.useMockData = enabled;
  console.log(`Mock data is now ${enabled ? 'enabled' : 'disabled'}`);
}; 