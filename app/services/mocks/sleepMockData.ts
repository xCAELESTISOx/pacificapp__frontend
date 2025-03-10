'use client';

import { SleepRecord } from '../sleepService';
import { createMockResponse } from './mockConfig';

// Мок-данные для записей сна
const sleepRecords: SleepRecord[] = [
  { id: 1, date: '2023-05-01', duration_hours: 7.5, quality: 8, notes: 'Хороший сон', created_at: '2023-05-01T08:00:00Z' },
  { id: 2, date: '2023-05-02', duration_hours: 6.2, quality: 6, notes: 'Трудно заснуть', created_at: '2023-05-02T07:50:00Z' },
  { id: 3, date: '2023-05-03', duration_hours: 8.0, quality: 9, notes: 'Отличный глубокий сон', created_at: '2023-05-03T08:10:00Z' },
  { id: 4, date: '2023-05-04', duration_hours: 5.5, quality: 4, notes: 'Частые пробуждения', created_at: '2023-05-04T06:30:00Z' },
  { id: 5, date: '2023-05-05', duration_hours: 7.0, quality: 7, notes: 'Нормальный сон', created_at: '2023-05-05T07:45:00Z' },
  { id: 6, date: '2023-05-06', duration_hours: 7.8, quality: 8, notes: 'Спокойная ночь', created_at: '2023-05-06T08:15:00Z' },
  { id: 7, date: '2023-05-07', duration_hours: 6.5, quality: 6, notes: 'Шумные соседи', created_at: '2023-05-07T07:20:00Z' },
  { id: 8, date: '2023-05-08', duration_hours: 7.2, quality: 7, notes: 'Обычный сон', created_at: '2023-05-08T07:50:00Z' },
  { id: 9, date: '2023-05-09', duration_hours: 8.5, quality: 9, notes: 'Очень хороший сон', created_at: '2023-05-09T08:30:00Z' },
  { id: 10, date: '2023-05-10', duration_hours: 6.0, quality: 5, notes: 'Стресс на работе повлиял', created_at: '2023-05-10T07:00:00Z' },
];

export const sleepMockService = {
  /**
   * Получение записей о сне
   */
  async getSleepRecords(params?: { page?: number; page_size?: number }): Promise<any> {
    const pageSize = params?.page_size || 10;
    const page = params?.page || 1;
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = sleepRecords.slice(start, end);
    
    return createMockResponse({
      count: sleepRecords.length,
      next: end < sleepRecords.length ? `/api/sleep/?page=${page + 1}&page_size=${pageSize}` : null,
      previous: page > 1 ? `/api/sleep/?page=${page - 1}&page_size=${pageSize}` : null,
      results,
    });
  },
  
  /**
   * Получение записи о сне по ID
   */
  async getSleepRecord(id: number): Promise<SleepRecord> {
    const sleepRecord = sleepRecords.find(sr => sr.id === id);
    
    if (!sleepRecord) {
      throw new Error(`Sleep record with ID ${id} not found`);
    }
    
    return createMockResponse(sleepRecord);
  },
  
  /**
   * Добавление новой записи о сне
   */
  async addSleepRecord(data: SleepRecord): Promise<SleepRecord> {
    const newSleepRecord: SleepRecord = {
      ...data,
      id: Math.max(...sleepRecords.map(sr => sr.id || 0)) + 1,
      created_at: new Date().toISOString(),
    };
    
    sleepRecords.unshift(newSleepRecord);
    
    return createMockResponse(newSleepRecord);
  },
  
  /**
   * Обновление записи о сне
   */
  async updateSleepRecord(id: number, data: Partial<SleepRecord>): Promise<SleepRecord> {
    const index = sleepRecords.findIndex(sr => sr.id === id);
    
    if (index === -1) {
      throw new Error(`Sleep record with ID ${id} not found`);
    }
    
    const updatedRecord = {
      ...sleepRecords[index],
      ...data,
      id: sleepRecords[index].id, // гарантируем, что ID не изменится
    };
    
    sleepRecords[index] = updatedRecord;
    
    return createMockResponse(updatedRecord);
  },
  
  /**
   * Удаление записи о сне
   */
  async deleteSleepRecord(id: number): Promise<void> {
    const index = sleepRecords.findIndex(sr => sr.id === id);
    
    if (index === -1) {
      throw new Error(`Sleep record with ID ${id} not found`);
    }
    
    sleepRecords.splice(index, 1);
    
    return createMockResponse(undefined);
  },
  
  /**
   * Получение статистики сна за период
   */
  async getSleepStatistics(params: { start_date: string; end_date: string }): Promise<any> {
    const startDate = new Date(params.start_date);
    const endDate = new Date(params.end_date);
    
    const filteredData = sleepRecords.filter(sr => {
      const date = new Date(sr.date);
      return date >= startDate && date <= endDate;
    });
    
    const avgDuration = filteredData.length > 0
      ? filteredData.reduce((sum, sr) => sum + sr.duration_hours, 0) / filteredData.length
      : 0;
    
    const avgQuality = filteredData.length > 0
      ? filteredData.reduce((sum, sr) => sum + (sr.quality || 0), 0) / filteredData.length
      : 0;
    
    return createMockResponse({
      avg_duration: avgDuration,
      avg_quality: avgQuality,
      total_records: filteredData.length,
      statistics: filteredData.map(sr => ({
        date: sr.date,
        duration_hours: sr.duration_hours,
        quality: sr.quality,
      })),
    });
  },
};

export default sleepMockService; 