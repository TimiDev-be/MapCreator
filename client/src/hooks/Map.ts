import { useSource } from "./Source";

export const useMap = () => {
  const { setCurrentSource, currentSource } = useSource();

  const newMap = (name: string) => {
    if (!currentSource) return;

    setCurrentSource({
      ...currentSource,
      maps: [
        ...currentSource.maps,
        {
          id: Date.now().toString(),
          name,
          checked: false,
          groups: [],
          features: [],
          description: "<h>Data;Adres</h>",
          attractionPoint: undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    });
  };

  const deleteMap = (id: string) => {
    if (!currentSource) return;

    setCurrentSource({
      ...currentSource,
      maps: [...currentSource.maps].filter((m) => m.id !== id),
    });
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

  return { newMap, deleteMap, toggleCheckMap };
};
