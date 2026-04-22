import { Dayjs } from 'dayjs';

export type GameStatus = 'ACTIVE' | 'FINISHED';
export type GameCategory =
  | 'sport'
  | 'study'
  | 'creative'
  | 'volunteer'
  | 'other';

export interface Game {
  id: number;
  name: string;
  category: GameCategory;
  description?: string | null;
  countWinner?: number;
  date_start: Date;
  date_finish: Date;
  created_at?: Date;
  updated_at?: Date;
  is_archive?: boolean;
  prizes: PrizeRange[];
  status: GameStatus;
}

export interface GameCreateResponse extends Omit<Game, 'id'> {}

export interface GameState {
  games: Game[] | null;
}

export interface GameCreateFormData {
  name: string;
  category: GameCategory | '';
  description: string;
  prizes: PrizeRange[];
  countWinner: number;
  date_start: Dayjs | null;
  date_finish: Dayjs | null;
  status?: GameStatus;
}

export interface GameCreateFormErrors {
  name: string;
  category: string;
  description: string;
  prize: string;
  countWinner: string;
  date_start: string;
  date_finish: string;
}

export interface PrizeRange {
  from: number;
  to: number;
  amount: number;
}
