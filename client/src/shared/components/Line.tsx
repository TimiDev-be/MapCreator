import "../styles/_line.scss";

type Props = {
  height: number;
};

export default function Line({ height }: Props) {
  return (
    <>
      <div className="line" style={{ height: `${height}px` }}></div>
    </>
  );
}
