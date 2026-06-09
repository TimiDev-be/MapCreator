import "../../styles/_searchBar.scss";
import { useState } from "react";
import SearchLogo from "../../../assets/material-symbols_search.svg?react";
import type { Feature } from "maplibre-gl";
import SearchResultElement from "./SearchResultElement";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<Feature[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const RequestUrl = `https://nominatim.openstreetmap.org/search?q=${searchValue}&format=geojson&polygon_geojson=1&addressdetails=1`;
      const Response = await fetch(RequestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (Response.ok) {
        const data = await Response.json();
        if (data.features) {
          setResults(data.features);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search-bar">
        <div className="wrapper">
          <button
            type="button"
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            <SearchLogo width={32} height={32} />
          </button>
          <input
            type="text"
            name="search"
            id="search-input"
            placeholder="yours place..."
            className="search-field t-form-field"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {!loading && results.length > 0 && (
          <button
            type="button"
            className="result-button t-result-small"
            onClick={() => setShowResults((prev) => !prev)}
          >
            {showResults ? "Hide results" : `Show results (${results.length})`}
          </button>
        )}
        <ul className="result-list">
          {searchValue.trim().length > 0 && !loading && results.length == 0 && (
            <li className="t-result-small">No results found</li>
          )}
          {showResults &&
            results.map((feature) => (
              <SearchResultElement
                key={crypto.randomUUID()}
                feature={feature}
              />
            ))}
        </ul>
      </div>
    </>
  );
}
