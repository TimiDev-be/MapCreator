import { useSource } from "./Source";
import type { DescriptionTemplate } from "../types/DescriptionTemplate";
import html2canvas from "html2canvas";
import type { UserSource } from "../types/UserSource";
import { useCallback } from "react";
import { toast } from "react-toastify";
import type { TemplatePrintSettings } from "../types/TemplatePrintSettings";
import { PrintFormatsRecord } from "../types/PrintFormats";
import jsPDF from "jspdf";
import { PaddingAsNumber } from "../utils/PaddingAsNumber";

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

  const downloadPdfFromTemplate = async (element: HTMLElement, mapName: string, templateName: string, printSettings: TemplatePrintSettings) => {
    try {
      const pages = element.querySelectorAll(".page");
      if (pages.length == 0) {
        toast.error("Template does not contain any element with class 'page'. Change your HTML template and try again.");
        return;
      }

      const {format, orientation} = printSettings;
      const formatString = Object.keys(PrintFormatsRecord).find(
        key => PrintFormatsRecord[key as keyof typeof PrintFormatsRecord][0] === format[0]
      )?.toLowerCase() ?? "a4";

      // padding of template is a margin in pdf
      const elementStyle = getComputedStyle(element);
      // top - left - bottom - right
      const margins : [number, number, number, number] = [
        PaddingAsNumber(elementStyle.paddingTop),
        PaddingAsNumber(elementStyle.paddingLeft),
        PaddingAsNumber(elementStyle.paddingBottom),
        PaddingAsNumber(elementStyle.paddingRight)
      ]

      const pxToMm = (px: number): number => {
        return px * (25.4 / 96);
      };

      const filename = `${mapName}-${templateName}-${new Date().toLocaleString("pl-PL", { timeZoneName: "short" })}.pdf`;

      const pdf = new jsPDF({unit: "mm", format: formatString, orientation});

      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i] as HTMLElement, {scale: 2, useCORS: true});
        const img = canvas.toDataURL('image/jpeg', 1);

        if (i > 0) pdf.addPage();

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const widthWithoutMargins = pageWidth - pxToMm(margins[1]) - pxToMm(margins[3]);
        const heightWithoutMargins = pageHeight - pxToMm(margins[0]) - pxToMm(margins[2]);

        pdf.addImage(img, 'JPEG', pxToMm(margins[1]), pxToMm(margins[0]), widthWithoutMargins, heightWithoutMargins);
      }

      pdf.save(filename);

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
