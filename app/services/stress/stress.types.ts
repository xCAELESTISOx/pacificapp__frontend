import { 
  StressLevel, 
  StressStatistics, 
  StressStatisticsParams,
  PaginatedResponse 
} from '@/app/types';

export type { 
  StressLevel, 
  StressStatistics, 
  StressStatisticsParams,
  PaginatedResponse 
};

export type GetStressLevelsParams = { 
  page?: number; 
  page_size?: number 
}; 