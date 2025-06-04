import { Button, Input, Switch } from "@mui/material";
import React, { useState } from "react";
import type { ITeam } from "../../../types/types";
import { Team } from "../../../utilities/utilities";

type Props = {
  setGame: Function;
  setPhase: Function;
  setTeams: Function;
  setTournamentName: Function
  tournamentName: string
};

const PhaseOne = (props: Props) => {
  const { setGame, setPhase, setTeams, tournamentName, setTournamentName } = props;

  const [tournamentSelection, setTournamentSelection] = useState<boolean>(false);

  const handleChange = () => {
    setTournamentSelection(!tournamentSelection);
  };

  const handleSubmit = () => {
    const gameType = tournamentSelection === true ? "TEAM" : "FFA";

    if (gameType === "TEAM") {
      const teamOne = new Team("TeamOne", 1);
      const teamTwo = new Team("TeamTwo", 2);
      const teamsArray: ITeam[] = [teamOne, teamTwo];
      console.log("TEAMS: ARRAY:  ", teamsArray);
      setTeams(teamsArray);
    }

    setGame(gameType);
    setPhase("SECOND");
  };

  return (
    <div>
      <h1>What type of tournament do you want?</h1>
      <div>
        <span>Free-For-All</span>
        <Switch checked={tournamentSelection} onChange={handleChange} />
        <span>Team Tournament</span>
      </div>
      <div>
        <Input
            placeholder="Placeholder"
            onChange={(e) => setTournamentName(e.target.value)}
            autoFocus
            value={tournamentName}
            sx={{ color: "white" }}
          />
      </div>
      <Button
        variant="outlined"
        // startIcon={<PersonAddAltSharp />}
        size="large"
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
      <div>
        <p>Win = 1 point</p>
        <p>Draw = .5 point</p>
        <p>Loss = 0 point</p>
      </div>
      <div>
        <div>
          <h3>Free-For-All</h3>
          <p>
            Every man for himself! Each round players are paired against an
            opponent. The winners of each round are paired with each other in
            subsequent rounds. The player with the most points at the end, wins.
          </p>
        </div>
        <div>
          <h3>Team Tournament</h3>
          <p>
            Players will be sorted into two teams. Players on one team will only
            ever compete against players of the other. The team with the most
            points after each player has played against the opposing team, wins!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhaseOne;
