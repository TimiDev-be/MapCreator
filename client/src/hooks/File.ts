import { useSource } from "./Source";

export const useFile = () => {
  const { setCurrentSource, currentSource } = useSource();

  const importFile = async (file: File) => {
    const String = await file.text();
    const Json = JSON.parse(String);
    if (!Json.maps) return;
    const isNewFormat = Json.maps.every((map) => Array.isArray(map.features));
    if (!isNewFormat) return;
    setCurrentSource({ id: "source-of-user-data", maps: Json.maps });
    localStorage.setItem(
      "source-of-user-data",
      JSON.stringify({ id: "source-of-user-data", maps: Json.maps }),
    );
  };

  const downloadFile = () => {
    const data = JSON.stringify(currentSource);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mapy-${new Date().toLocaleString("pl-PL", { timeZoneName: "short" })}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { importFile, downloadFile };
};
