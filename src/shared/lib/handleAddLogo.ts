import { ShowSnackbarFn } from '@/shared/types/showSnackbar';
import { Dispatch, SetStateAction } from 'react';

type HandleAddLogoParams = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  showSnackbar: ShowSnackbarFn;
};
export const handleAddLogo = ({
  file,
  setFile,
  showSnackbar,
}: HandleAddLogoParams) => {
  if (file) {
    if (file.size > 200 * 1024) {
      showSnackbar('Размер логотипа превышает 200 кб', 'warning');
      setFile(file);
    } else {
      setFile(file);
    }
  }
};
