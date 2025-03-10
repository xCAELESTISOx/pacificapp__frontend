/**
 * API Endpoints
 * 
 * Constants for all API endpoints used in the application.
 * This makes it easy to maintain and update API paths in one place.
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/token/',
    REFRESH: '/auth/token/refresh/',
    REGISTER: '/users/',
    CURRENT_USER: '/users/me/',
    PASSWORD_RESET: '/auth/password/reset/',
    PASSWORD_RESET_CONFIRM: '/auth/password/reset/confirm/',
  },
  USERS: {
    LIST: '/users/',
    PROFILE: '/users/me/',
  },
  STRESS: {
    LIST: '/stress/',
    STATISTICS: '/stress/statistics/',
  },
  SLEEP: {
    LIST: '/sleep-data/',
    STATISTICS: '/sleep-data/statistics/',
  },
  WORK: {
    LIST: '/work-activity/',
    STATISTICS: '/work-activity/statistics/',
  },
  DASHBOARD: {
    SUMMARY: '/dashboard/summary/',
    DAILY_STATS: '/dashboard/daily-stats/',
    WEEKLY_REPORT: '/dashboard/weekly-report/',
    TRENDS: '/dashboard/trends/',
    KPI: '/dashboard/kpi/',
  },
  RECOMMENDATIONS: {
    LIST: '/recommendations/',
    CATEGORIES: '/recommendations/categories/',
  },
};

export default API_ENDPOINTS; 