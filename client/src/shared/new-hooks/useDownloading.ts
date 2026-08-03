import { toast } from "react-toastify"
import { useSource } from "./useSource"
import type { TemplatePrintSettings } from "../types/TemplatePrintSettings";
import { PrintFormatsRecord } from "../types/PrintFormats";
import { PaddingAsNumber } from "../utils/PaddingAsNumber";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const useDownloading = () => {
  const {config} = useSource();
  const apiUrl : string = config ? config.api.link + "/files" : "/files" ;

  const downloadDataFile = async () => {
    try {
      const response = await fetch(apiUrl + "/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while downloading a data file"
        );
        toast.error(message);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `MapCreator_data_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success("Data file downloaded successfully");
    } catch {
      toast.error("eee Something went wrong while downloading a data file");
    }
  }

  const downloadTemplateFile = async (element: HTMLElement, mapName: string, templateName: string, printSettings: TemplatePrintSettings) => {
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
    } catch {
      toast.error("Something went wrong while downloading template pdf");
    }
  }

  return {
    downloadDataFile,
    downloadTemplateFile
  }
}