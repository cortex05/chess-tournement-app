import { useActionState, useState } from "react";
import { Stack, Button, Box, TextField, Input, List } from "@mui/material";
import styles from "./New.module.css";
import { PersonAddAltSharp } from "@mui/icons-material";

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
import AddPlayerModal from "../../components/Modals/AddPlayerModal";

const New = () => {
  const [roster, setRoster] = useState<IPlayer[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");

  const handleAdd = () => {
    const newPlayer = new Player(playerName, roster.length + 1);
    console.log(newPlayer.name);
    const newArray = roster;
    newArray.push(newPlayer);
    setRoster(newArray);
    setPlayerName("");
    setIsModalOpen(false);
    console.log(roster);
  };

  return (
    <>
      <Header lossCheck={true} />
      <section className={styles.main}>
        <h1>New Tournament</h1>
        <h4>
          Add players for your tournament and click finished when all players
          are entered.
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

            {roster.length > 1 && <Button variant="outlined"
              startIcon={<PersonAddAltSharp />}
              size="large">Finished</Button>}
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

                  <IconButton edge="end" aria-label="delete">
                    <DeleteSharp />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        </div>
      </section>
      <AddPlayerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
      </AddPlayerModal>
    </>
  );
};

export default New;
