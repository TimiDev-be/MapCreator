import "../styles/_dataFilesPage.scss";
import Header from "../../shared/components/Header";
import Line from "../../shared/components/Line";
import ImportForm from "./ImportForm";
import DownloadContent from "./DownloadContent";

export default function DataFilesPage() {
  return (
    <>
      <div className="data-files page">
        <Header />
        <Line height={1} />
        <ImportForm />
        <DownloadContent />
      </div>
    </>
  );
}
