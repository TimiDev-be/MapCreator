import { useSource } from "./Source";
import type { DescriptionTemplate } from "../types/DescriptionTemplate";
import html2pdf from "html2pdf.js";
import type { UserSource } from "../types/UserSource";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useFile = () => {
  const { setCurrentSource, currentSource, config } = useSource();

  const updateData = useCallback(
    async (source: UserSource) => {
      if (!currentSource || !config) return;
      await fetch(`${config.api.link}/data`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DataPatchValue: JSON.stringify({
            ...source,
            maps: source.maps.map(({ checked, ...rest }) => ({ ...rest })),
            templates: source.templates,
          }),
        }),
      });
    },
    [currentSource, config],
  );

  const importFile = async (file: File) => {
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

    const NewSource: UserSource = {
      id: "source-of-user-data",
      maps: Array.from(mergedMaps.values()),
      templates: Array.from(mergedTemplates.values()),
    };

    updateData(NewSource);
    setCurrentSource(NewSource);
  };

  const importTemplate = async (file: File) => {
    const Text = await file.text();
    const NewTemplate: DescriptionTemplate = {
      id: crypto.randomUUID(),
      name: "default template",
      htmlContent: Text,
    };
    setCurrentSource((prev) => {
      if (!prev) return;
      return {
        ...prev,
        templates: [...(prev.templates ?? []), NewTemplate],
      }
    });
  };

  const updateTemplateName = (id: string, name: string) => {
    const NewSource: UserSource = {
      id: "source-of-user-data",
      maps: currentSource?.maps ?? [],
      templates:
        currentSource?.templates?.map((t) =>
          t.id === id ? { ...t, name } : t,
        ) ?? [],
    };
    updateData(NewSource);
    setCurrentSource(NewSource);
  };

  const deleteTemplate = (id: string) => {
    if (!currentSource) return;

    const TemplateInUse = currentSource.maps.find(
      (map) => map.description?.templateId === id,
    );

    if (TemplateInUse) {
      toast.warning("Template is in use. Cannot delete.");
      return;
    }

    const NewSource: UserSource = {
      id: "source-of-user-data",
      maps: currentSource?.maps ?? [],
      templates: currentSource?.templates?.filter((t) => t.id !== id) ?? [],
    };
    updateData(NewSource);
    setCurrentSource(NewSource);
  };

  const downloadPdfFromTemplate = (element: HTMLElement, mapName: string, templateName: string,) => {
    try {
      const filename = `${mapName}-${templateName}-${new Date().toLocaleString("pl-PL", { timeZoneName: "short" })}.pdf`
      html2pdf(element, {
        margin: [0, 0, 0, 0],
        filename,
        image: { type: "jpeg", quality: 3 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }); 
      toast.success(`${filename} downloaded`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const downloadFile = () => {
    if (!currentSource) return;
    try {
      const data = JSON.stringify({
        id: currentSource.id,
        maps: currentSource.maps
          .map(({ checked, ...rest }) => ({ ...rest }))
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
        templates: currentSource.templates,
      });
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const fileName = `maps-${new Date().toLocaleString("pl-PL", { timeZoneName: "short" })}.json`;
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); 
      toast.success(`${fileName} downloaded`);
    } catch (error) {
      toast.error(`Something went wrong`)
    }
  };

  return {
    importFile,
    downloadFile,
    importTemplate,
    deleteTemplate,
    updateTemplateName,
    downloadPdfFromTemplate,
    updateData,
  };
};
