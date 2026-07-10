import type { StateMap } from "../types/StateMap";
import { useSource } from "./Source";
import { Map } from "../classes/Map";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useFile } from "./File";

export const useMap = () => {
  const { updateData } = useFile();
  const {
    setCurrentSource,
    currentSource,
    currentMap,
    setCurrentMap,
    setCurrentGroup,
  } = useSource();
  const Navigate = useNavigate();

  const newMap = (name: string) => {
    if (!currentSource) return;
    if (name == null) throw new Error("Name cannot be a null");

    const NewSource = {
      ...currentSource,
      maps: [...currentSource.maps, new Map(name)],
    };
    updateData(NewSource);
    setCurrentSource(NewSource);
  };

  const updateMap = (map: StateMap) => {
    if (!currentSource) return;

    const NewSource = {
      ...currentSource,
      maps: [...currentSource.maps].map((m) =>
        m.id === map.id ? { ...map, updatedAt: new Date().toISOString() } : m,
      ),
    };
    updateData(NewSource);
    setCurrentSource(NewSource);
    setCurrentMap(map);
  };

  const deleteMap = (id: string) => {
    if (!currentSource) return;

    const NewSource = {
      ...currentSource,
      maps: [...currentSource.maps].filter((m) => m.id !== id),
    };
    updateData(NewSource);
    setCurrentSource(NewSource);
    Navigate("/");
  };

  const openMap = useCallback(
    (id: string) => {
      if (!currentSource) return;

      setCurrentMap(currentSource.maps.find((m) => m.id === id) ?? null);
    },
    [currentSource],
  );

  const closeMap = () => {
    setCurrentMap(null);
    setCurrentGroup(undefined);
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
