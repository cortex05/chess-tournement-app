import React, { useState } from "react";
import type { IMatch } from "../../../../types/types";

import styles from './MatchModal.module.css'
type Props = {
  match: IMatch;
};
const MatchModal = (props: Props) => {
  const { match } = props;
  const [isActive, setIsActive] = useState<string>("")

  const handleClick = (color: string) => {
    console.log(color)
    switch (color){
      case "green":
        isActive === "green" ? setIsActive("") : setIsActive("green")
        break;
      case "red":
        isActive === "red" ? setIsActive("") : setIsActive("red")
        break;
      case "draw":
        isActive === "draw" ? setIsActive("") : setIsActive("draw")
        break;  
    }
  }

  return (
    <div className={styles.matchModal}>
      Who won?
      <span className={isActive === "green" ? `${styles.green}` : ""} onClick={() => handleClick("green")}>{match.playerOne.name}</span>
      <span className={isActive === "red" ? `${styles.red}` : ""} onClick={() => handleClick("red")}>{match.playerTwo.name}</span>
      <span className={isActive === "draw" ? `${styles.draw}` : ""} onClick={() => handleClick("draw")}>draw</span>
    </div>
  );
};

export default MatchModal;
