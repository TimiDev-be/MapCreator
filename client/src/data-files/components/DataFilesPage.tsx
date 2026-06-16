import "../styles/_dataFilesPage.scss";
import "../styles/_dataFilesForms.scss";
import Header from "../../shared/components/Header";
import Line from "../../shared/components/Line";
import ImportForm from "./ImportForm";
import DownloadContent from "./DownloadContent";
import TemplatesContainer from "./templates/TemplatesContainer";
import { Outlet } from "react-router-dom";

export default function DataFilesPage() {
  return (
    <>
      <div className="data-files page">
        <Header />
        <Line height={1} />
        <ImportForm />
        <DownloadContent />
        <TemplatesContainer />
        <Outlet />
      </div>
    </>
  );
}
