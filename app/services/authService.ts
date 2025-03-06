'use client';

import api from './api';
import { LoginCredentials, RegisterData, AuthResponse, SuccessResponse } from '../types';

// Определяем, используем ли мок-сервисы для разработки
// const useMockServices = process.env.NODE_ENV === 'development' && true;
const useMockServices = false;

// Мок данные для разработки
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
    if (useMockServices) {
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
    
    const response = await api.post<AuthResponse>('/token/', credentials);
    
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
  async register(data: RegisterData): Promise<SuccessResponse & { user?: { id: number; email: string; username: string } }> {
    if (useMockServices) {
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
    
    const response = await api.post<SuccessResponse & { user?: { id: number; email: string; username: string } }>('/users/', data);
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
  async getCurrentUser(): Promise<{ id: number; email: string; username: string }> {
    if (useMockServices) {
      console.log('Using mock getCurrentUser');
      
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Проверяем авторизацию
      if (!this.isAuthenticated()) {
        throw new Error('Пользователь не авторизован');
      }
      
      return mockUser;
    }
    
    const response = await api.get<{ id: number; email: string; username: string }>('/users/me/');
    return response.data;
  },
};

export default authService; 