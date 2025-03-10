'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import sleepService from '@/app/services/sleep';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const SleepEntry: React.FC = () => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [duration, setDuration] = useState(7.5);
  const [quality, setQuality] = useState(7);
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const queryClient = useQueryClient();

  // Мутация для добавления записи о сне
  const mutation = useMutation({
    mutationFn: (sleepData: { date: string; duration_hours: number; quality: number; notes?: string }) => 
      sleepService.addSleepRecord(sleepData),
    onSuccess: () => {
      // После успешного добавления, инвалидируем кэш запросов
      queryClient.invalidateQueries({ queryKey: ['sleepRecords'] });
      queryClient.invalidateQueries({ queryKey: ['sleepStatistics'] });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Сбрасываем форму
      setDate(format(new Date(), 'yyyy-MM-dd'));
      setDuration(7.5);
      setQuality(7);
      setNotes('');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Отправка данных через сервис
    mutation.mutate({
      date,
      duration_hours: duration,
      quality,
      notes: notes.trim() || undefined
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold mb-4">Добавить запись о сне</h2>
      
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
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Продолжительность сна: <span className="font-bold">{duration} часов</span>
          </label>
          <input
            type="range"
            id="duration"
            min="0"
            max="12"
            step="0.5"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0ч</span>
            <span>12ч</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">
            Качество сна: <span className="font-bold">{quality}/10</span>
          </label>
          <input
            type="range"
            id="quality"
            min="1"
            max="10"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Плохо (1)</span>
            <span>Отлично (10)</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Заметки
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            mutation.isPending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {mutation.isPending ? 'Отправка...' : 'Сохранить'}
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

export default SleepEntry; 