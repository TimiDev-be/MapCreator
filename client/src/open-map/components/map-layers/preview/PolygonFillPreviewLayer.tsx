import { RLayer } from "maplibre-react-components"
import { UserSourceDrawPreviewId } from "../../../../shared/types/UserSource"

export default function PolygonFillPreviewLayer() {
  return(
    <>
      <RLayer
        id={`${UserSourceDrawPreviewId}-fill`}
        type="fill"
        source={UserSourceDrawPreviewId}
        filter={["==", ["geometry-type"], "Polygon"]}
        paint={{ "fill-color": "rgba(255, 0, 0, 0.2)" }}
      />
    </>
  )
}