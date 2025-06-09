import type { IMatch, IPlayer } from "../../../types/types";

import styles from "../Tournament.module.css";
import { Button, IconButton, ListItemText } from "@mui/material";
import { DeleteSharp } from "@mui/icons-material";
import { Match } from "../../../utilities/utilities";

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
    setMatchHolder
  } = props;

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
      const newMatch = new Match(playerOne, playerTwo);
      setMatchHolder([...matchHolder, newMatch]);
      setPlayerOne(undefined)
      setPlayerTwo(undefined)
    }
  };

  return (
    <div>
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
            <span>Select Player</span>
          )}
        </div>
        <h4>VS</h4>
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
            <span>Select Player</span>
          )}
        </div>
      </div>
      {playerOne && playerTwo && <div>
        <Button
          variant="outlined"
          // startIcon={<PersonAddAltSharp />}
          size="large"
          onClick={() => handleSet()}
        >
          Add Match
        </Button>
      </div>}
    </div>
  );
};

export default MatchPlayers;
