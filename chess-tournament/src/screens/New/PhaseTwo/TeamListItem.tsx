import {
  ArrowBackSharp,
  ArrowDownwardSharp,
  ArrowForwardSharp,
  DeleteForeverSharp,
  SyncAltSharp,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import type { IPlayer } from "../../../types/types";
import styles from "../New.module.css";

type Props = {
  keyValue: number;
  removePlayer: Function;
  player: IPlayer;
  switchTeam: Function
};

const TeamListItem = (props: Props) => {
  const { keyValue, removePlayer, player, switchTeam } = props;
  const [assigner, setAssigner] = useState<boolean>(false);

  

  return (
    <div key={keyValue}>
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
        <div className={styles.centerItemActive} key={keyValue}>
          <div>
            <IconButton color={"success"} onClick={() => switchTeam(player, 'LEFT')}>
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
            <IconButton color="warning" onClick={() => switchTeam(player, 'RIGHT')}>
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
