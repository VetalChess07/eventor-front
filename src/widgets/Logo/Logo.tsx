import logo from '@shared/assets/images/logo.png';

import cls from './Logo.module.scss';

export const Logo = () => {
  return <img src={logo} alt="eventor" className={cls.Logo} />;
};
