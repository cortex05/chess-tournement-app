import { Stack, Button, List, Input } from "@mui/material";
import styles from "../New.module.css";
import { PersonAddAltSharp } from "@mui/icons-material";

import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { FolderCopySharp, DeleteSharp } from "@mui/icons-material";
import { useState } from "react";
import type { IPlayer, ITeam } from "../../../types/types";
import Modal from "../NewModal";
import { Player } from "../../../utilities";
import TeamListItem from "./TeamListItem";

type Props = {
  roster: IPlayer[];
  gameType: string;
  setRoster: Function;
  teams: ITeam[];
};

const PhaseTwo = (props: Props) => {
  const { roster, gameType, setRoster, teams } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [centerPlayers, setCenterPlayers] = useState<IPlayer[]>(roster);

  // FFA logic
  const handleAdd = () => {
    const newPlayer = new Player(playerName, roster.length + 1);
    const newArray = roster;
    newArray.push(newPlayer);

    setRoster(newArray);
    setCenterPlayers(newArray);
    setPlayerName("");
    setIsModalOpen(false);
  };

  const removePlayer = (playerId: number) => {
    const newRoster = roster.filter((player) => player.id !== playerId);
    
    setRoster(newRoster);
    setCenterPlayers(newRoster);
  };

  const switchTeam = (playerMoving: IPlayer, side: string) => {
    if(side === "LEFT"){
        teams[0].teamRoster.push(playerMoving);
        const newRoster = centerPlayers.filter((player) => player.id !== playerMoving.id); 
        console.log(newRoster);           
        setCenterPlayers(newRoster);
    } else if(side === "RIGHT"){
        teams[1].teamRoster.push(playerMoving);
        const newRoster = centerPlayers.filter((player) => player.id !== playerMoving.id);  
        console.log(newRoster);      
        setCenterPlayers(newRoster); 
    
    }
  };

  return (
    <div>
      {gameType === "FFA" && (
        <div>
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

                {roster.length > 1 && (
                  <Button
                    variant="outlined"
                    startIcon={<PersonAddAltSharp />}
                    size="large"
                    onClick={() => console.log("wait")}
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
      {gameType === "TEAM" && (
        <div>
          <h4>
            Add players for your tournament, add them to a team and click
            finished when all players are entered.
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
                    onClick={() => console.log("wait")}
                  >
                    Finished
                  </Button>
                )}
              </Stack>
            )}
          </div>
          <div className={styles.teamList}>
            <List component="div" disablePadding>
              {teams &&
                teams[0].teamRoster.map((player, index) => {
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
            <List component="div" disablePadding>
              {centerPlayers.map((player, index) => {
                return (
                  <TeamListItem
                    keyValue={index}
                    removePlayer={removePlayer}
                    player={player}
                    switchTeam={switchTeam}
                  />
                );
              })}
            </List>
            <List component="div" disablePadding>
              {teams &&
                teams[1].teamRoster.map((player, index) => {
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
    </div>
  );
};

export default PhaseTwo;
