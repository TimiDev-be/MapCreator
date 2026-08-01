import "../styles/_downloadContent.scss";
import Line from "../../shared/components/Line";
import { useDownloading } from "../../shared/new-hooks/useDownloading";

export default function DownloadContent() {
  const {downloadDataFile} = useDownloading();

  return (
    <>
      <div className="download-content">
        <p className="form-title t-form-title">Export Drawings to JSON</p>
        <p className="form-subtitle t-form-subtitle">
          Download your current drawings as a JSON file to back up or share
          them.
        </p>
        <button
          type="button"
          className="download-data-button t-form-field"
          onClick={downloadDataFile}
        >
          download
        </button>
        <Line height={1} />
      </div>
    </>
  );
}
