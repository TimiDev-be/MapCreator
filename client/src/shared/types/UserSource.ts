import type { StateMap } from "./StateMap";
import type { DescriptionTemplate } from "./DescriptionTemplate";

export const UserSourceId = "source-of-user-data" as const;
export const UserSourceDrawPreviewId = "draw-preview" as const;

export interface UserSource {
  id: typeof UserSourceId;
  maps: StateMap[];
  templates: DescriptionTemplate[];
}