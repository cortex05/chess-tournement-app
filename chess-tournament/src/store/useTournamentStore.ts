import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ITournament } from '../types/types';

type TournamentStore = {
  activeTournament: ITournament | null;
  setActiveTournament: (tournament: ITournament | null) => void;
  updateTournament: (newTournament: ITournament) => void;
  clearActiveTournament: () => void;
};

const useTournamentStore = create<TournamentStore>()(
  devtools(
    (set) => ({
      activeTournament: null,

      setActiveTournament: (tournament) =>
        set({ activeTournament: tournament }),

      updateTournament: (newTournament) =>
        set({ activeTournament: newTournament }),

      clearActiveTournament: () =>
        set({ activeTournament: null }),
    }),
    { name: 'tournament-store' }
  )
);

export default useTournamentStore;