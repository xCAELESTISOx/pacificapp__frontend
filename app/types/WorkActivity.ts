/**
 * Типы связанные с рабочей активностью
 */

/**
 * Запись о рабочей активности
 */
export interface WorkActivity {
  id?: number;
  date: string;
  duration_hours: number;
  breaks_count?: number;
  breaks_total_minutes?: number;
  productivity?: number; // Обычно по шкале от 1 до 10
  notes?: string;
  created_at?: string;
}

/**
 * Статистика рабочей активности за период
 */
export interface WorkStatistics {
  average_duration: number;
  average_productivity?: number;
  average_breaks_count?: number;
  average_breaks_duration?: number;
  total_records: number;
  start_date: string;
  end_date: string;
  daily_data: Array<{
    date: string;
    duration_hours: number;
    productivity?: number;
  }>;
}