'use client';

import React from 'react';

interface BurnoutRiskCardProps {
  currentRisk: number;
  previousRisk: number;
  trend: 'up' | 'down' | 'stable';
}

const BurnoutRiskCard: React.FC<BurnoutRiskCardProps> = ({
  currentRisk,
  previousRisk,
  trend,
}) => {
  // Определяем цветовую схему в зависимости от уровня риска
  const getColorClass = (risk: number) => {
    if (risk < 30) return 'bg-green-100 border-green-200 text-green-800';
    if (risk < 60) return 'bg-yellow-100 border-yellow-200 text-yellow-800';
    return 'bg-red-100 border-red-200 text-red-800';
  };

  // Определяем иконку и текст тренда
  const getTrendInfo = () => {
    if (trend === 'up') {
      return {
        icon: (
          <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ),
        text: 'Повышается',
        color: 'text-red-600',
      };
    }
    if (trend === 'down') {
      return {
        icon: (
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
          </svg>
        ),
        text: 'Снижается',
        color: 'text-green-600',
      };
    }
    return {
      icon: (
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
      ),
      text: 'Стабильный',
      color: 'text-gray-600',
    };
  };

  const trendInfo = getTrendInfo();

  // Вычисляем изменение риска
  const riskChange = currentRisk - previousRisk;
  const riskChangeText = riskChange > 0 ? `+${riskChange}%` : `${riskChange}%`;

  return (
    <div className={`p-6 rounded-lg border ${getColorClass(currentRisk)}`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold mb-2">Риск выгорания</h2>
          <div className="flex items-center">
            <div className="text-3xl font-bold">{currentRisk}%</div>
            <div className={`ml-2 text-sm ${trendInfo.color} flex items-center`}>
              {trendInfo.icon}
              <span className="ml-1">{riskChangeText}</span>
            </div>
          </div>
        </div>
        
        <div className="relative w-20 h-20">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={currentRisk < 30 ? '#4ade80' : currentRisk < 60 ? '#facc15' : '#f87171'}
              strokeWidth="3"
              strokeDasharray={`${currentRisk}, 100`}
              strokeLinecap="round"
            />
            <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="currentColor">
              {currentRisk}%
            </text>
          </svg>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm">
          {currentRisk < 30 ? (
            'Низкий риск выгорания. Продолжайте следить за своим состоянием.'
          ) : currentRisk < 60 ? (
            'Средний риск выгорания. Обратите внимание на рекомендации.'
          ) : (
            'Высокий риск выгорания! Рекомендуем принять срочные меры.'
          )}
        </p>
        
        <div className="mt-2 text-sm flex items-center">
          {trendInfo.icon}
          <span className={`ml-1 ${trendInfo.color}`}>{trendInfo.text} по сравнению с предыдущим периодом</span>
        </div>
      </div>
    </div>
  );
};

export default BurnoutRiskCard; 