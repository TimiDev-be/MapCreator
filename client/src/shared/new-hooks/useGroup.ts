import type { Feature } from "geojson";
import type { Group } from "../types/Group";
import type { Map } from "../types/Map";
import { useMap } from "./useMap";
import { useOpenMapPage } from "./useOpenMapPage"
import { useFeature } from "./useFeature";
import { useCallback } from "react";

export const useGroup = (id: string | undefined = undefined) => {
  const {currentMap, setCurrentMap} = useOpenMapPage();
  const {updateFeature} = useFeature();
  const {updateMap} = useMap();

  const getGroups = useCallback(() : Group[] => {
    if (!currentMap) return [];
    return currentMap.groups;
  }, [currentMap]);

  const getGroupFeatures = useCallback(() : Feature[] => {
    if (!currentMap || !id) return [];
    return currentMap.features.filter(f => f.properties?.groupId == id);
  }, [currentMap, id]);

  const newGroup = async () => {
    if (!currentMap) return;

    const NewGroup : Group = {
      id: crypto.randomUUID(),
      name: "default group"
    }

    const UpdatedMap : Map = {
      ...currentMap,
      groups: [
        ...currentMap.groups,
        NewGroup
      ]
    }

    await updateMap(UpdatedMap);
    setCurrentMap(UpdatedMap);
  }

  const updateGroup = async (name: string) => {
    if (!currentMap || !id || name.trim() == "") return;

    const OldGroup = currentMap.groups.find(g => g.id == id);
    if (!OldGroup) return;

    const NewGroup : Group = {
      ...OldGroup,
      name
    }

    const UpdatedMap : Map = {
      ...currentMap,
      groups: currentMap.groups.map(g => {
        if (g.id == NewGroup.id)
          return NewGroup
        else
          return g
      })
    }

    await updateMap(UpdatedMap);
    setCurrentMap(UpdatedMap);
  }

  const deleteGroup = async () => {
    if (!id || !currentMap) return;
    
    const NewGroups = currentMap.groups.filter(g => g.id != id);
    const UpdatedMap : Map = {
      ...currentMap,
      groups: NewGroups
    }

    await updateMap(UpdatedMap);
    setCurrentMap(UpdatedMap);
  }

  const assignFeatureToGroup = async (id: string, groupId: string | undefined = undefined) => {
    if (!currentMap) return;
    
    const ExistingFeature = currentMap.features.find(f => f.id == id);
    let NewFeature : Feature | null = null;

    if (!ExistingFeature) return;

    NewFeature = {
      ...ExistingFeature,
      properties: {
        ...ExistingFeature.properties,
        groupId
      }
    }

    await updateFeature(ExistingFeature, NewFeature);
  }

  return {
    getGroups,
    getGroupFeatures,
    newGroup,
    updateGroup,
    deleteGroup,
    assignFeatureToGroup
  }
}