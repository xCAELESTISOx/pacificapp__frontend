'use client';

import { WorkActivity } from '../workActivityService';
import { createMockResponse } from './mockConfig';

// Мок-данные для рабочей активности
const workActivities: WorkActivity[] = [
  { 
    id: 1, 
    date: '2023-05-01', 
    duration_hours: 8.5, 
    breaks_count: 4, 
    breaks_total_minutes: 45, 
    productivity: 85, 
    notes: 'Продуктивный день', 
    created_at: '2023-05-01T18:00:00Z' 
  },
  { 
    id: 2, 
    date: '2023-05-02', 
    duration_hours: 9.0, 
    breaks_count: 3, 
    breaks_total_minutes: 30, 
    productivity: 80, 
    notes: 'Много встреч', 
    created_at: '2023-05-02T19:10:00Z' 
  },
  { 
    id: 3, 
    date: '2023-05-03', 
    duration_hours: 8.0, 
    breaks_count: 5, 
    breaks_total_minutes: 60, 
    productivity: 90, 
    notes: 'Отличная концентрация', 
    created_at: '2023-05-03T18:30:00Z' 
  },
  { 
    id: 4, 
    date: '2023-05-04', 
    duration_hours: 10.5, 
    breaks_count: 2, 
    breaks_total_minutes: 25, 
    productivity: 75, 
    notes: 'Сложный проект, переработка', 
    created_at: '2023-05-04T20:45:00Z' 
  },
  { 
    id: 5, 
    date: '2023-05-05', 
    duration_hours: 7.5, 
    breaks_count: 4, 
    breaks_total_minutes: 50, 
    productivity: 88, 
    notes: 'Пятница, меньше рабочих часов', 
    created_at: '2023-05-05T17:30:00Z' 
  },
  { 
    id: 6, 
    date: '2023-05-08', 
    duration_hours: 8.2, 
    breaks_count: 3, 
    breaks_total_minutes: 35, 
    productivity: 82, 
    notes: 'Понедельник, медленный старт', 
    created_at: '2023-05-08T18:15:00Z' 
  },
  { 
    id: 7, 
    date: '2023-05-09', 
    duration_hours: 9.5, 
    breaks_count: 4, 
    breaks_total_minutes: 40, 
    productivity: 78, 
    notes: 'Много задач параллельно', 
    created_at: '2023-05-09T19:30:00Z' 
  },
  { 
    id: 8, 
    date: '2023-05-10', 
    duration_hours: 8.0, 
    breaks_count: 5, 
    breaks_total_minutes: 55, 
    productivity: 85, 
    notes: 'Нормальный рабочий день', 
    created_at: '2023-05-10T18:00:00Z' 
  },
];

export const workMockService = {
  /**
   * Получение записей о рабочей активности
   */
  async getWorkActivities(params?: { page?: number; page_size?: number }): Promise<any> {
    const pageSize = params?.page_size || 10;
    const page = params?.page || 1;
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = workActivities.slice(start, end);
    
    return createMockResponse({
      count: workActivities.length,
      next: end < workActivities.length ? `/api/work-activities/?page=${page + 1}&page_size=${pageSize}` : null,
      previous: page > 1 ? `/api/work-activities/?page=${page - 1}&page_size=${pageSize}` : null,
      results,
    });
  },
  
  /**
   * Получение записи о рабочей активности по ID
   */
  async getWorkActivity(id: number): Promise<WorkActivity> {
    const workActivity = workActivities.find(wa => wa.id === id);
    
    if (!workActivity) {
      throw new Error(`Work activity with ID ${id} not found`);
    }
    
    return createMockResponse(workActivity);
  },
  
  /**
   * Добавление новой записи о рабочей активности
   */
  async addWorkActivity(data: WorkActivity): Promise<WorkActivity> {
    const newWorkActivity: WorkActivity = {
      ...data,
      id: Math.max(...workActivities.map(wa => wa.id || 0)) + 1,
      created_at: new Date().toISOString(),
    };
    
    workActivities.unshift(newWorkActivity);
    
    return createMockResponse(newWorkActivity);
  },
  
  /**
   * Обновление записи о рабочей активности
   */
  async updateWorkActivity(id: number, data: Partial<WorkActivity>): Promise<WorkActivity> {
    const index = workActivities.findIndex(wa => wa.id === id);
    
    if (index === -1) {
      throw new Error(`Work activity with ID ${id} not found`);
    }
    
    const updatedActivity = {
      ...workActivities[index],
      ...data,
      id: workActivities[index].id, // гарантируем, что ID не изменится
    };
    
    workActivities[index] = updatedActivity;
    
    return createMockResponse(updatedActivity);
  },
  
  /**
   * Получение статистики рабочей активности за период
   */
  async getWorkStatistics(params: { start_date: string; end_date: string }): Promise<any> {
    const startDate = new Date(params.start_date);
    const endDate = new Date(params.end_date);
    
    const filteredData = workActivities.filter(wa => {
      const date = new Date(wa.date);
      return date >= startDate && date <= endDate;
    });
    
    const avgDuration = filteredData.length > 0
      ? filteredData.reduce((sum, wa) => sum + wa.duration_hours, 0) / filteredData.length
      : 0;
    
    const avgBreaks = filteredData.length > 0
      ? filteredData.reduce((sum, wa) => sum + (wa.breaks_count || 0), 0) / filteredData.length
      : 0;
      
    const avgBreaksDuration = filteredData.length > 0
      ? filteredData.reduce((sum, wa) => sum + (wa.breaks_total_minutes || 0), 0) / filteredData.length
      : 0;
    
    const avgProductivity = filteredData.length > 0
      ? filteredData.reduce((sum, wa) => sum + (wa.productivity || 0), 0) / filteredData.length
      : 0;
    
    return createMockResponse({
      avg_duration: avgDuration,
      avg_breaks: avgBreaks,
      avg_breaks_duration: avgBreaksDuration,
      avg_productivity: avgProductivity,
      total_records: filteredData.length,
      statistics: filteredData.map(wa => ({
        date: wa.date,
        duration_hours: wa.duration_hours,
        breaks_count: wa.breaks_count,
        breaks_total_minutes: wa.breaks_total_minutes,
        productivity: wa.productivity,
      })),
    });
  },
};

export default workMockService; 