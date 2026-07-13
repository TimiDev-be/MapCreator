import "../styles/_customSelect.scss";
import { useState } from "react";
import NextLogo from "../../assets/ooui_next-ltr.svg?react";
import type { CustomSelectOption } from "../types/CustomSelectOption";

type Props = {
  type: "default" | "field";
  selectName: string;
  defaultOption: CustomSelectOption;
  options: CustomSelectOption[];
  selectOption: (option: CustomSelectOption) => void;
};

export default function CustomSelect({
  type,
  selectName,
  defaultOption,
  options,
  selectOption,
}: Props) {
  const [active, setActive] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
    useState<CustomSelectOption>(defaultOption);

  const TYPO_CLASS =
    type == "field" ? "t-panel-small" : "t-custom-select-content";

  const handleSelect = (SelectedOption: CustomSelectOption) => {
    setSelectedOption(SelectedOption);
    selectOption(SelectedOption);
    setActive(false);
  };

  return (
    <>
      <div className={`custom-select ${TYPO_CLASS}`}>
        <div className="top" onClick={() => setActive((prev) => !prev)}>
          <p className="select-name">{selectName}</p>
          <button
            type="button"
            className={`selected-option-button ${TYPO_CLASS}`}
          >
            {typeof selectedOption.value === "string"
              ? selectedOption.value.slice(0, 16)
              : selectedOption.value.name.slice(0, 16)}
            {typeof selectedOption.value === "string" &&
            selectedOption.value.length > 16
              ? "..."
              : typeof selectedOption.value === "object" &&
                  selectedOption.value.name.length > 16
                ? "..."
                : ""}
            <NextLogo width={16} height={16} />
          </button>
        </div>
        <ul className={`options ${active && "active"}`}>
          {options.map((o) => {
            const active = selectedOption.id == o.id ? "active" : "";
            return (
              <li
                key={o.id}
                className={`custom-select-option ${active}`}
                onClick={() => handleSelect(o)}
              >
                {typeof o.value === "string" ? o.value : o.value.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
