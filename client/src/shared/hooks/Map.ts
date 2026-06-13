import type { StateMap } from "../types/StateMap";
import { useSource } from "./Source";
import { Map } from "../classes/Map";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useMap = () => {
  const { setCurrentSource, currentSource, currentMap, setCurrentMap } =
    useSource();
  const Navigate = useNavigate();

  const newMap = (name: string) => {
    if (!currentSource) return;

    setCurrentSource({
      ...currentSource,
      maps: [...currentSource.maps, new Map(name)],
    });
  };

  const updateMap = (map: StateMap) => {
    if (!currentSource) return;

    setCurrentSource({
      ...currentSource,
      maps: [...currentSource.maps].map((m) => (m.id === map.id ? map : m)),
    });
    setCurrentMap(map);
  };

  const deleteMap = (id: string) => {
    if (!currentSource) return;

    setCurrentSource({
      ...currentSource,
      maps: [...currentSource.maps].filter((m) => m.id !== id),
    });
    Navigate("/");
  };

  const openMap = useCallback(
    (id: string) => {
      if (!currentSource) return;

      setCurrentMap(currentSource.maps.find((m) => m.id === id));
    },
    [currentSource],
  );

  const closeMap = () => {
    setCurrentMap(null);
  };

  const toggleCheckMap = (id: string, value: boolean) => {
    if (!currentSource) return;

    setCurrentSource({
      ...currentSource,
      maps: [...currentSource.maps].map((m) => {
        if (m.id === id) {
          return { ...m, checked: value };
        }
        return m;
      }),
    });
  };

  return {
    newMap,
    updateMap,
    deleteMap,
    toggleCheckMap,
    openMap,
    closeMap,
    currentMap,
  };
};
