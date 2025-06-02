import { useState } from "react";
import { Stack, Button, Input, List, Grid, Switch } from "@mui/material";
import styles from "./New.module.css";
import {
  PersonAddAltSharp,
  Person2Sharp,
  GroupSharp,
} from "@mui/icons-material";

import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { FolderCopySharp, DeleteSharp } from "@mui/icons-material";

import { Header } from "../../components/Header/Header";
import { Player } from "../../utilities";
import type { IPlayer } from "../../types/types";
import Modal from "../../components/Modals/Modal";
import { useNavigate } from "react-router-dom";
import PhaseOne from "./PhaseOne/PhaseOne";

type Props = {
  // saveRoster: () => void()
};

const New = (props: Props) => {
  const navigate = useNavigate();
  const [roster, setRoster] = useState<IPlayer[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [tournamentCheck, setTournamentCheck] = useState<boolean>(false);

  // Tournament object variables
  const [gameType, setGameType]  = useState<string>("")

  // Phase
  const [phase, setPhase] = useState<string>("FIRST");

  const handleTournament = () => {};

  const handleAdd = () => {
    const newPlayer = new Player(playerName, roster.length + 1);
    console.log(newPlayer.name);
    const newArray = roster;
    newArray.push(newPlayer);
    setRoster(newArray);
    setPlayerName("");
    setIsModalOpen(false);
    // console.log(roster);
  };

  const removePlayer = (playerId: number) => {
    const newRoster = roster.filter((player) => player.id !== playerId);
    console.log("fire");
    setRoster(newRoster);
  };

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
          <div>
            <h4>
              Add players for your tournament and click finished when all
              players are entered.
            </h4>
            <div className={styles.mainButtons}>
              {!isModalOpen && (
                <Stack spacing={2} direction="row">
                  <Button
                    variant="outlined"
                    startIcon={<PersonAddAltSharp />}
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Player
                  </Button>

                  {roster.length > 1 && (
                    <Button
                      variant="outlined"
                      startIcon={<PersonAddAltSharp />}
                      size="large"
                      onClick={() => setTournamentCheck(true)}
                    >
                      Finished
                    </Button>
                  )}
                </Stack>
              )}
            </div>
            <div>
              <List component="div" disablePadding>
                {roster.map((player, index) => {
                  return (
                    <ListItem alignItems={"center"} key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderCopySharp />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={player.name} />

                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removePlayer(player.id)}
                      >
                        <DeleteSharp />
                      </IconButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        )}
        {/* third */}
        {phase === "THIRD" && <div></div>}
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modal}>
          <Input
            placeholder="Placeholder"
            onChange={(e) => setPlayerName(e.target.value)}
            autoFocus
            value={playerName}
            sx={{ color: "white" }}
          />
          <Button onClick={() => handleAdd()} variant="outlined" size="large">
            Add Player
          </Button>
        </div>
      </Modal>
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
