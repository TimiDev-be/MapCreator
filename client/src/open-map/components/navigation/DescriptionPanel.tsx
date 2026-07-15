import "../../styles/_descriptionPanel.scss";
import Line from "../../../shared/components/Line.tsx";
import { useMapDescription } from "../../../shared/hooks/MapDescription.ts";
import { useMap } from "../../../shared/hooks/Map.ts";
import { useEffect, useRef } from "react";
import { useFile } from "../../../shared/hooks/File.ts";
import type { StateMap } from "../../../shared/types/StateMap.ts";
import TemplateGroup from "./description-groups/TemplateGroup.tsx";
import SelectsGroup from "./description-groups/SelectsGroup.tsx";

export default function DescriptionPanel() {
  const { getTemplate } = useMapDescription();
  const { downloadPdfFromTemplate } = useFile();
  const { currentMap, updateMap } = useMap();

  const { description } = currentMap ?? {};
  const { templateId, descriptionForMapMaker } = description ?? {};
  const CurrentMapRef = useRef<StateMap | null>(null);


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

  const handleDownloadPdf = () => {
    const templateWrapper = document.querySelector(".template-content-wrapper");
    if (!templateWrapper || !currentMap) return;

    const Template = templateWrapper.querySelector<HTMLElement>(".template");
    if (!Template) return;

    downloadPdfFromTemplate(
      Template,
      currentMap.name,
      getTemplate(templateId ?? "")?.name ?? "none",
      currentMap.description.templatePrintSettings
    );
  };

  useEffect(() => {
    CurrentMapRef.current = currentMap;
  }, [currentMap]);

  return (
    <>
      <div className="nav panel description">
        <div className="top-block">
          <p className="panel-name t-panel-name">Description</p>
          <SelectsGroup/>
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
        <TemplateGroup templateId={templateId?.toString() ?? ""}/>
      </div>
    </>
  );
}
