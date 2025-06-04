import type { IPlayer, ITeam } from "../../../types/types";
import { Button } from "@mui/material";
import styles from "./PhaseThree.module.css";
import { Tournament } from "../../../utilities";
import { useNavigate } from "react-router-dom";

type Props = {
  gameType: string;
  gameRoster: IPlayer[];
  teams: ITeam[];
};

const PhaseThree = (props: Props) => {
  const { gameType, gameRoster, teams } = props;
  const navigate = useNavigate();

  const handleGameTypeDisplay = (gameType: string) => {
    switch (gameType) {
      case "FFA":
        return "Free-For-All";
      case "TEAM":
        return "Team Tournament";
    }
  };

  const handleStart = (
    tournamentType: string,
    playerRoster: IPlayer[],
    teams: ITeam[]
  ) => {
    const teamsSelect = tournamentType === "FFA" ? [] : teams;

    const tournament = new Tournament(
      tournamentType,
      playerRoster,
      teamsSelect
    );
    const jsonTournament = JSON.stringify(tournament);
    localStorage.setItem("TOURNAMENT", jsonTournament);
    console.log(tournament);
    navigate("/tournament");
  };
  return (
    <div>
      <h1>Here is your game. Do you want to start?</h1>
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
          onClick={() => handleStart(gameType, gameRoster, teams)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PhaseThree;
