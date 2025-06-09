import { useState } from "react";
import type {
  IMatch,
  IRoundScore,
  ITournament,
} from "../../../types/types";

import styles from "./Rounds.module.css";
import MatchDisplay from "./matches/MatchDisplay";
import { Button, Typography } from "@mui/material";


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
      <Typography variant="h4" gutterBottom>Round {tournament.round}</Typography>
      <div className={styles.scoreBoard}>
        {roundScore?.teamOneScore !== undefined && (
          <Typography variant="h5" gutterBottom>Team One: {roundScore?.teamOneScore}</Typography>
        )}
        {roundScore?.teamTwoScore !== undefined && (
          <Typography variant="h5" gutterBottom>Team Two: {roundScore?.teamTwoScore}</Typography>
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
                      <Typography variant="body1">Winner: {match.playerOne.name}</Typography>
                      <Typography variant="caption">vs {match.playerTwo.name}</Typography>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {matches.length === 0 && finishedMatches.length > 0 && <div className={styles.roundOver}>
            <Typography variant="h6">Round over. Proceed to the next?</Typography>
            <Button variant="outlined" onClick={() => endRound()}>Next Round</Button>
          </div>}
    </div>
  );
};

export default RoundActive;
