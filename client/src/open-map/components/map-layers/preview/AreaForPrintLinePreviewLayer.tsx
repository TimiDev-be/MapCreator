import { RLayer } from "maplibre-react-components"
import { UserSourceDrawPreviewId } from "../../../../shared/types/UserSource"


export default function AreaForPrintLinePreviewLayer() {
  return(
    <>
      <RLayer
        id={`${UserSourceDrawPreviewId}-area-for-print-line`}
        type="line"
        source={UserSourceDrawPreviewId}
        filter={[
          "all",
          ["==", ["get", "role"], "area-for-print"]
        ]}
        paint={{
          "line-color": "#000000",
          "line-width": 1.5,
          "line-dasharray": [2, 1],
        }}
      />
    </>
  )
}