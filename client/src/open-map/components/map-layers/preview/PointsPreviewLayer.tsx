import { RLayer } from "maplibre-react-components"
import { UserSourceDrawPreviewId } from "../../../../shared/types/UserSource"

export default function PointsPreviewLayer() {
  return(
    <>
      <RLayer
        id={`${UserSourceDrawPreviewId}-points`}
        type="circle"
        source={UserSourceDrawPreviewId}
        filter={["==", ["geometry-type"], "Point"]}
        paint={{
          "circle-radius": 6,
          "circle-color": "#ff0000",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        }}
      />
    </>
  )
}