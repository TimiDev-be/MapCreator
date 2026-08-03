import "../../styles/_descriptionPanel.scss";
import Line from "../../../shared/components/Line.tsx";
import { useEffect, useRef } from "react";
import TemplateGroup from "./description-groups/TemplateGroup.tsx";
import SelectsGroup from "./description-groups/SelectsGroup.tsx";
import { useDownloading } from "../../../shared/new-hooks/useDownloading.ts";
import { useOpenMapPage } from "../../../shared/new-hooks/useOpenMapPage.ts";
import type { Map } from "../../../shared/types/Map.ts";
import { useMapDescription } from "../../../shared/new-hooks/useMapDescription.ts";
import type { MapDescription } from "../../../shared/types/MapDescription.ts";
import { useTemplate } from "../../../shared/new-hooks/useTemplate.ts";

export default function DescriptionPanel() {
  const { downloadTemplateFile } = useDownloading();
  const { currentMap } = useOpenMapPage();
  const { updateDescriptionValues } = useMapDescription();
  const { getTemplate } = useTemplate();
  const {templateId, descriptionForMapMaker} = currentMap?.description ?? {};
  const CurrentMapRef = useRef<Map | null>(null);

  const updateMapDescriptionForMapMaker = async (description: string) => {
    if (!CurrentMapRef.current) return;

    const NewDescription : MapDescription = {
      ...CurrentMapRef.current.description,
      descriptionForMapMaker: description,
    }
    await updateDescriptionValues(NewDescription);
  };

  const handleDownloadPdf = async () => {
    const templateWrapper = document.querySelector(".template-content-wrapper");
    if (!templateWrapper || !currentMap) return;

    const Template = templateWrapper.querySelector<HTMLElement>(".template");
    if (!Template) return;

    const TemplateObj = await getTemplate(templateId ?? "something");

    await downloadTemplateFile(
      Template,
      currentMap.name,
      TemplateObj?.name ?? "none",
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
