import { 
  DashboardSummary,
  DashboardParams,
  ChartData,
  StatisticsParams
} from '@/app/types';

export type { 
  DashboardSummary,
  DashboardParams,
  ChartData,
  StatisticsParams
};

/**
 * Интерфейс статистики риска выгорания
 */
export interface BurnoutRiskStats {
  statistics: Array<{
    date: string;
    risk_level: number;
  }>;
  avg_risk: number;
} 