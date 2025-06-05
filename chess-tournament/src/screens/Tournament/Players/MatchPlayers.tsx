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
  const { playerOne, playerTwo, setPlayerOne, setTeamOneRoster, teamOneRoster } = props

  const handleRemove = (direction: string) => {
    if(direction === "left" && playerOne){
      console.log("Initial team roster:", teamOneRoster)
      const revertPlayer = playerOne
      console.log("Object to push in", revertPlayer)
      const holderArray = [...teamOneRoster, revertPlayer]
      console.log("Array we are going to push into: ", holderArray)

      setPlayerOne(undefined)
      setTeamOneRoster(holderArray)
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
        {playerTwo ? <span>{playerTwo.name}</span> : <span>Select from </span>}
      </div>
    </div>
  )
}

export default MatchPlayers