import { useState } from "react";

import styles from "../Rounds.module.css";
import type { IMatch, IRoundScore, ITournament } from "../../../../types/types";
import Modal from "../../../../components/Modals/Modal";
import MatchModal from "./MatchModal";
import { Typography } from "@mui/material";

type Props = {
  match: IMatch;
  tournament: ITournament;
  matches: IMatch[];
  setMatchHolder: Function;
  setFinishedMatches: Function;
  finishedMatches: IMatch[];
  roundScore: IRoundScore
  setRoundScore: Function
};

const MatchDisplay = (props: Props) => {
  const {
    match,
    tournament,
    matches,
    setMatchHolder,
    setFinishedMatches,
    finishedMatches,
    roundScore,
    setRoundScore
  } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // FIX LATER
  // const closeModal = () => {
  //   setIsModalOpen(false)
  // }

  return (
    <div>
      <div className={styles.matchItem} onClick={() => setIsModalOpen(true)}>
        <Typography variant="body1" className={`${match.whitePlayer === "playerOne" ? styles.positive : styles.negative}`}>{match.playerOne.name}</Typography>
        <Typography variant="body2">VS</Typography>
        <Typography variant="body1" className={`${match.whitePlayer === "playerTwo" ? styles.positive : styles.negative}`}>{match.playerTwo.name}</Typography>
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
          roundScore={roundScore}
          setRoundScore={setRoundScore}
        />
      </Modal>
    </div>
  );
};

export default MatchDisplay;
