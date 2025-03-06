import { PaginatedResponse, WorkActivity } from "@/app/types";

export type GetWorkActivitiesParams = {
  page?: number;
  page_size?: number;
};
export type GetWorkActivitiesResponse = PaginatedResponse<WorkActivity>;

export type GetWorkStatisticsParams = {
    start_date: string;
    end_date: string;
  } 
