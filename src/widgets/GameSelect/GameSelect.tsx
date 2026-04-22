import { MenuItem, Select, SxProps } from '@mui/material';
import { useGetAllGameQuery } from '@/entities/games/model/api/game.api';
import { Game } from '@/entities/games/model/types/games.types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme } from '@emotion/react';

interface GameSelectProps {
  value?: number | null;
  onChange?: (value: number) => void;
  disabled?: boolean;
  isChangeParams?: boolean;
  sx?: SxProps<Theme>;
}

export const GameSelect = ({
  value,
  onChange,
  disabled,
  isChangeParams,
  sx = {},
}: GameSelectProps) => {
  const { data: gamesData, isLoading } = useGetAllGameQuery({
    limit: 1000,
    page: 1,
  });
  const games = gamesData?.data ?? [];

  const navigate = useNavigate();
  const [internalValue, setInternalValue] = useState<number | ''>('');

  useEffect(() => {
    if (value) {
      setInternalValue(value);
    }
  }, [value]);

  const selectedValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: number) => {
    setInternalValue(newValue);
    onChange?.(newValue);

    if (isChangeParams) {
      navigate(`?gameId=${newValue}`, { replace: true });
    }
  };

  return (
    <Select
      value={selectedValue}
      onChange={(e) => handleChange(Number(e.target.value))}
      disabled={disabled || isLoading}
      fullWidth
      displayEmpty
      sx={{ py: 1, px: 2, ...sx }}
    >
      <MenuItem value="">
        <em>Выберите мероприятие</em>
      </MenuItem>
      {games.map((game: Game) => (
        <MenuItem key={game.id} value={game.id}>
          {game.name ?? `Мероприятие №${game.id}`}
        </MenuItem>
      ))}
    </Select>
  );
};
