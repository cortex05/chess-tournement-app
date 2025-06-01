import type { Player } from "../utilities"

export interface IPlayer {
  id: number
  name: string
  score: number
  playersMatched: Player[]
  wins: number
  draws: number
  losses: number
  totalMatches: number 
}