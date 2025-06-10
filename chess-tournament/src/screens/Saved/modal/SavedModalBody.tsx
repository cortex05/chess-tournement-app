import { useEffect, useState } from "react";
import type { IRoundScore, ITournament } from "../../../types/types";

import styles from "./SavedModalBody.module.css";
import { mockScore } from "../../../utilities/mockData";
import { calculateScore } from "../../../utilities/functions";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  keyName: string;
  closeModal: Function;
};

const SavedModalBody = (props: Props) => {
  const navigate = useNavigate();
  const { keyName, closeModal } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [localTournament, setlocalTournament] = useState<ITournament>();
  const [roundScore, setRoundScore] = useState<IRoundScore>(mockScore);

  const handleSuccess = () => {
    navigate(`/tournament/${localTournament?.name}`);
  };

  useEffect(() => {
    setIsLoading(true);

    // get the tournament
    const jsonValue = localStorage.getItem(keyName.toUpperCase());
    const tourney = jsonValue !== null ? JSON.parse(jsonValue) : null;

    setlocalTournament(tourney);
    setRoundScore(calculateScore(tourney));
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading && <div>LOADING</div>}
      {!isLoading && (
        <div className={styles.displayContent}>
          <Typography variant="h5">{localTournament?.name}</Typography>
          <Typography variant="h6">Round {localTournament?.round}</Typography>
          <div className={styles.scoreModal}>
            <div>
              <Typography variant="h6">
                Team One: {roundScore.teamOneScore} Points
              </Typography>
              {localTournament?.teams[0].teamRoster.map((player, index) => {
                return (
                  <div key={index} className={styles.scoreModalPlayer}>
                    <div>
                      <Typography variant="body2">{player.name}</Typography>
                      <Typography variant="caption">
                        {player.score} point(s)
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="caption">W / L / D</Typography>
                      <Typography variant="caption">
                        {player.wins}/{player.losses}/{player.draws}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <Typography variant="h6">
                Team Two: {roundScore.teamTwoScore} points
              </Typography>
              {localTournament?.teams[1].teamRoster.map((player, index) => {
                return (
                  <div key={index} className={styles.scoreModalPlayer}>
                    <div>
                      <Typography variant="body2">{player.name}</Typography>
                      <Typography variant="caption">{player.score}</Typography>
                    </div>
                    <div>
                      <Typography variant="caption">W / L / D</Typography>
                      <Typography variant="caption">
                        {player.wins}/{player.losses}/{player.draws}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <footer>
            <Typography variant="h6">Go to this tournament?</Typography>
            <div>
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleSuccess()}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => closeModal(false)}
              >
                No
              </Button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default SavedModalBody;
