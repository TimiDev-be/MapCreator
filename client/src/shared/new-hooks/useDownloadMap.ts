import { useRef, useState } from "react";
import type { Map } from "../types/Map";

export const useDownloadMap = () => {
  const [downloadParams, setDownloadParams] = useState<{map: Map} | null>(null);
  const DownloadPromiseRef = useRef<((value: string) => void) | null>(null);

  const handleDownloadLoad = (dataUrl: string) => {
    if (DownloadPromiseRef.current) {
      DownloadPromiseRef.current(dataUrl);
    }
    setDownloadParams(null);
    DownloadPromiseRef.current = null;
  }

  const downloadURIData = async (map: Map) : Promise<string | undefined> => {
    if (DownloadPromiseRef.current != null) return undefined; 
    return new Promise<string>((resolve) => {
      DownloadPromiseRef.current = resolve;
      setDownloadParams({map});
    });
  }

  return {
    handleDownloadLoad, 
    downloadURIData,
    downloadParams
  }
}