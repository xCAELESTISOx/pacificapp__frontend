/**
 * Типы связанные с дашбордом
 */

/**
 * Сводка данных для дашборда
 */
export interface DashboardSummary {
  sleep: {
    average_duration: number;
    average_quality?: number;
    total_records: number;
    trend: 'up' | 'down' | 'stable';
  };
  stress: {
    average_level: number;
    total_records: number;
    trend: 'up' | 'down' | 'stable';
  };
  work: {
    average_duration: number;
    average_productivity?: number;
    total_records: number;
    trend: 'up' | 'down' | 'stable';
  };
  recommendations: {
    pending: number;
    completed: number;
    accepted: number;
    latest: Array<{
      id: number;
      title: string;
      category: string;
      status: string;
    }>;
  };
}

/**
 * Данные графика для дашборда
 */
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    fill?: boolean;
  }>;
}

/**
 * Параметры запроса данных для дашборда
 */
export interface DashboardParams {
  period?: 'day' | 'week' | 'month' | 'year';
  start_date?: string;
  end_date?: string;
} 