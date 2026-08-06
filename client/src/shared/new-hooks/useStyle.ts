import { toast } from "react-toastify"
import type { MapStyle } from "../types/MapStyle"
import { useSource } from "../new-hooks/useSource"

/**
 * currently unused becasue of newly added web socket communication about active styles
 */
export const useStyle = () => {
  const {config} = useSource();
  const apiUrl : string = config ? config.api.link + "/styles" : "/styles";

  const getStyles = async () : Promise<MapStyle[]> => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while fetching map styles"
        );
        toast.error(message);
        return [];
      }

      const styles : MapStyle[] = await response.json();
      return styles;
    } catch {
      toast.error("Something went wrong while fetching map styles");
      return [];
    }
  }

  return { getStyles }
}