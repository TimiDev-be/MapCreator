import "../styles/_newMapPage.scss";
import Header from "../../shared/components/Header";
import Line from "../../shared/components/Line";
import NewMapForm from "./NewMapForm";

export default function NewMapPage() {
  return (
    <>
      <section className="new-map page">
        <Header />
        <Line height={1} />
        <NewMapForm />
      </section>
    </>
  );
}
