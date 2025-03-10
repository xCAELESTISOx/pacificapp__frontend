'use client';

import React from 'react';

interface SleepTip {
  id: number;
  title: string;
  description: string;
}

const SleepTips: React.FC = () => {
  const tips: SleepTip[] = [
    {
      id: 1,
      title: 'Соблюдайте режим',
      description: 'Ложитесь спать и вставайте в одно и то же время каждый день, даже в выходные.',
    },
    {
      id: 2,
      title: 'Создайте комфортную обстановку',
      description: 'Ваша спальня должна быть тихой, темной и прохладной. Рекомендуемая температура 18-20°C.',
    },
    {
      id: 3,
      title: 'Избегайте кофеина и алкоголя',
      description: 'Не употребляйте кофеин после обеда и ограничьте потребление алкоголя вечером.',
    },
    {
      id: 4,
      title: 'Отключите электронные устройства',
      description: 'За час до сна отложите телефон, планшет и другие устройства с синим светом.',
    },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Советы для здорового сна</h2>
      
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

export default SleepTips; 