import { Button } from '@mui/material';
import {Link} from '@mui/material';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ErrorWidget.module.scss';

interface ErrorWidgetProps {
  className?: string;
}

export const ErrorWidget = ({ className }: ErrorWidgetProps) => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={classNames(cls.ErrorPage, {}, [className])}>
      <h2 className={cls.message}>Что-то пошло не так 😢</h2>
      <div className={cls.inner}>
        <Link href="/">Вернуться на главную</Link>
        <Button onClick={reloadPage}>Обновить страницу</Button>
      </div>
    </div>
  );
};
