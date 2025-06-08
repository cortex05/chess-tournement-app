import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  IMatch,
  IMatchData,
  IPlayer,
  IRoundScore,
  ITournament,
} from "../../types/types";
import {
  calculateScore,
  handleGameTypeDisplay,
} from "../../utilities/functions";
import styles from "./Tournament.module.css";
import PlayerItemRight from "./Players/PlayerItemRight";
import PlayerItemLeft from "./Players/PlayerItemLeft";
import MatchPlayers from "./Players/MatchPlayers";
import { Button } from "@mui/material";
import RoundActive from "./rounds/RoundActive";
import { mockScore } from "../../utilities/mockData";

// type Props = {
//   name: string;
// };

const Tournament = () => {
  const { tourney } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tournament, setTournament] = useState<ITournament>();
  const [roundStart, setRoundStart] = useState<boolean>(true);

  // Round variables
  const [teamOneRoster, setTeamOneRoster] = useState<IPlayer[]>([]);
  const [teamTwoRoster, setTeamTwoRoster] = useState<IPlayer[]>([]);

  const [matchPlayerOne, setMatchPlayerOne] = useState<IPlayer>();
  const [matchPlayerTwo, setMatchPlayerTwo] = useState<IPlayer>();
  const [matchHolder, setMatchHolder] = useState<IMatch[]>([]);
  const [roundScore, setRoundScore] = useState<IRoundScore>(mockScore);

  const fetchTournament = () => {
    // Move this to utility functions
    if (tourney) {
      const jsonValue = localStorage.getItem(tourney.toUpperCase());
      const value = jsonValue !== null ? JSON.parse(jsonValue) : null
      // console.log("tournament: ", value);
      setTournament(value);
      setTeamOneRoster(value.teams[0].teamRoster);
      setTeamTwoRoster(value.teams[1].teamRoster);
      setIsLoading(false);
      setRoundScore(calculateScore(value));
    }
  };

  useEffect(() => {
    fetchTournament();
  }, []);

  return (
    <div className={styles.main}>
      {isLoading && <div>LOADING</div>}
      {!isLoading && roundStart && (
        <div>
          <h1>
            {tournament?.name} is a{" "}
            {handleGameTypeDisplay(
              tournament?.tournamentType ? tournament.tournamentType : "null"
            )}{" "}
            tournament
          </h1>
          <h2>Round {tournament?.round} set up.</h2>
          <Button onClick={() => console.log("Scoreboard")}>Score</Button>
          <div className={styles.settingRoster}>
            <div>
              <h3>{tournament?.teams[0].name}</h3>
              <div>
                {teamOneRoster?.map((player, index) => {
                  return (
                    <PlayerItemLeft
                      player={player}
                      keyValue={index}
                      setMatchPlayerOne={setMatchPlayerOne}
                      setTeamOneRoster={setTeamOneRoster}
                      teamOneRoster={teamOneRoster}
                      matchPlayerOne={matchPlayerOne}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              {(teamOneRoster.length > 0 ||
                teamTwoRoster.length > 0 ||
                matchPlayerOne ||
                matchPlayerTwo) && (
                <>
                  <h3>Match {matchHolder && matchHolder.length + 1}</h3>
                  <MatchPlayers
                    playerOne={matchPlayerOne}
                    playerTwo={matchPlayerTwo}
                    setPlayerOne={setMatchPlayerOne}
                    setPlayerTwo={setMatchPlayerTwo}
                    setTeamOneRoster={setTeamOneRoster}
                    setTeamTwoRoster={setTeamTwoRoster}
                    teamOneRoster={teamOneRoster}
                    teamTwoRoster={teamTwoRoster}
                    setMatchHolder={setMatchHolder}
                    matchHolder={matchHolder}
                  />
                </>
              )}
              {teamOneRoster.length === 0 &&
                teamTwoRoster.length === 0 &&
                matchPlayerOne === undefined &&
                matchPlayerTwo === undefined && (
                  <div className={styles.forwardButton}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => setRoundStart(false)}
                    >
                      Proceed
                    </Button>
                  </div>
                )}
            </div>
            <div>
              <h3>{tournament?.teams[1].name}</h3>
              <div>
                {teamTwoRoster?.map((player, index) => {
                  return (
                    <PlayerItemRight
                      player={player}
                      keyValue={index}
                      setMatchPlayerTwo={setMatchPlayerTwo}
                      setTeamTwoRoster={setTeamTwoRoster}
                      teamTwoRoster={teamTwoRoster}
                      matchPlayerTwo={matchPlayerTwo}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <footer className={styles.holderArray}>
            {matchHolder.length > 0 &&
              matchHolder?.map((match, index) => {
                return (
                  <div className={styles.matchItem} key={index}>
                    <span>{match.playerOne.name}</span>
                    <span>VS</span>
                    <span>{match.playerTwo.name}</span>
                  </div>
                );
              })}
          </footer>
        </div>
      )}
      {!isLoading && !roundStart && tournament && (
        <RoundActive
          matches={matchHolder}
          tournament={tournament}
          setMatchHolder={setMatchHolder}
          roundScore={roundScore}
          setRoundScore={setRoundScore}
          setTeamOneRoster={setTeamOneRoster}
          setTeamTwoRoster={setTeamTwoRoster}
					setRoundStart={setRoundStart}
        />
      )}
    </div>
  );
};

export default Tournament;
