import { useState } from "react";
import type {
  IMatch,
  IRoundScore,
  ITournament,
} from "../../../types/types";

import styles from "./Rounds.module.css";
import MatchDisplay from "./MatchDisplay";
import { Button } from "@mui/material";


type Props = {
  matches: IMatch[];
  tournament: ITournament;
  setMatchHolder: Function;
  roundScore: IRoundScore
  setRoundScore: Function
  setTeamOneRoster: Function
  setTeamTwoRoster: Function
  setRoundStart: Function
};

const RoundActive = (props: Props) => {
  const { matches, tournament, setMatchHolder, roundScore, setRoundScore, setTeamOneRoster, setTeamTwoRoster, setRoundStart } = props;
  const [finishedMatches, setFinishedMatches] = useState<IMatch[]>([]);

  const endRound = () => {
    tournament.round++
    // save tournament
    const jsonTournament = JSON.stringify(tournament);
    localStorage.setItem(tournament.name.toUpperCase(), jsonTournament);

    setTeamOneRoster(tournament.teams[0].teamRoster)
    setTeamTwoRoster(tournament.teams[1].teamRoster)
    setRoundStart(true)
  }

  return (
    <div className={styles.main}>
      <h2>Round {tournament.round}</h2>
      <div className={styles.scoreBoard}>
        {roundScore?.teamOneScore !== undefined && (
          <h3>Team One: {roundScore?.teamOneScore}</h3>
        )}
        {roundScore?.teamTwoScore !== undefined && (
          <h3>Team Two: {roundScore?.teamTwoScore}</h3>
        )}
      </div>
      <div className={styles.matchesField}>
        {matches.map((match, index) => {
          return (
            <MatchDisplay
              match={match}
              key={index}
              tournament={tournament}
              matches={matches}
              setMatchHolder={setMatchHolder}
              setFinishedMatches={setFinishedMatches}
              finishedMatches={finishedMatches}
              roundScore={roundScore}
              setRoundScore={setRoundScore}
            />
          );
        })}
      </div>
      {(matches.length > 0 || finishedMatches.length > 0) && (
        <div>
          <div className={styles.holderArray}>
            {finishedMatches.map((match, index) => {
              return (
                <div key={index} className={styles.matchItem}>
                  {match.winner === "draw" && (
                    <div>
                      <h5>Draw</h5>
                      <p>
                        {match.playerOne.name}/{match.playerTwo.name}
                      </p>
                    </div>
                  )}
                  {match.winner !== "draw" && (
                    <div>
                      <h4>Winner: {match.playerOne.name}</h4>
                      <h6>vs {match.playerTwo.name}</h6>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {matches.length === 0 && finishedMatches.length > 0 && <div className={styles.roundOver}>
            <h3>Round over. Proceed to the next?</h3>
            <Button variant="outlined" onClick={() => endRound()}>Next Round</Button>
          </div>}
    </div>
  );
};

export default RoundActive;
