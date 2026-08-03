import "../styles/_quickMenu.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomSelect from "../../shared/components/CustomSelect.tsx";
import type { CustomSelectOption } from "../../shared/types/CustomSelectOption.ts";
import TrashLogo from "../../assets/tabler_trash-filled.svg?react";
import { useSesstionSortOption } from "../../shared/new-hooks/useSessionSortOption.ts";
import { useQuickMenu } from "../../shared/new-hooks/useQuickMenu.ts";

const {getOption} = useSesstionSortOption();

export default function QuickMenu() {
  const {toggleAll, toggleSort, deleteChecked, SELECT_OPTIONS} = useQuickMenu()
  const [selectValue, setSelectValue] = useState<CustomSelectOption>(getOption);

  const selectOption = (option: CustomSelectOption) => {
    setSelectValue(option);
    toggleSort(option.value);
    sessionStorage.setItem("mapsSort", JSON.stringify(option));
  };

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
          defaultOption={selectValue}
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
