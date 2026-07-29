import "../../styles/_header.scss";
import SearchBar from "./SearchBar";
import CloseLogo from "../../../assets/material-symbols_close.svg?react";
import { Link } from "react-router-dom";
import { useOpenMapPage } from "../../../shared/new-hooks/useOpenMapPage";

export default function Header() {
  const { currentMap } = useOpenMapPage();
  const { name } = currentMap ?? {};

  return (
    <>
      <header className="open-map-header">
        <p className="name-of-map t-name-of-map">
          map / {name?.slice(0, 40)} {name && name.length > 40 ? "..." : ""}
        </p>
        <SearchBar />
        <Link to="/" className="close-open-map-link">
          <CloseLogo width={32} height={32} />
        </Link>
      </header>
    </>
  );
}
