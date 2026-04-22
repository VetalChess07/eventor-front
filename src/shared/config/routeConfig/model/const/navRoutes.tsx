import type { INavRoute } from '../types/routeConfig';
import { MdEventAvailable } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { FaChartBar, FaDropbox } from 'react-icons/fa';

export const navRoutes: INavRoute[] = [
  {
    label: 'Мероприятия',
    path: '/',
    Icon: <MdEventAvailable />,
  },
  {
    label: 'Ученики',
    path: '/users',
    Icon: <FiUsers />,
  },
  {
    label: 'Очки',
    path: '/result',
    Icon: <FaDropbox />,
  },
  {
    label: 'Статистика',
    path: '/success-summary',
    Icon: <FaChartBar />,
  },
];
