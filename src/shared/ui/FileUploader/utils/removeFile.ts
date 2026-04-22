import { Dispatch, SetStateAction } from 'react';

type RemoveFileParams = {
  currentIndex?: number;
  setFiles: Dispatch<SetStateAction<File[]>>;
  setIsEmpty: Dispatch<SetStateAction<boolean>>;
  files: File[];
};

export const removeFile = ({
  setFiles,
  setIsEmpty,
  currentIndex,
  files,
}: RemoveFileParams) => {
  if (currentIndex || currentIndex === 0) {
    setFiles((prev) => prev.filter((_, index) => index !== currentIndex));
    if (files.length === 0) {
      setIsEmpty(true);
    }
  } else {
    setIsEmpty(true);
  }
};
