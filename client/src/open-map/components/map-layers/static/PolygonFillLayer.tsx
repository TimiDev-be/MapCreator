import { RLayer } from "maplibre-react-components"
import { ZoomVisibilityFilter } from "../../../../shared/utils/ZoomVisibilityFilter"
import { UserSourceId } from "../../../../shared/types/UserSource"

export default function PolygonFillLayer() {
  return(
    <>
      <RLayer
        id={`${UserSourceId}-fill`}
        type="fill"
        source={UserSourceId}
        filter={[
          "all",
          [
            "any",
            ["==", ["geometry-type"], "Polygon"],
            ["==", ["geometry-type"], "MultiPolygon"],
          ],
          ...ZoomVisibilityFilter.slice(1)
        ]}
        paint={{
          "fill-color": ["get", "color"],
          "fill-opacity": ["get", "opacity"],
        }}
      />
    </>
  )
}