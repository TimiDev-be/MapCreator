import "../../styles/_descriptionPanel.scss";
import Line from "../../../shared/components/Line.tsx";
import CustomSelect from "../../../shared/components/CustomSelect";
import { useMapDescription } from "../../../shared/hooks/MapDescription.ts";
import type { CustomSelectOption } from "../../../shared/types/CustomSelectOption.ts";
import { useMap } from "../../../shared/hooks/Map.ts";
import { useEffect, useRef } from "react";
import { useMapContainer } from "../../../shared/hooks/MapContainer.ts";
import { UnitToPx } from "../../../shared/utils/UnitToPx.ts";
import html2canvas from "html2canvas";
import { useFile } from "../../../shared/hooks/File.ts";
import QRCode from "qrcode";
import type { StateMap } from "../../../shared/types/StateMap.ts";
import MySvg from "../../../shared/components/MySvg.tsx";
import { createRoot } from "react-dom/client";

export default function DescriptionPanel() {
  const { templates, getTemplate, assignTemplate } = useMapDescription();
  const { downloadPdfFromTemplate } = useFile();
  const { map } = useMapContainer();
  const { currentMap, updateMap } = useMap();

  const { description, attractionPoint } = currentMap ?? {};
  const { templateId, descriptionForMapMaker } = description ?? {};

  const TemplateWrappeRef = useRef<HTMLDivElement | null>(null);
  const TemplateRef = useRef<HTMLDivElement | null>(null);
  const CurrentMapRef = useRef<StateMap | null>(null);

  const Options: CustomSelectOption[] = [
    ...templates.map((t) => ({ id: t.id, value: t.name })),
    { id: "none", value: "none" },
  ];
  const DefaultOption: CustomSelectOption = {
    id: getTemplate(templateId ?? "")?.id ?? "none",
    value: getTemplate(templateId ?? "")?.name ?? "none",
  };

  const selectOption = (option: CustomSelectOption) => {
    assignTemplate(option.id);
  };

  const updateMapDescriptionForMapMaker = (description: string) => {
    if (!CurrentMapRef.current) return;
    return updateMap({
      ...CurrentMapRef.current,
      description: {
        ...CurrentMapRef.current.description,
        descriptionForMapMaker: description,
      },
    });
  };
  
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

  const handleDownloadPdf = () => {
    if (!TemplateWrappeRef.current || !currentMap) return;

    const Template = TemplateWrappeRef.current.querySelector<HTMLElement>(".template");
    if (!Template) return;

    downloadPdfFromTemplate(
      Template,
      currentMap.name,
      getTemplate(templateId ?? "")?.name ?? "none",
    );
  };

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

  const handleLoadMap = () => {
    if (!TemplateWrappeRef.current || !currentMap || !map.current) return;

    const TemplateDom = TemplateWrappeRef.current.querySelector(".template");
    if (!TemplateDom) return;

    const TemplateMapContainer = TemplateDom.querySelector("#map-container");
    if (!TemplateMapContainer) return;
    TemplateMapContainer.innerHTML = "";
    if (
      currentMap.attractionPoint &&
      TemplateMapContainer instanceof HTMLDivElement
    ) {
      const { coords, zoom, pitch, bearing } = currentMap.attractionPoint;
      const { width, height } = currentMap.areaForPrint;
      const MapContainer = map.current.getContainer();

      MapContainer.style.width = `${UnitToPx(currentMap.printSettings, width)}px`;
      MapContainer.style.height = `${UnitToPx(currentMap.printSettings, height)}px`;
      map.current.resize();

      const WidthNum = UnitToPx(currentMap.printSettings, width);
      const HeightNum = UnitToPx(currentMap.printSettings, height);

      map.current.jumpTo({
        center: coords as [number, number],
        zoom,
        pitch,
        bearing,
      });
      map.current.once("idle", async () => {
        const MapCanvas = await html2canvas(MapContainer, {
          useCORS: true,
          backgroundColor: null,
          ignoreElements: (el) =>
            el.classList.contains("maplibregl-control-container"),
        });
        const UriData = MapCanvas.toDataURL("image/png");

        const root = createRoot(TemplateMapContainer);
        root.render(
          <MySvg Width={WidthNum} Height={HeightNum} UriData={UriData} />,
        );

        MapContainer.style.width = "100%";
        MapContainer.style.height = "100%";
        map.current!.resize();

        return () => {
          root.unmount();
        };
      });
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

  return (
    <>
      <div className="nav panel description">
        <div className="top-block">
          <p className="panel-name t-panel-name">Description</p>
          <CustomSelect
            type="default"
            selectName="Choose Template"
            defaultOption={DefaultOption}
            options={Options}
            selectOption={selectOption}
          />
          <button
            type="button"
            className="download-template-button t-panel-medium"
            onClick={handleDownloadPdf}
          >
            Download PDF
          </button>
          <div className="about-panel">
            <p className="subtitle t-panel-medium">
              Manage your document layout and content settings.
            </p>
            <p className="warning t-panel-medium">
              <strong>
                Warning: Changing your template will clear all currently entered
                data except for description for map maker.
              </strong>
              <br />
              Please ensure you have saved or exported your progress before
              switching, as all unsaved information in the current form will be
              permanently lost.
            </p>
            <div className="description-for-map-maker-container">
              <label
                htmlFor="description-for-map-maker-textarea"
                className="t-panel-medium"
              >
                Description for Map Maker
              </label>
              <textarea
                name="description-for-map-maker"
                id="description-for-map-maker-textarea"
                className="description-for-map-maker t-panel-medium"
                defaultValue={descriptionForMapMaker ?? ""}
                onBlur={(e) => updateMapDescriptionForMapMaker(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <Line height={1} />
        <div className="template-content-wrapper" ref={TemplateWrappeRef}>
          {templateId && <div ref={TemplateRef}></div>}
        </div>
      </div>
    </>
  );
}
