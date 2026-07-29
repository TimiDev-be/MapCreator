import { useState } from "react";
import { useSource } from "../new-hooks/useSource";
import { useMap } from "./useMap";

export const useMapsListElement = (id: string) => {
  const {setMaps} = useSource();
  const {deleteMap} = useMap();
  const [settingsActive, setSettingsActive] = useState<boolean>(false);
  
  const handleToggleMapChecked = (e : React.ChangeEvent<HTMLInputElement> | boolean) => {
    let value = false;
    if (typeof e == "object") {
      e.stopPropagation();
      value = e.target.checked;
    }
    else 
      value = e;

    setMaps(prev => prev.map(
      m => m.id != id ? m : ({...m, checked: value})
    ));
  }

  const handleToggleSettings = (e : React.MouseEvent, value?: boolean) => {
    e.stopPropagation();
    if (value != undefined) 
      setSettingsActive(value);
    else 
      setSettingsActive((prev) => !prev);
  }

  return { 
    handleToggleMapChecked, 
    handleToggleSettings, 
    settingsActive,
    deleteMap: () => deleteMap(id)
  }
}