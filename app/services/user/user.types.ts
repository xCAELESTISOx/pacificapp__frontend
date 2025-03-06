import { 
  UserProfile, 
  UserActivity, 
  PaginatedResponse, 
  SuccessResponse, 
  UserNotificationSettings, 
  UserPrivacySettings 
} from '@/app/types';

export type { 
  UserProfile, 
  UserActivity, 
  PaginatedResponse, 
  SuccessResponse, 
  UserNotificationSettings, 
  UserPrivacySettings 
};

export type GetUserActivityParams = { 
  page?: number; 
  page_size?: number 
};

export type ChangePasswordData = { 
  current_password: string; 
  new_password: string 
};

export type AvatarResponse = { 
  avatar_url: string 
}; 