import "../styles/_quickMenu.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomSelect from "../../shared/components/CustomSelect.tsx";
import type { CustomSelectOption } from "../../shared/types/CustomSelectOption.ts";
import { SORT_ORDER } from "../../shared/types/SortOrder.ts";
import TrashLogo from "../../assets/tabler_trash-filled.svg?react";
import { useMaps } from "../../hooks/Maps";

const SELECT_OPTIONS: CustomSelectOption[] = [
  { id: crypto.randomUUID(), value: SORT_ORDER.DF },
  { id: crypto.randomUUID(), value: SORT_ORDER.AZ },
  { id: crypto.randomUUID(), value: SORT_ORDER.ZA },
];

export default function QuickMenu() {
  const { toggleSort, toggleAll, deleteChecked } = useMaps();
  const [selectValue, setSelectValue] = useState<CustomSelectOption>(
    SELECT_OPTIONS[0],
  );

  const selectOption = (option: CustomSelectOption) => {
    setSelectValue(option);
  };

  useEffect(() => {
    toggleSort(selectValue.value);
  }, [selectValue]);

  return (
    <>
      <div className="quick-menu maps">
        <button
          type="button"
          className="remove-map-button"
          onClick={deleteChecked}
        >
          <TrashLogo width={32} height={32} />
        </button>
        <CustomSelect
          type="default"
          selectName="sort by"
          options={SELECT_OPTIONS}
          defaultOption={SELECT_OPTIONS[0]}
          selectOption={selectOption}
        />
        <div className="checkbox-group">
          <label htmlFor="check-all-checkbox" className="t-quick-menu-content">
            check all
          </label>
          <input
            type="checkbox"
            name="check-all"
            id="check-all-checkbox"
            onChange={(e) => toggleAll(e.target.checked)}
          />
        </div>
        <Link
          to={"new-map"}
          className="create-new-map-link t-quick-menu-content"
        >
          create new
        </Link>
      </div>
    </>
  );
}
