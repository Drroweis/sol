export interface User {
  id: string;
  email: string;
  username: string;
  walletBalances: {
    [key: string]: number;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}