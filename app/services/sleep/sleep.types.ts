import { 
  SleepRecord, 
  SleepStatistics, 
  SleepStatisticsParams,
  PaginatedResponse 
} from '@/app/types';

export type { 
  SleepRecord, 
  SleepStatistics, 
  SleepStatisticsParams,
  PaginatedResponse 
};

export type GetSleepRecordsParams = { 
  page?: number; 
  page_size?: number 
}; 