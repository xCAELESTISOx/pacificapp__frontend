'use client';

import api from '../api';
import { mockConfig } from '../mocks/mockConfig';
import { 
  DashboardSummary,
  DashboardParams,
  ChartData,
  StatisticsParams
} from '@/app/types';
import { BurnoutRiskStats } from './dashboard.types';

/**
 * Мок данные для разработки
 */
const mockDashboardData: DashboardSummary = {
  sleep: {
    average_duration: 6.8,
    average_quality: 7.2,
    total_records: 14,
    trend: 'stable'
  },
  stress: {
    average_level: 58,
    total_records: 7,
    trend: 'down'
  },
  work: {
    average_duration: 8.5,
    average_productivity: 7.5,
    total_records: 10,
    trend: 'up'
  },
  burnout_risk: {
    current: 68,
    previous: 72,
    trend: 'down'
  },
  recommendations: {
    pending: 2,
    completed: 1,
    accepted: 1,
    latest: [
      {
        id: 1,
        title: 'Увеличьте количество перерывов в работе',
        category: 'work',
        status: 'pending'
      },
      {
        id: 2,
        title: 'Постарайтесь ложиться спать до 23:00',
        category: 'sleep',
        status: 'accepted'
      },
      {
        id: 3,
        title: 'Уделите время медитации',
        category: 'stress',
        status: 'completed'
      },
      {
        id: 4,
        title: 'Пройдите 10000 шагов за день',
        category: 'general',
        status: 'pending'
      }
    ]
  }
};

/**
 * Сервис для работы с данными дашборда
 */
const dashboardService = {
  /**
   * Получение данных для дашборда
   */
  async getDashboardSummary(params?: DashboardParams): Promise<DashboardSummary> {
    if (mockConfig.useMockData) {
      console.log('Using mock dashboard data with params:', params);
      
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Возвращаем мок-данные
      return mockDashboardData;
    }
    
    const response = await api.get<DashboardSummary>('/dashboard/summary/', { params });
    return response.data;
  },
  
  /**
   * Получение статистики выгорания
   */
  async getBurnoutRiskStats(params: StatisticsParams): Promise<BurnoutRiskStats> {
    if (mockConfig.useMockData) {
      console.log('Using mock burnout risk stats with params:', params);
      
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Создаем мок-данные по статистике выгорания
      const startDate = new Date(params.start_date);
      const endDate = new Date(params.end_date);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const stats = Array.from({ length: days }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        // Генерируем случайные значения в диапазоне от 30 до 70
        const riskValue = Math.floor(Math.random() * 40) + 30;
        
        return {
          date: date.toISOString().split('T')[0],
          risk_level: riskValue
        };
      });
      
      return {
        statistics: stats,
        avg_risk: stats.reduce((acc, val) => acc + val.risk_level, 0) / stats.length
      };
    }
    
    const response = await api.get<BurnoutRiskStats>('/burnout-risks/statistics/', { params });
    return response.data;
  },
  
  /**
   * Получение данных для графика стресса
   */
  async getStressChartData(params: StatisticsParams): Promise<ChartData> {
    if (mockConfig.useMockData) {
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Создаем мок-данные для графика стресса
      const startDate = new Date(params.start_date);
      const endDate = new Date(params.end_date);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const labels = Array.from({ length: days }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        return date.toISOString().split('T')[0];
      });
      
      const data = labels.map(() => Math.floor(Math.random() * 10) + 1);
      
      return {
        labels,
        datasets: [{
          label: 'Уровень стресса',
          data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false
        }]
      };
    }
    
    const response = await api.get<ChartData>('/stress/chart/', { params });
    return response.data;
  },
  
  /**
   * Получение данных для графика сна
   */
  async getSleepChartData(params: StatisticsParams): Promise<ChartData> {
    if (mockConfig.useMockData) {
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Создаем мок-данные для графика сна
      const startDate = new Date(params.start_date);
      const endDate = new Date(params.end_date);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const labels = Array.from({ length: days }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        return date.toISOString().split('T')[0];
      });
      
      const durationData = labels.map(() => 5 + Math.random() * 4);
      const qualityData = labels.map(() => Math.floor(Math.random() * 5) + 5);
      
      return {
        labels,
        datasets: [
          {
            label: 'Длительность сна (часы)',
            data: durationData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false
          },
          {
            label: 'Качество сна (1-10)',
            data: qualityData,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false
          }
        ]
      };
    }
    
    const response = await api.get<ChartData>('/sleep/chart/', { params });
    return response.data;
  },
  
  /**
   * Получение данных для графика работы
   */
  async getWorkChartData(params: StatisticsParams): Promise<ChartData> {
    if (mockConfig.useMockData) {
      // Имитация задержки сервера
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Создаем мок-данные для графика работы
      const startDate = new Date(params.start_date);
      const endDate = new Date(params.end_date);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const labels = Array.from({ length: days }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        return date.toISOString().split('T')[0];
      });
      
      const durationData = labels.map(() => 6 + Math.random() * 4);
      const productivityData = labels.map(() => Math.floor(Math.random() * 4) + 6);
      
      return {
        labels,
        datasets: [
          {
            label: 'Рабочее время (часы)',
            data: durationData,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            fill: false
          },
          {
            label: 'Продуктивность (1-10)',
            data: productivityData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
          }
        ]
      };
    }
    
    const response = await api.get<ChartData>('/work-activities/chart/', { params });
    return response.data;
  },
};

export default dashboardService; 