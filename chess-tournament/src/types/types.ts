import type { Player } from "../utilities/utilities"

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

export interface ITeam {
  id: number
  teamRoster: IPlayer[]
  name: string
}

export interface ITournament {
  tournamentType: string
  playerRoster: IPlayer[]
  teams: ITeam[]
  name: string
  round: number
}

export interface IMatch {
  playerOne: IPlayer
  playerTwo: IPlayer
}

export interface IMatchData {
  teamOneName: string
  teamTwoName: string 
}