import { toast } from "react-toastify";
import { useSource } from "../new-hooks/useSource"
import type { UserSource } from "../types/UserSource"
import { useTemplate } from "./useTemplate";

export const useImport = () => {
  const {config} = useSource();
 /**
  * need to get templates after import
  * reason: templates and import form are on the same page
  * if request isn't done there will be no templates after import, even if templates were imported
  */
  const {getTemplates} = useTemplate();

  const mergeSources = async (file: File, currentSource: UserSource) => {
    const text = await file.text();
    const importedData = JSON.parse(text);

    if (!importedData.maps) return;
    const isNewFormat = importedData.maps.every((map: any) =>
      Array.isArray(map.features),
    );
    if (!isNewFormat || !currentSource) return;

    const currentMaps = currentSource?.maps ?? [];
    const currentTemplates = currentSource?.templates ?? [];

    const mergedMaps = new Map(currentMaps.map((m) => [m.id, m]));
    importedData.maps.forEach((newMap : any) => {
      mergedMaps.set(newMap.id, newMap);
    });

    const mergedTemplates = new Map(currentTemplates.map((t) => [t.id, t]));
    (importedData.templates ?? []).forEach((newTemp : any) => {
      mergedTemplates.set(newTemp.id, newTemp);
    });

    return {
      id: currentSource.id ?? "source-of-user-data",
      maps: Array.from(mergedMaps.values()),
      templates: Array.from(mergedTemplates.values()),
    };
  }

  const handleImport = async (file: File) => {
    if (!config) return;
    const {link} = config.api;

    try {
      const response1 = await fetch(`${link}/import`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response1.ok) {
        const message : string = await response1.json().then(
          res => res.detail ?? "Something went wrong while returning data to merge"
        );
        return toast.error(message);
      }
      
      const oldSource : UserSource = await response1.json();
      const mergedSource = await mergeSources(file, oldSource);

      const response2 = await fetch(`${link}/import`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mergedSource)
      })

      if (!response2.ok) {
        const message : string = await response2.json().then(
          res => res.detail ?? "Something went wrong while importing data"
        );
        return toast.error(message);
      }
      
      await getTemplates();
      toast.success("Data imported successfully");
    } catch {
      toast.error("Something went wrong while importing data");
    }
  }

  return { handleImport };
}