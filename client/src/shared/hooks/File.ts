import { useSource } from "./Source";
import type { DescriptionTemplate } from "../types/DescriptionTemplate";
import html2pdf from "../../../node_modules/html2pdf.js/src";

export const useFile = () => {
  const { setCurrentSource, currentSource } = useSource();

  const importFile = async (file: File) => {
    const text = await file.text();
    const importedData = JSON.parse(text);

    if (!importedData.maps) return;
    const isNewFormat = importedData.maps.every((map: any) =>
      Array.isArray(map.features),
    );
    if (!isNewFormat) return;

    setCurrentSource((prev) => {
      const currentMaps = prev?.maps ?? [];
      const currentTemplates = prev?.templates ?? [];

      const mergedMaps = new Map(currentMaps.map((m) => [m.id, m]));
      importedData.maps.forEach((newMap) => {
        mergedMaps.set(newMap.id, newMap);
      });

      const mergedTemplates = new Map(currentTemplates.map((t) => [t.id, t]));
      (importedData.templates ?? []).forEach((newTemp) => {
        mergedTemplates.set(newTemp.id, newTemp);
      });

      return {
        id: "source-of-user-data",
        maps: Array.from(mergedMaps.values()),
        templates: Array.from(mergedTemplates.values()),
      };
    });
  };

  const importTemplate = async (file: File) => {
    const Text = await file.text();
    const NewTemplate: DescriptionTemplate = {
      id: crypto.randomUUID(),
      name: "default template",
      htmlContent: Text,
    };
    setCurrentSource((prev) => ({
      ...prev,
      templates: [...(prev.templates ?? []), NewTemplate],
    }));
  };

  const updateTemplateName = (id: string, name: string) => {
    setCurrentSource((prev) => ({
      ...prev,
      templates: prev.templates.map((t) => (t.id === id ? { ...t, name } : t)),
    }));
  };

  const deleteTemplate = (id: string) => {
    const TemplateInUse = currentSource.maps.find(
      (map) => map.description?.templateId === id,
    );

    if (TemplateInUse) {
      alert("Template is in use. Cannot delete.");
      return;
    }

    setCurrentSource((prev) => ({
      ...prev,
      templates: prev.templates.filter((t) => t.id !== id),
    }));
  };

  const downloadPdfFromTemplate = (
    element: HTMLElement,
    mapName: string,
    templateName: string,
  ) => {
    html2pdf(element, {
      margin: [0, 0, 0, 0],
      filename: `${mapName}-${templateName}-${new Date().toLocaleString("pl-PL", { timeZoneName: "short" })}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: "avoid-all" },
    });
  };

  const downloadFile = () => {
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
    a.href = url;
    a.download = `mapy-${new Date().toLocaleString("pl-PL", { timeZoneName: "short" })}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    importFile,
    downloadFile,
    importTemplate,
    deleteTemplate,
    updateTemplateName,
    downloadPdfFromTemplate,
  };
};
