import type { Group } from "../types/Group";
import { useMap } from "./Map";
import { useSource } from "./Source";

export const useGroup = () => {
  const { currentGroup, setCurrentGroup } = useSource();
  const { currentMap, updateMap } = useMap();

  const newGroup = () => {
    if (!currentMap) return;

    updateMap({
      ...currentMap,
      groups: [
        ...currentMap.groups,
        { id: crypto.randomUUID(), name: "default group" },
      ],
    });
  };

  const updateGroupName = (group: Group) => {
    if (!currentMap || group.name.trim().length === 0) return;

    updateMap({
      ...currentMap,
      groups: currentMap.groups.map((g) =>
        g.id === group.id ? { ...g, name: group.name } : g,
      ),
    });
  };

  const deleteGroup = (id: string) => {
    if (!currentMap) return;
    setCurrentGroup((prev) => (prev && prev.id == id ? undefined : prev));

    updateMap({
      ...currentMap,
      features: currentMap.features.filter((f) => f.properties?.groupId !== id),
      groups: currentMap.groups.filter((g) => g.id !== id),
    });
  };

  const toggleActive = (group: Group) => {
    setCurrentGroup((prev) =>
      prev && prev.id === group.id ? undefined : group,
    );
  };

  const assignFeatureToGroup = (featureId: string, groupId?: string) => {
    if (!currentMap) return;
    
    updateMap({
      ...currentMap,
      features: currentMap.features.map((f) =>
        f.id === featureId
          ? { ...f, properties: { ...f.properties, groupId } }
          : f,
      ),
    });
  };

  return {
    newGroup,
    deleteGroup,
    updateGroupName,
    currentGroup,
    toggleActive,
    assignFeatureToGroup,
  };
};
