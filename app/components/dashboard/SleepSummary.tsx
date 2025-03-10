'use client';

import React from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface SleepData {
  date: string;
  duration: number; // в часах
  quality: number; // от 1 до 10
}

interface SleepSummaryProps {
  data: SleepData[];
}

const SleepSummary: React.FC<SleepSummaryProps> = ({ data = [] }) => {
  // Если нет данных, показываем соответствующее сообщение
  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-8 text-gray-500">
          Недостаточно данных о сне
        </div>
      </div>
    );
  }

  // Сортируем данные по дате (от новых к старым)
  const sortedData = [...data].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Вычисляем средние значения
  const averageDuration = data.reduce((acc, curr) => acc + curr.duration, 0) / data.length;
  const averageQuality = data.reduce((acc, curr) => acc + curr.quality, 0) / data.length;
  
  // Получаем самую последнюю запись
  const latestSleep = sortedData[0];
  
  // Оцениваем качество сна
  const getQualityInfo = (quality: number) => {
    if (quality >= 8) return { text: 'Отличное', color: 'text-green-600' };
    if (quality >= 6) return { text: 'Хорошее', color: 'text-blue-600' };
    if (quality >= 4) return { text: 'Среднее', color: 'text-yellow-600' };
    return { text: 'Плохое', color: 'text-red-600' };
  };

  // Оцениваем продолжительность сна
  const getDurationInfo = (hours: number) => {
    if (hours >= 8) return { text: 'Отлично', color: 'text-green-600' };
    if (hours >= 7) return { text: 'Хорошо', color: 'text-blue-600' };
    if (hours >= 6) return { text: 'Недостаточно', color: 'text-yellow-600' };
    return { text: 'Мало', color: 'text-red-600' };
  };

  const qualityInfo = getQualityInfo(averageQuality);
  const durationInfo = getDurationInfo(averageDuration);

  // Форматируем дату последней записи
  const formattedDate = format(parseISO(latestSleep.date), 'd MMMM', { locale: ru });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="space-y-6">
        {/* Последняя запись о сне */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Последняя запись ({formattedDate})</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Продолжительность</p>
              <p className="text-xl font-semibold">{latestSleep.duration.toFixed(1)} ч</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Качество</p>
              <p className="text-xl font-semibold">{latestSleep.quality}/10</p>
            </div>
          </div>
        </div>

        {/* Средние показатели */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Средние показатели (за {data.length} дн.)</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Продолжительность</p>
              <p className={`text-xl font-semibold ${durationInfo.color}`}>
                {averageDuration.toFixed(1)} ч
                <span className="block text-xs mt-1">{durationInfo.text}</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Качество</p>
              <p className={`text-xl font-semibold ${qualityInfo.color}`}>
                {averageQuality.toFixed(1)}/10
                <span className="block text-xs mt-1">{qualityInfo.text}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Рекомендация */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-sm font-medium text-gray-500">Рекомендация</h3>
          <p className="mt-1 text-sm">
            {averageDuration < 7 
              ? 'Старайтесь спать не менее 7-8 часов в сутки для поддержания здоровья и снижения уровня стресса.'
              : 'Продолжайте поддерживать хороший режим сна, это положительно влияет на вашу продуктивность и самочувствие.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SleepSummary; 