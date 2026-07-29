import type { CustomSelectOption } from "../types/CustomSelectOption";
import { SORT_ORDER } from "../types/SortOrder";

export const useSesstionSortOption = () => {
  const SELECT_OPTIONS: CustomSelectOption[] = [
    { id: crypto.randomUUID(), value: SORT_ORDER.DF },
    { id: crypto.randomUUID(), value: SORT_ORDER.AZ },
    { id: crypto.randomUUID(), value: SORT_ORDER.ZA },
  ];

  const getOption = () : CustomSelectOption => {
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

  return { SELECT_OPTIONS, getOption }
}