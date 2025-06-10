import type { IPlayer, ITeam } from "../../../types/types";
import { Button, Stack, Typography } from "@mui/material";
import { Tournament } from "../../../utilities/utilities";
import { useNavigate } from "react-router-dom";
import { handleGameTypeDisplay } from "../../../utilities/functions";
import { LOCAL_TOURNAMENTS_KEY } from "../../../data/keys";

import styles from "./PhaseThree.module.css";
import { KeyboardBackspaceSharp } from "@mui/icons-material";

type Props = {
  gameType: string;
  gameRoster: IPlayer[];
  teams: ITeam[];
  tournamentName: string;
  setPhase: Function;
};

const PhaseThree = (props: Props) => {
  const { gameType, gameRoster, teams, tournamentName, setPhase } = props;
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
    const key = tournamentName.toUpperCase();

    // check if there are any tournaments
    const jsonValue = localStorage.getItem(LOCAL_TOURNAMENTS_KEY);

    if (!jsonValue) {
      // If none make a key array and add this one
      const newArray: string[] = [key];
      localStorage.setItem(LOCAL_TOURNAMENTS_KEY, JSON.stringify(newArray));
    } else {
      // add this one

      const oldArrayJSON = localStorage.getItem(LOCAL_TOURNAMENTS_KEY);

      const oldArrayParsed = oldArrayJSON ? JSON.parse(oldArrayJSON) : null;
      const newArray: string[] = [...oldArrayParsed, key];
      localStorage.setItem(LOCAL_TOURNAMENTS_KEY, JSON.stringify(newArray));
    }
    //
    const jsonTournament = JSON.stringify(tournament);
    localStorage.setItem(key, jsonTournament);

    navigate(`/tournament/${tournamentName}`);
  };

  const handleBack = () => {
    setPhase("SECOND");
  };
  return (
    <div className={styles.main}>
      <Typography variant="h5" gutterBottom>
        Here is your game. Do you want to start?
      </Typography>
      <Typography variant="h5" gutterBottom>
        Title: {tournamentName}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Type: {handleGameTypeDisplay(gameType)}
      </Typography>
      {gameType === "FFA" && (
        <div>
          {gameRoster.map((player) => {
            return <div key={player.id}>{player.name}</div>;
          })}
        </div>
      )}
      {gameType === "TEAM" && (
        <div className={styles.teamWrapper}>
          <div>
            <Typography variant="h6" gutterBottom>
              {teams[0].name}
            </Typography>
            {teams[0].teamRoster.map((player) => {
              return (
                <Typography variant="body1" gutterBottom key={player.id}>
                  {player.name}
                </Typography>
              );
            })}
          </div>
          <div>
            <Typography variant="h6" gutterBottom>
              {teams[1].name}
            </Typography>
            {teams[1].teamRoster.map((player) => {
              return (
                <Typography variant="body1" gutterBottom key={player.id}>
                  {player.name}
                </Typography>
              );
            })}
          </div>
        </div>
      )}
      <div>
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            startIcon={<KeyboardBackspaceSharp />}
            size="large"
            onClick={() => handleBack()}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            // startIcon={<PersonAddAltSharp />}
            size="large"
            onClick={() =>
              handleStart(gameType, gameRoster, teams, tournamentName)
            }
          >
            Start
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default PhaseThree;
