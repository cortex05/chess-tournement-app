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
  // removePlayer: Function;
  player: IPlayer;
  // switchTeam: Function
};

const PlayerItemRight = (props: Props) => {
  const { keyValue, player } = props;

  return (
    <div key={keyValue}>
      <div className={styles.centerItem}>
        <div>
          <div>
            <IconButton color={"success"} onClick={() => console.log("httt")}>
              {/* <Avatar> */}
              <ArrowBackSharp />
              {/* </Avatar> */}
            </IconButton>
          </div>
        </div>
        <ListItemText primary={player.name} />
      </div>
    </div>
  );
};

export default PlayerItemRight;
