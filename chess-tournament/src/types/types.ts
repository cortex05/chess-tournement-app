
export interface IPlayer {
  id: number
  name: string
  score: number
  playersMatched: IPlayerMatched[]
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
  winner: string
  whitePlayer: string
}

export interface IMatchData {
  teamOneName: string
  teamTwoName: string 
}

export interface IRoundScore {
  winner: string
  teamOneScore: number
  teamTwoScore: number
}

export interface IPlayerMatched {
  playerId: number
  numberOfMatches: number
  name: string
}