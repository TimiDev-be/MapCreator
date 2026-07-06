import type { UserSource } from "../types/UserSource";
import type { Group } from "../types/Group";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Map } from "../classes/Map";
import type { Config } from "../types/Config";

type Context = {
  currentSource: UserSource | undefined;
  setCurrentSource: Dispatch<SetStateAction<UserSource | undefined>>;
  currentMap: Map | undefined;
  setCurrentMap: Dispatch<SetStateAction<Map | undefined>>;
  currentGroup: Group | undefined;
  setCurrentGroup: Dispatch<SetStateAction<Group | undefined>>;
  config: Config | undefined;
};

export const SOURCE_CONTEXT = createContext<Context | undefined>(undefined);
