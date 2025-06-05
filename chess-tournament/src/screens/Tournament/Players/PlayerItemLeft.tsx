import {
  ArrowBackSharp,
  ArrowDownwardSharp,
  ArrowForwardSharp,
  DeleteForeverSharp,
  DeleteSharp,
  FolderCopySharp,
  SyncAltSharp,
} from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import type { IPlayer } from "../../../types/types";
import styles from "../Tournament.module.css";

type Props = {
  keyValue: number;
  player: IPlayer;
  setMatchPlayerOne: Function
  setTeamOneRoster: Function
  teamOneRoster: IPlayer[]
  matchPlayerOne: IPlayer | undefined
};

const PlayerItemLeft = (props: Props) => {
  const { keyValue, player, setMatchPlayerOne, setTeamOneRoster, teamOneRoster, matchPlayerOne } = props;

  const handleShift = () => {
    setMatchPlayerOne(player)
    const filteredRoster = teamOneRoster.filter((remainingPlayer: IPlayer) => remainingPlayer.id !== player.id)
    console.log(filteredRoster)
    setTeamOneRoster(filteredRoster)
  }

  return (
    <div key={keyValue}>
      {!matchPlayerOne &&
      <div className={styles.centerItem}>
        <ListItemText primary={player.name} />
        <div>
          <div>
            <IconButton color={"success"} onClick={() => handleShift()}>
              {/* <Avatar> */}
              <ArrowForwardSharp />
              {/* </Avatar> */}
            </IconButton>
          </div>
        </div>
      </div>}
    </div>
      
);
};

export default PlayerItemLeft;