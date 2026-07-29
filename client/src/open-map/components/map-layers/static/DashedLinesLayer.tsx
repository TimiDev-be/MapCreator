import { RLayer } from "maplibre-react-components"
import { ZoomVisibilityFilter } from "../../../../shared/utils/ZoomVisibilityFilter"
import { UserSourceId } from "../../../../shared/types/UserSource"

export default function DashedLinesLayer() {
  return(
    <>
      <RLayer
        id={`${UserSourceId}-lines-dashed`}
        type="line"
        source={UserSourceId}
        filter={[
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["!=", ["get", "lineDash"], null],
          ...ZoomVisibilityFilter.slice(1),
        ]}
        paint={{
          "line-color": ["get", "color"],
          "line-width": ["get", "lineWidth"],
          "line-dasharray": ["get", "lineDash"],
          "line-opacity": 1,
        }}
      />
    </>
  )
}