import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import type { Group } from "../types/Group";
import { SOURCE_CONTEXT } from "../contexts/SourceContext";
import type { Config } from "../types/Config";
import { ToastContainer } from 'react-toastify';
import type { StateMap } from "../types/StateMap";
import LoadingScreen from "../components/LoadingScreen";
import type { DescriptionTemplate } from "../types/DescriptionTemplate";

export default function SourceProvider() {
  const [config, setConfig] = useState<Config | undefined>(undefined);

  // current values
  const [currentMap, setCurrentMap] = useState<StateMap | null>(null);
  const [currentGroup, setCurrentGroup] = useState<Group | undefined>(undefined);

  // maps and templates stored here becasue of ui
  // if not stored required new request to api for actual data
  const [maps, setMaps] = useState<StateMap[]>([]);
  const [mapsLoading, setMapsLoading] = useState<boolean>(true);
  const [templates, setTemplates] = useState<DescriptionTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("config.json")
      .then((res) => res.json())
      .then(setConfig);
  }, []);

  if (!config) return <LoadingScreen/>;

  return (
    <>
      <SOURCE_CONTEXT.Provider
        value={{
          maps,
          setMaps,
          mapsLoading,
          setMapsLoading,
          templates,
          setTemplates,
          templatesLoading,
          setTemplatesLoading,
          currentMap,
          setCurrentMap,
          currentGroup,
          setCurrentGroup,
          config,
        }}
      >
        <Outlet />
        <ToastContainer
          position="bottom-right"
          newestOnTop
          hideProgressBar
          autoClose={5000}/>
      </SOURCE_CONTEXT.Provider>
    </>
  );
}
