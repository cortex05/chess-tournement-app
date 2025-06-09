import React, { useState } from "react";
import type { IMatch, IPlayer, IRoundScore, ITournament } from "../../../../types/types";

import styles from "./MatchModal.module.css";
import { calculateScore, updatePlayersMatched } from "../../../../utilities/functions";
import { PlayerMatched } from "../../../../utilities/utilities";

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
    roundScore,
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
      Who won?
      <span
        className={isActive === "green" ? `${styles.green}` : ""}
        onClick={() => handleClick("green", "playerOne")}
      >
        {match.playerOne.name}
      </span>
      <span
        className={isActive === "red" ? `${styles.red}` : ""}
        onClick={() => handleClick("red", "playerTwo")}
      >
        {match.playerTwo.name}
      </span>
      <span
        className={isActive === "draw" ? `${styles.draw}` : ""}
        onClick={() => handleClick("draw", "draw")}
      >
        Draw
      </span>
      {isActive && matchWinner && (
        <span className={styles.correct} onClick={() => handleSuccess()}>
          Correct?
        </span>
      )}
    </div>
  );
};

export default MatchModal;
