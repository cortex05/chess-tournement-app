import { Button, Input, Switch, Typography } from "@mui/material";
import { useState } from "react";
import type { ITeam } from "../../../types/types";
import { Team } from "../../../utilities/utilities";

import styles from "./PhaseOne.module.css";

type Props = {
  setGame: Function;
  setPhase: Function;
  setTeams: Function;
  setTournamentName: Function;
  tournamentName: string;
};

const PhaseOne = (props: Props) => {
  const { setGame, setPhase, setTeams, tournamentName, setTournamentName } =
    props;

  const [tournamentSelection, setTournamentSelection] =
    useState<boolean>(false);

  const handleChange = () => {
    setTournamentSelection(!tournamentSelection);
  };

  const handleSubmit = () => {
    const gameType = tournamentSelection === true ? "TEAM" : "FFA";

    if (gameType === "TEAM") {
      const teamOne = new Team("Team One", 1);
      const teamTwo = new Team("Team Two", 2);
      const teamsArray: ITeam[] = [teamOne, teamTwo];

      setTeams(teamsArray);
    }

    setGame(gameType);
    setPhase("SECOND");
  };

  return (
    <div className={styles.phaseOne}>
      <div>
        <Typography variant="h5" gutterBottom>Select Tournament type:</Typography>
        <div>
          <Typography variant="body2" gutterBottom>Free-For-All</Typography>
          <Switch checked={tournamentSelection} onChange={handleChange} />
          <Typography variant="body2" gutterBottom>Team Tournament</Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="body1" gutterBottom>Win = 1 point</Typography>
          <Typography variant="body1" gutterBottom>Draw = .5 point</Typography>
          <Typography variant="body1" gutterBottom>Loss = 0 point</Typography>
        </div>
        <div>
        <div>
          <Typography variant="h6" gutterBottom>Free-For-All</Typography>
          <Typography variant="body1" gutterBottom>
            Every man for himself! Each round players are paired against an
            opponent. The winners of each round are paired with each other in
            subsequent rounds. The player with the most points at the end, wins.
          </Typography>
        </div>
        <div>
          <Typography variant="h6" gutterBottom>Team Tournament</Typography>
          <Typography variant="body1" gutterBottom>
            Players will be sorted into two teams. Players on one team will only
            ever compete against players of the other. The team with the most
            points after each player has played against the opposing team, wins!
          </Typography>
        </div>
      </div>
      </div>
      <div>
        <Typography variant="h6" gutterBottom>Tournament name:</Typography>
        <Input
          placeholder="Placeholder"
          color="primary"
          onChange={(e) => setTournamentName(e.target.value)}
          autoFocus
          value={tournamentName}
          sx={{ color: "white" }}
        />
        <Button
        variant="outlined"
        size="large"
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
      </div>
    </div>
  );
};

export default PhaseOne;
