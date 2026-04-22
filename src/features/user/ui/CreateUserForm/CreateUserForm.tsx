import { Stack, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import { useCreateUserMutation } from '@/entities/user/model/api/user.api';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import PhoneInput from '@/shared/ui/InputPhone/PhoneInput';
import { GameSelect } from '@/widgets/GameSelect/GameSelect';

interface CreateUserFormProps {
  refetch: () => void;
}

export const CreateUserForm = ({ refetch }: CreateUserFormProps) => {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [tgName, setTgName] = useState('');
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [errors, setErrors] = useState({
    phone: '',
    tgName: '',
    points: '',
  });

  const [createUser, { isLoading }] = useCreateUserMutation();
  const { showSnackbar } = useSnackbar();

  const resetForm = () => {
    setName('');
    setGroup('');
    setPhone('');
    setTgName('');

    setPoints(0);
    setErrors({ phone: '', tgName: '', points: '' });
  };

  const validateForm = () => {
    const newErrors = { phone: '', tgName: '', points: '' };
    let isValid = true;

    if (!phone.trim() && !tgName.trim()) {
      newErrors.phone = 'Укажите номер телефона или Telegram ник';
      newErrors.tgName = 'Укажите номер телефона или Telegram ник';
      isValid = false;
    }

    if (phone.trim() && phone.replace(/[^\d]/g, '').length < 11) {
      newErrors.phone = 'Номер телефона должен содержать не менее 11 цифр';
      isValid = false;
    }

    if (tgName.trim() && !/^[a-zA-Z0-9_]+$/.test(tgName)) {
      newErrors.tgName =
        'Telegram ник должен содержать только латинские буквы, цифры и нижнее подчеркивание';
      isValid = false;
    }

    if (points < 0 || !Number.isInteger(Number(points))) {
      newErrors.points = 'Очки должны быть целым неотрицательным числом';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showSnackbar('Проверьте ошибки в форме', 'error');
      return;
    }

    const cleanPhone = phone.replace(/[^\d]/g, '');

    try {
      await createUser({
        name: name.trim() || undefined,
        group: group.trim() || undefined,
        phone_number: cleanPhone || undefined,
        tgName: tgName || undefined,
        gameId: selectedGameId,
        points,
      }).unwrap();
      showSnackbar('Ученик создан', 'success');
      refetch();
      resetForm();
    } catch (err: any) {
      showSnackbar(err?.data?.error ?? 'Ошибка при создании ученика', 'error');
    }
  };

  const handleGameChange = (gameId: number) => {
    setSelectedGameId(gameId);

    if (!gameId) {
      setPoints(0);
      setErrors((prev) => ({ ...prev, points: '' }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (value.trim()) {
      setTgName('');
      setErrors({ phone: '', tgName: '', points: '' });
    }
  };

  const handleTgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const cleanedValue = value.startsWith('@') ? value.slice(1) : value;
    setTgName(cleanedValue);
    if (cleanedValue.trim()) {
      setPhone('');
      setErrors({ phone: '', tgName: '', points: '' });
    }
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const numericValue = value.replace(/[^\d]/g, '');
    setPoints(numericValue ? Number(numericValue) : 0);
    setErrors((prev) => ({ ...prev, points: '' }));
  };

  return (
    <Stack
      direction={'column'}
      spacing={3}
      sx={{ width: '100%', alignItems: 'center' }}
    >
      <Typography
        sx={{
          width: '100%',
          color: '#4875b9',
          textAlign: 'left',
        }}
        variant="h3"
      >
        Добавить ученика
      </Typography>
      <Stack sx={{ width: '100%', alignItems: 'flex-start' }} spacing={3}>
        <Stack
          gap={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ width: '100%' }}
        >
          <Input
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Группа"
            placeholder="ИНБ-Б-О-23-1"
            fullWidth
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </Stack>

        <Stack
          gap={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: { xs: 'stretch', sm: 'flex-start' },
            width: '100%',
          }}
        >
          <PhoneInput
            value={phone}
            label="Номер телефона"
            placeholder="Введите номер телефона"
            error={!!errors.phone}
            helperText={errors.phone}
            onChange={handlePhoneChange}
          />
          <Typography
            sx={{
              textAlign: 'center',
              color: '#888',
              mt: { xs: 0, sm: 2 },
            }}
          >
            или
          </Typography>
          <Input
            placeholder="Telegram ник (без @)"
            fullWidth
            value={tgName}
            error={!!errors.tgName}
            helperText={errors.tgName}
            onChange={handleTgNameChange}
          />
        </Stack>

        <GameSelect value={selectedGameId} onChange={handleGameChange} />

        <Input
          label="Стартовые очки"
          placeholder="Стартовые очки"
          fullWidth
          type="number"
          value={points}
          error={!!errors.points}
          helperText={errors.points}
          onChange={handlePointsChange}
          disabled={!selectedGameId}
          inputProps={{
            min: 0,
          }}
        />

        <Button
          sx={{ minWidth: '100px' }}
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Создать
        </Button>
      </Stack>
    </Stack>
  );
};
