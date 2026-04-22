import { SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export const handleSelectEvent = (
  e: SelectChangeEvent<string | number>,
  setEvent: Dispatch<SetStateAction<string>>,
) => {
  setEvent(e.target.value as string);
};
