import type { UserSource } from "../types/UserSource";
import type { Map } from "../types/Map";
import type { Group } from "../types/Group";
import { createContext } from "react";

type Context = {
  currentSource: UserSource | undefined;
  setCurrentSource: (value: UserSource | undefined) => void;
  currentMap: React.Ref<Map | null>;
  currentGroup: React.Ref<Group | null>;
};

export const SOURCE_CONTEXT = createContext<Context | undefined>(undefined);
