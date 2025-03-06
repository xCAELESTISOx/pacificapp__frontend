/**
 * Типы связанные с дашбордом
 */

import { TimePeriod, Trend } from "./Common";

/**
 * Сводка данных для дашборда
 */
export interface DashboardSummary {
  sleep: {
    average_duration: number;
    average_quality?: number;
    total_records: number;
    trend: Trend;
  };
  stress: {
    average_level: number;
    total_records: number;
    trend: Trend;
  };
  work: {
    average_duration: number;
    average_productivity?: number;
    total_records: number;
    trend: Trend;
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
  burnout_risk?: {
    current: number;
    previous?: number;
    trend: Trend;
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
  period?: TimePeriod;
  start_date?: string;
  end_date?: string;
} 