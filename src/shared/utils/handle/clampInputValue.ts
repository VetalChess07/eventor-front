import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type ClampInputValueParams = {
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  setValue: Dispatch<SetStateAction<number>>;
  maxValue?: number;
  minValue?: number;
};

export const clampInputValue = ({
  e,
  setValue,
  maxValue = 100,
  minValue = 0,
}: ClampInputValueParams) => {
  let value = +e.target.value;

  if (isNaN(value)) return;

  if (value > maxValue) value = maxValue;
  if (value < minValue) value = minValue;

  setValue(value);
};
