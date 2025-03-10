'use client';

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import Card from '../ui/Card';
import { StressStatistics } from '@/app/types';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StressDataPoint {
  date: string;
  level: number;
}

interface StressChartProps {
  statistics: StressStatistics;
}

const StressChart: React.FC<StressChartProps> = ({ statistics }) => {
  const data = useMemo(() => statistics.statistics.map((item) => ({
    date: item.date,
    level: item.avg_level
  })), [statistics]);
  
  // Сортируем данные по дате
  const sortedData = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Подготавливаем данные для графика
  const chartData = {
    labels: sortedData.map(point => 
      format(parseISO(point.date), 'd MMM', { locale: ru })
    ),
    datasets: [
      {
        label: 'Уровень стресса',
        data: sortedData.map(point => point.level),
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: 'rgb(234, 88, 12)',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Настройки графика
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          title: (items: any) => {
            if (!items.length) return '';
            const index = items[0].dataIndex;
            return format(parseISO(sortedData[index].date), 'd MMMM yyyy', { locale: ru });
          },
          label: (context: any) => {
            return `Уровень стресса: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };


  // Определяем статус на основе среднего уровня стресса
  const getStressStatus = () => {
    if (statistics.avg_level < 30) return { text: 'Низкий', color: 'text-green-600' };
    if (statistics.avg_level < 60) return { text: 'Средний', color: 'text-yellow-600' };
    return { text: 'Высокий', color: 'text-red-600' };
  };

  const stressStatus = getStressStatus();

  return (
    <Card>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1 dark:text-gray-100">Динамика уровня стресса</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">За последние 7 дней</p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-600">Средний уровень стресса</div>
          <div className={`text-xl font-bold ${stressStatus.color}`}>
            {statistics.avg_level}% - {stressStatus.text}
          </div>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Недостаточно данных для отображения графика
        </div>
      ) : (
        <div className="w-full h-64">
          <Line data={chartData} options={options as any} />
        </div>
      )}
    </Card>
  );
};

export default StressChart; 