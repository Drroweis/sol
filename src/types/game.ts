export interface Prize {
  id: string;
  name: string;
  symbol: string;
  color: string;
  icon: string;
}

export interface UserState {
  spinsLeft: number;
  maxSpins: number;
  isSpinning: boolean;
  recoveryTime: number | null;
  lastPrize: Prize | null;
}