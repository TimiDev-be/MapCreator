import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import type { UserSource } from "../types/UserSource";
import type { Group } from "../types/Group";
import { SOURCE_CONTEXT } from "../contexts/SourceContext";
import type { Map } from "../classes/Map";

export default function SourceProvider() {
  const [currentSource, setCurrentSource] = useState<UserSource | undefined>(
    undefined,
  );
  const [currentMap, setCurrentMap] = useState<Map | undefined>(undefined);
  const [currentGroup, setCurrentGroup] = useState<Group | undefined>(
    undefined,
  );
  const [mapStyle, setMapStyle] = useState<string | undefined>(undefined);

  //load data
  const loadSourceDataToState = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_LINK}/data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseJson = await response.json();
      const parsedData = JSON.parse(responseJson.data);
      setCurrentSource(
        parsedData ?? { id: "source-of-user-data", maps: [], templates: [] },
      );
    } else {
      setCurrentSource({ id: "source-of-user-data", maps: [], templates: [] });
    }
  };

  const loadStyleToState = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_LINK}/style`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseJson = await response.json();
      setMapStyle(responseJson.styleUrl);
    } else {
      setMapStyle(undefined);
    }
  };

  useEffect(() => {
    const handleLoad = async () => {
      await loadSourceDataToState();
      await loadStyleToState();
    };
    handleLoad();
  }, []);

  return (
    <>
      <SOURCE_CONTEXT.Provider
        value={{
          currentSource,
          setCurrentSource,
          currentMap,
          setCurrentMap,
          currentGroup,
          setCurrentGroup,
          mapStyle,
        }}
      >
        <Outlet />
      </SOURCE_CONTEXT.Provider>
    </>
  );
}
