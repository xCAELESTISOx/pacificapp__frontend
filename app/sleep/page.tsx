'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '../components/layout/MainLayout';
import SleepSummary from '../components/dashboard/SleepSummary';
import dashboardService from '../services/dashboardService';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

// Компонент для добавления новой записи о сне
const SleepEntry: React.FC = () => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [duration, setDuration] = useState(7.5);
  const [quality, setQuality] = useState(7);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки на сервер
    setTimeout(() => {
      console.log('Отправлены данные о сне:', { date, duration, quality });
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Скрываем сообщение об успешной отправке через 3 секунды
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">Добавить запись о сне</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Дата
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            max={format(new Date(), 'yyyy-MM-dd')}
            required
          />
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Продолжительность сна: <span className="font-bold">{duration} часов</span>
          </label>
          <input
            type="range"
            id="duration"
            min="0"
            max="12"
            step="0.5"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0ч</span>
            <span>12ч</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">
            Качество сна: <span className="font-bold">{quality}/10</span>
          </label>
          <input
            type="range"
            id="quality"
            min="1"
            max="10"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Плохо (1)</span>
            <span>Отлично (10)</span>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Отправка...' : 'Сохранить'}
        </button>
        
        {showSuccess && (
          <div className="p-2 bg-green-100 text-green-700 rounded-md text-sm">
            Данные успешно сохранены
          </div>
        )}
      </form>
    </div>
  );
};

// Компонент для отображения графика сна
const SleepGraph: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">График сна за неделю</h2>
      
      <div>
        {/* Графическое представление сна за неделю */}
        <div className="flex h-full items-end space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex space-x-1">
                <div 
                  className="flex-1 bg-indigo-600 rounded-t-sm" 
                  style={{ height: `${item.duration * 10}px` }}
                  title={`Продолжительность: ${item.duration}ч`}
                ></div>
                <div 
                  className="flex-1 bg-green-500 rounded-t-sm" 
                  style={{ height: `${item.quality * 10}px` }}
                  title={`Качество: ${item.quality}/10`}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                {format(new Date(item.date), 'E', { locale: ru })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-600 mr-1"></div>
            <span>Продолжительность</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 mr-1"></div>
            <span>Качество</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент с советами по здоровому сну
const SleepTips: React.FC = () => {
  const tips = [
    {
      id: 1,
      title: 'Соблюдайте режим',
      description: 'Ложитесь спать и вставайте в одно и то же время каждый день, даже в выходные.',
    },
    {
      id: 2,
      title: 'Создайте комфортную обстановку',
      description: 'Ваша спальня должна быть тихой, темной и прохладной. Рекомендуемая температура 18-20°C.',
    },
    {
      id: 3,
      title: 'Избегайте кофеина и алкоголя',
      description: 'Не употребляйте кофеин после обеда и ограничьте потребление алкоголя вечером.',
    },
    {
      id: 4,
      title: 'Отключите электронные устройства',
      description: 'За час до сна отложите телефон, планшет и другие устройства с синим светом.',
    },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Советы для здорового сна</h2>
      
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

export default function SleepPage() {
  // Получаем данные для страницы сна
  const { data, isLoading } = useQuery({
    queryKey: ['sleepData'],
    queryFn: () => {
      if (typeof window !== 'undefined') {
        // Мок-данные для страницы сна
        return Promise.resolve({
          sleepData: [
            { date: '2023-05-01', duration: 7.5, quality: 8 },
            { date: '2023-05-02', duration: 6.2, quality: 6 },
            { date: '2023-05-03', duration: 8.0, quality: 9 },
            { date: '2023-05-04', duration: 7.0, quality: 7 },
            { date: '2023-05-05', duration: 6.5, quality: 5 },
            { date: '2023-05-06', duration: 7.8, quality: 8 },
            { date: '2023-05-07', duration: 6.8, quality: 7 },
          ]
        });
      }
      return Promise.resolve({ sleepData: [] });
    }
  });

  const sleepData = data?.sleepData || [];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Мониторинг сна</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
              </div>
            ) : (
              <>
                <SleepGraph data={sleepData} />
                <SleepEntry />
              </>
            )}
          </div>
          
          <div className="space-y-6">
            <SleepSummary data={sleepData} />
            <SleepTips />
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 