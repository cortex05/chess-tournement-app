import React from 'react'
import type { IPlayer } from '../../../types/types'

import styles from '../Tournament.module.css'
import { IconButton, ListItemText } from '@mui/material'
import { ArrowForwardSharp, DeleteSharp } from '@mui/icons-material'

type Props = {
  playerOne: IPlayer | undefined
  playerTwo: IPlayer | undefined
  setPlayerOne: Function
  setPlayerTwo: Function
  setTeamOneRoster: Function
  setTeamTwoRoster: Function
  teamOneRoster: IPlayer[]
  teamTwoRoster: IPlayer[] 
}

const MatchPlayers = (props: Props) => {
  const { playerOne, playerTwo, setPlayerOne, setTeamOneRoster, teamOneRoster, setTeamTwoRoster, teamTwoRoster, setPlayerTwo } = props

  const handleRemove = (direction: string) => {
    if(direction === "left" && playerOne){
      const revertPlayer = playerOne
      const holderArray = [...teamOneRoster, revertPlayer]

      setPlayerOne(undefined)
      setTeamOneRoster(holderArray)
    } else if (direction === "right" && playerTwo){
      const revertPlayer = playerTwo
      const holderArray = [...teamTwoRoster, revertPlayer]

      setPlayerTwo(undefined)
      setTeamTwoRoster(holderArray)
    }
  }

  return (
    <div className={styles.match}>
      <div>
        {playerOne ? <div className={styles.centerItem}>
        <ListItemText primary={playerOne.name} />
        <div>
          <div>
            <IconButton color={"primary"} onClick={() => handleRemove("left")}>
              {/* <Avatar> */}
              <DeleteSharp />
              {/* </Avatar> */}
            </IconButton>
          </div>
        </div>
      </div> : <span>Select Player</span>}
      </div>
      <h4>VS</h4>
      <div>
        {playerTwo ? <div className={styles.centerItem}>
        <ListItemText primary={playerTwo.name} />
        <div>
          <div>
            <IconButton color={"primary"} onClick={() => handleRemove("right")}>
              {/* <Avatar> */}
              <DeleteSharp />
              {/* </Avatar> */}
            </IconButton>
          </div>
        </div>
      </div> : <span>Select Player</span>}
      </div>
    </div>
  )
}

export default MatchPlayers