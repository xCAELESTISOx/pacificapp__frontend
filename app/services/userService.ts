'use client';

import api from './api';
import { userMockService } from './mocks';
import { mockConfig } from './mocks/mockConfig';
import { 
  UserProfile, 
  UserActivity, 
  PaginatedResponse, 
  SuccessResponse, 
  UserNotificationSettings, 
  UserPrivacySettings 
} from '../types';

/**
 * Сервис для работы с пользователями
 */
const userService = {
  /**
   * Получение профиля пользователя
   */
  async getUserProfile(): Promise<UserProfile> {
    if (mockConfig.useMockData) {
      return userMockService.getUserProfile();
    }
    
    const response = await api.get<UserProfile>('/user/profile/');
    return response.data;
  },
  
  /**
   * Обновление профиля пользователя
   */
  async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    if (mockConfig.useMockData) {
      return userMockService.updateUserProfile(data);
    }
    
    const response = await api.patch<UserProfile>('/user/profile/', data);
    return response.data;
  },
  
  /**
   * Изменение пароля пользователя
   */
  async changePassword(data: { current_password: string; new_password: string }): Promise<SuccessResponse> {
    if (mockConfig.useMockData) {
      return userMockService.changePassword(data);
    }
    
    const response = await api.post<SuccessResponse>('/user/change-password/', data);
    return response.data;
  },
  
  /**
   * Получение истории активности пользователя
   */
  async getUserActivity(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<UserActivity>> {
    if (mockConfig.useMockData) {
      return userMockService.getUserActivity(params);
    }
    
    const response = await api.get<PaginatedResponse<UserActivity>>('/user/activity/', { params });
    return response.data;
  },
  
  /**
   * Обновление настроек уведомлений
   */
  async updateNotificationSettings(settings: Partial<UserNotificationSettings>): Promise<UserNotificationSettings> {
    if (mockConfig.useMockData) {
      return userMockService.updateNotificationSettings(settings);
    }
    
    const response = await api.patch<UserNotificationSettings>('/user/settings/notifications/', settings);
    return response.data;
  },
  
  /**
   * Обновление настроек приватности
   */
  async updatePrivacySettings(settings: Partial<UserPrivacySettings>): Promise<UserPrivacySettings> {
    if (mockConfig.useMockData) {
      return userMockService.updatePrivacySettings(settings);
    }
    
    const response = await api.patch<UserPrivacySettings>('/user/settings/privacy/', settings);
    return response.data;
  },
  
  /**
   * Загрузка аватара пользователя
   */
  async uploadAvatar(formData: FormData): Promise<{ avatar_url: string }> {
    if (mockConfig.useMockData) {
      return userMockService.uploadAvatar(formData);
    }
    
    const response = await api.post<{ avatar_url: string }>('/user/avatar/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  /**
   * Удаление аккаунта пользователя
   */
  async deleteAccount(password: string): Promise<SuccessResponse> {
    if (mockConfig.useMockData) {
      return userMockService.deleteAccount(password);
    }
    
    const response = await api.post<SuccessResponse>('/user/delete-account/', { password });
    return response.data;
  },
};

export default userService; 