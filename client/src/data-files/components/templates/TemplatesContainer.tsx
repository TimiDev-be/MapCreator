import "../../styles/_templatesContainer.scss";
import ImportTemplateForm from "./ImportTemplateForm";
import TemplatesList from "./TemplatesList";

export default function TemplatesContainer() {
  return (
    <>
      <div className="templates-container">
        <ImportTemplateForm />
        <TemplatesList />
      </div>
    </>
  );
}
