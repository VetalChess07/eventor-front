import { Game } from '@/entities/games';

export type UserStatus = 'BAN' | 'ACTIVE';

export interface User {
  id: number;
  login?: string | null;
  name?: string | null;
  group?: string | null;
  tgName?: string | null;
  phone_number?: string | null;
  status: UserStatus;
  created_at?: Date;
  updated_at?: Date;
  games?: (Game & { points?: number })[];
  is2FA?: boolean;
  twoFASecret?: string;
  twoFAQr?: string;
  tokenVersion?: number;
}

export interface UserCreate {
  name?: string | null;
  group?: string | null;
  tgName?: string | null;
  phone_number?: string | null;
}

export interface UserByGameID extends User {
  gameId: number;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}
