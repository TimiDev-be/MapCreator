import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import type { UserSource } from "../types/UserSource";
import type { Group } from "../types/Group";
import { SOURCE_CONTEXT } from "../contexts/SourceContext";
import type { Config } from "../types/Config";
import { ToastContainer } from 'react-toastify';
import type { StateMap } from "../types/StateMap";
import LoadingScreen from "../components/LoadingScreen";

export default function SourceProvider() {
  const [maps, setMaps] = useState<StateMap[]>([]);
  const [currentMap, setCurrentMap] = useState<StateMap | null>(null);
  const [currentSource, setCurrentSource] = useState<UserSource | undefined>(undefined);
  const [currentGroup, setCurrentGroup] = useState<Group | undefined>(undefined);
  const [config, setConfig] = useState<Config | undefined>(undefined);
  const [mapsLoading, setMapsLoading] = useState<boolean>(true);

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
          currentSource,
          setCurrentSource,
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
