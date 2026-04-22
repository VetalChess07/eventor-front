import type { GameCategory } from '../types/games.types';

export const gameCategoryLabels: Record<GameCategory, string> = {
  sport: 'Спорт',
  study: 'Учеба',
  creative: 'Творчество',
  volunteer: 'Волонтерство',
  other: 'Прочее',
};

export const gameCategoryOptions = Object.entries(gameCategoryLabels).map(
  ([value, label]) => ({
    value,
    label,
  }),
);
