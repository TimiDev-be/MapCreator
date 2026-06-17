import { useSource } from "./Source";
import type { DescriptionTemplate } from "../types/DescriptionTemplate";
import html2pdf from "../../../node_modules/html2pdf.js/src";

export const useFile = () => {
  const { setCurrentSource, currentSource } = useSource();

  const importFile = async (file: File) => {
    const String = await file.text();
    const Json = JSON.parse(String);
    if (!Json.maps) return;
    const isNewFormat = Json.maps.every((map) => Array.isArray(map.features));
    if (!isNewFormat) return;
    setCurrentSource({
      id: "source-of-user-data",
      maps: Json.maps,
      templates: Json.templates ?? [],
    });
  };

  const importTemplate = async (file: File) => {
    const String = await file.text();
    const NewTemplate: DescriptionTemplate = {
      id: crypto.randomUUID(),
      name: "default template",
      htmlContent: String,
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
      filename: `${mapName}-${templateName}-${new Date().toLocaleString("pl-PL", { timeZoneName: "short" })}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
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
