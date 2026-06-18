type Props = {
  Width: number;
  Height: number;
  UriData: string;
};

export default function MySvg({ Width, Height, UriData }: Props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="100%"
        height="100%"
        viewBox={`0 0 ${Width} ${Height}`}
        xmlSpace="preserve"
      >
        <image
          style={{
            stroke: "none",
            strokeWidth: 0,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(0,0,0)",
            fillRule: "nonzero",
            opacity: 1,
          }}
          xlinkHref={UriData}
          width={Width}
          height={Height}
        ></image>
      </svg>
    </>
  );
}
