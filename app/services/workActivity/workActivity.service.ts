'use client';

import api from '../api';
import { workMockService } from '../mocks';
import { mockConfig } from '../mocks/mockConfig';
import { 
  WorkActivity, 
  WorkStatistics, 
} from '../../types';

import { GetWorkActivitiesResponse, GetWorkActivitiesParams, GetWorkStatisticsParams } from './workActivity.types';

/**
 * Сервис для работы с рабочей активностью
 */
const workActivityService = {
  /**
   * Получение записей о рабочей активности
   */
  async getWorkActivities(params?: GetWorkActivitiesParams): Promise<GetWorkActivitiesResponse> {
    if (mockConfig.useMockData) {
      return workMockService.getWorkActivities(params);
    }
    
    const response = await api.get<GetWorkActivitiesResponse>('/work-activities/', { params });
    return response.data;
  },
  
  /**
   * Получение записи о рабочей активности по ID
   */
  async getWorkActivity(id: number): Promise<WorkActivity> {
    if (mockConfig.useMockData) {
      return workMockService.getWorkActivity(id);
    }
    
    const response = await api.get<WorkActivity>(`/work-activities/${id}/`);
    return response.data;
  },
  
  /**
   * Добавление новой записи о рабочей активности
   */
  async addWorkActivity(data: WorkActivity): Promise<WorkActivity> {
    if (mockConfig.useMockData) {
      return workMockService.addWorkActivity(data);
    }
    
    const response = await api.post<WorkActivity>('/work-activities/', data);
    return response.data;
  },
  
  /**
   * Обновление записи о рабочей активности
   */
  async updateWorkActivity(id: number, data: Partial<WorkActivity>): Promise<WorkActivity> {
    if (mockConfig.useMockData) {
      return workMockService.updateWorkActivity(id, data);
    }
    
    const response = await api.patch<WorkActivity>(`/work-activities/${id}/`, data);
    return response.data;
  },
  
  /**
   * Получение статистики рабочей активности за период
   */
  async getWorkStatistics(params: GetWorkStatisticsParams): Promise<WorkStatistics> {
    if (mockConfig.useMockData) {
      return workMockService.getWorkStatistics(params);
    }
    
    const response = await api.get<WorkStatistics>('/work-activities/statistics/', { params });
    return response.data;
  },
};

export default workActivityService; 