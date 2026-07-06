import "../styles/_quickMenu.scss";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CustomSelect from "../../shared/components/CustomSelect.tsx";
import type { CustomSelectOption } from "../../shared/types/CustomSelectOption.ts";
import { SORT_ORDER } from "../../shared/types/SortOrder.ts";
import TrashLogo from "../../assets/tabler_trash-filled.svg?react";
import { useMaps } from "../../shared/hooks/Maps.ts";
import { useSource } from "../../shared/hooks/Source.ts";

const SELECT_OPTIONS: CustomSelectOption[] = [
  { id: crypto.randomUUID(), value: SORT_ORDER.DF },
  { id: crypto.randomUUID(), value: SORT_ORDER.AZ },
  { id: crypto.randomUUID(), value: SORT_ORDER.ZA },
];

const useSessionSortOption = () : CustomSelectOption => {
  const sessionStorageSortValue = sessionStorage.getItem("mapsSort");
  if (sessionStorageSortValue) {
    try {
      const sessionStorageData = JSON.parse(sessionStorageSortValue);
      if (sessionStorageData.id && sessionStorageData.value) {
        return sessionStorageData;
      }
    } catch (error) {
      return SELECT_OPTIONS[0];
    }
  }
  return SELECT_OPTIONS[0];
}

export default function QuickMenu() {
  const { currentSource } = useSource();
  const { toggleSort, toggleAll, deleteChecked } = useMaps();
  const [selectValue, setSelectValue] = useState<CustomSelectOption>(useSessionSortOption);
  const InitialSortAppliedRef = useRef<boolean>(false);

  const selectOption = (option: CustomSelectOption) => {
    setSelectValue(option);
    toggleSort(option.value);
    sessionStorage.setItem("mapsSort", JSON.stringify(option));
  };

  useEffect(() => {
    if (!currentSource || InitialSortAppliedRef.current) return;
    InitialSortAppliedRef.current = true;
    toggleSort(useSessionSortOption().value);
  }, [currentSource])

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
