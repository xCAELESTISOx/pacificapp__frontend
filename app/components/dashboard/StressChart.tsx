'use client';

import React from 'react';
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
  data: StressDataPoint[];
}

const StressChart: React.FC<StressChartProps> = ({ data = [] }) => {
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

  // Вычисляем средний уровень стресса
  const averageStress = data.length
    ? Math.round(data.reduce((acc, curr) => acc + curr.level, 0) / data.length)
    : 0;

  // Определяем статус на основе среднего уровня стресса
  const getStressStatus = () => {
    if (averageStress < 30) return { text: 'Низкий', color: 'text-green-600' };
    if (averageStress < 60) return { text: 'Средний', color: 'text-yellow-600' };
    return { text: 'Высокий', color: 'text-red-600' };
  };

  const stressStatus = getStressStatus();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Динамика уровня стресса</h2>
          <p className="text-sm text-gray-600">За последние 7 дней</p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-600">Средний уровень стресса</div>
          <div className={`text-xl font-bold ${stressStatus.color}`}>
            {averageStress}% - {stressStatus.text}
          </div>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Недостаточно данных для отображения графика
        </div>
      ) : (
        <div className="h-64">
          <Line data={chartData} options={options as any} />
        </div>
      )}
    </div>
  );
};

export default StressChart; 