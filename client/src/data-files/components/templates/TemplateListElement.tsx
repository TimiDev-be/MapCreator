import type { DescriptionTemplate } from "../../../shared/types/DescriptionTemplate";
import FileLogo from "../../../assets/line-md_file.svg?react";
import CloseLogo from "../../../assets/material-symbols_close.svg?react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTemplate } from "../../../shared/new-hooks/useTemplate";

type Props = {
  template: DescriptionTemplate;
};

export default function TemplateListElement({ template }: Props) {
  const {deleteTemplate, updateTemplate} = useTemplate();
  const [editName, setEditName] = useState<boolean>(false);
  const NameInputRef = useRef<HTMLInputElement | null>(null);

  const handleDoubleClick = () => {
    setEditName(true);
    setTimeout(() => NameInputRef.current?.focus(), 0);
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!NameInputRef.current) return;
    if (e.target.value.trim().length === 0) {
      NameInputRef.current.value = template.name;
      setEditName(false);
    } else {
      await updateTemplate({...template, name: e.target.value});
    }
  };

  return (
    <>
      <li className="template">
        <button
          type="button"
          className="delete-template-button"
          onClick={() => deleteTemplate(template.id)}
        >
          <CloseLogo width={16} height={16} />
        </button>
        <Link
          to={`template/preview/${template.name}/${template.id}`}
          state={{ template }}
          className="template-preview-link"
        >
          <FileLogo width={48} height={48} />
        </Link>
        <input
          type="text"
          name="template-name"
          id={"template-name-input-" + template.id}
          className="template-name-input t-panel-small"
          readOnly={!editName}
          defaultValue={template.name}
          onBlur={handleBlur}
          onDoubleClick={handleDoubleClick}
          onClick={(e) => e.stopPropagation()}
          ref={NameInputRef}
        />
      </li>
    </>
  );
}
