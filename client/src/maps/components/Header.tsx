import "../styles/_header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="maps-header">
        <p className="app-name t-app-name">MapCreator</p>
        <nav>
          <Link to={"/data-files"} className="nav-link t-nav-link">
            data files
          </Link>
        </nav>
      </header>
    </>
  );
}
