import { toast } from "react-toastify"
import { useSource } from "./useSource"

export const useDownloading = () => {
  const {config} = useSource();
  const apiUrl : string = config ? config.api.link + "/files" : "/files" ;

  const downloadDataFile = async () => {
    try {
      const response = await fetch(apiUrl + "/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while downloading a data file"
        );
        toast.error(message);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `MapCreator_data_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success("Data file downloaded successfully");
    } catch {
      toast.error("eee Something went wrong while downloading a data file");
    }
  }

  const downloadTemplateFile = async () => {

  }


  return {
    downloadDataFile,
    downloadTemplateFile
  }
}