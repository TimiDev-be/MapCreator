import { toast } from "react-toastify";
import { useSource } from "../new-hooks/useSource"
import type { Map } from "../types/Map";

export const useMap = () => {
  const {config, setMaps, setMapsLoading} = useSource();
  const apiUrl : string = config ? config.api.link + "/maps" : "/maps";

  const getMaps = async () : Promise<Map[] | null> => {
    try {
      setMapsLoading(true);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while fetching maps"
        );
        toast.error(message);
        return null;
      }
      
      const maps : Map[] = await response.json();
      setMaps(maps.map(m => ({...m, checked: false})));
      return maps;
    }
    catch {
      toast.error("Something went wrong while fetching maps");
      return null;
    }
    finally {
      setMapsLoading(false);
    }
  }

  const getMap = async (id: string) : Promise<Map | null> => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while fetching map"
        );
        toast.error(message)
        return null;
      }

      const map : Map = await response.json();
      return map;
    }
    catch (error) {
      toast.error("Something went wrong while fetching map");
      return null;
    }
  }

  const createMap = async (name: string) : Promise<Map | null> => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
      })

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while creating map"
        );
        toast.error(message);
        return null;
      }

      toast.success(`Map "${name} created successfully"`)
      const map : Map = await response.json();
      return map;
    } catch {
      toast.error("Something went wrong while creating map");
      return null;
    }
  }

  const updateMap = async (map: Map) => {
    try {
      const response = await fetch(`${apiUrl}/${map.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(map)
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while updating map"
        );
        toast.error(message);
        return;
      }
    }
    catch {
      toast.error("Something went wrong while updating map");
    }
  }

  const deleteMap = async (id: string) => {
    try {
      const respose = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!respose.ok) {
        const message = await respose.json().then(
          res => res.detail ?? "Something went wrong while deleting map"
        );
        toast.error(message);
        return;
      }

      setMaps(prev => [...prev].filter(m => m.id != id));
      toast.success(`Map deleted successfully`);
    }
    catch {
      toast.error("Something went wrong while deleting map");
    }
  }

  const deleteMaps = async (ids: string[]) => {
    try {
      const response = await fetch(`${apiUrl}/delete-bunch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ids)
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while deleting a bunch of maps"
        );
        toast.error(message);
        return;
      }

      setMaps(prev => [...prev].filter(m => !ids.includes(m.id)));
      toast.success("Bunch of maps deleted successfully");
    } catch {
      toast.error("Something went wrong while deleting a bunch of maps");
    }
  }

  return { getMaps, getMap, createMap, updateMap, deleteMap, deleteMaps }
}