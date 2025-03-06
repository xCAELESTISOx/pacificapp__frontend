/**
 * Общие типы, используемые в приложении
 */

/**
 * Базовая структура для пагинации API
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Базовая структура успешного ответа
 */
export interface SuccessResponse {
  success: boolean;
  message?: string;
}

/**
 * Базовая структура ошибки API
 */
export interface ApiError {
  detail?: string;
  code?: string;
  errors?: {
    [key: string]: string[];
  };
  message?: string;
}

/**
 * Период времени
 */
export type TimePeriod = 'day' | 'week' | 'month' | 'year';

/**
 * Направление тренда 
 */
export type Trend = 'up' | 'down' | 'stable';

/**
 * Параметры статистики
 */
export interface StatisticsParams {
  start_date: string;
  end_date: string;
} 