import React, { useEffect, useState } from 'react'
import type { ITournament } from '../../../types/types'

type Props = {
  keyName: string
}

const SavedModalBody = (props: Props) => {
  const { keyName } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [localTournament, setlocalTournament] = useState<ITournament>()

  useEffect(() => {
    setIsLoading(true)

    // get the tournament
    const jsonValue = localStorage.getItem(keyName.toUpperCase());
    const tourney = jsonValue !== null ? JSON.parse(jsonValue) : null

    setlocalTournament(tourney)

    setIsLoading(false)
  }, [])
  return (
    <div>
      {isLoading && <div>LOADING</div>}
      {!isLoading && <div>SavedModalBody</div>}
    </div>
  )
}

export default SavedModalBody