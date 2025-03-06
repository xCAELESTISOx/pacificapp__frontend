'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MainLayout from '../components/layout/MainLayout';
import StressChart from '../components/dashboard/StressChart';
import { format, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { dashboardService, stressService } from '../services';

// Интерфейс для статистики стресса
interface StressStatItem {
  date: string;
  avg_level: number;
  count: number;
}

// Компонент для добавления новой записи об уровне стресса
const StressTracker: React.FC = () => {
  const [stressLevel, setStressLevel] = useState(50);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const queryClient = useQueryClient();
  
  // Мутация для добавления уровня стресса
  const mutation = useMutation({
    mutationFn: (data: { level: number; notes?: string }) => 
      stressService.addStressLevel(data),
    onSuccess: () => {
      // При успешном добавлении обновляем данные в кеше
      queryClient.invalidateQueries({ queryKey: ['stressLevels'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      setShowSuccess(true);
      setNotes('');
      
      // Скрываем сообщение об успешной отправке через 3 секунды
      setTimeout(() => setShowSuccess(false), 3000);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    mutation.mutate({ 
      level: stressLevel, 
      notes: notes.trim() ? notes : undefined 
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Отслеживание стресса</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ваш текущий уровень стресса: {stressLevel}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={stressLevel}
            onChange={(e) => setStressLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Спокойствие</span>
            <span>Сильный стресс</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Комментарий (необязательно)</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Что вызвало стресс? Как вы себя чувствуете?"
            rows={3}
          />
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
            mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {mutation.isPending ? 'Сохранение...' : 'Сохранить'}
        </button>
        
        {mutation.isError && (
          <p className="mt-2 text-red-600">{mutation.error.message || 'Произошла ошибка при сохранении'}</p>
        )}
        
        {showSuccess && (
          <p className="mt-2 text-green-600">Данные успешно сохранены!</p>
        )}
      </form>
    </div>
  );
};

// Компонент для отображения факторов стресса
const StressFactors: React.FC = () => {
  const factors = [
    { id: 1, name: 'Рабочая нагрузка', percentage: 35 },
    { id: 2, name: 'Недостаток сна', percentage: 25 },
    { id: 3, name: 'Конфликты', percentage: 15 },
    { id: 4, name: 'Финансовые проблемы', percentage: 10 },
    { id: 5, name: 'Другие факторы', percentage: 15 },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">Факторы стресса</h2>
      
      <div className="space-y-4">
        {factors.map(factor => (
          <div key={factor.id}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{factor.name}</span>
              <span className="text-sm font-medium">{factor.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full" 
                style={{ width: `${factor.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Компонент для отображения рекомендаций по управлению стрессом
const StressManagementTips: React.FC = () => {
  const tips = [
    {
      id: 1,
      title: 'Дыхательные упражнения',
      description: 'Глубокое дыхание помогает активировать парасимпатическую нервную систему, которая отвечает за расслабление.',
    },
    {
      id: 2,
      title: 'Физическая активность',
      description: 'Регулярные физические упражнения снижают уровень гормонов стресса и улучшают настроение.',
    },
    {
      id: 3,
      title: 'Полноценный сон',
      description: 'Недостаток сна усиливает стресс. Старайтесь спать 7-8 часов в сутки.',
    },
    {
      id: 4,
      title: 'Ограничение информационного потока',
      description: 'Ограничьте время, проводимое за просмотром новостей и в социальных сетях.',
    },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Как управлять стрессом</h2>
      
      <div className="space-y-4">
        {tips.map(tip => (
          <div key={tip.id} className="border-b pb-3 last:border-0 last:pb-0">
            <h3 className="font-medium text-base">{tip.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function StressPage() {
  // Получаем данные за последние 7 дней
  const endDate = new Date();
  const startDate = subDays(endDate, 6); // 7 дней включая сегодня
  
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');
  
  // Загружаем данные о стрессе
  const { data, isLoading, error } = useQuery({
    queryKey: ['stressLevels', formattedStartDate, formattedEndDate],
    queryFn: () => stressService.getStressStatistics({ 
      start_date: formattedStartDate, 
      end_date: formattedEndDate 
    })
  });
  
  const dateRangeText = `${format(startDate, 'd MMMM', { locale: ru })} - ${format(endDate, 'd MMMM', { locale: ru })}`;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Управление стрессом</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Динамика уровня стресса: {dateRangeText}</h2>
          
          {isLoading ? (
            <div className="bg-white p-6 rounded-lg shadow-md h-64 flex items-center justify-center">
              <div className="animate-pulse text-gray-500">Загрузка данных...</div>
            </div>
          ) : error ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-red-500">Ошибка при загрузке данных</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <StressChart 
                data={data.statistics.map((item: StressStatItem) => ({
                  date: item.date,
                  value: item.avg_level
                }))} 
              />
              <div className="mt-4 text-center">
                <p className="text-gray-600">Средний уровень стресса: <span className="font-bold">{Math.round(data.avg_level)}</span></p>
                <p className="text-gray-600">Всего записей: {data.total_records}</p>
              </div>
            </div>
          )}
        </div>
        
        <StressTracker />
        
        <div className="grid md:grid-cols-2 gap-6">
          <StressFactors />
          <StressManagementTips />
        </div>
      </div>
    </MainLayout>
  );
} 