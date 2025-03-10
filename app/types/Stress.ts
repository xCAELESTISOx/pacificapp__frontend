/**
 * Типы связанные со стрессом
 */

/**
 * Уровень стресса
 */
export interface StressLevel {
  id?: number;
  level: number; // Обычно по шкале от 1 до 10
  notes?: string;
  created_at?: string;
}

/**
 * Статистика стресса за период
 */
export interface StressStatistics {
  avg_level: number;
  max_level: number;
  min_level: number;
  total_records: number;
  start_date: string;
  end_date: string;
  statistics: Array<{
    date: string; // Date
    avg_level: number;
    count: number;
  }>;
}

/**
 * Параметры запроса статистики стресса
 */
export interface StressStatisticsParams {
  start_date: string;
  end_date: string;
} 