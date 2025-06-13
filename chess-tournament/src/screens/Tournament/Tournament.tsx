import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  IMatch,
  IPlayer,
  IRoundScore,
  ITournament,
} from "../../types/types";
import { calculateScore } from "../../utilities/functions";
import styles from "./Tournament.module.css";
import RoundActive from "./rounds/RoundActive";
import { mockPlayer, mockScore } from "../../utilities/mockData";
import Modal from "../../components/Modals/Modal";
import RoundSetUp from "./rounds/RoundSetUp";

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
      console.log(value.tournamentType)
      if (value && value.tournamentType === "FFA") {
        setTournament(value)
        setMatchPlayerOne(mockPlayer)
        setMatchPlayerTwo(mockPlayer)
        setIsLoading(false);
      } else if (value.tournamentType === "TEAM") {
        setTournament(value);
        setTeamOneRoster(value.teams[0].teamRoster);
        setTeamTwoRoster(value.teams[1].teamRoster);
        setIsLoading(false);
        setRoundScore(calculateScore(value));
      }
    }
  };

  useEffect(() => {
    fetchTournament();
  }, []);

  return (
    <div className={styles.overHead}>
      {isLoading && <div>LOADING</div>}
      {!isLoading &&
        roundStart &&
        tournament && (
          <RoundSetUp
            tournament={tournament}
            setScoreModal={setScoreModal}
            teamOneRoster={teamOneRoster}
            teamTwoRoster={teamTwoRoster}
            setTeamOneRoster={setTeamOneRoster}
            setTeamTwoRoster={setTeamTwoRoster}
            matchPlayerOne={matchPlayerOne}
            matchPlayerTwo={matchPlayerTwo}
            setMatchPlayerOne={setMatchPlayerOne}
            setMatchPlayerTwo={setMatchPlayerTwo}
            matchHolder={matchHolder}
            setMatchHolder={setMatchHolder}
            setRoundStart={setRoundStart}
          />
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
