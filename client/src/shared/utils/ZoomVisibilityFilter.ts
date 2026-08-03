export const ZoomVisibilityFilter : any = [
  ["boolean", ["get", "visible"], true],
  ["<=", ["coalesce", ["get", "minZoom"], 0], ["zoom"]],
  [">=", ["coalesce", ["get", "maxZoom"], 22], ["zoom"]]
];