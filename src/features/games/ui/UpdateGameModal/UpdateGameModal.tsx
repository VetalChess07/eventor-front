import { Modal, Typography, Button, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Game } from '@/entities/games';
import { useUpdateGameMutation } from '@/entities/games/model/api/game.api';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import { Input } from '@/shared/ui/Input/Input';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { Select } from '@/shared/ui/Select/Select';
import { PrizeDistribution } from '../PrizeDistribution/PrizeDistribution';
import {
  GameCreateFormData,
  GameCreateFormErrors,
  PrizeRange,
} from '@/entities/games/model/types/games.types';
import { gameCategoryOptions } from '@/entities/games/model/conts/categories';

import dayjs, { Dayjs } from 'dayjs';
import { validateFormCreateGame } from '../../model/lib/validateFormCreateGame';

interface UpdateGameModalProps {
  open: boolean;
  onClose: () => void;
  game: Game | null;
  refetch: () => void;
}

export const UpdateGameModal = ({
  open,
  onClose,
  game,
  refetch,
}: UpdateGameModalProps) => {
  const [form, setForm] = useState<GameCreateFormData>({
    name: '',
    category: '',
    description: '',
    countWinner: 0,
    date_start: null as Dayjs | null,
    date_finish: null as Dayjs | null,
    prizes: [] as PrizeRange[],
  });

  const [errors, setErrors] = useState<GameCreateFormErrors>({
    name: '',
    category: '',
    description: '',
    countWinner: '',
    prize: '',
    date_start: '',
    date_finish: '',
  });

  useEffect(() => {
    if (game) {
      setForm({
        name: game.name ?? '',
        category: game.category ?? 'other',
        description: game.description ?? '',
        countWinner: game.countWinner ?? 0,
        date_start: game.date_start ? dayjs(game.date_start) : null,
        date_finish: game.date_finish ? dayjs(game.date_finish) : null,
        prizes: game.prizes ?? [],
      });
    }
  }, [game]);

  const [updateGame, { isLoading }] = useUpdateGameMutation();
  const { showSnackbar } = useSnackbar();

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    const { isValid, errors: newErrors } = validateFormCreateGame(form);
    setErrors(newErrors);

    if (!isValid) {
      showSnackbar('Проверьте ошибки в форме', 'error');
      return;
    }

    if (!game) return;

    try {
      await updateGame({
        id: game.id,
        ...form,
        countWinner: Number(form.countWinner),
      }).unwrap();

      showSnackbar('Мероприятие обновлено', 'success');
      refetch();
      onClose();
    } catch (err: any) {
      showSnackbar(err?.data?.error ?? 'Ошибка при обновлении', 'error');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#1E1E2A',
          borderRadius: 2,
          p: 4,
          gap: '24px',
          overflowY: 'scroll',
          height: 'auto',
          maxHeight: '95dvh',
          maxWidth: '700px',
          width: '100%',
          '@media (max-width: 780px)': { width: '98dvw', p: 2 },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6">Обновить мероприятие</Typography>

        <Stack spacing={2}>
          <Input
            label="Название"
            placeholder="Введите название мероприятия"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
          <Input
            label="Описание"
            placeholder="Введите описание мероприятия"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
          />

          <Select
            label="Категория"
            value={form.category}
            options={gameCategoryOptions}
            fullWidth
            onChange={(e) => handleChange('category', e.target.value)}
          />
          {errors.category && (
            <Typography color="error">{errors.category}</Typography>
          )}

          <Input
            type="number"
            label="Количество позиций в шкале"
            value={form.countWinner}
            onChange={(e) =>
              handleChange('countWinner', Number(e.target.value))
            }
            fullWidth
            error={!!errors.countWinner}
            helperText={errors.countWinner}
          />

          <PrizeDistribution
            error={errors.prize}
            countWinner={form.countWinner}
            value={form.prizes}
            onChange={(ranges) => handleChange('prizes', ranges)}
            handleChange={handleChange}
          />

          <DatePicker
            label="Дата начала"
            value={form.date_start}
            onChange={(value) => handleChange('date_start', value)}
          />
          {errors.date_start && (
            <Typography color="error">{errors.date_start}</Typography>
          )}

          <DatePicker
            label="Дата окончания"
            value={form.date_finish}
            onChange={(value) => handleChange('date_finish', value)}
          />
          {errors.date_finish && (
            <Typography color="error">{errors.date_finish}</Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" disabled={isLoading} onClick={handleClose}>
            Закрыть
          </Button>
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Обновить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
