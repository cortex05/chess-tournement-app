import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ITournament } from '../../types/types'


type Props = {
  name: string
}

const Tournament = () => {
  const { tourney } = useParams<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tournament, setTournament] = useState<ITournament>()

  const fetchTournament = () => {
    if(tourney){
      const jsonValue = localStorage.getItem(tourney.toUpperCase())
      const value = jsonValue !== null ? JSON.parse(jsonValue) : null
      console.log("tournament: ", value)
      setTournament(value)
      setIsLoading(false)
    }

  }

  useEffect(() => {
    fetchTournament()
  }, [])
  
  return (
    <div>
      {isLoading && <div>LOADING</div>}
      {!isLoading && <div>
          <h1>{tournament?.name} is a {tournament?.tournamentType}</h1>
        </div>}
    </div>
  )
}

export default Tournament