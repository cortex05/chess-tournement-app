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
  setMatchPlayerTwo: Function;
  setTeamTwoRoster: Function;
  teamTwoRoster: IPlayer[];
  matchPlayerTwo: IPlayer | undefined;
  playerOne: IPlayer | undefined;
};

const PlayerItemRight = (props: Props) => {
  const {
    keyValue,
    player,
    setMatchPlayerTwo,
    setTeamTwoRoster,
    teamTwoRoster,
    matchPlayerTwo,
    playerOne,
  } = props;

  const handleShift = () => {
    setMatchPlayerTwo(player);
    const filteredRoster = teamTwoRoster.filter(
      (remainingPlayer: IPlayer) => remainingPlayer.id !== player.id
    );
    setTeamTwoRoster(filteredRoster);
  };

  const nameText = (playerName: string, foe: IPlayer | undefined) => {
    if (foe) {
      if (
        player.playersMatched.filter((playerMatched) => {
          return playerMatched.playerId === foe.id;
        }).length > 0
      ) {
        const targetIndex = player.playersMatched
          .map((e) => e.playerId)
          .indexOf(foe.id);
        const matches = player.playersMatched[targetIndex].numberOfMatches;
        return `${playerName} - ${matches}`;
      }
    }
    return playerName;
  };

  return (
    <div >
      {!matchPlayerTwo && (
        <div className={styles.centerItem}>
          <div>
            <div>
              <IconButton color={"success"} onClick={() => handleShift()}>
                {/* <Avatar> */}
                <ArrowBackSharp />
                {/* </Avatar> */}
              </IconButton>
            </div>
          </div>
          <ListItemText primary={nameText(player.name, playerOne)} />
        </div>
      )}
    </div>
  );
};

export default PlayerItemRight;
