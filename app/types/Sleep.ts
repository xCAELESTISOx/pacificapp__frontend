/**
 * Типы связанные со сном
 */

/**
 * Запись о сне
 */
export interface SleepRecord {
  id?: number;
  date: string;
  duration_hours: number;
  quality?: number;
  notes?: string;
  created_at?: string;
}

/**
 * Статистика сна за период
 */
export interface SleepStatistics {
  average_duration: number;
  average_quality?: number;
  total_records: number;
  start_date: string;
  end_date: string;
  daily_data: Array<{
    date: string;
    duration_hours: number;
    quality?: number;
  }>;
}

/**
 * Параметры запроса статистики сна
 */
export interface SleepStatisticsParams {
  start_date: string;
  end_date: string;
} 