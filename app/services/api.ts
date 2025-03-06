import axios from 'axios';
import { mockConfig } from './mocks/mockConfig';

// Определяем, находимся ли мы в режиме разработки
const isDevelopment = process.env.NODE_ENV === 'development';

// В режиме разработки можно использовать mock API
const useMockApi = isDevelopment && mockConfig.useMockData;

// Создаем инстанс axios с базовыми настройками
const api = axios.create({
  baseURL: useMockApi 
    ? 'https://mockapi.com/api' // Можно заменить на json-server или другую имитацию API
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для добавления токена аутентификации к запросам
api.interceptors.request.use(
  (config) => {
    // Для имитации API в режиме разработки
    if (useMockApi) {
      console.log('Using Mock API:', config.url);
      
      // Симуляция задержки для имитации реальной сети
      return new Promise(resolve => {
        setTimeout(() => resolve(config), 500);
      });
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Перехватчик для обработки ошибок (в том числе 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Если ошибка 401 и это не запрос на обновление токена
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== 'token/refresh/') {
      originalRequest._retry = true;
      
      try {
        // Пытаемся обновить токен
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Если нет refresh токена, перенаправляем на страницу входа
          localStorage.removeItem('token');
          window.location.href = '/auth/login';
          return Promise.reject(error);
        }
        
        const response = await axios.post(`${api.defaults.baseURL}/token/refresh/`, {
          refresh: refreshToken,
        });
        
        // Если успешно обновили токен
        if (response.data.access) {
          localStorage.setItem('token', response.data.access);
          // Повторяем оригинальный запрос с новым токеном
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Если не смогли обновить токен, перенаправляем на страницу входа
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api; 