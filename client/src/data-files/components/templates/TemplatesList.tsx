import { useSource } from "../../../shared/hooks/Source";
import TemplateListElement from "./TemplateListElement";

export default function TemplatesList() {
  const { currentSource } = useSource();

  return (
    <>
      <ul className="templates-list">
        {currentSource &&
          currentSource.templates &&
          currentSource.templates.map((template) => (
            <TemplateListElement key={template.id} template={template} />
          ))}
      </ul>
    </>
  );
}
