'use client';

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import EnhancedRecommendations from '../components/recommendations/EnhancedRecommendations';
import RecommendationsStats from '../components/recommendations/RecommendationsStats';
import RecommendationInfo from '../components/recommendations/RecommendationInfo';

export default function RecommendationsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Рекомендации</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EnhancedRecommendations />
          </div>
          
          <div>
            <RecommendationsStats />
            <RecommendationInfo />
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 