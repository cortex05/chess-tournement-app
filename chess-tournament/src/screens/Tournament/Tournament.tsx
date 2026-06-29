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
import RoundActive from "./rounds/RoundActive/RoundActive";
import { mockPlayer, mockScore } from "../../utilities/mockData";
import Modal from "../../components/Modals/Modal";
import RoundSetUp from "./rounds/RoundSetUp/RoundSetUp";
import useTournamentStore from "../../store/useTournamentStore";

const Tournament = () => {
  const { tourney } = useParams<string>();
  const activeTournament = useTournamentStore((s) => s.activeTournament);
  const setActiveTournament = useTournamentStore((s) => s.setActiveTournament);
  const clearActiveTournament = useTournamentStore((s) => s.clearActiveTournament);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    // Move this to utility functions oncs FFA fully implemented
    if (!tourney) {
      clearActiveTournament();
      setIsLoading(false);
      return;
    }

    const jsonValue = localStorage.getItem(tourney.toUpperCase());
    if (jsonValue === null) {
      clearActiveTournament();
      setIsLoading(false);
      return;
    }

    try {
      const value: ITournament = JSON.parse(jsonValue);

      if (value.tournamentType === "FFA") {
        setActiveTournament(value);
        setMatchPlayerOne(mockPlayer);
        setMatchPlayerTwo(mockPlayer);
        setTeamOneRoster([]);
        setTeamTwoRoster([]);
        setRoundScore(mockScore);
        setIsLoading(false);
      } else if (value.tournamentType === "TEAM") {
        setActiveTournament(value);
        setTeamOneRoster(value.teams[0].teamRoster);
        setTeamTwoRoster(value.teams[1].teamRoster);
        setRoundScore(calculateScore(value));
        setIsLoading(false);
      } else {
        clearActiveTournament();
        setIsLoading(false);
      }
    } catch {
      clearActiveTournament();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournament();
  }, [tourney]);

  return (
    <div className={styles.overHead}>
      {isLoading && <div>LOADING</div>}
      {!isLoading &&
        roundStart &&
        activeTournament && (
          <RoundSetUp
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
        )
      }
      {!isLoading && !roundStart && activeTournament && (
        <RoundActive
          matches={matchHolder}
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
