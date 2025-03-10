'use client';

import api from '../api';
import { sleepMockService } from '../mocks';
import { mockConfig } from '../mocks/mockConfig';
import { 
  SleepRecord, 
  SleepStatistics, 
  SleepStatisticsParams,
  PaginatedResponse 
} from '@/app/types';
import { GetSleepRecordsParams } from './sleep.types';

/**
 * Сервис для работы с записями о сне
 */
const sleepService = {
  /**
   * Получение записей о сне
   */
  async getSleepRecords(params?: GetSleepRecordsParams): Promise<PaginatedResponse<SleepRecord>> {
    if (mockConfig.useMockData) {
      return sleepMockService.getSleepRecords(params);
    }
    
    const response = await api.get<PaginatedResponse<SleepRecord>>('/sleep/', { params });
    return response.data;
  },
  
  /**
   * Получение записи о сне по ID
   */
  async getSleepRecord(id: number): Promise<SleepRecord> {
    if (mockConfig.useMockData) {
      return sleepMockService.getSleepRecord(id);
    }
    
    const response = await api.get<SleepRecord>(`/sleep/${id}/`);
    return response.data;
  },
  
  /**
   * Добавление новой записи о сне
   */
  async addSleepRecord(data: SleepRecord): Promise<SleepRecord> {
    if (mockConfig.useMockData) {
      return sleepMockService.addSleepRecord(data);
    }
    
    const response = await api.post<SleepRecord>('/sleep/', data);
    return response.data;
  },
  
  /**
   * Обновление записи о сне
   */
  async updateSleepRecord(id: number, data: Partial<SleepRecord>): Promise<SleepRecord> {
    if (mockConfig.useMockData) {
      return sleepMockService.updateSleepRecord(id, data);
    }
    
    const response = await api.patch<SleepRecord>(`/sleep/${id}/`, data);
    return response.data;
  },
  
  /**
   * Удаление записи о сне
   */
  async deleteSleepRecord(id: number): Promise<void> {
    if (mockConfig.useMockData) {
      return sleepMockService.deleteSleepRecord(id);
    }
    
    await api.delete(`/sleep/${id}/`);
  },
  
  /**
   * Получение статистики сна за период
   */
  async getSleepStatistics(params: SleepStatisticsParams): Promise<SleepStatistics> {
    if (mockConfig.useMockData) {
      return sleepMockService.getSleepStatistics(params);
    }
    
    const response = await api.get<SleepStatistics>('/sleep/statistics/', { params });
    return response.data;
  },
};

export default sleepService; 