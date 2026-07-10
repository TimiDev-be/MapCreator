import "../../styles/_searchBar.scss";
import { useEffect, useState } from "react";
import SearchLogo from "../../../assets/material-symbols_search.svg?react";
import type { Feature } from "geojson";
import SearchResultElement from "./SearchResultElement";
import { useMapContainer } from "../../../shared/hooks/MapContainer";

export default function SearchBar() {
  const { map } = useMapContainer();
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<Feature[]>([]);

  const handleSearch = async () => {
    if (searchValue.trim() == "") return setResults([]);
    try {
      setLoading(true);
      setNotFound(false);
      setShowResults(false);
      setResults([]);

      const RequestUrl = `https://nominatim.openstreetmap.org/search?q=${searchValue}&format=geojson&polygon_geojson=1&addressdetails=1`;
      const Response = await fetch(RequestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (Response.ok) {
        const data = await Response.json();
        if (data.features && data.features.length > 0) {
          setResults(data.features);
          setShowResults(true);
        }
        else setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleJump = (feature: Feature) => {
    if (!map.current) return;
    map.current.fitBounds(feature.bbox as [number, number, number, number], {
      padding: 50,
      duration: 1000,
      essential: true,
    });

    setShowResults(false);
    setSearchValue(feature.properties?.display_name);
  };

  useEffect(() => {
    const handleKey = async (e : KeyboardEvent) => {
      if (e.key === "Enter") {
        await handleSearch();
      } 
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    }
  }, [handleSearch])

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
            placeholder="place to find..."
            className="search-field t-form-field"
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (notFound) setNotFound(false);
            }}
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
        {notFound && searchValue.trim().length > 0 && !loading && results.length == 0 && (
          <p className="result-info t-result-small">No results found</p>
        )}
        <ul className="result-list">
          {showResults &&
            results.map((feature) => (
              <SearchResultElement
                key={crypto.randomUUID()}
                feature={feature}
                onJump={handleJump}
              />
            ))}
        </ul>
      </div>
    </>
  );
}
