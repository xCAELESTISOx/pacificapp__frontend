'use client';

import { createMockResponse } from './mockConfig';

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  age?: number;
  gender?: string;
  occupation?: string;
  workHoursPerDay?: number;
  sleepHoursPerDay?: number;
  avatar?: string;
  phone?: string;
  address?: string;
  registeredAt: string;
  lastLoginAt: string;
  notifications: {
    email: boolean;
    push: boolean;
    recommendations: boolean;
    weekly_report: boolean;
  };
  privacySettings: {
    share_analytics: boolean;
    public_profile: boolean;
  };
}

export interface UserActivity {
  id: number;
  user_id: number;
  action: string;
  ip_address?: string;
  device?: string;
  location?: string;
  timestamp: string;
}

// Мок-данные для профиля пользователя
const userProfile: UserProfile = {
  id: 1,
  email: 'ivan.ivanov@example.com',
  name: 'Иван Иванов',
  age: 32,
  gender: 'male',
  occupation: 'Программист',
  workHoursPerDay: 8,
  sleepHoursPerDay: 7,
  avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
  phone: '+7 (999) 123-45-67',
  address: 'г. Москва, ул. Пушкина, д. 10, кв. 5',
  registeredAt: '2023-01-15T10:30:00Z',
  lastLoginAt: '2023-05-10T08:45:00Z',
  notifications: {
    email: true,
    push: true,
    recommendations: true,
    weekly_report: false
  },
  privacySettings: {
    share_analytics: true,
    public_profile: false
  }
};

// Мок-данные для активности пользователя
const userActivities: UserActivity[] = [
  {
    id: 1,
    user_id: 1,
    action: 'Вход в систему',
    ip_address: '192.168.1.1',
    device: 'Chrome на macOS',
    location: 'Москва, Россия',
    timestamp: '2023-05-10T08:45:00Z'
  },
  {
    id: 2,
    user_id: 1,
    action: 'Обновление профиля',
    ip_address: '192.168.1.1',
    device: 'Chrome на macOS',
    location: 'Москва, Россия',
    timestamp: '2023-05-05T14:20:00Z'
  },
  {
    id: 3,
    user_id: 1,
    action: 'Вход в систему',
    ip_address: '192.168.1.100',
    device: 'Safari на iOS',
    location: 'Москва, Россия',
    timestamp: '2023-05-03T18:30:00Z'
  },
  {
    id: 4,
    user_id: 1,
    action: 'Изменение пароля',
    ip_address: '192.168.1.1',
    device: 'Chrome на macOS',
    location: 'Москва, Россия',
    timestamp: '2023-04-20T11:15:00Z'
  },
  {
    id: 5,
    user_id: 1,
    action: 'Вход в систему',
    ip_address: '192.168.1.1',
    device: 'Chrome на macOS',
    location: 'Москва, Россия',
    timestamp: '2023-04-20T11:10:00Z'
  }
];

export const userMockService = {
  /**
   * Получение профиля пользователя
   */
  async getUserProfile(): Promise<UserProfile> {
    return createMockResponse(userProfile);
  },
  
  /**
   * Обновление профиля пользователя
   */
  async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    // Обновляем профиль, сохраняя неизменными важные поля
    const updatedProfile = {
      ...userProfile,
      ...data,
      id: userProfile.id, // ID не должен меняться
      email: data.email || userProfile.email, // Email может меняться, но через отдельный API
      registeredAt: userProfile.registeredAt, // Дата регистрации не меняется
    };
    
    // Синхронизируем изменения с нашим мок-объектом
    Object.assign(userProfile, updatedProfile);
    
    return createMockResponse(updatedProfile);
  },
  
  /**
   * Изменение пароля пользователя
   */
  async changePassword(data: { current_password: string; new_password: string }): Promise<{ success: boolean }> {
    // Проверка текущего пароля (в моке всегда проходит)
    if (data.current_password && data.new_password) {
      // Добавляем запись об активности
      userActivities.unshift({
        id: Math.max(...userActivities.map(a => a.id)) + 1,
        user_id: userProfile.id,
        action: 'Изменение пароля',
        ip_address: '192.168.1.1',
        device: 'Chrome на macOS',
        location: 'Москва, Россия',
        timestamp: new Date().toISOString()
      });
      
      return createMockResponse({ success: true });
    }
    
    throw new Error('Неверный текущий пароль');
  },
  
  /**
   * Получение истории активности пользователя
   */
  async getUserActivity(params?: { page?: number; page_size?: number }): Promise<any> {
    const pageSize = params?.page_size || 10;
    const page = params?.page || 1;
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = userActivities.slice(start, end);
    
    return createMockResponse({
      count: userActivities.length,
      next: end < userActivities.length ? `/api/user/activity/?page=${page + 1}&page_size=${pageSize}` : null,
      previous: page > 1 ? `/api/user/activity/?page=${page - 1}&page_size=${pageSize}` : null,
      results,
    });
  },
  
  /**
   * Обновление настроек уведомлений
   */
  async updateNotificationSettings(settings: Partial<UserProfile['notifications']>): Promise<UserProfile['notifications']> {
    userProfile.notifications = {
      ...userProfile.notifications,
      ...settings,
    };
    
    return createMockResponse(userProfile.notifications);
  },
  
  /**
   * Обновление настроек приватности
   */
  async updatePrivacySettings(settings: Partial<UserProfile['privacySettings']>): Promise<UserProfile['privacySettings']> {
    userProfile.privacySettings = {
      ...userProfile.privacySettings,
      ...settings,
    };
    
    return createMockResponse(userProfile.privacySettings);
  },
  
  /**
   * Загрузка аватара пользователя
   */
  async uploadAvatar(formData: FormData): Promise<{ avatar_url: string }> {
    // В реальном API здесь был бы код для загрузки файла
    // В мок-версии мы просто генерируем случайный аватар
    const randomId = Math.floor(Math.random() * 100);
    const avatarUrl = `https://randomuser.me/api/portraits/men/${randomId}.jpg`;
    
    // Обновляем аватар в профиле
    userProfile.avatar = avatarUrl;
    
    return createMockResponse({ avatar_url: avatarUrl });
  },
  
  /**
   * Удаление аккаунта пользователя
   */
  async deleteAccount(password: string): Promise<{ success: boolean }> {
    // В реальном API здесь была бы проверка пароля и удаление аккаунта
    // В мок-версии просто возвращаем успех
    return createMockResponse({ success: true });
  },
};

export default userMockService; 