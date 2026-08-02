import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { createRoot } from "react-dom/client";
import MySvg from "../../../../shared/components/MySvg";
import { UnitToPx } from "../../../../shared/utils/UnitToPx";
import { useOpenMapPage } from "../../../../shared/new-hooks/useOpenMapPage";
import type { Map } from "../../../../shared/types/Map";
import { useTemplate } from "../../../../shared/new-hooks/useTemplate";
import { useMapDescription } from "../../../../shared/new-hooks/useMapDescription";
import type { MapDescription } from "../../../../shared/types/MapDescription";

type Props = {
  templateId: string
}

export default function TemplateGroup({templateId} : Props) {
  const {currentMap, downloadURIData, maplibreMap} = useOpenMapPage();
  const {getTemplate} = useTemplate();
  const {updateDescriptionValues} = useMapDescription();

  const TemplateWrappeRef = useRef<HTMLDivElement | null>(null);
  const TemplateRef = useRef<HTMLDivElement | null>(null);
  const CurrentMapRef = useRef<Map | null>(null);
  const TemplateMapRootRef = useRef<ReturnType<typeof createRoot> | null>(null);
  const {attractionPoint, description} = currentMap ?? {};

  const updateDescriptionValue = async (key: string, value: string) => {
    if (!CurrentMapRef.current) return;
    const NewDescription : MapDescription = {
      ...CurrentMapRef.current.description,
      values: { ...CurrentMapRef.current.description.values, [key]: value },
    }
    await updateDescriptionValues(NewDescription);
  }

  const handleLoadQrCode = async () => {
    if (!TemplateWrappeRef.current) return;

    const QRCodeDom = TemplateWrappeRef.current.querySelector("#qrcode");
    if (!QRCodeDom) return;

    if (attractionPoint) {
      const { coords, zoom } = attractionPoint;
      const Canvas = document.createElement("canvas");
      QRCode.toCanvas(
        Canvas,
        `https://www.google.com/maps/@${coords[1]},${coords[0]},${zoom}z`,
        {
          width: QRCodeDom.clientWidth,
        }
      );
      QRCodeDom.innerHTML = "";
      QRCodeDom.appendChild(Canvas);
    }
  };

  const handleLoadMap = async (): Promise<(() => void) | undefined> => {
    if (!TemplateWrappeRef.current || !currentMap || !maplibreMap.current) return;

    const DownloadMapContainerWrapper = document.querySelector("#dowload-map-container-wrapper");
    const TemplateDom = TemplateWrappeRef.current.querySelector(".template");
    if (!DownloadMapContainerWrapper || !TemplateDom) return;

    const TemplateMapContainer = TemplateDom.querySelector("#map-container");
    if (!TemplateMapContainer) return;
    TemplateMapContainer.innerHTML = "";

    if (!currentMap.attractionPoint || TemplateMapContainer instanceof HTMLDivElement == false) return;
    const {printSettings, areaForPrint} = currentMap;
    const dataUrl = await downloadURIData(currentMap, maplibreMap.current.getStyle());

    const width = UnitToPx(printSettings, areaForPrint.width);
    const height = UnitToPx(printSettings, areaForPrint.height);

    if (!TemplateMapRootRef.current) {
      TemplateMapRootRef.current = createRoot(TemplateMapContainer);
    }
    TemplateMapRootRef.current.render(
      <MySvg Width={width} Height={height} UriData={dataUrl ?? ""}/>
    );
  };

  const handleLoadTemplate = async () => {
    if (!TemplateWrappeRef.current || !TemplateRef.current) return;
    const template = await getTemplate(templateId ?? "");
    if (!template) return;
    TemplateRef.current.innerHTML = template.htmlContent;
  };

  const handleLoadData = () => {
    if (!TemplateWrappeRef.current) return;

    const TemplateDom = TemplateWrappeRef.current.querySelector(".template");
    if (!TemplateDom) return;

    Object.entries((description && description.values) ?? {}).forEach(([name, value]) => {
      const el = TemplateDom.querySelector(`[name="${name}"]`);
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.value = value;
      }
    });
  };

  const handleLoadListeners = async () => {
    const template = await getTemplate(templateId ?? "");
    if (!currentMap || !template || !TemplateWrappeRef.current) return;

    const TemplateDom = TemplateWrappeRef.current.querySelector(".template");
    if (!TemplateDom) return;

    const Handlers = new Map<Element, (e: Event) => void>([]);
    TemplateDom.querySelectorAll("textarea, input").forEach((el) => {
      const handler = async (e: Event) => {
        const Target = e.currentTarget as
          | HTMLInputElement
          | HTMLTextAreaElement;
        await updateDescriptionValue(Target.name, Target.value);
      };
      el.addEventListener("blur", handler);
      Handlers.set(el, handler);
    });

    return () => {
      Handlers.forEach((handler, el) => {
        el.removeEventListener("blur", handler);
      });
    };
  };

  useEffect(() => {
    let cleanupMap: (() => void) | undefined;
    let cleanupListeners: (() => void) | undefined;

    const load = async () => {
      await handleLoadTemplate();
      handleLoadData();
      cleanupMap = await handleLoadMap();
      await handleLoadQrCode();
      cleanupListeners = await handleLoadListeners();
    };

    load();

    return () => {
      cleanupMap?.();
      cleanupListeners?.();
    };
  }, [templateId]);

  useEffect(() => {
    handleLoadData();
    CurrentMapRef.current = currentMap;
  }, [currentMap]);

  useEffect(() => {
    return () => {
      TemplateMapRootRef.current?.unmount();
      TemplateMapRootRef.current = null;
    };
  }, [])

  return(
    <>
        <div className="template-content-wrapper" ref={TemplateWrappeRef}>
          {templateId && <div ref={TemplateRef}></div>}
        </div>
    </>
  )
}
