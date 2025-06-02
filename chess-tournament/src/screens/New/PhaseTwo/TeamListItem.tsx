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
import styles from "../New.module.css";

type Props = {
  key: number;
  removePlayer: Function;
  player: IPlayer;
};

const TeamListItem = (props: Props) => {
  const { key, removePlayer, player } = props;
  const [assigner, setAssigner] = useState<boolean>(false);

  return (
    <div key={key}>
      {!assigner && (
        <div className={styles.centerItem}>
          <div>
            <IconButton color="info" onClick={() => setAssigner(true)}>
              {/* <Avatar> */}
              <SyncAltSharp />
              {/* </Avatar> */}
            </IconButton>
          </div>
          <ListItemText primary={player.name} />

          <IconButton
            color="info"
            edge="end"
            aria-label="delete"
            onClick={() => removePlayer(player.id)}
          >
            <DeleteForeverSharp />
          </IconButton>
        </div>
      )}
      {assigner && (
        <div className={styles.centerItemActive}>
          <div>
            <IconButton color={"success"} onClick={() => setAssigner(false)}>
              {/* <Avatar> */}
              <ArrowBackSharp />
              {/* </Avatar> */}
            </IconButton>
          </div>
          <ListItemText primary={player.name} />

          <IconButton
            color="primary"
            edge="end"
            aria-label="delete"
            onClick={() => setAssigner(false)}
          >
            <ArrowDownwardSharp />
          </IconButton>
          <div>
            {/* <Avatar> */}
            <IconButton color="warning" onClick={() => setAssigner(false)}>
              <ArrowForwardSharp />
            </IconButton>

            {/* </Avatar> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamListItem;
