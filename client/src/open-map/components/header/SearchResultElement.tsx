import type { Feature } from "maplibre-gl";

type Props = {
  feature: Feature;
};

export default function SearchResultElement({ feature }: Props) {
  const { display_name } = feature.properties;
  return (
    <>
      <li className="result-element" title={display_name}>
        <span className="name t-result-big">
          {display_name.slice(0, 60)} {display_name.length > 60 ? "..." : ""}
        </span>
      </li>
    </>
  );
}
