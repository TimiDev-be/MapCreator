import "../styles/_header.scss";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <>
      <header className="maps-header">
        <Link to={"/"} className="app-name t-app-name">
          MapCreator
        </Link>
        <nav>
          {(pathname.includes("/data-files") ||
            pathname.includes("/new-map")) && (
            <Link to={"/"} className="nav-link t-nav-link">
              back
            </Link>
          )}
          {!pathname.includes("/data-files") &&
            !pathname.includes("/new-map") && (
              <Link to={"/data-files"} className="nav-link t-nav-link">
                data files
              </Link>
            )}
        </nav>
      </header>
    </>
  );
}
