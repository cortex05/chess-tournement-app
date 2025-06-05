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
  setMatchPlayerTwo: Function
  setTeamTwoRoster: Function
  teamTwoRoster: IPlayer[]
  matchPlayerTwo: IPlayer | undefined
};

const PlayerItemRight = (props: Props) => {
  const { keyValue, player, setMatchPlayerTwo, setTeamTwoRoster, teamTwoRoster, matchPlayerTwo } = props;

  const handleShift = () => {
      setMatchPlayerTwo(player)
      const filteredRoster = teamTwoRoster.filter((remainingPlayer: IPlayer) => remainingPlayer.id !== player.id)
      console.log(filteredRoster)
      setTeamTwoRoster(filteredRoster)
    }

  return (
    <div key={keyValue}>
      {!matchPlayerTwo && <div className={styles.centerItem}>
        <div>
          <div>
            <IconButton color={"success"} onClick={() => handleShift()}>
              {/* <Avatar> */}
              <ArrowBackSharp />
              {/* </Avatar> */}
            </IconButton>
          </div>
        </div>
        <ListItemText primary={player.name} />
      </div>}
    </div>
  );
};

export default PlayerItemRight;
