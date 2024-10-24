import { create } from 'zustand';
import { UserState } from '../types/game';

const useGameStore = create<UserState>((set) => ({
  spinsLeft: 10,
  maxSpins: 10,
  isSpinning: false,
  recoveryTime: null,
  lastPrize: null,
  setSpinning: (isSpinning: boolean) => set({ isSpinning }),
  setLastPrize: (prize: Prize) => set({ lastPrize: prize }),
  decrementSpins: () => 
    set((state) => ({ 
      spinsLeft: Math.max(0, state.spinsLeft - 1)
    })),
}));

export default useGameStore;