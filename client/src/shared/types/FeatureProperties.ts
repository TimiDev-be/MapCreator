export interface FeatureProperties {
  name: string;
  mapId: string;
  groupId?: string;
  role?: string;
  visible?: boolean;
  opacity: number;
  minZoom: number;
  maxZoom: number;
}
