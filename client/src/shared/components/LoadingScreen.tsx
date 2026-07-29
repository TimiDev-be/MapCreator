import "../styles/_loadingScreen.scss";

export default function LoadingScreen() {
  return(
    <div id="loading-screen">
      <div className="dots">
        <span className="dot"></span><span className="dot"></span><span className="dot"></span>
      </div>
    </div>
  )
}