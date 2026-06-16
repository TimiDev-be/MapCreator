import { Link, useLocation } from "react-router-dom";
import "../styles/_templatePreviewSubpage.scss";

export default function TemplatePreviewSubpage() {
  const { template } = useLocation().state ?? {};

  return (
    <>
      <div className="template-preview subpage">
        <Link
          to={"/data-files"}
          className="back-from-template-preview-link t-panel-medium"
        >
          back
        </Link>
        <div className="wrapper">
          {template && (
            <div
              dangerouslySetInnerHTML={{ __html: template.htmlContent }}
            ></div>
          )}
          {!template && <p className="t-panel-big">Template not found</p>}
        </div>
      </div>
    </>
  );
}
