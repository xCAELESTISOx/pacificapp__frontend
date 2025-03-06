'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '../components/layout/MainLayout';
import WorkSummary from '../components/dashboard/WorkSummary';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

// Компонент для добавления записи о рабочем дне
const WorkEntry: React.FC = () => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [hoursWorked, setHoursWorked] = useState(8);
  const [tasksCompleted, setTasksCompleted] = useState(5);
  const [overworkHours, setOverworkHours] = useState(0);
  const [breaks, setBreaks] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки на сервер
    setTimeout(() => {
      console.log('Отправлены данные о работе:', { date, hoursWorked, tasksCompleted, overworkHours, breaks });
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Скрываем сообщение об успешной отправке через 3 секунды
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">Добавить информацию о рабочем дне</h2>
      
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="hoursWorked" className="block text-sm font-medium text-gray-700 mb-1">
              Часов работы: <span className="font-bold">{hoursWorked}</span>
            </label>
            <input
              type="range"
              id="hoursWorked"
              min="0"
              max="16"
              step="0.5"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0ч</span>
              <span>16ч</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="breaks" className="block text-sm font-medium text-gray-700 mb-1">
              Количество перерывов: <span className="font-bold">{breaks}</span>
            </label>
            <input
              type="range"
              id="breaks"
              min="0"
              max="10"
              value={breaks}
              onChange={(e) => setBreaks(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>10</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="tasksCompleted" className="block text-sm font-medium text-gray-700 mb-1">
              Выполнено задач: <span className="font-bold">{tasksCompleted}</span>
            </label>
            <input
              type="range"
              id="tasksCompleted"
              min="0"
              max="20"
              value={tasksCompleted}
              onChange={(e) => setTasksCompleted(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>20</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="overworkHours" className="block text-sm font-medium text-gray-700 mb-1">
              Часов переработки: <span className="font-bold">{overworkHours}</span>
            </label>
            <input
              type="range"
              id="overworkHours"
              min="0"
              max="8"
              step="0.5"
              value={overworkHours}
              onChange={(e) => setOverworkHours(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0ч</span>
              <span>8ч</span>
            </div>
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

// Компонент для отображения графика рабочего времени
const WorkTimeChart: React.FC<{ data: any[] }> = ({ data }) => {
  const maxHours = Math.max(...data.map(item => item.hoursWorked + item.overworkHours));
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">Рабочее время за неделю</h2>
      
      <div className="h-64 flex items-end space-x-1">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex-1 flex flex-col items-center"
            title={`${item.date}: ${item.hoursWorked}ч работы${item.overworkHours > 0 ? ` + ${item.overworkHours}ч переработки` : ''}`}
          >
            <div className="w-full flex flex-col items-stretch h-52">
              <div 
                className="bg-red-500" 
                style={{ 
                  height: `${(item.overworkHours / maxHours) * 100}%`,
                  display: item.overworkHours > 0 ? 'block' : 'none'
                }}
              ></div>
              <div 
                className="bg-blue-500" 
                style={{ height: `${(item.hoursWorked / maxHours) * 100}%` }}
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
          <div className="w-3 h-3 bg-blue-500 mr-1"></div>
          <span>Рабочее время</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 mr-1"></div>
          <span>Переработка</span>
        </div>
      </div>
    </div>
  );
};

// Компонент с советами по эффективной работе
const WorkTips: React.FC = () => {
  const tips = [
    {
      id: 1,
      title: 'Метод Помодоро',
      description: 'Работайте в течение 25 минут, затем сделайте перерыв на 5 минут. После 4 таких циклов сделайте более длительный перерыв.',
    },
    {
      id: 2,
      title: 'Правило двух минут',
      description: 'Если задача занимает меньше двух минут, сделайте её сразу, не откладывая.',
    },
    {
      id: 3,
      title: 'Регулярно вставайте',
      description: 'Важно вставать и разминаться каждый час, чтобы поддерживать кровообращение и снижать нагрузку на позвоночник.',
    },
    {
      id: 4,
      title: 'Устанавливайте чёткие границы',
      description: 'Определите время, когда вы заканчиваете работу, и придерживайтесь этого графика каждый день.',
    },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Советы по эффективной работе</h2>
      
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

export default function WorkPage() {
  // Получаем данные для страницы работы
  const { data, isLoading } = useQuery({
    queryKey: ['workData'],
    queryFn: () => {
      if (typeof window !== 'undefined') {
        // Мок-данные для страницы работы
        return Promise.resolve({
          workData: [
            { date: '2023-05-01', hoursWorked: 8, tasksCompleted: 5, overworkHours: 0, breaks: 3 },
            { date: '2023-05-02', hoursWorked: 9, tasksCompleted: 7, overworkHours: 1, breaks: 2 },
            { date: '2023-05-03', hoursWorked: 7, tasksCompleted: 4, overworkHours: 0, breaks: 4 },
            { date: '2023-05-04', hoursWorked: 10, tasksCompleted: 8, overworkHours: 2, breaks: 2 },
            { date: '2023-05-05', hoursWorked: 8, tasksCompleted: 6, overworkHours: 0, breaks: 3 },
            { date: '2023-05-06', hoursWorked: 4, tasksCompleted: 3, overworkHours: 0, breaks: 1 },
            { date: '2023-05-07', hoursWorked: 0, tasksCompleted: 0, overworkHours: 0, breaks: 0 },
          ]
        });
      }
      return Promise.resolve({ workData: [] });
    }
  });

  const workData = data?.workData || [];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Мониторинг рабочей активности</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
              </div>
            ) : (
              <>
                <WorkTimeChart data={workData} />
                <WorkEntry />
              </>
            )}
          </div>
          
          <div className="space-y-6">
            <WorkSummary data={workData} />
            <WorkTips />
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 