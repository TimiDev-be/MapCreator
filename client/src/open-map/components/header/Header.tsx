import "../../styles/_header.scss";
import SearchBar from "./SearchBar";
import CloseLogo from "../../../assets/material-symbols_close.svg?react";
import { Link } from "react-router-dom";

type Props = {
  nameOfMap: string;
};

export default function Header({ nameOfMap }: Props) {
  return (
    <>
      <header className="open-map-header">
        <p className="name-of-map t-name-of-map">
          map / {nameOfMap.slice(0, 40)} {nameOfMap.length > 40 ? "..." : ""}
        </p>
        <SearchBar />
        <Link to="/" className="close-open-map-link">
          <CloseLogo width={32} height={32} />
        </Link>
      </header>
    </>
  );
}
