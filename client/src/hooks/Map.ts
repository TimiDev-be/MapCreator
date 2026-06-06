import { useSource } from "./Source";

export const useMap = () => {
  const { currentMap, setCurrentSource } = useSource();

  const newMap = (name: string) => {};
  const deleteMap = (id: string) => {};

  return { newMap, deleteMap };
};
