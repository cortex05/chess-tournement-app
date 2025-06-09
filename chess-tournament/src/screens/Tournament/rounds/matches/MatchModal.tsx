import { useState } from "react";
import type { IMatch, IRoundScore, ITournament } from "../../../../types/types";

import styles from "./MatchModal.module.css";
import { calculateScore, updatePlayersMatched } from "../../../../utilities/functions";
import { Button, Typography } from "@mui/material";

type Props = {
  match: IMatch;
  tournament: ITournament;
  closeModal: Function;
  matches: IMatch[];
  setMatchHolder: Function;
  setFinishedMatches: Function;
  finishedMatches: IMatch[];
  roundScore: IRoundScore;
  setRoundScore: Function;
};
const MatchModal = (props: Props) => {
  const {
    match,
    tournament,
    closeModal,
    matches,
    setMatchHolder,
    setFinishedMatches,
    finishedMatches,
    setRoundScore,
  } = props;
  const [isActive, setIsActive] = useState<string>("");
  const [matchWinner, setMatchWinner] = useState<string>("");
  const playerOne = match.playerOne;
  const playerTwo = match.playerTwo;
  const tournamentPlayers = tournament.playerRoster;
  // const tTeamOne = tournament.teams[0]
  // const tTeamTwo = tournament.teams[1]

  const handleClick = (color: string, winner: string) => {
    switch (color) {
      case "green":
        isActive === "green" ? setIsActive("") : setIsActive("green");
        break;
      case "red":
        isActive === "red" ? setIsActive("") : setIsActive("red");
        break;
      case "draw":
        isActive === "draw" ? setIsActive("") : setIsActive("draw");
        break;
    }
    setMatchWinner(winner);
  };

  const handleSuccess = () => {
    updatePlayersMatched(playerOne, playerTwo)

    if (matchWinner === "draw") {
      // Update Players and match locally
      playerOne.draws++;
      playerTwo.draws++;

      playerOne.totalMatches++;
      playerTwo.totalMatches++;

      playerOne.score = playerOne.score += 0.5;
      playerTwo.score = playerTwo.score += 0.5;

      match.winner = "Draw";
      setFinishedMatches([...finishedMatches, match]);

      // Update Tournament
      // player roster...
      const filteredRoster = tournamentPlayers.filter((player) => {
        return player.id !== playerOne.id && player.id !== playerTwo.id;
      });
      tournament.playerRoster = [...filteredRoster, playerOne, playerTwo];

      // matches
      const newMatches = matches.filter(
        (oldMatch: IMatch) => oldMatch !== match
      );
      setMatchHolder([...newMatches]);
      closeModal(false);
    } else if (matchWinner === "playerOne") {
      // Update Players and match locally
      playerOne.wins++;
      playerTwo.losses++;

      playerOne.totalMatches++;
      playerTwo.totalMatches++;

      playerOne.score++;

      match.winner = "playerOne";
      setFinishedMatches([...finishedMatches, match]);

      // Update Tournament
      // player roster...
      const filteredRoster = tournamentPlayers.filter((player) => {
        return player.id !== playerOne.id && player.id !== playerTwo.id;
      });
      tournament.playerRoster = [...filteredRoster, playerOne, playerTwo];

      // matches
      const newMatches = matches.filter(
        (oldMatch: IMatch) => oldMatch !== match
      );
      setMatchHolder([...newMatches]);
      closeModal(false);
    } else if (matchWinner === "playerTwo") {
      // Update Players and match locally
      playerOne.losses++;
      playerTwo.wins++;

      playerOne.totalMatches++;
      playerTwo.totalMatches++;

      playerTwo.score++;

      match.winner = "playerTwo";
      setFinishedMatches([...finishedMatches, match]);

      // Update Tournament
      // player roster...
      const filteredRoster = tournamentPlayers.filter((player) => {
        return player.id !== playerOne.id && player.id !== playerTwo.id;
      });
      tournament.playerRoster = [...filteredRoster, playerOne, playerTwo];

      // matches
      const newMatches = matches.filter(
        (oldMatch: IMatch) => oldMatch !== match
      );
      setMatchHolder([...newMatches]);
      closeModal(false);
    }
    setRoundScore(calculateScore(tournament));
  };

  return (
    <div className={styles.matchModal}>
      <Typography variant="body1"></Typography>Who won?
      <span
        className={`${isActive === "green" ? `${styles.green}` : ""} ${styles.outcome}`}
        onClick={() => handleClick("green", "playerOne")}
      >
        <Typography variant="body2">
          {match.playerOne.name}
        </Typography>
        
      </span>
      <span
        className={`${isActive === "red" ? `${styles.red}` : ""} ${styles.outcome}`}
        onClick={() => handleClick("red", "playerTwo")}
      >
        <Typography variant="body2">
          {match.playerTwo.name}
        </Typography>
        
      </span>
      <span
        className={`${isActive === "draw" ? `${styles.draw}` : ""} ${styles.outcome}`}
        onClick={() => handleClick("draw", "draw")}
      >
        Draw
      </span>
      {isActive && matchWinner && (
        <Button variant="outlined" className={styles.correct} onClick={() => handleSuccess()}>
          Correct?
        </Button>
      )}
    </div>
  );
};

export default MatchModal;
