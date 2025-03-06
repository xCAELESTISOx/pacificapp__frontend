import { LoginCredentials, RegisterData, AuthResponse, SuccessResponse } from '@/app/types';

export type { LoginCredentials, RegisterData, AuthResponse, SuccessResponse };

export type UserData = {
  id: number;
  email: string;
  username: string;
};

export type RegisterResponse = SuccessResponse & { 
  user?: UserData 
}; 