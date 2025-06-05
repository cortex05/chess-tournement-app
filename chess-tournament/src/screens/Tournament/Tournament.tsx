import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IMatch, IMatchData, IPlayer, ITournament } from "../../types/types";
import { handleGameTypeDisplay } from "../../utilities/functions";
import styles from "./Tournament.module.css";
import PlayerItemRight from "./Players/PlayerItemRight";
import PlayerItemLeft from "./Players/PlayerItemLeft";
import MatchPlayers from "./Players/MatchPlayers";

type Props = {
  name: string;
};

const Tournament = () => {
  const { tourney } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tournament, setTournament] = useState<ITournament>();

  // Round variables
  const [teamOneRoster, setTeamOneRoster] = useState<IPlayer[]>([]);
  const [teamTwoRoster, setTeamTwoRoster] = useState<IPlayer[]>([]);

  const [matchPlayerOne, setMatchPlayerOne] = useState<IPlayer>();
  const [matchPlayerTwo, setMatchPlayerTwo] = useState<IPlayer>();
	const [matchData, setMatchData] = useState<IMatchData>();
	const [matchHolder, setMatchHolder] = useState<IMatch[]>([]);
  // const [] = useState<>()

  const fetchTournament = () => {
    // Move this to utility functions
    if (tourney) {
      const jsonValue = localStorage.getItem(tourney.toUpperCase());
      const value = jsonValue !== null ? JSON.parse(jsonValue) : null;
      console.log("tournament: ", value);
      setTournament(value);
      setTeamOneRoster(value.teams[0].teamRoster);
      setTeamTwoRoster(value.teams[1].teamRoster);
			setMatchData({
				teamOneName: value.teams[0].name,
				teamTwoName: value.teams[1].name
			})
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournament();
  }, []);

  return (
    <div className={styles.main}>
      {isLoading && <div>LOADING</div>}
      {!isLoading && (
        <div>
          <h1>
            {tournament?.name} is a{" "}
            {handleGameTypeDisplay(
              tournament?.tournamentType ? tournament.tournamentType : "null"
            )}{" "}
            tournament
          </h1>
          <div className={styles.settingRoster}>
            <div>
              <h3>{tournament?.teams[0].name}</h3>
              <div>
                {teamOneRoster?.map((player, index) => {
                  return <PlayerItemLeft player={player} keyValue={index} setMatchPlayerOne={setMatchPlayerOne} setTeamOneRoster={setTeamOneRoster} teamOneRoster={teamOneRoster} matchPlayerOne={matchPlayerOne}/>;
                })}
              </div>
            </div>
            <div>
							<h3>Match {matchHolder && matchHolder.length +1}</h3>
              <MatchPlayers
                playerOne={matchPlayerOne}
                playerTwo={matchPlayerTwo}
								setPlayerOne={setMatchPlayerOne}
								setPlayerTwo={setMatchPlayerTwo}
								
								setTeamOneRoster={setTeamOneRoster}
								setTeamTwoRoster={setTeamTwoRoster}
								teamOneRoster={teamOneRoster} 
								teamTwoRoster={teamTwoRoster}
              />
            </div>
            <div>
              <h3>{tournament?.teams[1].name}</h3>
              <div>
                {teamTwoRoster?.map((player, index) => {
                  return <PlayerItemRight player={player} keyValue={index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournament;
