import type { IMatch, IPlayer } from "../../../types/types";

import styles from "./MatchPlayers.module.css";
import { Button, IconButton, ListItemText, Typography } from "@mui/material";
import { DeleteSharp } from "@mui/icons-material";
import { Match } from "../../../utilities/utilities";
import { useState } from "react";

type Props = {
  playerOne: IPlayer | undefined;
  playerTwo: IPlayer | undefined;
  setPlayerOne: Function;
  setPlayerTwo: Function;
  setTeamOneRoster: Function;
  setTeamTwoRoster: Function;
  teamOneRoster: IPlayer[];
  teamTwoRoster: IPlayer[];
  setMatchHolder: Function;
  matchHolder: IMatch[];
};

const MatchPlayers = (props: Props) => {
  const {
    playerOne,
    playerTwo,
    setPlayerOne,
    setTeamOneRoster,
    teamOneRoster,
    setTeamTwoRoster,
    teamTwoRoster,
    setPlayerTwo,
    matchHolder,
    setMatchHolder,
  } = props;
  const [filledMatch, setFilledMatch] = useState<boolean>(false);
  const [whitePlayer, setWhitePlayer] = useState<boolean>(true);

  const handleRemove = (direction: string) => {
    if (direction === "left" && playerOne) {
      const revertPlayer = playerOne;
      const holderArray = [...teamOneRoster, revertPlayer];

      setPlayerOne(undefined);
      setTeamOneRoster(holderArray);
    } else if (direction === "right" && playerTwo) {
      const revertPlayer = playerTwo;
      const holderArray = [...teamTwoRoster, revertPlayer];

      setPlayerTwo(undefined);
      setTeamTwoRoster(holderArray);
    }
  };

  const handleSet = () => {
    if (playerOne && playerTwo) {
      const colorSelection = whitePlayer ? "playerOne" : "playerTwo";
      const newMatch = new Match(playerOne, playerTwo, colorSelection);
      setFilledMatch(false);
      setMatchHolder([...matchHolder, newMatch]);
      setPlayerOne(undefined);
      setPlayerTwo(undefined);
    }
  };

  const playerOneText = (player: IPlayer, foe: IPlayer, whichPlayer: string) => {
    if (whichPlayer === "playerOne") {
      if (whitePlayer) {
        if (
          player.playersMatched.filter((playerMatched) => {
            return playerMatched.playerId === foe.id;
          }).length > 0
        ) {
          const targetIndex = player.playersMatched
            .map((e) => e.playerId)
            .indexOf(foe.id);
          const matchesAsWhite =
            player.playersMatched[targetIndex].timesAsBlack;
          return `${player.name} - ${matchesAsWhite}`;
        }
        return player.name;
      } else if (!whitePlayer) {
        if (
          player.playersMatched.filter((playerMatched) => {
            return playerMatched.playerId === foe.id;
          }).length > 0
        ) {
          const targetIndex = player.playersMatched
            .map((e) => e.playerId)
            .indexOf(foe.id);

          const matchesAsBlack =
            player.playersMatched[targetIndex].timesAsWhite;
          return `${player.name} - ${matchesAsBlack}`;
        }
        return player.name;
      }
    } else if(whichPlayer === "playerTwo"){
      if (!whitePlayer) {
      if (
        player.playersMatched.filter((playerMatched) => {
          return playerMatched.playerId === foe.id;
        }).length > 0
      ) {
        const targetIndex = player.playersMatched
          .map((e) => e.playerId)
          .indexOf(foe.id);
        const matchesAsWhite = player.playersMatched[targetIndex].timesAsBlack;
        console.log(player.playersMatched[targetIndex]);
        console.log(matchesAsWhite);
        return `${player.name} - ${matchesAsWhite}`;
      }
      return player.name;
    } else if (whitePlayer) {
      if (
        player.playersMatched.filter((playerMatched) => {
          return playerMatched.playerId === foe.id;
        }).length > 0
      ) {
        const targetIndex = player.playersMatched
          .map((e) => e.playerId)
          .indexOf(foe.id);

        const matchesAsBlack = player.playersMatched[targetIndex].timesAsWhite;
        return `${player.name} - ${matchesAsBlack}`;
      }
      return player.name;
    }
    }
  };

  // const playerTwoText = (player: IPlayer, foe: IPlayer) => {
  //   if (!whitePlayer) {
  //     if (
  //       player.playersMatched.filter((playerMatched) => {
  //         return playerMatched.playerId === foe.id;
  //       }).length > 0
  //     ) {
  //       const targetIndex = player.playersMatched
  //         .map((e) => e.playerId)
  //         .indexOf(foe.id);
  //       const matchesAsWhite = player.playersMatched[targetIndex].timesAsBlack;
  //       console.log(player.playersMatched[targetIndex]);
  //       console.log(matchesAsWhite);
  //       return `${player.name} - ${matchesAsWhite}`;
  //     }
  //     return player.name;
  //   } else if (whitePlayer) {
  //     if (
  //       player.playersMatched.filter((playerMatched) => {
  //         return playerMatched.playerId === foe.id;
  //       }).length > 0
  //     ) {
  //       const targetIndex = player.playersMatched
  //         .map((e) => e.playerId)
  //         .indexOf(foe.id);

  //       const matchesAsBlack = player.playersMatched[targetIndex].timesAsWhite;
  //       return `${player.name} - ${matchesAsBlack}`;
  //     }
  //     return player.name;
  //   }
  // };

  return (
    <div>
      {!filledMatch && (
        <div className={styles.match}>
          <div>
            {playerOne ? (
              <div className={`${styles.centerItem}`}>
                <ListItemText primary={playerOne.name} />
                <div>
                  <div>
                    <IconButton
                      color={"primary"}
                      onClick={() => handleRemove("left")}
                    >
                      {/* <Avatar> */}
                      <DeleteSharp />
                      {/* </Avatar> */}
                    </IconButton>
                  </div>
                </div>
              </div>
            ) : (
              <Typography variant="body1" gutterBottom>
                Select Player One
              </Typography>
            )}
            {filledMatch && <div></div>}
          </div>
          <Typography variant="h6" gutterBottom>
            VS
          </Typography>

          <div>
            {playerTwo ? (
              <div className={styles.centerItem}>
                <ListItemText primary={playerTwo.name} />
                <div>
                  <div>
                    <IconButton
                      color={"primary"}
                      onClick={() => handleRemove("right")}
                    >
                      {/* <Avatar> */}
                      <DeleteSharp />
                      {/* </Avatar> */}
                    </IconButton>
                  </div>
                </div>
              </div>
            ) : (
              <Typography variant="body1" gutterBottom>
                Select Player Two
              </Typography>
            )}
            {filledMatch && <div></div>}
          </div>
        </div>
      )}
      {filledMatch && playerOne && playerTwo && (
        <div className={styles.match}>
          <div
            className={`${styles.colorSelect} ${
              whitePlayer ? styles.positive : styles.negative
            }`}
            onClick={() => setWhitePlayer(!whitePlayer)}
          >
            <ListItemText primary={playerOneText(playerOne, playerTwo, "playerOne")} />
          </div>

          <Button variant="outlined" onClick={() => handleSet()}>
            Accept
          </Button>

          <div
            className={`${styles.colorSelect} ${
              whitePlayer ? styles.negative : styles.positive
            }`}
            onClick={() => setWhitePlayer(!whitePlayer)}
          >
            <ListItemText primary={playerOneText(playerTwo, playerOne, "playerTwo")} />
          </div>
        </div>
      )}
      {playerOne && playerTwo && (
        <div>
          {!filledMatch && (
            <Button
              variant="outlined"
              // startIcon={<PersonAddAltSharp />}
              size="large"
              onClick={() => setFilledMatch(true)}
            >
              Pick Colors
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchPlayers;
