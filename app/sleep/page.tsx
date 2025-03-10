'use client';

import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useQuery } from '@tanstack/react-query';
import SleepGraph from './components/SleepGraph';
import SleepEntry from './components/SleepEntry';
import SleepTips from './components/SleepTips';
import SleepSummary from '../components/dashboard/SleepSummary';
import sleepService from '../services/sleep';
import { format, subDays } from 'date-fns';

export default function SleepPage() {
  const [dateRange, setDateRange] = useState({
    start_date: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    end_date: format(new Date(), 'yyyy-MM-dd')
  });

  // Получаем данные о сне с использованием sleepService
  const sleepRecordsQuery = useQuery({
    queryKey: ['sleepRecords', dateRange],
    queryFn: () => sleepService.getSleepRecords(),
  });

  // Получаем статистику сна за выбранный период
  const sleepStatisticsQuery = useQuery({
    queryKey: ['sleepStatistics', dateRange],
    queryFn: () => sleepService.getSleepStatistics(dateRange),
  });

  // Форматируем данные для графика и компонента SleepSummary
  const sleepChartData = sleepStatisticsQuery.data?.statistics?.map((item) => ({
    date: item.date,
    duration: parseFloat(item.duration_hours),
    quality: item.quality ? parseFloat(item.quality) : 0
  })) || [];

  const isLoading = sleepRecordsQuery.isPending || sleepStatisticsQuery.isPending;

  return (
    <MainLayout>
      <div className="mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Мониторинг сна</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Блок с графиком сна */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Динамика сна</h2>
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <p>Загрузка данных...</p>
              </div>
            ) : (
              <SleepGraph data={sleepChartData} />
            )}
          </div>
          
          {/* Блок со статистикой сна */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Статистика сна</h2>
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <p>Загрузка данных...</p>
              </div>
            ) : (
              <SleepSummary data={sleepChartData} />
            )}
          </div>
        </div>
        
        {/* Форма добавления новой записи о сне */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Добавить запись о сне</h2>
          <SleepEntry />
        </div>
        
        {/* Блок с рекомендациями */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Рекомендации для улучшения сна</h2>
          <SleepTips />
        </div>
      </div>
    </MainLayout>
  );
} 