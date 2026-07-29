import { RLayer } from "maplibre-react-components"
import { UserSourceDrawPreviewId } from "../../../../shared/types/UserSource"

export default function LinesPreviewLayer() {
  return(
    <>
      <RLayer
        id={`${UserSourceDrawPreviewId}-line`}
        type="line"
        source={UserSourceDrawPreviewId}
        filter={[
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["!=", ["get", "role"], "area-for-print"],
        ]}
        paint={{
          "line-color": "#ff0000",
          "line-width": 2.5,
          "line-dasharray": [2, 1],
        }}
      />
    </>
  )
}