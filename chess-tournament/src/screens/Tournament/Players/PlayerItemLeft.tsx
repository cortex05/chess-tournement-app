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
  playerTwo: IPlayer | undefined
};

const PlayerItemLeft = (props: Props) => {
  const { keyValue, player, setMatchPlayerOne, setTeamOneRoster, teamOneRoster, matchPlayerOne, playerTwo } = props;

  const handleShift = () => {
    setMatchPlayerOne(player)
    const filteredRoster = teamOneRoster.filter((remainingPlayer: IPlayer) => remainingPlayer.id !== player.id)
    console.log(filteredRoster)
    setTeamOneRoster(filteredRoster)
  }

  const nameText = (playerName: string, foe: IPlayer | undefined) => {
      if (foe) {
        console.log("foe")
        if (
          player.playersMatched.filter((playerMatched) => {
            return playerMatched.playerId === foe.id;
          }).length > 0
        ) {
          console.log("we've fought before")
          const targetIndex = player.playersMatched
            .map((e) => e.playerId)
            .indexOf(foe.id);
          console.log(targetIndex);
          const matches = player.playersMatched[targetIndex].numberOfMatches;
          return `${playerName} - ${matches}`;
        }
      }
      return playerName;
    };

  return (
    <div key={keyValue}>
      {!matchPlayerOne &&
      <div className={styles.centerItem}>
        <ListItemText primary={nameText(player.name, playerTwo)} />
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