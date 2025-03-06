/**
 * Типы связанные с рекомендациями
 */

/**
 * Категория рекомендации
 */
export type RecommendationCategory = 'sleep' | 'stress' | 'work' | 'general';

/**
 * Статус рекомендации пользователя
 */
export type RecommendationStatus = 'pending' | 'accepted' | 'completed' | 'rejected';

/**
 * Тип рекомендации
 */
export interface RecommendationType {
  id: number;
  name: string;
  icon?: string;
}

/**
 * Рекомендация
 */
export interface Recommendation {
  id: number;
  title: string;
  description: string;
  type: RecommendationType;
  category: RecommendationCategory;
  duration_minutes: number;
  is_quick: boolean;
}

/**
 * Рекомендация пользователя
 */
export interface UserRecommendation {
  id: number;
  user: number;
  recommendation: Recommendation;
  status: RecommendationStatus;
  reason?: string;
  user_feedback?: string;
  user_rating?: number;
  created_at: string;
  completed_at?: string;
}

/**
 * Параметры запроса рекомендаций
 */
export interface RecommendationParams {
  category?: RecommendationCategory;
  is_quick?: boolean;
}

/**
 * Параметры запроса рекомендаций пользователя
 */
export interface UserRecommendationParams {
  status?: RecommendationStatus;
  page?: number;
}

/**
 * Данные для обновления статуса рекомендации
 */
export interface UpdateRecommendationStatusData {
  status: RecommendationStatus;
  user_feedback?: string;
  user_rating?: number;
} 