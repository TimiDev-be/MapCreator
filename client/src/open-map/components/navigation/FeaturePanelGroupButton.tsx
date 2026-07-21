import { useState, type ReactNode } from "react";
import NextLogo from "../../../assets/ooui_next-ltr.svg?react";
import "../../styles/_featurePanelGroupButton.scss";

type Props = {
  groupName: string,
  children: ReactNode
}

export default function FeaturePanelGroupButton({children, groupName} : Props) {
  const [active, setActive] = useState<boolean>(false);

  return(
    <>
      <div className="feature-panel-group-container">
        <button type="button" 
          className={`feature-panel-group-button ${active ? "active" : ""}`}
          onClick={() => setActive(prev => !prev)}>
          <p className="group-name t-panel-small">{groupName}</p>
          <NextLogo width={16} height={16}/>
        </button>
        <div className={`bottom-block ${active ? "active" : ""}`}>
          {children}
        </div>
      </div>
    </>
  )
}