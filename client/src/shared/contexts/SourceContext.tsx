import type { UserSource } from "../types/UserSource";
import type { Group } from "../types/Group";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Config } from "../types/Config";
import type { StateMap } from "../types/StateMap";

type Context = {
  currentSource: UserSource | undefined;
  setCurrentSource: Dispatch<SetStateAction<UserSource | undefined>>;
  currentMap: StateMap | null;
  setCurrentMap: Dispatch<SetStateAction<StateMap | null>>;
  currentGroup: Group | undefined;
  setCurrentGroup: Dispatch<SetStateAction<Group | undefined>>;
  config: Config | undefined;
};

export const SOURCE_CONTEXT = createContext<Context | undefined>(undefined);
