import type { IPlayer, IRoundScore } from "../types/types"

export const mockScore: IRoundScore = {
    winner: "",
    teamOneScore: 0,
    teamTwoScore: 0,
  }

  export const mockPlayer: IPlayer = {
    id: 0,
    name: "Non Player",
    score: 0,
    playersMatched: [],
    wins: 0,
    draws: 0,
    losses: 0,
    totalMatches: 0
  }