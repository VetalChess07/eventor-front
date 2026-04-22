import { GameStatus } from '../types/games.types';

export const statusKeys: Record<GameStatus, string> = {
  ACTIVE: 'активный',
  FINISHED: 'завершеный',
};
