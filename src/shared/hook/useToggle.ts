import { useState } from 'react';

export const useToggle = (flag?: boolean) => {
  const [toggle, setToggle] = useState(flag ?? false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return { toggle, setToggle, handleToggle };
};
