import React from 'react';

// Компонент со статистикой рекомендаций
const RecommendationsStats: React.FC = () => {
  const stats = {
    total: 14,
    completed: 5,
    inProgress: 3,
    new: 4,
    skipped: 2,
    completionRate: 36 // процент выполнения
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">Статистика рекомендаций</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Процент выполнения рекомендаций</span>
            <span className="text-sm font-medium">{stats.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-md p-3">
            <div className="text-sm text-gray-600">Всего рекомендаций</div>
            <div className="text-xl font-semibold">{stats.total}</div>
          </div>
          <div className="border rounded-md p-3">
            <div className="text-sm text-gray-600">Выполнено</div>
            <div className="text-xl font-semibold text-green-600">{stats.completed}</div>
          </div>
          <div className="border rounded-md p-3">
            <div className="text-sm text-gray-600">В процессе</div>
            <div className="text-xl font-semibold text-yellow-600">{stats.inProgress}</div>
          </div>
          <div className="border rounded-md p-3">
            <div className="text-sm text-gray-600">Пропущено</div>
            <div className="text-xl font-semibold text-gray-600">{stats.skipped}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsStats; 