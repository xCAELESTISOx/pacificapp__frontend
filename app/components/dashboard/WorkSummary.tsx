'use client';

import React from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface WorkActivity {
  date: string;
  hoursWorked: number;
  tasksCompleted: number;
  overworkHours: number;
}

interface WorkSummaryProps {
  data: WorkActivity[];
}

const WorkSummary: React.FC<WorkSummaryProps> = ({ data = [] }) => {
  // Если нет данных, показываем соответствующее сообщение
  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Рабочая активность</h2>
        <div className="text-center py-8 text-gray-500">
          Нет данных о рабочей активности
        </div>
      </div>
    );
  }

  // Сортируем данные по дате (от новых к старым)
  const sortedData = [...data].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Вычисляем суммарные показатели за неделю
  const totalHoursWorked = data.reduce((acc, curr) => acc + curr.hoursWorked, 0);
  const totalTasksCompleted = data.reduce((acc, curr) => acc + curr.tasksCompleted, 0);
  const totalOverwork = data.reduce((acc, curr) => acc + curr.overworkHours, 0);
  
  // Вычисляем средние показатели
  const avgHoursPerDay = totalHoursWorked / data.length;
  const avgTasksPerDay = totalTasksCompleted / data.length;
  
  // Получаем последнюю запись
  const latestActivity = sortedData[0];
  const latestDate = format(parseISO(latestActivity.date), 'd MMMM', { locale: ru });

  // Определяем статусы по показателям
  const getWorkloadStatus = (hours: number) => {
    if (hours <= 6) return { text: 'Низкая', color: 'text-green-600' };
    if (hours <= 8) return { text: 'Нормальная', color: 'text-blue-600' };
    if (hours <= 10) return { text: 'Высокая', color: 'text-yellow-600' };
    return { text: 'Чрезмерная', color: 'text-red-600' };
  };

  const workloadStatus = getWorkloadStatus(avgHoursPerDay);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Рабочая активность</h2>
      
      <div className="space-y-6">
        {/* Последняя активность */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Вчера ({latestDate})</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Часов работы</p>
              <p className="text-xl font-semibold">
                {latestActivity.hoursWorked}ч
                {latestActivity.overworkHours > 0 && 
                  <span className="text-sm text-red-500 ml-2">+{latestActivity.overworkHours}ч</span>
                }
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Выполнено задач</p>
              <p className="text-xl font-semibold">{latestActivity.tasksCompleted}</p>
            </div>
          </div>
        </div>

        {/* Суммарные показатели */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">За неделю ({data.length} дн.)</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Рабочая нагрузка</p>
              <p className={`text-xl font-semibold ${workloadStatus.color}`}>
                {avgHoursPerDay.toFixed(1)}ч/день
                <span className="block text-xs mt-1">{workloadStatus.text}</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Всего задач</p>
              <p className="text-xl font-semibold">{totalTasksCompleted}</p>
            </div>
          </div>
        </div>
        
        {/* Переработки */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-500">Переработки за неделю</h3>
            <span className={`text-xl font-semibold ${totalOverwork > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {totalOverwork > 0 ? `+${totalOverwork}ч` : '0ч'}
            </span>
          </div>
          
          {totalOverwork > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              Частые переработки могут негативно сказываться на вашем здоровье и повышать риск выгорания.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkSummary; 