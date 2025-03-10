'use client';

import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface SleepDataItem {
  date: string;
  duration: number;
  quality: number;
}

const SleepGraph: React.FC<{ data: SleepDataItem[] }> = ({ data }) => {
  // Если нет данных, показываем соответствующее сообщение
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="text-center py-8 text-gray-500">
          Недостаточно данных о сне
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
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

export default SleepGraph; 