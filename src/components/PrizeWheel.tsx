import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bitcoin, DollarSign, Star, Wallet } from 'lucide-react';
import useGameStore from '../store/gameStore';
import useAuthStore from '../store/authStore';
import { endpoints } from '../config/api';

const PRIZES = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', color: 'text-orange-500', icon: Bitcoin },
  { id: 'major', name: 'Major', symbol: 'MAJOR', color: 'text-yellow-500', icon: Star },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', color: 'text-green-500', icon: DollarSign },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', color: 'text-blue-500', icon: DollarSign },
  { id: 'star', name: 'Star', symbol: 'STAR', color: 'text-purple-500', icon: Star },
  { id: 'gbd', name: 'GBD', symbol: 'GBD', color: 'text-red-500', icon: DollarSign },
  { id: 'not', name: 'NOT', symbol: 'NOT', color: 'text-gray-500', icon: Star },
];

const PrizeWheel: React.FC = () => {
  const { user } = useAuthStore();
  const { spinsLeft, maxSpins, isSpinning, setSpinning, decrementSpins, setLastPrize } = useGameStore();
  const [rotation, setRotation] = useState(0);
  const [showWallet, setShowWallet] = useState(false);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const [winSymbol, setWinSymbol] = useState<string | null>(null);

  const spinWheel = async () => {
    if (isSpinning || spinsLeft <= 0) return;
    
    setSpinning(true);
    setWinAmount(null);
    setWinSymbol(null);
    
    const randomRotations = Math.floor(Math.random() * 8) + 8;
    const randomPrizeIndex = Math.floor(Math.random() * PRIZES.length);
    const finalRotation = rotation + (360 * randomRotations) + (360 / PRIZES.length * randomPrizeIndex);
    
    setRotation(finalRotation);
    
    try {
      const response = await fetch(endpoints.game.spin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) throw new Error('Spin failed');
      
      const data = await response.json();
      decrementSpins();
      
      setTimeout(() => {
        setSpinning(false);
        setLastPrize(PRIZES[randomPrizeIndex]);
        setWinAmount(data.prize.amount);
        setWinSymbol(data.prize.type);
      }, 5000);
    } catch (error) {
      setSpinning(false);
      // Handle error
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wallet Toggle */}
      <button
        onClick={() => setShowWallet(!showWallet)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
      >
        <Wallet className="w-5 h-5" />
        <span>{showWallet ? 'Hide Wallet' : 'Show Wallet'}</span>
      </button>

      {/* Wallet Display */}
      <AnimatePresence>
        {showWallet && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl"
          >
            {Object.entries(user?.walletBalances || {}).map(([symbol, balance]) => {
              const prize = PRIZES.find(p => p.symbol === symbol);
              if (!prize) return null;
              
              const IconComponent = prize.icon;
              return (
                <div key={symbol} className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
                  <IconComponent className={`w-5 h-5 ${prize.color}`} />
                  <div>
                    <p className="text-sm text-gray-400">{symbol}</p>
                    <p className="font-bold">{Number(balance).toFixed(8)}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prize Wheel */}
      <div className="relative w-80 h-80">
        <motion.div
          className="absolute w-full h-full rounded-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl border-4 border-gray-700"
          style={{ 
            rotate: rotation,
            transition: 'all 5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {PRIZES.map((prize, index) => {
            const IconComponent = prize.icon;
            return (
              <div
                key={prize.id}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${(360 / PRIZES.length) * index}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <div className="relative h-full">
                  <div 
                    className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center 
                               bg-gray-800 px-3 py-2 rounded-lg shadow-lg transform -rotate-90"
                  >
                    <IconComponent className={`w-6 h-6 ${prize.color}`} />
                    <span className="text-sm font-bold mt-1">{prize.symbol}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
        
        <button
          onClick={spinWheel}
          disabled={isSpinning || spinsLeft <= 0}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-green-500 text-white font-bold py-4 px-8 rounded-full
                     hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed
                     z-10 transition-all shadow-lg hover:shadow-xl
                     disabled:opacity-50"
        >
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </button>
      </div>

      {/* Prize Reveal */}
      <AnimatePresence>
        {winAmount !== null && winSymbol !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 p-6 bg-gray-800 rounded-xl shadow-xl text-center"
          >
            <h3 className="text-xl font-bold mb-2">Congratulations! 🎉</h3>
            <p className="text-lg">
              You won <span className="font-bold text-green-400">{winAmount}</span>{' '}
              <span className={PRIZES.find(p => p.symbol === winSymbol)?.color || ''}>
                {winSymbol}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spins Counter */}
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">
          Spins Left: <span className="text-green-400">{spinsLeft}</span>/<span className="text-gray-400">{maxSpins}</span>
        </p>
        {spinsLeft === 0 && (
          <p className="text-yellow-400 text-sm">Recovering spins...</p>
        )}
      </div>
    </div>
  );
};

export default PrizeWheel;