/**
 * Типы связанные с пользователями
 */

/**
 * Профиль пользователя
 */
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
  notifications: UserNotificationSettings;
  privacySettings: UserPrivacySettings;
}

/**
 * Настройки уведомлений пользователя
 */
export interface UserNotificationSettings {
  email: boolean;
  push: boolean;
  recommendations: boolean;
  weekly_report: boolean;
}

/**
 * Настройки приватности пользователя
 */
export interface UserPrivacySettings {
  share_analytics: boolean;
  public_profile: boolean;
}

/**
 * Данные активности пользователя
 */
export interface UserActivity {
  id: number;
  user_id: number;
  action: string;
  ip_address?: string;
  device?: string;
  location?: string;
  timestamp: string;
}

/**
 * Учетные данные для входа
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Данные для регистрации
 */
export interface RegisterData {
  email: string;
  username: string;
  password: string;
  password2: string;
}

/**
 * Ответ авторизации
 */
export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
} 