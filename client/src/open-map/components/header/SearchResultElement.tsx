import type { Feature } from "maplibre-gl";

type Props = {
  feature: Feature;
  onJump: (feature: Feature) => void;
};

export default function SearchResultElement({ feature, onJump }: Props) {
  const { display_name } = feature.properties;
  return (
    <>
      <li
        className="result-element"
        title={display_name}
        onClick={() => onJump(feature)}
      >
        <span className="name t-result-big">
          {display_name.slice(0, 60)} {display_name.length > 60 ? "..." : ""}
        </span>
      </li>
    </>
  );
}
