import { Stack, Button, List, Input, Typography } from "@mui/material";
import {
  ArrowBackSharp,
  ArrowForwardSharp,
  KeyboardBackspaceSharp,
  PersonAddAltSharp,
} from "@mui/icons-material";

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

import { Player } from "../../../utilities/utilities";
import TeamListItem from "./ListItem/TeamListItem";

import styles from "./PhaseTwo.module.css";
import Modal from "../../../components/Modals/Modal";

type Props = {
  roster: IPlayer[];
  gameType: string;
  setRoster: Function;
  teams: ITeam[];
  setPhase: Function;
  setTeams: Function;
  setGame: Function;
};

const PhaseTwo = (props: Props) => {
  const { roster, gameType, setRoster, teams, setPhase, setTeams, setGame } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [centerPlayers, setCenterPlayers] = useState<IPlayer[]>([]);

  const handleAdd = () => {
    const newPlayer = new Player(playerName, roster.length + 1);

    const newRoster = roster;
    newRoster.push(newPlayer);
    setRoster(newRoster);

    const newCenterArray = centerPlayers;
    newCenterArray.push(newPlayer);
    setCenterPlayers(newCenterArray);

    setPlayerName("");
    setIsModalOpen(false);
  };

  const removePlayer = (playerId: number) => {
    const newRoster = roster.filter((player) => player.id !== playerId);
    const newCenterArray = centerPlayers.filter((keepPlayer => {
      return keepPlayer.id !== playerId
    }))

    setRoster(newRoster);
    setCenterPlayers(newCenterArray);
  };

  // FFA logic
  const handleFinished = () => {
    setPhase("THIRD");
  };

  // TEAM LOGIC
  const switchTeam = (playerMoving: IPlayer, side: string, team: string | undefined) => {
    if (side === "LEFT") {
      teams[0].teamRoster.push(playerMoving);
      const newRoster = centerPlayers.filter(
        (player) => player.id !== playerMoving.id
      );

      setCenterPlayers(newRoster);
    } else if (side === "RIGHT") {
      teams[1].teamRoster.push(playerMoving);
      const newRoster = centerPlayers.filter(
        (player) => player.id !== playerMoving.id
      );

      setCenterPlayers(newRoster);
    } else if(side === "CENTER" && team){
      // make array for team roster without playerMoving
      if(team === "ONE"){
        // make array for team roster without playerMoving and reassign team roster
        const newRoster = teams[0].teamRoster.filter((oldPlayer) => {
          return oldPlayer.id !== playerMoving.id
        })
        teams[0].teamRoster = newRoster

        setCenterPlayers([...centerPlayers, playerMoving])

      } else if (team === "TWO"){
        // make array for team roster without playerMoving and reassign team roster
        const newRoster = teams[1].teamRoster.filter((oldPlayer) => {
          return oldPlayer.id !== playerMoving.id
        })
        teams[1].teamRoster = newRoster

        setCenterPlayers([...centerPlayers, playerMoving])
      }
    }
  };
  const handleBack = () => {
    setTeams([])
    setGame("")
    setPhase("FIRST");
  }

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
                <Button variant="outlined" startIcon={<KeyboardBackspaceSharp />} size="large" onClick={() => handleBack()}>Back</Button>
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
                    onClick={() => handleFinished()}
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
        <div className={styles.mainTeam}>
          <Typography variant="h6" gutterBottom>
            Add players for your tournament, add them to a team and click
            finished when all players are entered.
          </Typography>
          <div className={styles.mainButtons}>
            <Stack spacing={2} direction="row">
              <Button variant="outlined" startIcon={<KeyboardBackspaceSharp />} size="large" onClick={() => handleBack()}>Back</Button>
              <Button
                variant="outlined"
                startIcon={<PersonAddAltSharp />}
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                Add Player
              </Button>

              {centerPlayers.length === 0 &&
                teams[0].teamRoster.length > 0 &&
                teams[1].teamRoster.length > 0 && (
                  <Button
                    variant="outlined"
                    startIcon={<PersonAddAltSharp />}
                    size="large"
                    onClick={() => handleFinished()}
                  >
                    Finished
                  </Button>
                )}
            </Stack>
          </div>
          <div className={styles.teamList}>
            <List component="div" disablePadding>
              {teams &&
                teams[0].teamRoster.map((player, index) => {
                  return (
                    <ListItem alignItems={"center"} key={index}>
                      <ListItemText primary={player.name} />
                      <div>
                        <IconButton
                          color="primary"
                          onClick={() => switchTeam(player, "CENTER","ONE")}
                        >
                          <ArrowForwardSharp />
                        </IconButton>
                      </div>
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
                    key={index}
                  />
                );
              })}
            </List>
            <List component="div" disablePadding>
              {teams &&
                teams[1].teamRoster.map((player, index) => {
                  return (
                    <ListItem alignItems={"center"} key={index}>
                      <div>
                        <IconButton
                          color={"primary"}
                          onClick={() => switchTeam(player, "CENTER","TWO")}
                        >
                          {/* <Avatar> */}
                          <ArrowBackSharp />
                          {/* </Avatar> */}
                        </IconButton>
                      </div>
                      <ListItemText primary={player.name} />
                    </ListItem>
                  );
                })}
            </List>
          </div>
        </div>
      )}
      <Modal tall isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modal}>
          <Input
            placeholder="Player Name"
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
