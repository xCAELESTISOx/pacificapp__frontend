import React from 'react';

const RecommendationInfo: React.FC = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
      <h2 className="text-lg font-semibold mb-2 text-blue-800">О рекомендациях</h2>
      <p className="text-blue-700 text-sm">
        Рекомендации формируются на основе анализа ваших данных о сне, 
        стрессе и работе. Регулярно обновляйте информацию для получения 
        более точных рекомендаций.
      </p>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-blue-700 mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Выполняйте рекомендации с высоким приоритетом в первую очередь</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-700 mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Отмечайте выполненные рекомендации для отслеживания прогресса</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Новые рекомендации появляются по мере анализа ваших данных</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationInfo; 