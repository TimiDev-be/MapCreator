import { useRef } from "react";
import { useSource } from "./Source";
import type { StateMap } from "../types/StateMap";
import type { SortOrder } from "../types/SortOrder";

export const useMaps = () => {
  const { currentSource, setCurrentSource } = useSource();
  const SortRef = useRef<SortOrder>("default");

  const applySort = (list: StateMap[], order: SortOrder): StateMap[] => {
    switch (order) {
      case "a-z":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return [...list].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return [...list].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }
  };

  const toggleSort = (value: SortOrder) => {
    SortRef.current = value;
    setCurrentSource({
      id: "source-of-user-data",
      maps: applySort(currentSource?.maps ?? [], value),
      templates: currentSource?.templates ?? [],
    });
  };

  const toggleAll = (checked: boolean) => {
    setCurrentSource({
      id: "source-of-user-data",
      maps: [...(currentSource?.maps ?? [])].map((map) => ({
        ...map,
        checked: checked,
      })),
      templates: currentSource?.templates ?? [],
    });
  };

  const deleteChecked = () => {
    const filteredMaps = currentSource?.maps?.filter((map) => !map.checked);
    setCurrentSource({
      id: "source-of-user-data",
      maps: [...(filteredMaps ?? [])],
      templates: currentSource?.templates ?? [],
    });
  };

  return {
    maps: currentSource?.maps ?? [],
    toggleSort,
    toggleAll,
    deleteChecked,
  };
};
