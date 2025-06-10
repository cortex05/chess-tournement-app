import { useState } from "react";
import styles from "./New.module.css";

import { Header } from "../../components/Header/Header";
import type { IPlayer, ITeam } from "../../types/types";
import PhaseOne from "./PhaseOne/PhaseOne";
import PhaseTwo from "./PhaseTwo/PhaseTwo";
import PhaseThree from "./PhaseThree/PhaseThree";
import { Typography } from "@mui/material";


const New = () => {
  // Tournament object variables
  const [gameType, setGameType]  = useState<string>("")
  const [roster, setRoster] = useState<IPlayer[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([])
  const [tournamentName, setTournamentName] = useState<string>("")

  // Phase
  const [phase, setPhase] = useState<string>("FIRST");

  return (
    <>
      <Header lossCheck={true} />
      <section className={styles.main}>
        <Typography variant="h5" gutterBottom>New Tournament</Typography>
        {phase === "FIRST" && (
          <PhaseOne setGame={setGameType} setPhase={setPhase} setTeams={setTeams} tournamentName={tournamentName} setTournamentName={setTournamentName}/>
        )}
        {phase === "SECOND" && (
          <PhaseTwo roster={roster} gameType={gameType} setRoster={setRoster} teams={teams} setPhase={setPhase} setTeams={setTeams} setGame={setGameType}/>
        )}
        {phase === "THIRD" && <PhaseThree gameType={gameType} gameRoster={roster} teams={teams} tournamentName={tournamentName} setPhase={setPhase}/>}
      </section>
    </>
  );
};

export default New;
