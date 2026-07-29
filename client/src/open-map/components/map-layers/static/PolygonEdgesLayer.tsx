import { RLayer } from "maplibre-react-components"
import { ZoomVisibilityFilter } from "../../../../shared/utils/ZoomVisibilityFilter"
import { UserSourceId } from "../../../../shared/types/UserSource"

export default function PolygonEdgesLayer() {
  return(
    <>
      <RLayer
        id={`${UserSourceId}-edges`}
        type="line"
        source={UserSourceId}
        filter={[
          "all",
          [
            "any",
            ["==", ["geometry-type"], "Polygon"],
            ["==", ["geometry-type"], "MultiPolygon"]
          ],
          ...ZoomVisibilityFilter.slice(1)
        ]}
        paint={{
          "line-color": ["get", "borderColor"],
          "line-width": ["get", "lineWidth"],
          "line-opacity": 1,
        }}
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
      />
    </>
  )
}