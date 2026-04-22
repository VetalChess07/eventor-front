import type { UserStatus } from '@/entities/user/model/types/user';
import type { GameCategory } from '@/entities/games/model/types/games.types';
export type ResultStatus = 'ACTIVE' | 'FINISHED';
export interface Result {
  id: number;
  game_id: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
  status: ResultStatus;
  date_finished: string;
}
export interface ResultUsers {
  id: number;
  game_id: number;
  user_id: number;
  user: {
    id: number;
    name: string | null;
    group: string | null;
    tgName: string | null;
    phone_number: string | null;
    status: UserStatus;
  };
  points: number;
}
export interface PrizeRange {
  from: number;
  to: number;
  amount: number;
}

export interface SuccessSummaryItem {
  user: {
    id: number;
    name: string | null;
    group: string | null;
    tgName: string | null;
    phone_number: string | null;
    status: UserStatus;
  };
  eventsCount: number;
  totalPoints: number;
  averagePoints: number;
}

export interface CategorySummaryItem {
  category: GameCategory;
  eventsCount: number;
  usersCount: number;
  totalPoints: number;
  averagePoints: number;
  users: SuccessSummaryItem[];
}
