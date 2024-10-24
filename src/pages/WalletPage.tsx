import React from 'react';
import { ArrowDownToLine, ArrowUpToLine, History } from 'lucide-react';
import useAuthStore from '../store/authStore';
import WalletBalance from '../components/wallet/WalletBalance';

const WalletPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 pt-20 pb-24">
      <h1 className="text-3xl font-bold mb-8">My Wallet</h1>
      
      <div className="space-y-8">
        {/* Balances */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Available Balance</h2>
          <WalletBalance balances={user?.walletBalances || {}} />
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
              <ArrowDownToLine className="w-5 h-5" />
              <span>Deposit</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
              <ArrowUpToLine className="w-5 h-5" />
              <span>Withdraw</span>
            </button>
          </div>
        </section>

        {/* Transaction History */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors">
              <History className="w-4 h-4" />
              <span>View All</span>
            </button>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-center text-gray-500 py-8">No recent transactions</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WalletPage;