import { useActionState, useState } from "react";
import { Stack, Button, Box, TextField, Input, List } from "@mui/material";
import styles from "./New.module.css";
import { PersonAddAltSharp } from "@mui/icons-material";
import Modal from "./NewModal";

import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { FolderCopySharp, DeleteSharp } from "@mui/icons-material";

import { Header } from "../../components/Header/Header";
import { Player } from "../../utilities";
import type { IPlayer } from "../../types/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%',
//   width: 600,
//   bgcolor: 'black',
//   boxShadow: 24,
//   border: '2px solid #000'
// }

const New = () => {
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [roster, setRoster] = useState<IPlayer[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");

  const handleAdd = () => {
    const newPlayer = new Player(playerName, roster.length + 1)
    console.log(newPlayer.name)
    const newArray = roster
    newArray.push(newPlayer)
    setRoster(newArray)
    setPlayerName("")
    setIsModalOpen(false);
    console.log(roster)
  };

  return (
    <>
      <Header lossCheck={true} />
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
      <section className={styles.main}>
        <h1>New Tournament</h1>
        <h4>
          Add players for your tournament and click finished when all players
          are entered.
        </h4>
        <div className={styles.mainButtons}>
          <Stack spacing={2} direction="row">
            {!isModalOpen && (
              <Button
                variant="outlined"
                startIcon={<PersonAddAltSharp />}
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                Add Player
              </Button>
            )}
            {playerCount > 1 && <Button>Finished</Button>}
          </Stack>
        </div>
        <div>
          <List component="div" disablePadding>
            <ListItem alignItems={"center"}>
              <ListItemAvatar>
                <Avatar>
                  <FolderCopySharp />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="GFG Self-Paced Course" />
              <ListItemSecondaryAction>
                {/*Inside the IconButton, we can render various icons*/}
                <IconButton edge="end" aria-label="delete">
                  <DeleteSharp />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </section>
    </>
  );
};

export default New;
