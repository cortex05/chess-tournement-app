export class Player {
  // Defaults
  score: number = 0
  playersMatched: Player[] = []
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