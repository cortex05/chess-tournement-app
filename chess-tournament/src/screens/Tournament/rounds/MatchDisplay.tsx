import React, { useState } from "react";

import styles from "./Rounds.module.css";
import type { IMatch, ITournament } from "../../../types/types";
import Modal from "../../../components/Modals/Modal";
import MatchModal from "./matches/MatchModal";

type Props = {
  match: IMatch;
  tournament: ITournament;
  matches: IMatch[];
  setMatchHolder: Function;
  setFinishedMatches: Function;
  finishedMatches: IMatch[];
  setRoundScore: Function;
  calculateRound: Function;
};

const MatchDisplay = (props: Props) => {
  const {
    match,
    tournament,
    matches,
    setMatchHolder,
    setFinishedMatches,
    finishedMatches,
    setRoundScore,
    calculateRound,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div className={styles.matchItem} onClick={() => setIsModalOpen(true)}>
        <span>{match.playerOne.name}</span>
        <span>VS</span>
        <span>{match.playerTwo.name}</span>
      </div>
      <Modal tall={true} isOpen={isModalOpen} onClose={() => console.log("")}>
        <MatchModal
          match={match}
          tournament={tournament}
          closeModal={setIsModalOpen}
          matches={matches}
          setMatchHolder={setMatchHolder}
          setFinishedMatches={setFinishedMatches}
          finishedMatches={finishedMatches}
          setRoundScore={setRoundScore}
          calculateRound={calculateRound}
        />
      </Modal>
    </div>
  );
};

export default MatchDisplay;
