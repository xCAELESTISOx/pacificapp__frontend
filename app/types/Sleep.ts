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
  avg_duration: number;
  avg_quality: number;
  statistics: Array<{
    date: string;
    duration_hours: string;
    quality: string;
  }>;
  total_records: number;
}

/**
 * Параметры запроса статистики сна
 */
export interface SleepStatisticsParams {
  start_date: string;
  end_date: string;
} 