// import type { ITournament } from "../types/types"
// import { mockTournament } from "../utilities/mockData"
// import { SET_TOURNAMENT } from "./actions"

// export interface IState {
//   tournament: ITournament
// }

// export const initialState: IState = {
//   tournament: mockTournament
// }

// // export const payload

// export const reducer = (state: IState = initialState, action: { type: any; payload: any }): IState => {
//   switch (action.type) {
//     case SET_TOURNAMENT: {
//       return {
//         ...state,
//         tournament: action.payload
//       }
//     }
//     default:
//       return state
//   }
// }