import React, { useState } from "react";
import type { IMatch, ITournament } from "../../../types/types";

import styles from "./Rounds.module.css";
import Modal from "../../../components/Modals/Modal";
import MatchDisplay from "./MatchDisplay";

type Props = {
  matches: IMatch[];
  tournament: ITournament;
  setMatchHolder: Function
};

const RoundActive = (props: Props) => {
  const { matches, tournament, setMatchHolder } = props;
  const [finishedMatches, setFinishedMatches] = useState<IMatch[]>([])

  return (
    <div className={styles.main}>
      Round {tournament.round}
      <div className={styles.matchesField}>
        {matches.map((match, index) => {
          return <MatchDisplay match={match} key={index} tournament={tournament} matches={matches} setMatchHolder={setMatchHolder} setFinishedMatches={setFinishedMatches} finishedMatches={finishedMatches}/>;
        })}
        {matches.length > 0 && <div>
          {finishedMatches.map((match, index) => {
            return <div key={index}>{match.winner}</div>
          })}</div>}
      </div>
    </div>
  );
};

export default RoundActive;
