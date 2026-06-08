import type { StateMap } from "./StateMap";

export interface UserSource {
  id: "source-of-user-data";
  maps: StateMap[];
}
