'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import authService from '@/services/authService';

const DashboardHeader: React.FC = () => {
  // Получаем информацию о текущем пользователе
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
  });

  // Форматируем текущую дату
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(currentDate);

  // Определяем приветствие в зависимости от времени суток
  const getGreeting = () => {
    const hours = currentDate.getHours();
    if (hours < 6) return 'Доброй ночи';
    if (hours < 12) return 'Доброе утро';
    if (hours < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-800">
        {getGreeting()}, {user?.username || 'Пользователь'}!
      </h1>
      <p className="text-gray-600 mt-1">{formattedDate}</p>
      
      <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
        <p className="text-blue-700">
          На этой странице вы можете увидеть сводную информацию о вашем состоянии и получить рекомендации для предотвращения выгорания.
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader; 