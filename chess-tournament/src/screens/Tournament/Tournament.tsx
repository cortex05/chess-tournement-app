import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  IMatch,
  IPlayer,
  IRoundScore,
  ITournament,
} from "../../types/types";
import {
  calculateScore
} from "../../utilities/functions";
import styles from "./Tournament.module.css";
import PlayerItemRight from "./Players/PlayerItemRight";
import PlayerItemLeft from "./Players/PlayerItemLeft";
import MatchPlayers from "./Players/MatchPlayers";
import { Button, Typography } from "@mui/material";
import RoundActive from "./rounds/RoundActive";
import { mockScore } from "../../utilities/mockData";
import Modal from "../../components/Modals/Modal";

const Tournament = () => {
  const { tourney } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tournament, setTournament] = useState<ITournament>();
  const [roundStart, setRoundStart] = useState<boolean>(true);
  const [scoreModal, setScoreModal] = useState<boolean>(false);

  // Round variables
  const [teamOneRoster, setTeamOneRoster] = useState<IPlayer[]>([]);
  const [teamTwoRoster, setTeamTwoRoster] = useState<IPlayer[]>([]);

  const [matchPlayerOne, setMatchPlayerOne] = useState<IPlayer>();
  const [matchPlayerTwo, setMatchPlayerTwo] = useState<IPlayer>();
  const [matchHolder, setMatchHolder] = useState<IMatch[]>([]);
  const [roundScore, setRoundScore] = useState<IRoundScore>(mockScore);

  const fetchTournament = () => {
    // Move this to utility functions
    if (tourney) {
      const jsonValue = localStorage.getItem(tourney.toUpperCase());
      const value = jsonValue !== null ? JSON.parse(jsonValue) : null;
      // console.log("tournament: ", value);
      setTournament(value);
      setTeamOneRoster(value.teams[0].teamRoster);
      setTeamTwoRoster(value.teams[1].teamRoster);
      setIsLoading(false);
      setRoundScore(calculateScore(value));
    }
  };

  useEffect(() => {
    fetchTournament();
  }, []);

  return (
    <div className={styles.overHead}>
      {isLoading && <div>LOADING</div>}
      {!isLoading && roundStart && (
        <div className={styles.main}>
          <Typography variant="h4" gutterBottom>
            {tournament?.name} tournament
          </Typography>
          <Typography variant="h5" gutterBottom>
            Round {tournament?.round} set up.
          </Typography>
          <Button variant="outlined" onClick={() => setScoreModal(true)}>
            Scoreboard
          </Button>
          <div className={styles.settingRoster}>
            <div>
              <Typography
                variant="h5"
                gutterBottom
                className={styles.teamHeader}
              >
                {tournament?.teams[0].name}
              </Typography>
              <div>
                {teamOneRoster?.map((player, index) => {
                  return (
                    <PlayerItemLeft
                      player={player}
                      keyValue={index}
                      setMatchPlayerOne={setMatchPlayerOne}
                      setTeamOneRoster={setTeamOneRoster}
                      teamOneRoster={teamOneRoster}
                      matchPlayerOne={matchPlayerOne}
                      playerTwo={matchPlayerTwo}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              {(teamOneRoster.length > 0 ||
                teamTwoRoster.length > 0 ||
                matchPlayerOne ||
                matchPlayerTwo) && (
                <>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={styles.teamHeader}
                  >
                    Match {matchHolder && matchHolder.length + 1}
                  </Typography>
                  <MatchPlayers
                    playerOne={matchPlayerOne}
                    playerTwo={matchPlayerTwo}
                    setPlayerOne={setMatchPlayerOne}
                    setPlayerTwo={setMatchPlayerTwo}
                    setTeamOneRoster={setTeamOneRoster}
                    setTeamTwoRoster={setTeamTwoRoster}
                    teamOneRoster={teamOneRoster}
                    teamTwoRoster={teamTwoRoster}
                    setMatchHolder={setMatchHolder}
                    matchHolder={matchHolder}
                  />
                </>
              )}
              {teamOneRoster.length === 0 &&
                teamTwoRoster.length === 0 &&
                matchPlayerOne === undefined &&
                matchPlayerTwo === undefined && (
                  <div className={styles.forwardButton}>
                    <Typography variant="h5" gutterBottom>That's everyone.</Typography>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => setRoundStart(false)}
                    >
                      Proceed
                    </Button>
                  </div>
                )}
            </div>
            <div>
              <Typography
                variant="h5"
                gutterBottom
                className={styles.teamHeader}
              >
                {tournament?.teams[1].name}
              </Typography>
              <div>
                {teamTwoRoster?.map((player, index) => {
                  return (
                    <PlayerItemRight
                      player={player}
                      keyValue={index}
                      setMatchPlayerTwo={setMatchPlayerTwo}
                      setTeamTwoRoster={setTeamTwoRoster}
                      teamTwoRoster={teamTwoRoster}
                      matchPlayerTwo={matchPlayerTwo}
                      playerOne={matchPlayerOne}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <footer className={styles.setMatchesBody}>
            <Typography variant="h5" gutterBottom>Set Matches</Typography>
            <div className={styles.holderArray}>
              {matchHolder.length > 0 &&
                matchHolder?.map((match, index) => {
                  return (
                    <div className={styles.matchItem} key={index}>
                      <Typography variant="body2" gutterBottom>
                        {match.playerOne.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        VS
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {match.playerTwo.name}
                      </Typography>
                    </div>
                  );
                })}
            </div>
          </footer>
        </div>
      )}
      {!isLoading && !roundStart && tournament && (
        <RoundActive
          matches={matchHolder}
          tournament={tournament}
          setMatchHolder={setMatchHolder}
          roundScore={roundScore}
          setRoundScore={setRoundScore}
          setTeamOneRoster={setTeamOneRoster}
          setTeamTwoRoster={setTeamTwoRoster}
          setRoundStart={setRoundStart}
        />
      )}
      <Modal tall isOpen={scoreModal} onClose={() => setScoreModal(false)}>
        <div className={styles.scoreModal}>
          <div>
            <h4>Team One: {roundScore.teamOneScore} points</h4>
            {teamOneRoster.map((player, index) => {
              return (
                <div key={index} className={styles.scoreModalPlayer}>
                  <div>
                    <span>{player.name}</span> <span>-</span>{" "}
                    <span>{player.score}</span>
                  </div>
                  <div>
                    <span>W/L/D</span>
                    <span>-</span>
                    <span>
                      {player.wins}/{player.losses}/{player.draws}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h4>Team Two: {roundScore.teamTwoScore} points</h4>
            {teamTwoRoster.map((player, index) => {
              return (
                <div key={index} className={styles.scoreModalPlayer}>
                  <div>
                    <span>{player.name}</span> <span>-</span>{" "}
                    <span>{player.score}</span>
                  </div>
                  <div>
                    <span>W/L/D</span>
                    <span>-</span>
                    <span>
                      {player.wins}/{player.losses}/{player.draws}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tournament;
