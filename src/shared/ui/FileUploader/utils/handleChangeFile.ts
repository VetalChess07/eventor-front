import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type HandleChangeParams = {
  event: ChangeEvent<HTMLInputElement>;
  setFiles: Dispatch<SetStateAction<File[]>>;
  onChange?: (files: File[] | null) => void;
};

export const handleChangeFile = ({
  onChange,
  event,
  setFiles,
}: HandleChangeParams) => {
  const fileList = event.target.files;
  if (fileList) {
    const filesArray = Array.from(fileList);
    setFiles(filesArray);
    onChange?.(filesArray);
  } else {
    setFiles([]);
    onChange?.(null);
  }
};
