import type { Group } from "../types/Group";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Config } from "../types/Config";
import type { StateMap } from "../types/StateMap";
import type { DescriptionTemplate } from "../types/DescriptionTemplate";

type Context = {
  maps: StateMap[],
  setMaps: Dispatch<SetStateAction<StateMap[]>>;
  mapsLoading: boolean;
  setMapsLoading: Dispatch<SetStateAction<boolean>>;
  templates: DescriptionTemplate[],
  setTemplates: Dispatch<SetStateAction<DescriptionTemplate[]>>;
  templatesLoading: boolean,
  setTemplatesLoading: Dispatch<SetStateAction<boolean>>;
  currentMap: StateMap | null;
  setCurrentMap: Dispatch<SetStateAction<StateMap | null>>;
  currentGroup: Group | undefined;
  setCurrentGroup: Dispatch<SetStateAction<Group | undefined>>;
  config: Config | undefined;
};

export const SOURCE_CONTEXT = createContext<Context | undefined>(undefined);
