import React from 'react';
import { motion } from 'framer-motion';
import { PRIZES } from '../game/prizeConfig';

interface WalletBalanceProps {
  balances: Record<string, number>;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ balances }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl"
    >
      {Object.entries(balances || {}).map(([symbol, balance]) => {
        const prize = PRIZES.find(p => p.symbol === symbol);
        if (!prize) return null;
        
        return (
          <div key={symbol} className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
            <prize.icon className={`w-5 h-5 ${prize.color}`} />
            <div>
              <p className="text-sm text-gray-400">{symbol}</p>
              <p className="font-bold">{Number(balance).toFixed(8)}</p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default WalletBalance;