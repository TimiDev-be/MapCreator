export { default as PolygonEdgesLayer } from "./static/PolygonEdgesLayer";
export { default as PolygonFillLayer } from "./static/PolygonFillLayer";
export { default as LinesLayer } from "./static/LinesLayer";
export { default as DashedLinesLayer } from "./static/DashedLinesLayer";
export { default as PolygonFillPreviewLayer } from "./preview/PolygonFillPreviewLayer";
export { default as LinesPreviewLayer } from "./preview/LinesPreviewLayer";
export { default as PointsPreviewLayer } from "./preview/PointsPreviewLayer";
export { default as AreaForPrintLinePreviewLayer } from "./preview/AreaForPrintLinePreviewLayer";

export const LayersIds: string[] = [ 
  "source-of-user-data-edges",
  "source-of-user-data-fill",
  "source-of-user-data-lines",
  "source-of-user-data-lines-dashed",
  "draw-preview-fill",
  "draw-preview-line",
  "draw-preview-points",
  "draw-preview-area-for-print-line"
]