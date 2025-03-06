import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { 
  Recommendation, 
  RecommendationCategory, 
  RecommendationPriority,
  RecommendationStatus 
} from '../../types/recommendation';

// Мок-данные для рекомендаций
const initialRecommendations: Recommendation[] = [
  {
    id: '1',
    category: 'work',
    title: 'Делайте регулярные перерывы',
    description: 'Старайтесь делать 5-минутный перерыв каждый час работы. Это поможет снизить утомляемость и повысить продуктивность.',
    priority: 'high',
    status: 'in_progress',
    createdDate: '2023-05-01',
  },
  {
    id: '2',
    category: 'sleep',
    title: 'Улучшите качество сна',
    description: 'Постарайтесь ложиться спать и вставать в одно и то же время каждый день, даже в выходные.',
    priority: 'medium',
    status: 'new',
    createdDate: '2023-05-02',
  },
  {
    id: '3',
    category: 'stress',
    title: 'Практикуйте медитацию',
    description: 'Уделяйте 10 минут в день медитации или дыхательным упражнениям для снижения уровня стресса.',
    priority: 'medium',
    status: 'completed',
    createdDate: '2023-05-03',
    completedDate: '2023-05-05',
  },
  {
    id: '4',
    category: 'activity',
    title: 'Увеличьте физическую активность',
    description: 'Старайтесь ходить не менее 30 минут в день или заниматься другими физическими упражнениями.',
    priority: 'low',
    status: 'new',
    createdDate: '2023-05-04',
  },
  {
    id: '5',
    category: 'work',
    title: 'Установите чёткие границы рабочего времени',
    description: 'Определите время начала и окончания работы и старайтесь его придерживаться, чтобы избежать профессионального выгорания.',
    priority: 'high',
    status: 'new',
    createdDate: '2023-05-05',
  },
  {
    id: '6',
    category: 'stress',
    title: 'Выделите время на хобби',
    description: 'Занятие любимым делом помогает снизить уровень стресса и поддерживает психологическое равновесие.',
    priority: 'low',
    status: 'skipped',
    createdDate: '2023-05-03',
  },
  {
    id: '7',
    category: 'sleep',
    title: 'Ограничьте потребление кофеина',
    description: 'Старайтесь не употреблять кофеин после обеда, так как он может негативно влиять на качество сна.',
    priority: 'medium',
    status: 'in_progress',
    createdDate: '2023-05-04',
  },
];

// Компонент с иконкой категории
const CategoryIcon: React.FC<{ category: RecommendationCategory }> = ({ category }) => {
  switch (category) {
    case 'work':
      return (
        <svg className="min-w-5 w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'stress':
      return (
        <svg className="min-w-5 w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'sleep':
      return (
        <svg className="min-w-5 w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    case 'activity':
      return (
        <svg className="min-w-5 w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
};

// Расширенный компонент с рекомендациями, позволяющий фильтровать и отмечать выполненными
const EnhancedRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Обработчики для изменения статуса рекомендации
  const updateStatus = (id: string, newStatus: RecommendationStatus) => {
    setRecommendations(prevRecs => prevRecs.map(rec => {
      if (rec.id === id) {
        return {
          ...rec,
          status: newStatus,
          completedDate: newStatus === 'completed' ? format(new Date(), 'yyyy-MM-dd') : rec.completedDate
        };
      }
      return rec;
    }));
  };

  // Функция для получения цвета статуса
  const getStatusColor = (status: RecommendationStatus) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Функция для получения названия статуса на русском
  const getStatusName = (status: RecommendationStatus) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'in_progress': return 'В процессе';
      case 'completed': return 'Выполнена';
      case 'skipped': return 'Пропущена';
      default: return status;
    }
  };

  // Фильтрация рекомендаций
  const filteredRecommendations = recommendations.filter(rec => {
    if (selectedCategory && rec.category !== selectedCategory) return false;
    if (selectedStatus && rec.status !== selectedStatus) return false;
    if (selectedPriority && rec.priority !== selectedPriority) return false;
    return true;
  });

  // Перевод категорий на русский
  const getCategoryName = (category: RecommendationCategory) => {
    const categories: Record<RecommendationCategory, string> = {
      'work': 'Работа',
      'stress': 'Стресс',
      'sleep': 'Сон',
      'activity': 'Активность'
    };
    return categories[category] || category;
  };

  // Перевод приоритетов на русский
  const getPriorityName = (priority: RecommendationPriority) => {
    const priorities: Record<RecommendationPriority, string> = {
      'high': 'Высокий',
      'medium': 'Средний',
      'low': 'Низкий'
    };
    return priorities[priority] || priority;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-1">Персональные рекомендации</h2>
      <p className="text-sm text-gray-600 mb-6">Рекомендации, разработанные специально для вас на основе ваших данных</p>
      
      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select 
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">Все категории</option>
          <option value="work">Работа</option>
          <option value="stress">Стресс</option>
          <option value="sleep">Сон</option>
          <option value="activity">Активность</option>
        </select>
        
        <select 
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
        >
          <option value="">Все статусы</option>
          <option value="new">Новые</option>
          <option value="in_progress">В процессе</option>
          <option value="completed">Выполненные</option>
          <option value="skipped">Пропущенные</option>
        </select>
        
        <select 
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          value={selectedPriority || ''}
          onChange={(e) => setSelectedPriority(e.target.value || null)}
        >
          <option value="">Все приоритеты</option>
          <option value="high">Высокий</option>
          <option value="medium">Средний</option>
          <option value="low">Низкий</option>
        </select>
      </div>
      
      {/* Счетчик рекомендаций */}
      <div className="mb-4 text-sm">
        <span className="font-medium">Найдено рекомендаций:</span> {filteredRecommendations.length}
      </div>
      
      {/* Список рекомендаций */}
      {filteredRecommendations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Нет рекомендаций, соответствующих выбранным фильтрам
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecommendations.map(recommendation => (
            <div 
              key={recommendation.id}
              className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <CategoryIcon category={recommendation.category} />
                    <div>
                      <h3 
                        className="font-medium cursor-pointer"
                        onClick={() => setExpandedId(expandedId === recommendation.id ? null : recommendation.id)}
                      >{recommendation.title}</h3>
                      
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-gray-500">
                          {getCategoryName(recommendation.category)}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(recommendation.status)}`}>
                          {getStatusName(recommendation.status)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Приоритет: {getPriorityName(recommendation.priority)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Создано: {format(new Date(recommendation.createdDate), 'd MMM yyyy', { locale: ru })}
                        </span>
                      </div>
                      
                      {/* Развернутое описание */}
                      {expandedId === recommendation.id && (
                        <div className="mt-3 text-gray-700">
                          <p>{recommendation.description}</p>
                          
                          {/* Кнопки действий */}
                          <div className="mt-4 flex gap-2 flex-wrap">
                            {recommendation.status !== 'completed' && (
                              <button 
                                onClick={() => updateStatus(recommendation.id, 'completed')}
                                className="px-3 py-1 text-xs font-medium rounded-md bg-green-100 text-green-800 hover:bg-green-200"
                              >
                                Отметить выполненной
                              </button>
                            )}
                            
                            {recommendation.status !== 'in_progress' && recommendation.status !== 'completed' && (
                              <button 
                                onClick={() => updateStatus(recommendation.id, 'in_progress')}
                                className="px-3 py-1 text-xs font-medium rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              >
                                Начать выполнение
                              </button>
                            )}
                            
                            {recommendation.status !== 'skipped' && recommendation.status !== 'completed' && (
                              <button 
                                onClick={() => updateStatus(recommendation.id, 'skipped')}
                                className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                              >
                                Пропустить
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setExpandedId(expandedId === recommendation.id ? null : recommendation.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg 
                      className={`w-5 h-5 transition-transform ${
                        expandedId === recommendation.id ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedRecommendations; 