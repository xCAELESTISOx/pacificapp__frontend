'use client';

import api from '../api';
import { stressMockService } from '../mocks';
import { mockConfig } from '../mocks/mockConfig';
import { 
  StressLevel, 
  StressStatistics, 
  StressStatisticsParams,
  PaginatedResponse 
} from '@/app/types';
import { GetStressLevelsParams } from './stress.types';

/**
 * Сервис для работы с уровнем стресса
 */
const stressService = {
  /**
   * Получение истории уровней стресса
   */
  async getStressLevels(params?: GetStressLevelsParams): Promise<PaginatedResponse<StressLevel>> {
    if (mockConfig.useMockData) {
      return stressMockService.getStressLevels(params);
    }
    
    const response = await api.get<PaginatedResponse<StressLevel>>('/stress-levels/', { params });
    return response.data;
  },
  
  /**
   * Получение уровня стресса по ID
   */
  async getStressLevel(id: number): Promise<StressLevel> {
    if (mockConfig.useMockData) {
      return stressMockService.getStressLevel(id);
    }
    
    const response = await api.get<StressLevel>(`/stress-levels/${id}/`);
    return response.data;
  },
  
  /**
   * Добавление нового уровня стресса
   */
  async addStressLevel(data: StressLevel): Promise<StressLevel> {
    if (mockConfig.useMockData) {
      return stressMockService.addStressLevel(data);
    }
    
    const response = await api.post<StressLevel>('/stress-levels/', data);
    return response.data;
  },
  
  /**
   * Получение статистики уровня стресса за период
   */
  async getStressStatistics(params: StressStatisticsParams): Promise<StressStatistics> {
    if (mockConfig.useMockData) {
      return stressMockService.getStressStatistics(params);
    }
    
    const response = await api.get<StressStatistics>('/stress-levels/statistics/', { params });
    return response.data;
  },
};

export default stressService; 