'use client';

import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useQuery } from '@tanstack/react-query';

// Интерфейс для данных профиля пользователя
interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  occupation: string;
  workHoursPerDay: number;
  sleepHoursPerDay: number;
  avatar?: string;
  phone?: string;
  address?: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacySettings: {
    shareAnonymousData: boolean;
    allowRecommendations: boolean;
  };
}

const defaultUserProfile: UserProfile = {
  id: '1',
  email: 'user@example.com',
  name: 'Иван Иванов',
  age: 32,
  gender: 'Мужской',
  occupation: 'Разработчик ПО',
  workHoursPerDay: 8,
  sleepHoursPerDay: 6.5,
  avatar: 'https://i.pravatar.cc/150?img=3',
  phone: '+7 (999) 123-45-67',
  address: 'г. Москва, ул. Примерная, д. 42',
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  privacySettings: {
    shareAnonymousData: true,
    allowRecommendations: true,
  },
};

// Компонент для отображения и редактирования профиля
const ProfileEditor: React.FC<{ initialProfile: UserProfile }> = ({ initialProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Функция для обновления простых полей профиля
  const updateField = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Функция для обновления вложенных полей профиля
  const updateNestedField = (parentField: 'notifications' | 'privacySettings', field: string, value: boolean) => {
    setProfile((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value,
      },
    }));
  };

  // Обработчик сохранения формы
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Здесь был бы запрос к API для сохранения данных профиля
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация запроса
      setSuccessMessage('Профиль успешно обновлен');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Ошибка при сохранении профиля', error);
    } finally {
      setIsLoading(false);
      setIsEditing(null);
    }
  };

  // Обработчик загрузки аватара
  const handleAvatarUpload = () => {
    setUploadingAvatar(true);
    // Имитация загрузки файла
    setTimeout(() => {
      // Случайный выбор аватара из доступных на pravatar.cc
      const randomAvatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
      updateField('avatar', randomAvatar);
      setUploadingAvatar(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Заголовок и верхняя часть профиля */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute bottom-0 left-0 w-full p-6 pb-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Аватар */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white">
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>
              <button
                onClick={handleAvatarUpload}
                disabled={uploadingAvatar}
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                {uploadingAvatar ? (
                  <svg className="w-5 h-5 text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Информация о пользователе */}
            <div className="pb-4">
              <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
              <p className="text-blue-100">{profile.occupation}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Основная информация профиля */}
      <div className="p-6">
        {successMessage && (
          <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-md flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Личная информация */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Личная информация</h2>
            <div className="space-y-4">
              {/* Имя */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Имя
                </label>
                {isEditing === 'name' ? (
                  <div className="flex">
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                    />
                    <button
                      onClick={() => setIsEditing(null)}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    >
                      {isLoading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">{profile.name}</span>
                    <button
                      onClick={() => setIsEditing('name')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Изменить
                    </button>
                  </div>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing === 'email' ? (
                  <div className="flex">
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                    />
                    <button
                      onClick={() => setIsEditing(null)}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    >
                      {isLoading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">{profile.email}</span>
                    <button
                      onClick={() => setIsEditing('email')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Изменить
                    </button>
                  </div>
                )}
              </div>
              
              {/* Телефон */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                {isEditing === 'phone' ? (
                  <div className="flex">
                    <input
                      type="tel"
                      value={profile.phone || ''}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                    />
                    <button
                      onClick={() => setIsEditing(null)}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    >
                      {isLoading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">{profile.phone || 'Не указан'}</span>
                    <button
                      onClick={() => setIsEditing('phone')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {profile.phone ? 'Изменить' : 'Добавить'}
                    </button>
                  </div>
                )}
              </div>
              
              {/* Адрес */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Адрес
                </label>
                {isEditing === 'address' ? (
                  <div className="flex">
                    <input
                      type="text"
                      value={profile.address || ''}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                    />
                    <button
                      onClick={() => setIsEditing(null)}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    >
                      {isLoading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">{profile.address || 'Не указан'}</span>
                    <button
                      onClick={() => setIsEditing('address')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {profile.address ? 'Изменить' : 'Добавить'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Настройки приложения */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Настройки</h2>
            
            {/* Раздел уведомлений */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Уведомления</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email-уведомления</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={profile.notifications.email}
                      onChange={(e) => updateNestedField('notifications', 'email', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Push-уведомления</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={profile.notifications.push}
                      onChange={(e) => updateNestedField('notifications', 'push', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">SMS-уведомления</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={profile.notifications.sms}
                      onChange={(e) => updateNestedField('notifications', 'sms', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Раздел приватности */}
            <div>
              <h3 className="text-md font-medium mb-2">Приватность</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Делиться анонимными данными для улучшения сервиса</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={profile.privacySettings.shareAnonymousData}
                      onChange={(e) => updateNestedField('privacySettings', 'shareAnonymousData', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Получать персонализированные рекомендации</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={profile.privacySettings.allowRecommendations}
                      onChange={(e) => updateNestedField('privacySettings', 'allowRecommendations', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Сохранение настроек */}
            <button 
              onClick={handleSave}
              disabled={isLoading}
              className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? 'Сохранение...' : 'Сохранить настройки'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Раздел для удаления аккаунта */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Опасная зона</h2>
        <p className="text-gray-600 mb-4">После удаления вашего аккаунта, все ваши данные будут безвозвратно удалены из нашей системы.</p>
        <button 
          onClick={() => window.confirm('Вы уверены, что хотите удалить свой аккаунт? Это действие невозможно отменить.')}
          className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
        >
          Удалить аккаунт
        </button>
      </div>
    </div>
  );
};

// Компонент с информацией об активности аккаунта
const AccountActivity: React.FC = () => {
  const activities = [
    { id: 1, date: '12.05.2023', action: 'Вход в систему', deviceInfo: 'Chrome на MacOS' },
    { id: 2, date: '10.05.2023', action: 'Изменение пароля', deviceInfo: 'Chrome на MacOS' },
    { id: 3, date: '05.05.2023', action: 'Вход в систему', deviceInfo: 'Safari на iOS' },
    { id: 4, date: '01.05.2023', action: 'Обновление профиля', deviceInfo: 'Chrome на MacOS' },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Активность аккаунта</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действие
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Устройство
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.action}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.deviceInfo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  // В реальном приложении здесь был бы запрос к API для получения данных пользователя
  const { data: profile, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      // Имитация запроса к API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return defaultUserProfile;
    },
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Профиль пользователя</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <ProfileEditor initialProfile={profile!} />
          
          <AccountActivity />
        </div>
      </div>
    </MainLayout>
  );
} 