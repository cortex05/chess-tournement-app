import React, { useState } from "react";

import styles from "./Rounds.module.css";
import type { IMatch } from "../../../types/types";
import Modal from "../../../components/Modals/Modal";
import MatchModal from "./matches/MatchModal";

type Props = {
  match: IMatch;
};

const MatchDisplay = (props: Props) => {
  const { match } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div>
      <div className={styles.matchItem} onClick={() => setIsModalOpen(true)}>
        <span>{match.playerOne.name}</span>
        <span>VS</span>
        <span>{match.playerTwo.name}</span>
      </div>
      <Modal tall={true} isOpen={isModalOpen} onClose={() => console.log("click")}>
        <MatchModal match={match}/>
      </Modal>
    </div>
  );
};

export default MatchDisplay;
