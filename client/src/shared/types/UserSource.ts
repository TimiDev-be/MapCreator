import type { Map } from "./Map";

export interface UserSource {
  id: "source-of-user-data";
  maps: Map[];
}
