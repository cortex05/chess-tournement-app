import type { IPlayer, ITeam } from "../../../types/types";
import { Button } from "@mui/material";
import styles from "./PhaseThree.module.css";
import { Tournament } from "../../../utilities/utilities";
import { useNavigate } from "react-router-dom";
import { handleGameTypeDisplay } from "../../../utilities/functions";

type Props = {
  gameType: string;
  gameRoster: IPlayer[];
  teams: ITeam[];
  tournamentName: string
};

const PhaseThree = (props: Props) => {
  const { gameType, gameRoster, teams, tournamentName } = props;
  const navigate = useNavigate();

  const handleStart = (
    tournamentType: string,
    playerRoster: IPlayer[],
    teams: ITeam[],
    tournamentName: string
  ) => {
    const teamsSelect = tournamentType === "FFA" ? [] : teams;

    const tournament = new Tournament(
      tournamentType,
      playerRoster,
      teamsSelect,
      tournamentName
    );
    const key = tournamentName.toUpperCase()
    // 
    const jsonTournament = JSON.stringify(tournament);
    localStorage.setItem(key, jsonTournament);
    
    navigate(`/tournament/${tournamentName}`);
  };
  return (
    <div>
      <h1>Here is your game. Do you want to start?</h1>
      <h2>{tournamentName}</h2>
      <h3>{handleGameTypeDisplay(gameType)}</h3>
      {gameType === "FFA" && (
        <div>
          {gameRoster.map((player) => {
            return <div key={player.id}>{player.name}</div>;
          })}
        </div>
      )}
      {gameType === "TEAM" && (
        <div className={styles.wrapper}>
          <div>
            <h3>{teams[0].name}</h3>
            {teams[0].teamRoster.map((player) => {
              return <div key={player.id}>{player.name}</div>;
            })}
          </div>
          <div>
            <h3>{teams[1].name}</h3>
            {teams[1].teamRoster.map((player) => {
              return <div key={player.id}>{player.name}</div>;
            })}
          </div>
        </div>
      )}
      <div>
        <Button
          variant="outlined"
          // startIcon={<PersonAddAltSharp />}
          size="large"
          onClick={() => handleStart(gameType, gameRoster, teams, tournamentName)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PhaseThree;
