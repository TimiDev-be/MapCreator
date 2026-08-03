import { useContext } from "react"
import { OpenMapContext } from "../../open-map/contexts/OpenMapContext"

export const useOpenMapPage = () => {
  const Context = useContext(OpenMapContext);
  if (!Context) throw new Error("Open map page context is undefined");
  return Context;
}