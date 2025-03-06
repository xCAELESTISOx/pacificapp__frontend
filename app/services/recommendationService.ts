'use client';

import api from './api';
import { recommendationMockService } from './mocks';
import { mockConfig } from './mocks/mockConfig';
import { 
  Recommendation, 
  UserRecommendation, 
  RecommendationParams,
  UserRecommendationParams,
  RecommendationStatus,
  PaginatedResponse
} from '../types';

/**
 * Интерфейс для данных обновления статуса рекомендации
 * Исключает статус 'pending' из допустимых значений для update
 */
interface UpdateRecommendationStatusData {
  status: Extract<RecommendationStatus, 'accepted' | 'completed' | 'rejected'>;
  user_feedback?: string;
  user_rating?: number;
}

/**
 * Сервис для работы с рекомендациями
 */
const recommendationService = {
  /**
   * Получение всех рекомендаций
   */
  async getRecommendations(params?: RecommendationParams): Promise<PaginatedResponse<Recommendation>> {
    if (mockConfig.useMockData) {
      return recommendationMockService.getRecommendations(params);
    }
    
    const response = await api.get<PaginatedResponse<Recommendation>>('/recommendations/', { params });
    return response.data;
  },
  
  /**
   * Получение рекомендаций для пользователя
   */
  async getUserRecommendations(params?: UserRecommendationParams): Promise<PaginatedResponse<UserRecommendation>> {
    if (mockConfig.useMockData) {
      return recommendationMockService.getUserRecommendations(params);
    }
    
    const response = await api.get<PaginatedResponse<UserRecommendation>>('/user-recommendations/', { params });
    return response.data;
  },
  
  /**
   * Получение конкретной рекомендации пользователя
   */
  async getUserRecommendation(id: number): Promise<UserRecommendation> {
    if (mockConfig.useMockData) {
      return recommendationMockService.getUserRecommendation(id);
    }
    
    const response = await api.get<UserRecommendation>(`/user-recommendations/${id}/`);
    return response.data;
  },
  
  /**
   * Обновление статуса рекомендации пользователя
   */
  async updateUserRecommendationStatus(
    id: number, 
    data: UpdateRecommendationStatusData
  ): Promise<UserRecommendation> {
    if (mockConfig.useMockData) {
      return recommendationMockService.updateUserRecommendationStatus(id, data);
    }
    
    const response = await api.patch<UserRecommendation>(`/user-recommendations/${id}/`, data);
    return response.data;
  },
  
  /**
   * Запрос новых рекомендаций
   */
  async requestNewRecommendations(): Promise<UserRecommendation[]> {
    if (mockConfig.useMockData) {
      return recommendationMockService.requestNewRecommendations();
    }
    
    const response = await api.post<UserRecommendation[]>('/user-recommendations/generate/');
    return response.data;
  },
};

export default recommendationService; 