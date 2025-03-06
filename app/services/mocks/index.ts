'use client';

import stressMockService from './stressMockData';
import sleepMockService from './sleepMockData';
import workMockService from './workMockData';
import recommendationMockService from './recommendationMockData';
import userMockService from './userMockData';
import { mockConfig } from './mockConfig';

// Экспорт всех мок-сервисов
export {
  stressMockService,
  sleepMockService,
  workMockService,
  recommendationMockService,
  userMockService,
  mockConfig,
};

// Экспорт типов из каждого мок-сервиса для удобства
export type { UserProfile, UserActivity } from './userMockData'; 