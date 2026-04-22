import { useState } from 'react';
import { Stack, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Input } from '@/shared/ui/Input/Input';
import { PrizeDistributionPreview } from './PrizeDistributionPreview';

import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { PrizeRange } from '@/entities/games/model/types/games.types';

interface PrizeDistributionProps {
  value: PrizeRange[];
  countWinner: number;
  onChange: (ranges: PrizeRange[]) => void;
  handleChange: (field: string, value: any) => void;
  error?: string;
}

export const PrizeDistribution = ({
  value,
  countWinner,
  onChange,
  handleChange,
  error,
}: PrizeDistributionProps) => {
  const [defaultPrize, setDefaultPrize] = useState<number>(100);
  const [errorState, setErrorState] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);

  const isSequential = (ranges: PrizeRange[]) => {
    const sorted = [...ranges].sort((a, b) => a.from - b.from);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].from !== sorted[i - 1].to + 1) return false;
    }
    return true;
  };

  const updateRange = (index: number, updatedRange: PrizeRange) => {
    const updated = [...value];
    updated[index] = updatedRange;

    if (!isSequential(updated)) {
      setErrorState(
        'Каждый следующий диапазон должен начинаться после предыдущего',
      );
      return;
    }

    setErrorState('');
    onChange(updated);
  };

  const handleRangeChange = (
    index: number,
    field: keyof PrizeRange,
    val: string,
  ) => {
    const current = value[index];
    let newValue = Number(val) || 0;

    if (field === 'from' || field === 'to') {
      if (newValue < 1) newValue = 1;
      if (newValue > countWinner) newValue = countWinner;
    }

    if (field === 'amount' && newValue < 0) newValue = 0;

    // eslint-disable-next-line prefer-const
    let updatedRange: PrizeRange = { ...current, [field]: newValue };

    if (field === 'from' && newValue > current.to) {
      updatedRange.to = newValue;
    } else if (field === 'to' && newValue < current.from) {
      updatedRange.from = newValue;
    }

    updateRange(index, updatedRange);
  };

  const handleAddRange = () => {
    if (value.length === 0) {
      onChange([{ from: 1, to: 1, amount: 0 }]);
      return;
    }

    const last = value[value.length - 1];
    const newFrom = last.to + 1;

    if (newFrom > countWinner) {
      setErrorState('Нельзя добавить диапазон — превышено число позиций');
      return;
    }

    const newTo = Math.min(newFrom, countWinner);
    const newRange = { from: newFrom, to: newTo, amount: 0 };
    const updated = [...value, newRange];

    if (!isSequential(updated)) {
      setErrorState(
        'Каждый следующий диапазон должен начинаться после предыдущего',
      );
      return;
    }

    setErrorState('');
    onChange(updated);
  };

  const handleRemoveRange = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    setErrorState('');
    onChange(updated);
  };

  const generateDistribution = () => {
    const result: string[] = [];
    const sorted = [...value].sort((a, b) => a.from - b.from);

    let lastTo = 0;
    const updatedValue: PrizeRange[] = [...sorted];

    sorted.forEach((r) => {
      if (r.from > lastTo + 1) {
        // заполняем пропуски defaultPrize
        result.push(`${lastTo + 1} - ${r.from - 1}: ${defaultPrize}`);
        updatedValue.push({
          from: lastTo + 1,
          to: r.from - 1,
          amount: defaultPrize,
        });
      }

      if (r.from === r.to) {
        result.push(`${r.from} - ${r.amount}`);
      } else {
        result.push(`${r.from} - ${r.to}: ${r.amount}`);
      }

      lastTo = r.to;
    });

    if (lastTo < countWinner) {
      result.push(`${lastTo + 1} - ${countWinner}: ${defaultPrize}`);
      updatedValue.push({
        from: lastTo + 1,
        to: countWinner,
        amount: defaultPrize,
      });
    }

    updatedValue.sort((a, b) => a.from - b.from);

    setOutput(result);
    onChange(updatedValue);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Доступные очки мероприятия</Typography>

      <Input
        type="number"
        label="Количество позиций в шкале"
        placeholder="Введите количество позиций"
        value={countWinner}
        onChange={(e) => handleChange('countWinner', e.target.value)}
        fullWidth
      />

      <Input
        type="number"
        label="Базовое значение очков"
        value={defaultPrize}
        onChange={(e) => setDefaultPrize(Number(e.target.value))}
      />

      <Stack spacing={1}>
        {value.map((range, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ width: '100%', justifyContent: 'center' }}
          >
            <Input
              type="number"
              label="С места"
              value={range.from}
              inputProps={{ min: 1, max: countWinner }}
              onChange={(e) => handleRangeChange(index, 'from', e.target.value)}
            />

            <Input
              type="number"
              label="По место"
              value={range.to}
              inputProps={{ min: 1, max: countWinner }}
              onChange={(e) => handleRangeChange(index, 'to', e.target.value)}
            />

            <Input
              type="number"
              label="Очки"
              value={range.amount}
              onChange={(e) =>
                handleRangeChange(index, 'amount', e.target.value)
              }
            />

            <IconButton color="error" onClick={() => handleRemoveRange(index)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>

      {errorState && <ErrorAlert message={errorState} />}
      {error && <ErrorAlert message={error} />}

      <Stack sx={{ flexWrap: 'wrap', gap: '16px' }} direction="row">
        <Button
          variant="outlined"
          onClick={handleAddRange}
          disabled={countWinner <= 0}
        >
          Добавить диапазон
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={generateDistribution}
          disabled={countWinner <= 0}
        >
          Показать и сохранить шкалу
        </Button>
      </Stack>

      <PrizeDistributionPreview output={output} />
    </Stack>
  );
};
