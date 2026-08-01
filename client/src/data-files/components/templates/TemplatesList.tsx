import { useEffect } from "react";
import { useSource } from "../../../shared/new-hooks/useSource";
import TemplateListElement from "./TemplateListElement";
import { useTemplate } from "../../../shared/new-hooks/useTemplate";
import LoadingScreen from "../../../shared/components/LoadingScreen";

export default function TemplatesList() {
  const { config, templates, templatesLoading } = useSource();
  const { getTemplates } = useTemplate();

  useEffect(() => {
    if (!config) return;
    getTemplates();
  }, [config]);

  if (!config || templatesLoading)
    return <LoadingScreen/>;

  return (
    <>
      <ul className="templates-list">
        {templates.map(t => (
          <TemplateListElement key={t.id} template={t}/>
        ))}
      </ul>
    </>
  );
}
