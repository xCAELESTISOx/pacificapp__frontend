"use client";

import React, { useMemo } from "react";
import MainLayout from "../components/layout/MainLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import BurnoutRiskCard from "../components/dashboard/BurnoutRiskCard";
import StressChart from "../components/dashboard/StressChart";
import SleepSummary from "../components/dashboard/SleepSummary";
import WorkSummary from "../components/dashboard/WorkSummary";
import RecommendationsList from "../components/dashboard/RecommendationsList";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services";
import { DashboardSummary, Trend } from "@/app/types";
import Link from "next/link";

// Define types to match the RecommendationsList component
type RecommendationCategory = "work" | "stress" | "sleep" | "activity";
type RecommendationPriority = "high" | "medium" | "low";

interface Recommendation {
  id: string;
  category: RecommendationCategory;
  title: string;
  description: string;
  priority: RecommendationPriority;
}

// Mock data for development
const mockSleepData = [
  { date: "2023-05-01", duration: 7.5, quality: 8 },
  { date: "2023-05-02", duration: 6.2, quality: 6 },
  { date: "2023-05-03", duration: 8.0, quality: 9 },
  { date: "2023-05-04", duration: 7.0, quality: 7 },
  { date: "2023-05-05", duration: 6.5, quality: 5 },
];

const mockWorkData = [
  { date: "2023-05-01", hoursWorked: 8, tasksCompleted: 5, overworkHours: 0 },
  { date: "2023-05-02", hoursWorked: 9, tasksCompleted: 7, overworkHours: 1 },
  { date: "2023-05-03", hoursWorked: 7, tasksCompleted: 4, overworkHours: 0 },
  { date: "2023-05-04", hoursWorked: 10, tasksCompleted: 8, overworkHours: 2 },
  { date: "2023-05-05", hoursWorked: 8, tasksCompleted: 6, overworkHours: 0 },
];

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    category: "work",
    title: "Делайте регулярные перерывы",
    description:
      "Старайтесь делать 5-минутный перерыв каждый час работы. Это поможет снизить утомляемость и повысить продуктивность.",
    priority: "high",
  },
  {
    id: "2",
    category: "sleep",
    title: "Улучшите качество сна",
    description:
      "Постарайтесь ложиться спать и вставать в одно и то же время каждый день, даже в выходные.",
    priority: "medium",
  },
  {
    id: "3",
    category: "stress",
    title: "Практикуйте медитацию",
    description:
      "Уделяйте 10 минут в день медитации или дыхательным упражнениям для снижения уровня стресса.",
    priority: "medium",
  },
  {
    id: "4",
    category: "activity",
    title: "Увеличьте физическую активность",
    description:
      "Старайтесь ходить не менее 30 минут в день или заниматься другими физическими упражнениями.",
    priority: "low",
  },
];

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: () => dashboardService.getDashboardSummary(),
  });

  // Извлекаем необходимые данные для компонентов или используем значения по умолчанию
  const sleepData = data?.sleep
    ? [
        {
          date: new Date().toISOString().split("T")[0], // Сегодняшняя дата
          duration: data.sleep.average_duration,
          quality: data.sleep.average_quality || 0,
        },
      ]
    : mockSleepData;

  const workData = useMemo(() => {
    if (!data) return [];

    return [
      {
        date: new Date().toISOString().split("T")[0], // Сегодняшняя дата
        hoursWorked: data.work.average_duration,
        tasksCompleted: Math.round((data.work.average_productivity || 0) * 10), // Преобразуем продуктивность в задачи для примера
        overworkHours: Math.max(0, data.work.average_duration - 8), // Считаем переработку как часы сверх 8
      },
    ];
  }, []);

  // Преобразуем рекомендации из API в нужный формат
  const recommendations = data?.recommendations?.latest
    ? data.recommendations.latest.map(
        (
          rec: { id: number; title: string; category: string; status: string },
          index: number
        ) => {
          // Массивы категорий и приоритетов для типизированного распределения
          const categories: RecommendationCategory[] = [
            "work",
            "stress",
            "sleep",
            "activity",
          ];
          const priorities: RecommendationPriority[] = [
            "high",
            "medium",
            "low",
          ];

          // Находим правильную категорию или используем первую по умолчанию
          let category: RecommendationCategory = "work";
          if (categories.includes(rec.category as RecommendationCategory)) {
            category = rec.category as RecommendationCategory;
          }

          return {
            id: rec.id.toString(),
            category: category,
            title: rec.title,
            description: `Рекомендация. Статус: ${rec.status}`,
            priority: priorities[index % priorities.length],
          };
        }
      )
    : mockRecommendations;

  // Статистика для компонента BurnoutRiskCard
  // Так как в DashboardSummary нет данных о риске выгорания, используем моковые данные
  const burnoutRisk = useMemo(() => {
    if (!data?.burnout_risk) return null;

    return {
      current: data.burnout_risk?.current || 0,
      previous: data.burnout_risk?.previous || 0,
      trend: data.burnout_risk?.trend || ("stable" as Trend),
    };
  }, [data]);
  // Данные для графика стресса
  // Создаем упрощенный массив данных на основе среднего уровня стресса
  const stressLevels = data?.stress
    ? [
        {
          date: new Date().toISOString().split("T")[0],
          level: data.stress.average_level,
        },
      ]
    : [];

  console.log(data);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
            <p className="mt-2 text-gray-600">Загрузка данных дашборда...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md my-6">
            Ошибка при загрузке данных. Пожалуйста, попробуйте позже.
          </div>
        ) : null}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              {burnoutRisk ? (
                <BurnoutRiskCard
                  currentRisk={burnoutRisk.current}
                  previousRisk={burnoutRisk.previous}
                  trend={burnoutRisk.trend}
                />
              ) : (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4">Риск выгорания</h3>
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-gray-600 mb-3">
                      Отсутствуют данные для анализа риска выгорания.
                    </p>
                    <p className="text-gray-700">
                      Пожалуйста, заполните информацию о своей{" "}
                      <Link
                        href="/work"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        работе
                      </Link>
                      ,{" "}
                      <Link
                        href="/sleep"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        сне
                      </Link>{" "}
                      и{" "}
                      <Link
                        href="/stress"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        стрессе
                      </Link>{" "}
                      на соответствующих страницах, чтобы получить оценку риска
                      выгорания.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <StressChart data={stressLevels} />
            </div>

            <div>
              <SleepSummary data={sleepData} />
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <WorkSummary data={workData} />
            </div>

            <div className="lg:col-span-2">
              <RecommendationsList recommendations={recommendations} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
