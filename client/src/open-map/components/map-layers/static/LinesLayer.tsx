import { RLayer } from "maplibre-react-components"
import { ZoomVisibilityFilter } from "../../../../shared/utils/ZoomVisibilityFilter"
import { UserSourceId } from "../../../../shared/types/UserSource"

export default function LinesLayer() {
  return(
    <>
      <RLayer
        id={`${UserSourceId}-lines`}
        type="line"
        source={UserSourceId}
        filter={[
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["==", ["get", "lineDash"], null],
          ...ZoomVisibilityFilter.slice(1),
        ]}
        paint={{
          "line-color": ["get", "color"],
          "line-width": ["get", "lineWidth"],
          "line-opacity": 1,
        }}
      />
    </>
  )
}