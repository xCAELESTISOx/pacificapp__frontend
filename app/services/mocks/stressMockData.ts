'use client';

import { StressLevel } from '../stressService';
import { createMockResponse } from './mockConfig';

// Мок-данные для уровней стресса
const stressLevels: StressLevel[] = [
  { id: 1, level: 60, notes: 'Трудный рабочий день', created_at: '2023-05-01T10:30:00Z' },
  { id: 2, level: 72, notes: 'Срок сдачи проекта', created_at: '2023-05-02T11:20:00Z' },
  { id: 3, level: 65, notes: 'Конфликт с коллегой', created_at: '2023-05-03T09:45:00Z' },
  { id: 4, level: 58, notes: 'Сложная задача', created_at: '2023-05-04T14:15:00Z' },
  { id: 5, level: 50, notes: 'Нормальный день', created_at: '2023-05-05T16:30:00Z' },
  { id: 6, level: 42, notes: 'Хороший отдых', created_at: '2023-05-06T13:00:00Z' },
  { id: 7, level: 48, notes: 'Много встреч', created_at: '2023-05-07T17:10:00Z' },
  { id: 8, level: 55, notes: 'Неожиданная задача', created_at: '2023-05-08T12:35:00Z' },
  { id: 9, level: 63, notes: 'Плохой сон', created_at: '2023-05-09T08:20:00Z' },
  { id: 10, level: 45, notes: 'Приятная рабочая атмосфера', created_at: '2023-05-10T15:45:00Z' },
];

export const stressMockService = {
  /**
   * Получение истории уровней стресса
   */
  async getStressLevels(params?: { page?: number; page_size?: number }): Promise<any> {
    const pageSize = params?.page_size || 10;
    const page = params?.page || 1;
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = stressLevels.slice(start, end);
    
    return createMockResponse({
      count: stressLevels.length,
      next: end < stressLevels.length ? `/api/stress/?page=${page + 1}&page_size=${pageSize}` : null,
      previous: page > 1 ? `/api/stress/?page=${page - 1}&page_size=${pageSize}` : null,
      results,
    });
  },
  
  /**
   * Получение уровня стресса по ID
   */
  async getStressLevel(id: number): Promise<StressLevel> {
    const stressLevel = stressLevels.find(sl => sl.id === id);
    
    if (!stressLevel) {
      throw new Error(`Stress level with ID ${id} not found`);
    }
    
    return createMockResponse(stressLevel);
  },
  
  /**
   * Добавление нового уровня стресса
   */
  async addStressLevel(data: StressLevel): Promise<StressLevel> {
    const newStressLevel: StressLevel = {
      ...data,
      id: Math.max(...stressLevels.map(sl => sl.id || 0)) + 1,
      created_at: new Date().toISOString(),
    };
    
    stressLevels.unshift(newStressLevel);
    
    return createMockResponse(newStressLevel);
  },
  
  /**
   * Получение статистики уровня стресса за период
   */
  async getStressStatistics(params: { start_date: string; end_date: string }): Promise<any> {
    const startDate = new Date(params.start_date);
    const endDate = new Date(params.end_date);
    
    const filteredData = stressLevels.filter(sl => {
      const date = new Date(sl.created_at || '');
      return date >= startDate && date <= endDate;
    });
    
    const avgLevel = filteredData.length > 0
      ? filteredData.reduce((sum, sl) => sum + sl.level, 0) / filteredData.length
      : 0;
    
    const dailyStats = filteredData.reduce((acc: any, sl) => {
      const date = sl.created_at?.split('T')[0] || '';
      if (!acc[date]) {
        acc[date] = { date, count: 0, total: 0 };
      }
      acc[date].count++;
      acc[date].total += sl.level;
      return acc;
    }, {});
    
    const statistics = Object.values(dailyStats).map((day: any) => ({
      date: day.date,
      avg_level: day.total / day.count,
      count: day.count,
    }));
    
    return createMockResponse({
      avg_level: avgLevel,
      statistics,
      total_records: filteredData.length,
    });
  },
};

export default stressMockService; 