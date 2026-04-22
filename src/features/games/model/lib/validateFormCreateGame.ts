import { MAX_INT, MIN_INT } from '@/shared/const/int';
import {
  GameCreateFormData,
  GameCreateFormErrors,
} from '@/entities/games/model/types/games.types';

export const validateFormCreateGame = (
  form: GameCreateFormData,
): { isValid: boolean; errors: GameCreateFormErrors } => {
  const errors: GameCreateFormErrors = {
    name: '',
    category: '',
    description: '',
    prize: '',
    countWinner: '',
    date_start: '',
    date_finish: '',
  };

  if (!form.name.trim()) errors.name = 'Введите название';
  if (!form.category) errors.category = 'Выберите категорию';
  if (!form.description.trim()) errors.description = 'Введите описание';

  if (form.prizes.length === 0) {
    errors.prize = 'Укажите доступные значения очков';
  }
  const countNumber = Number(form.countWinner);
  if (!form.countWinner) {
    errors.countWinner = 'Введите количество позиций в шкале';
  } else if (isNaN(countNumber)) {
    errors.countWinner = 'Количество позиций должно быть числом';
  } else if (countNumber < MIN_INT || countNumber > MAX_INT) {
    errors.countWinner = `Количество позиций должно быть в диапазоне ${MIN_INT}–${MAX_INT}`;
  }

  if (!form.date_start) errors.date_start = 'Выберите дату начала';
  if (!form.date_finish) errors.date_finish = 'Выберите дату окончания';

  if (form.date_start && form.date_finish) {
    if (form.date_finish.isBefore(form.date_start)) {
      errors.date_finish = 'Дата окончания не может быть раньше даты начала';
    }
    if (form.date_start.isAfter(form.date_finish)) {
      errors.date_start = 'Дата начала не может быть позже даты окончания';
    }
  }

  const isValid = Object.values(errors).every((e) => !e);

  return { isValid, errors };
};
