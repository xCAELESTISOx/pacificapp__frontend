'use client';

import React, { useState } from 'react';

interface Recommendation {
  id: string;
  category: 'work' | 'stress' | 'sleep' | 'activity';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

// Иконки для категорий
const CategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  switch (category) {
    case 'work':
      return (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'stress':
      return (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'sleep':
      return (
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    case 'activity':
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
};

// Цветовая схема для приоритетов
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Перевод категорий на русский
const getCategoryName = (category: string) => {
  const categories: Record<string, string> = {
    'work': 'Работа',
    'stress': 'Стресс',
    'sleep': 'Сон',
    'activity': 'Активность'
  };
  return categories[category] || category;
};

// Перевод приоритетов на русский
const getPriorityName = (priority: string) => {
  const priorities: Record<string, string> = {
    'high': 'Высокий',
    'medium': 'Средний',
    'low': 'Низкий'
  };
  return priorities[priority] || priority;
};

const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);

  if (recommendations.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-1">Рекомендации</h2>
        <p className="text-sm text-gray-600 mb-6">Персонализированные рекомендации для предотвращения выгорания</p>
        <div className="text-center py-8 text-gray-500">
          Нет доступных рекомендаций на данный момент
        </div>
      </div>
    );
  }

  // Получаем уникальные категории
  const categories = Array.from(new Set(recommendations.map(rec => rec.category)));

  // Фильтруем рекомендации по выбранной категории
  const filteredRecommendations = selectedCategory
    ? recommendations.filter(rec => rec.category === selectedCategory)
    : recommendations;

  // Сортируем по приоритету (высокий -> средний -> низкий)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedRecommendations = [...filteredRecommendations].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  const toggleExpand = (id: string) => {
    if (expandedRecommendation === id) {
      setExpandedRecommendation(null);
    } else {
      setExpandedRecommendation(id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-1">Рекомендации</h2>
      <p className="text-sm text-gray-600 mb-6">Персонализированные рекомендации для предотвращения выгорания</p>

      {/* Фильтры по категориям */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            selectedCategory === null 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Все
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
              selectedCategory === category 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <CategoryIcon category={category} />
            {getCategoryName(category)}
          </button>
        ))}
      </div>

      {/* Список рекомендаций */}
      <div className="space-y-4">
        {sortedRecommendations.map(recommendation => (
          <div 
            key={recommendation.id}
            className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
          >
            <div 
              className="p-4 cursor-pointer flex justify-between items-start"
              onClick={() => toggleExpand(recommendation.id)}
            >
              <div className="flex items-start gap-3">
                <CategoryIcon category={recommendation.category} />
                <div>
                  <h3 className="font-medium">{recommendation.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{getCategoryName(recommendation.category)}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(recommendation.priority)}`}>
                      {getPriorityName(recommendation.priority)}
                    </span>
                  </div>
                </div>
              </div>
              
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedRecommendation === recommendation.id ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {expandedRecommendation === recommendation.id && (
              <div className="px-4 pb-4 pt-1 border-t text-gray-700">
                <p>{recommendation.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList; 