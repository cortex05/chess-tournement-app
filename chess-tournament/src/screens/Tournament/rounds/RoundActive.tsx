import React from 'react'
import type { IMatch } from '../../../types/types'

type Props = {
  matches: IMatch[]
}

const RoundActive = (props: Props) => {
  const { matches } = props
  return (
    <div>RoundActive</div>
  )
}

export default RoundActive