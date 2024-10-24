import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trophy, Users, Gift, Wallet } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="container mx-auto flex justify-around">
        <NavLink
          to="/game"
          className={({ isActive }) => 
            `flex flex-col items-center ${isActive ? 'text-green-400' : 'text-gray-400'}`
          }
        >
          <Trophy className="w-6 h-6" />
          <span>Lottery</span>
        </NavLink>
        <NavLink
          to="/wallet"
          className={({ isActive }) => 
            `flex flex-col items-center ${isActive ? 'text-green-400' : 'text-gray-400'}`
          }
        >
          <Wallet className="w-6 h-6" />
          <span>Wallet</span>
        </NavLink>
        <NavLink
          to="/referral"
          className={({ isActive }) => 
            `flex flex-col items-center ${isActive ? 'text-green-400' : 'text-gray-400'}`
          }
        >
          <Users className="w-6 h-6" />
          <span>Referral</span>
        </NavLink>
        <NavLink
          to="/quests"
          className={({ isActive }) => 
            `flex flex-col items-center ${isActive ? 'text-green-400' : 'text-gray-400'}`
          }
        >
          <Gift className="w-6 h-6" />
          <span>Quest</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;