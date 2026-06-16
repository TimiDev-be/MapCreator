import type { StateMap } from "./StateMap";
import type { DescriptionTemplate } from "./DescriptionTemplate";

export interface UserSource {
  id: "source-of-user-data";
  maps: StateMap[];
  templates: DescriptionTemplate[];
}
