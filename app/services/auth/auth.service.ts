'use client';

import api from '../api';
import { mockConfig } from '../mocks/mockConfig';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import { AuthResponse, LoginCredentials, RegisterData, SuccessResponse } from '@/app/types';
import { RegisterResponse, UserData } from './auth.types';

// Mock user data for development
const mockUser = {
  id: 1,
  email: 'user@example.com',
  username: 'testuser',
};

const mockTokens = {
  access: 'mock_access_token_for_development_purposes_only',
  refresh: 'mock_refresh_token_for_development_purposes_only',
};

/**
 * Сервис для работы с аутентификацией
 */
const authService = {
  /**
   * Авторизация пользователя
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (mockConfig.useMockData) {
      console.log('Using mock login with credentials:', credentials);
      
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Мок проверка (для разработки)
      if (credentials.email !== 'user@example.com' && credentials.password !== 'password') {
        // Имитация ошибки
        throw new Error('Неверный email или пароль');
      }
      
      const response: AuthResponse = {
        access: mockTokens.access,
        refresh: mockTokens.refresh,
        user: mockUser,
      };
      
      // Сохраняем токены в localStorage
      localStorage.setItem('token', response.access);
      localStorage.setItem('refreshToken', response.refresh);
      
      return response;
    }
    
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    
    // Сохраняем токены в localStorage
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    }
    
    return response.data;
  },
  
  /**
   * Регистрация нового пользователя
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    if (mockConfig.useMockData) {
      console.log('Using mock register with data:', data);
      
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Мок-валидация
      if (data.password !== data.password2) {
        throw new Error('Пароли не совпадают');
      }
      
      // Успешная регистрация
      return { 
        success: true,
        message: 'Регистрация успешна! Теперь вы можете войти в систему.',
        user: {
          ...mockUser,
          email: data.email,
          username: data.username,
        }
      };
    }
    
    const response = await api.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },
  
  /**
   * Выход пользователя
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
  
  /**
   * Проверка, авторизован ли пользователь
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
  
  /**
   * Получение данных текущего пользователя
   */
  async getCurrentUser(): Promise<UserData> {
    if (mockConfig.useMockData) {
      console.log('Using mock getCurrentUser');
      
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Проверяем авторизацию
      if (!this.isAuthenticated()) {
        throw new Error('Пользователь не авторизован');
      }
      
      return mockUser;
    }
    
    const response = await api.get<UserData>(API_ENDPOINTS.USERS.PROFILE);
    return response.data;
  },
  
  /**
   * Сброс пароля
   */
  async requestPasswordReset(email: string): Promise<SuccessResponse> {
    if (mockConfig.useMockData) {
      console.log('Using mock password reset for:', email);
      
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return { 
        success: true,
        message: 'На ваш email отправлена инструкция по сбросу пароля.'
      };
    }
    
    const response = await api.post<SuccessResponse>(
      '/auth/password/reset/', 
      { email }
    );
    return response.data;
  },
  
  /**
   * Подтверждение сброса пароля
   */
  async confirmPasswordReset(
    uid: string, 
    token: string, 
    new_password: string, 
    new_password2: string
  ): Promise<SuccessResponse> {
    if (mockConfig.useMockData) {
      console.log('Using mock password reset confirmation');
      
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Мок-валидация
      if (new_password !== new_password2) {
        throw new Error('Пароли не совпадают');
      }
      
      return { 
        success: true,
        message: 'Пароль успешно изменен. Теперь вы можете войти в систему.'
      };
    }
    
    const response = await api.post<SuccessResponse>(
      '/auth/password/reset/confirm/',
      { uid, token, new_password, new_password2 }
    );
    return response.data;
  },
  
  /**
   * Обновление токена
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REFRESH, 
      { refresh: refreshToken }
    );
    
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      // Сохраняем новый refresh token, если он есть в ответе
      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      }
    }
    
    return response.data;
  }
};

export default authService; 