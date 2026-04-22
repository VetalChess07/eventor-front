import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handleInput = <T = string>(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setValue: Dispatch<SetStateAction<T>>,
) => setValue(e.target.value as T);
