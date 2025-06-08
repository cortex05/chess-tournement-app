import type { IPlayer, ITournament } from "../types/types";
import { PlayerMatched, RoundScore } from "./utilities";

export const handleGameTypeDisplay = (gameType: string) => {
  switch (gameType) {
    case "FFA":
      return "Free-For-All";
    case "TEAM":
      return "Team Tournament";
  }
};

export const calculateScore = (tournament: ITournament) => {
    // calculate team 1 score
    const teamOne = tournament.teams[0].teamRoster;
    const teamOneScore = teamOne.reduce((acc: number, player: IPlayer) => {
      return acc + player.score;
    }, 0);
    console.log(teamOneScore);

    // calculate team 2 score
    const teamTwo = tournament.teams[1].teamRoster;
    const teamTwoScore = teamTwo.reduce((acc: number, player: IPlayer) => {
      return acc + player.score;
    }, 0);
    console.log(teamTwoScore);

    // Find which is greater
    const leader =
      teamOneScore > teamTwoScore
        ? "Team One"
        : teamTwoScore > teamOneScore
        ? "Team Two"
        : "Tied";
    const score = new RoundScore(leader, teamOneScore, teamTwoScore);

    return score;
  };

export const updatePlayersMatched = (playerOne: IPlayer, playerTwo: IPlayer) => {
    // if player 2 is not in playerOne
    if (
      playerOne.playersMatched.filter((playerMatched) => {
        return playerMatched.playerId === playerTwo.id;
      }).length === 0
    ) {
      const newRecord = new PlayerMatched(playerTwo.id, playerTwo.name);
      playerOne.playersMatched = [...playerOne.playersMatched, newRecord];
    } else {
      const targetIndex = playerOne.playersMatched.map((e) => e.playerId).indexOf(playerTwo.id);
      console.log(targetIndex)
      playerOne.playersMatched[targetIndex].numberOfMatches++;
    }
  }  

// export const handlePluralTournament = (title: string) => {

// }