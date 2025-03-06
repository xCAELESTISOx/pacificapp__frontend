import { 
  Recommendation, 
  UserRecommendation, 
  RecommendationParams,
  UserRecommendationParams,
  RecommendationStatus,
  PaginatedResponse
} from '@/app/types';

export type { 
  Recommendation, 
  UserRecommendation, 
  RecommendationParams,
  UserRecommendationParams,
  RecommendationStatus,
  PaginatedResponse
};

/**
 * Интерфейс для данных обновления статуса рекомендации
 * Исключает статус 'pending' из допустимых значений для update
 */
export interface UpdateRecommendationStatusData {
  status: Extract<RecommendationStatus, 'accepted' | 'completed' | 'rejected'>;
  user_feedback?: string;
  user_rating?: number;
} 