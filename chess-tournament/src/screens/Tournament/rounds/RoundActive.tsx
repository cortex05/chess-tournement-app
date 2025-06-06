import React from "react";
import type { IMatch, ITournament } from "../../../types/types";

import styles from "./Rounds.module.css";
import Modal from "../../../components/Modals/Modal";
import MatchDisplay from "./MatchDisplay";

type Props = {
  matches: IMatch[];
  tournament: ITournament;
};

const RoundActive = (props: Props) => {
  const { matches, tournament } = props;
  return (
    <div className={styles.main}>
      Round {tournament.round}
      <div className={styles.matchesField}>
        {matches.map((match, index) => {
          return (
            
              <MatchDisplay match={match} key={index}/>
            
          );
        })}
      </div>
    </div>
  );
};

export default RoundActive;
