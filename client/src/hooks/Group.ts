import { useSource } from "./Source";

export const useGroup = () => {
  const { currentGroup, setCurrentSource } = useSource();

  const newGroup = (name: string) => {};
  const deleteGroup = (id: string) => {};

  return { newGroup, deleteGroup };
};
