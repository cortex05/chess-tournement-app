import type { IPlayer, IPlayerMatched, ITeam } from "../types/types"
export class Player {
  // Defaults
  score: number = 0
  playersMatched: IPlayerMatched[] = []
  wins: number = 0
  draws: number = 0
  losses: number = 0
  totalMatches: number = 0

  // Initialized values
  name: string
  id: number

  constructor(name: string, id: number){
    this.name = name
    this.id = id
  }
}

export class Team {
  // Initialized values
  name: string
  id: number
  teamRoster: IPlayer[] = []

  constructor(name: string, id: number){
    this.name = name
    this.id = id
  }
}

export class Tournament {
  tournamentType: string
  playerRoster: IPlayer[]
  teams: ITeam[]
  name: string

  round: number = 1

  constructor(tournamentType: string, playerRoster: IPlayer[], teams: ITeam[], name: string){
    this.tournamentType = tournamentType
    this.playerRoster = playerRoster
    this.teams = teams
    this.name = name
  }
}

export class Match {
  playerOne: IPlayer | null
  playerTwo: IPlayer | null
  winner: string = ""
  whitePlayer: string = ""

  constructor(playerOne: IPlayer, playerTwo: IPlayer, whitePlayer: string){
    this.playerOne = playerOne
    this.playerTwo = playerTwo
    this.whitePlayer = whitePlayer
  }
}

export class RoundScore {
  winner: string
  teamOneScore: number
  teamTwoScore: number

  constructor(winner: string, teamOneScore: number, teamTwoScore: number){
    this.winner = winner
    this.teamOneScore = teamOneScore
    this.teamTwoScore = teamTwoScore
  }
}

export class PlayerMatched {
  playerId: number
  numberOfMatches: number = 1
  name: string
  timesAsWhite: number = 0
  timesAsBlack: number = 0

  constructor(playerId: number, name: string){
    this.playerId = playerId
    this.name = name
  }
}