import { Bitcoin, DollarSign, Star } from 'lucide-react';

export const PRIZES = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', color: 'text-orange-500', icon: Bitcoin },
  { id: 'major', name: 'Major', symbol: 'MAJOR', color: 'text-yellow-500', icon: Star },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', color: 'text-green-500', icon: DollarSign },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', color: 'text-blue-500', icon: DollarSign },
  { id: 'star', name: 'Star', symbol: 'STAR', color: 'text-purple-500', icon: Star },
  { id: 'gbd', name: 'GBD', symbol: 'GBD', color: 'text-red-500', icon: DollarSign },
  { id: 'not', name: 'NOT', symbol: 'NOT', color: 'text-gray-500', icon: Star },
] as const;