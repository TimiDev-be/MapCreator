import { useCallback, useEffect, useRef } from "react";
import { useSource } from "../new-hooks/useSource"
import type { SortOrder } from "../types/SortOrder";
import { useSesstionSortOption } from "./useSessionSortOption";
import { useMap } from "./useMap";

export const useQuickMenu = () => {
  const {maps, setMaps, mapsLoading} = useSource(); 
  const {deleteMaps} = useMap();
  const {getOption, SELECT_OPTIONS} = useSesstionSortOption();
  const SortRef = useRef<SortOrder>("default");

  const applySort = useCallback((order: SortOrder)=> {
    switch (order) {
      case "a-z":
        return setMaps(prev => 
          [...prev].sort((a, b) => a.name.localeCompare(b.name))
        );
      case "z-a":
        return setMaps(prev => 
          [...prev].sort((a, b) => b.name.localeCompare(a.name))
        );
      default:
        return setMaps(prev => 
          [...prev].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        );
    }
  }, [maps]);

  const toggleSort = (value: SortOrder) => {
    SortRef.current = value;
    applySort(value);
  };

  const toggleAll = (checked: boolean) => {
    setMaps(prev => [...prev].map(m => ({...m, checked})));
  };

  const deleteChecked = async () => {
    const ids : string[] = maps.filter(m => m.checked)
      .map(m => (m.id));
    
    await deleteMaps(ids);
  }

  useEffect(() => {
    if (mapsLoading) return;
    toggleSort(getOption().value);
  }, [mapsLoading]);

  return { toggleSort, toggleAll, deleteChecked, SELECT_OPTIONS }
}