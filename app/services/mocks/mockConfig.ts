'use client';

// Настройки для переключения между мок-данными и реальным API
export const mockConfig = {
  // Глобальный флаг для включения/выключения мок-данных
  useMockData: process.env.NODE_ENV === 'development' && true,
  
  // Задержка для имитации реальных запросов (в мс)
  delay: {
    min: 300,
    max: 800,
  },
  
  // Вероятность ошибки для тестирования обработки ошибок (0-1)
  errorRate: 0.0, // 0 = никогда, 1 = всегда
};

/**
 * Имитирует задержку сетевого запроса
 */
export const simulateNetworkDelay = async (): Promise<void> => {
  if (!mockConfig.useMockData) return;
  
  const delay = Math.floor(
    Math.random() * (mockConfig.delay.max - mockConfig.delay.min + 1) + 
    mockConfig.delay.min
  );
  
  await new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Имитирует ошибку сети с заданной вероятностью
 */
export const simulateError = (): boolean => {
  if (!mockConfig.useMockData) return false;
  return Math.random() < mockConfig.errorRate;
};

/**
 * Создает обертку для мок-ответа
 */
export const createMockResponse = async <T>(data: T): Promise<T> => {
  await simulateNetworkDelay();
  
  if (simulateError()) {
    throw new Error('Симулированная ошибка сети');
  }
  
  return data;
};

export default mockConfig; 