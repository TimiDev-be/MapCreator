import { useSource } from "./Source";

export const useFile = () => {
  const { currentSource } = useSource();

  const importFile = () => {};
  const downloadFile = () => {};

  return { importFile, downloadFile };
};
