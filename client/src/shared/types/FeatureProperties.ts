export interface FeatureProperties {
  name: string;
  mapId: string;
  groupId?: string;
  role?: string;
  visible?: boolean;
  minZoom: number;
  maxZoom: number;
}
