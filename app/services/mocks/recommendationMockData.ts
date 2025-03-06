'use client';

import { Recommendation, UserRecommendation } from '../recommendationService';
import { createMockResponse } from './mockConfig';

// Типы рекомендаций
const recommendationTypes = [
  { id: 1, name: 'Физическая активность', icon: 'fitness' },
  { id: 2, name: 'Ментальное здоровье', icon: 'mind' },
  { id: 3, name: 'Режим сна', icon: 'sleep' },
  { id: 4, name: 'Рабочие привычки', icon: 'work' },
  { id: 5, name: 'Социальная активность', icon: 'social' },
];

// Мок-данные для рекомендаций
const recommendations: Recommendation[] = [
  {
    id: 1,
    title: 'Встаньте и разомнитесь',
    description: 'Проведите 5 минут, выполняя легкие упражнения для разминки тела после долгого сидения.',
    type: recommendationTypes[0],
    category: 'physical',
    duration_minutes: 5,
    is_quick: true,
  },
  {
    id: 2,
    title: 'Медитация перед сном',
    description: 'Проведите 10 минут в медитации перед сном, чтобы успокоить ум и подготовиться к качественному отдыху.',
    type: recommendationTypes[1],
    category: 'mental',
    duration_minutes: 10,
    is_quick: true,
  },
  {
    id: 3,
    title: 'Установите режим сна',
    description: 'Старайтесь ложиться спать и просыпаться в одно и то же время, даже в выходные дни, чтобы наладить режим сна.',
    type: recommendationTypes[2],
    category: 'sleep',
    duration_minutes: 0,
    is_quick: false,
  },
  {
    id: 4,
    title: 'Техника Помодоро',
    description: 'Используйте технику Помодоро: работайте 25 минут, затем отдыхайте 5 минут. После 4-х циклов сделайте длинный перерыв 15-30 минут.',
    type: recommendationTypes[3],
    category: 'work',
    duration_minutes: 30,
    is_quick: false,
  },
  {
    id: 5,
    title: 'Обед с коллегами',
    description: 'Планируйте обеды с коллегами хотя бы раз в неделю для поддержания здоровых социальных связей на работе.',
    type: recommendationTypes[4],
    category: 'social',
    duration_minutes: 60,
    is_quick: false,
  },
  {
    id: 6,
    title: 'Короткий дневной сон',
    description: 'Если чувствуете усталость в середине дня, попробуйте короткий дневной сон (15-20 минут) для восстановления энергии.',
    type: recommendationTypes[2],
    category: 'sleep',
    duration_minutes: 20,
    is_quick: true,
  },
  {
    id: 7,
    title: 'Установите приоритеты задач',
    description: 'Начинайте каждый день с определения 3-5 наиболее важных задач, которые нужно выполнить.',
    type: recommendationTypes[3],
    category: 'work',
    duration_minutes: 10,
    is_quick: true,
  },
  {
    id: 8,
    title: 'Минута благодарности',
    description: 'Уделите минуту в начале или конце дня, чтобы записать три вещи, за которые вы благодарны. Это повышает уровень счастья и снижает стресс.',
    type: recommendationTypes[1],
    category: 'mental',
    duration_minutes: 1,
    is_quick: true,
  },
  {
    id: 9,
    title: 'Выходные без работы',
    description: 'Посвятите хотя бы один день в неделю полностью отдыху без проверки рабочей почты и сообщений.',
    type: recommendationTypes[3],
    category: 'work',
    duration_minutes: 0,
    is_quick: false,
  },
  {
    id: 10,
    title: 'Прогулка на свежем воздухе',
    description: 'Ежедневно проводите не менее 30 минут на прогулке на свежем воздухе, даже в плохую погоду.',
    type: recommendationTypes[0],
    category: 'physical',
    duration_minutes: 30,
    is_quick: false,
  },
];

// Мок-данные пользовательских рекомендаций
const userRecommendations: UserRecommendation[] = [
  {
    id: 1,
    user: 1,
    recommendation: recommendations[0],
    status: 'completed',
    user_feedback: 'Помогло снять напряжение',
    user_rating: 5,
    created_at: '2023-05-01T10:00:00Z',
    completed_at: '2023-05-01T15:30:00Z',
  },
  {
    id: 2,
    user: 1,
    recommendation: recommendations[1],
    status: 'accepted',
    created_at: '2023-05-02T09:00:00Z',
  },
  {
    id: 3,
    user: 1,
    recommendation: recommendations[2],
    status: 'pending',
    created_at: '2023-05-03T11:15:00Z',
  },
  {
    id: 4,
    user: 1,
    recommendation: recommendations[3],
    status: 'rejected',
    reason: 'Слишком много срочных задач',
    created_at: '2023-05-04T08:45:00Z',
  },
  {
    id: 5,
    user: 1,
    recommendation: recommendations[4],
    status: 'completed',
    user_feedback: 'Отличная возможность познакомиться с новыми коллегами',
    user_rating: 4,
    created_at: '2023-04-25T10:30:00Z',
    completed_at: '2023-04-28T13:20:00Z',
  },
  {
    id: 6,
    user: 1,
    recommendation: recommendations[5],
    status: 'pending',
    created_at: '2023-05-05T14:00:00Z',
  },
  {
    id: 7,
    user: 1,
    recommendation: recommendations[6],
    status: 'accepted',
    created_at: '2023-05-06T08:30:00Z',
  },
  {
    id: 8,
    user: 1,
    recommendation: recommendations[7],
    status: 'completed',
    user_feedback: 'Простая практика, но эффективная',
    user_rating: 5,
    created_at: '2023-05-01T08:00:00Z',
    completed_at: '2023-05-05T20:10:00Z',
  },
];

export const recommendationMockService = {
  /**
   * Получение всех рекомендаций
   */
  async getRecommendations(params?: { category?: string; is_quick?: boolean }): Promise<any> {
    let filtered = [...recommendations];
    
    if (params?.category) {
      filtered = filtered.filter(r => r.category === params.category);
    }
    
    if (params?.is_quick !== undefined) {
      filtered = filtered.filter(r => r.is_quick === params.is_quick);
    }
    
    return createMockResponse({
      count: filtered.length,
      results: filtered,
    });
  },
  
  /**
   * Получение рекомендаций для пользователя
   */
  async getUserRecommendations(params?: { status?: string; page?: number }): Promise<any> {
    let filtered = [...userRecommendations];
    
    if (params?.status) {
      filtered = filtered.filter(ur => ur.status === params.status);
    }
    
    const pageSize = 10;
    const page = params?.page || 1;
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const results = filtered.slice(start, end);
    
    return createMockResponse({
      count: filtered.length,
      next: end < filtered.length ? `/api/user-recommendations/?page=${page + 1}` : null,
      previous: page > 1 ? `/api/user-recommendations/?page=${page - 1}` : null,
      results,
    });
  },
  
  /**
   * Получение конкретной рекомендации пользователя
   */
  async getUserRecommendation(id: number): Promise<UserRecommendation> {
    const userRecommendation = userRecommendations.find(ur => ur.id === id);
    
    if (!userRecommendation) {
      throw new Error(`User recommendation with ID ${id} not found`);
    }
    
    return createMockResponse(userRecommendation);
  },
  
  /**
   * Обновление статуса рекомендации пользователя
   */
  async updateUserRecommendationStatus(
    id: number, 
    data: { 
      status: 'accepted' | 'completed' | 'rejected';
      user_feedback?: string;
      user_rating?: number;
    }
  ): Promise<UserRecommendation> {
    const index = userRecommendations.findIndex(ur => ur.id === id);
    
    if (index === -1) {
      throw new Error(`User recommendation with ID ${id} not found`);
    }
    
    const updatedRecommendation = {
      ...userRecommendations[index],
      ...data,
      id: userRecommendations[index].id,
    };
    
    // Если статус изменился на 'completed', добавляем дату завершения
    if (data.status === 'completed' && userRecommendations[index].status !== 'completed') {
      updatedRecommendation.completed_at = new Date().toISOString();
    }
    
    userRecommendations[index] = updatedRecommendation;
    
    return createMockResponse(updatedRecommendation);
  },
  
  /**
   * Запрос новых рекомендаций
   */
  async requestNewRecommendations(): Promise<UserRecommendation[]> {
    // Выбираем случайные рекомендации, которых еще нет у пользователя
    const currentRecommendationIds = userRecommendations.map(ur => ur.recommendation.id);
    const availableRecommendations = recommendations.filter(r => !currentRecommendationIds.includes(r.id));
    
    // Если нет доступных рекомендаций, возвращаем пустой массив
    if (availableRecommendations.length === 0) {
      return createMockResponse([]);
    }
    
    // Создаем от 1 до 3 новых рекомендаций
    const numberOfNewRecommendations = Math.min(
      Math.floor(Math.random() * 3) + 1, 
      availableRecommendations.length
    );
    
    const shuffled = [...availableRecommendations].sort(() => 0.5 - Math.random());
    const selectedRecommendations = shuffled.slice(0, numberOfNewRecommendations);
    
    const newUserRecommendations: UserRecommendation[] = selectedRecommendations.map((recommendation, index) => {
      const newId = Math.max(...userRecommendations.map(ur => ur.id)) + index + 1;
      return {
        id: newId,
        user: 1,
        recommendation,
        status: 'pending',
        created_at: new Date().toISOString(),
      };
    });
    
    // Добавляем новые рекомендации в массив
    userRecommendations.push(...newUserRecommendations);
    
    return createMockResponse(newUserRecommendations);
  },
};

export default recommendationMockService; 