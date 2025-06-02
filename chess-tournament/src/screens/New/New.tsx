import { useState } from "react";
import { Button, Input, List } from "@mui/material";
import styles from "./New.module.css";
import {
  Person2Sharp,
  GroupSharp,
} from "@mui/icons-material";

import { Header } from "../../components/Header/Header";
import type { IPlayer } from "../../types/types";
import Modal from "../../components/Modals/Modal";
import { useNavigate } from "react-router-dom";
import PhaseOne from "./PhaseOne/PhaseOne";
import PhaseTwo from "./PhaseTwo/PhaseTwo";

// type Props = {
//   // saveRoster: () => void()
// };

const New = () => {
  const navigate = useNavigate();
  // const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [tournamentCheck, setTournamentCheck] = useState<boolean>(false);

  // Tournament object variables
  const [gameType, setGameType]  = useState<string>("")
  const [roster, setRoster] = useState<IPlayer[]>([]);

  // Phase
  const [phase, setPhase] = useState<string>("FIRST");

  // const handleTournament = () => {};

  return (
    <>
      <Header lossCheck={true} />
      <section className={styles.main}>
        <h1>New Tournament</h1>
        {/* first */}
        {phase === "FIRST" && (
          <PhaseOne setGame={setGameType} setPhase={setPhase}/>
        )}
        {/* second */}
        {phase === "SECOND" && (
          <PhaseTwo roster={roster} gameType={gameType} setRoster={setRoster}/>
        )}
        {/* third */}
        {phase === "THIRD" && <div></div>}
      </section>
      <Modal isOpen={tournamentCheck} onClose={() => setTournamentCheck(false)}>
        <div className={styles.modal}>
          <div>
            <h5>What kind of tournament do you want?</h5>
            <div>
              <Button
                variant="outlined"
                startIcon={<Person2Sharp />}
                size="large"
                onClick={() => setIsModalOpen(false)}
              >
                Free-For-All
              </Button>
              <Button
                variant="outlined"
                startIcon={<GroupSharp />}
                size="large"
                onClick={() => navigate("/tournament")}
              >
                Team
              </Button>
            </div>
            <List component="div" disablePadding>
              {roster.map((player, index) => {
                return <div key={index}>{player.name}</div>;
              })}
            </List>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default New;
