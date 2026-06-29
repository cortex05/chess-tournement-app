import styles from "./RoundSetUp.module.css";
import PlayerItemRight from "../../Players/PlayerItemRight";
import PlayerItemLeft from "../../Players/PlayerItemLeft";
import MatchPlayers from "../../Players/MatchPlayers";
import { Button, Typography } from "@mui/material";
import type { IMatch, IPlayer } from "../../../../types/types";
import useTournamentStore from "../../../../store/useTournamentStore";
import { useState } from "react";

type Props = {
  setScoreModal: Function;
  teamOneRoster: IPlayer[];
  teamTwoRoster: IPlayer[];
  setTeamOneRoster: Function;
  setTeamTwoRoster: Function;
  matchPlayerOne: IPlayer | undefined;
  matchPlayerTwo: IPlayer | undefined;
  setMatchPlayerOne: Function;
  setMatchPlayerTwo: Function;
  matchHolder: IMatch[];
  setMatchHolder: Function;
  setRoundStart: Function;
};

const RoundSetUp = (props: Props) => {
  const {
    setScoreModal,
    teamOneRoster,
    teamTwoRoster,
    setTeamOneRoster,
    setTeamTwoRoster,
    matchPlayerOne,
    matchPlayerTwo,
    setMatchPlayerOne,
    setMatchPlayerTwo,
    matchHolder,
    setMatchHolder,
    setRoundStart,
  } = props;
  const [pendingUndoIndex, setPendingUndoIndex] = useState<number | null>(null);
  const tournament = useTournamentStore((s) => s.activeTournament);

  const pushBackIfMissing = (roster: IPlayer[], player: IPlayer) => {
    if (roster.some((existingPlayer) => existingPlayer.id === player.id)) {
      return roster;
    }
    return [...roster, player];
  };

  const handleUndoMatch = (matchIndex: number) => {
    const removedMatch = matchHolder[matchIndex];
    if (!removedMatch) return;

    setMatchHolder(
      matchHolder.filter((_: IMatch, index: number) => index !== matchIndex)
    );

    setTeamOneRoster(
      pushBackIfMissing(teamOneRoster, removedMatch.playerOne)
    );
    setTeamTwoRoster(
      pushBackIfMissing(teamTwoRoster, removedMatch.playerTwo)
    );
    setPendingUndoIndex(null);
  };

  if (!tournament) return null;
  return (
    <>
      {tournament.tournamentType === "FFA" && (
        <div>Free for all coming soon!</div>
      )}
      {tournament.tournamentType === "TEAM" && (
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
                    <Typography variant="h5" gutterBottom>
                      That's everyone.
                    </Typography>
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
            <Typography variant="h5" gutterBottom>
              Set Matches
            </Typography>
            <div className={styles.holderArray}>
              {matchHolder.length > 0 &&
                matchHolder?.map((match, index) => {
                  return (
                    <div
                      className={styles.matchItem}
                      key={index}
                      onClick={() => setPendingUndoIndex(index)}
                    >
                      {pendingUndoIndex !== index && (
                        <>
                          <Typography
                            variant="body2"
                            gutterBottom
                            className={`${
                              match.whitePlayer === "playerOne"
                                ? styles.positive
                                : styles.negative
                            }`}
                          >
                            {match.playerOne.name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            VS
                          </Typography>
                          <Typography
                            variant="body2"
                            gutterBottom
                            className={`${
                              match.whitePlayer === "playerTwo"
                                ? styles.positive
                                : styles.negative
                            }`}
                          >
                            {match.playerTwo.name}
                          </Typography>
                        </>
                      )}
                      {pendingUndoIndex === index && (
                        <div className={styles.undoConfirm}>
                          <Button
                            variant="text"
                            className={`${styles.confirmAction} ${styles.confirmRemove}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleUndoMatch(index);
                            }}
                          >
                            Remove
                          </Button>
                          <Typography variant="caption" className={styles.confirmOr}>
                            or
                          </Typography>
                          <Button
                            variant="text"
                            className={`${styles.confirmAction} ${styles.confirmCancel}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              setPendingUndoIndex(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default RoundSetUp;
