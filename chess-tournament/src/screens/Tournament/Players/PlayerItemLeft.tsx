import {
  ArrowForwardSharp,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemText,
} from "@mui/material";
import type { IPlayer } from "../../../types/types";
import styles from "./MatchPlayers.module.css";

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
    setTeamOneRoster(filteredRoster)
  }

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