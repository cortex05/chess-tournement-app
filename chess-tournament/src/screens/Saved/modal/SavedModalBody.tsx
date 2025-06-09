import { useEffect, useState } from 'react'
import type { IRoundScore, ITournament } from '../../../types/types'

import styles from './SavedModalBody.module.css'
import { mockScore } from '../../../utilities/mockData'
import { calculateScore } from '../../../utilities/functions'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type Props = {
  keyName: string
  closeModal: Function
}

const SavedModalBody = (props: Props) => {
  const navigate = useNavigate()
  const { keyName, closeModal } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [localTournament, setlocalTournament] = useState<ITournament>()
  const [roundScore, setRoundScore] = useState<IRoundScore>(mockScore);

  const handleSuccess = () => {
    navigate(`/tournament/${localTournament?.name}`);
  }

  useEffect(() => {
    setIsLoading(true)

    // get the tournament
    const jsonValue = localStorage.getItem(keyName.toUpperCase());
    const tourney = jsonValue !== null ? JSON.parse(jsonValue) : null

    setlocalTournament(tourney)
    setRoundScore(calculateScore(tourney));
    setIsLoading(false)
  }, [])

  return (
    <div>
      {isLoading && <div>LOADING</div>}
      {!isLoading && <div className={styles.displayContent}>
        <h3>{localTournament?.name}</h3>
        <h4>Round {localTournament?.round}</h4>
        <div className={styles.scoreModal}>
          <div>
						<h4>Team One: {roundScore.teamOneScore} Points</h4>
						{localTournament?.teams[0].teamRoster.map((player, index) => {
							return <div key={index} className={styles.scoreModalPlayer}>
									<div><span>{player.name}</span> <span>-</span> <span>{player.score}</span></div>
									<div> 
										<span>W/L/D</span>
										<span>-</span>
										<span>{player.wins}/{player.losses}/{player.draws}</span>
									</div>
								</div>
						})}
					</div>
					<div>
						<h4>Team Two: {roundScore.teamTwoScore} points</h4>
						{localTournament?.teams[1].teamRoster.map((player, index) => {
							return <div key={index} className={styles.scoreModalPlayer}>
									<div><span>{player.name}</span> <span>-</span> <span>{player.score}</span></div>
									<div>
										<span>W/L/D</span>
										<span>-</span>
										<span>{player.wins}/{player.losses}/{player.draws}</span>
									</div>
								</div>
						})}
					</div>
        </div>
        <footer>
          <h3>Go to this tournament?</h3>
          <div>
            <Button variant='contained' color='success' onClick={() => handleSuccess()}>Yes</Button>
            <Button variant='contained' color='error' onClick={() => closeModal(false)}>No</Button>
          </div>
        </footer>
      </div>}
    </div>
  )
}

export default SavedModalBody