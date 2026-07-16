import { useEffect, useRef } from "react";
import type { StateMap } from "../../../../shared/types/StateMap";
import { useMap } from "../../../../shared/hooks/Map";
import { useMapDescription } from "../../../../shared/hooks/MapDescription";
import QRCode from "qrcode";
import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import { createRoot } from "react-dom/client";
import MySvg from "../../../../shared/components/MySvg";
import { UnitToPx } from "../../../../shared/utils/UnitToPx";

type Props = {
  templateId: string
}

export default function TemplateGroup({templateId} : Props) {
  const {map, downloadURIData} = useMapContainer();
  const {currentMap, updateMap} = useMap();
  const {getTemplate} = useMapDescription();

  if (!currentMap) return null;

  const TemplateWrappeRef = useRef<HTMLDivElement | null>(null);
  const TemplateRef = useRef<HTMLDivElement | null>(null);
  const CurrentMapRef = useRef<StateMap | null>(null);
  const {attractionPoint, description} = currentMap;

  const updateDescriptionValue = (key: string, value: string) => {
    if (!CurrentMapRef.current) return;
    return updateMap({
      ...CurrentMapRef.current,
      description: {
        ...CurrentMapRef.current.description,
        values: { ...CurrentMapRef.current.description.values, [key]: value },
      },
    });
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

  const handleLoadMap = async () => {
    if (!TemplateWrappeRef.current || !currentMap || !map.current) return;

    const DownloadMapContainerWrapper = document.querySelector("#dowload-map-container-wrapper");
    const TemplateDom = TemplateWrappeRef.current.querySelector(".template");
    if (!DownloadMapContainerWrapper || !TemplateDom) return;

    const TemplateMapContainer = TemplateDom.querySelector("#map-container");
    if (!TemplateMapContainer) return;
    TemplateMapContainer.innerHTML = "";

    if (!currentMap.attractionPoint || TemplateMapContainer instanceof HTMLDivElement == false) return;
    const {printSettings, areaForPrint} = currentMap;
    const dataUrl = await downloadURIData(currentMap, map.current.getStyle());

    const templateMapContainerRoot = createRoot(TemplateMapContainer);
    const width = UnitToPx(printSettings, areaForPrint.width);
    const height = UnitToPx(printSettings, areaForPrint.height);

    templateMapContainerRoot.render(
      <MySvg Width={width} Height={height} UriData={dataUrl ?? ""}/>
    );

    return () => {
      templateMapContainerRoot.unmount();
    }
  };

  const handleLoadTemplate = () => {
    if (!TemplateWrappeRef.current || !TemplateRef.current) return;
    const Template = getTemplate(templateId ?? "");
    if (!Template) return;
    TemplateRef.current.innerHTML = Template.htmlContent;
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

  const handleLoadListeners = () => {
    if (!currentMap || getTemplate(templateId ?? "") == undefined ||
      !TemplateWrappeRef.current) return;
    const TemplateDom = TemplateWrappeRef.current.querySelector(".template");
    if (!TemplateDom) return;

    const Handlers = new Map<Element, (e: Event) => void>([]);
    TemplateDom.querySelectorAll("textarea, input").forEach((el) => {
      const handler = (e: Event) => {
        const Target = e.currentTarget as
          | HTMLInputElement
          | HTMLTextAreaElement;
        updateDescriptionValue(Target.name, Target.value);
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
    handleLoadTemplate();
    handleLoadData();
    handleLoadMap();
    handleLoadQrCode(); 
    handleLoadListeners();
  }, [templateId]);

  useEffect(() => {
    handleLoadData();
    CurrentMapRef.current = currentMap;
  }, [currentMap]);

  return(
    <>
        <div className="template-content-wrapper" ref={TemplateWrappeRef}>
          {templateId && <div ref={TemplateRef}></div>}
        </div>
    </>
  )
}
