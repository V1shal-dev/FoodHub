import React from 'react';
import { ChevronLeft, Plus, Banknote } from 'lucide-react';

interface WalletScreenProps {
  onClose: () => void;
  loyaltyPoints: number;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({ onClose, loyaltyPoints }) => {
  const walletBalance = (loyaltyPoints / 100).toFixed(2);

  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black text-gray-800">My Wallet</h1>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center shadow-xl mb-6">
          <p className="opacity-80 mb-2">Total Balance</p>
          <h2 className="text-5xl font-black mb-6">${walletBalance}</h2>
          <button className="bg-white text-orange-600 font-bold py-3 px-6 rounded-full flex items-center gap-2 mx-auto">
            <Plus size={20} /> Add Money
          </button>
        </div>
        
        <h3 className="font-black text-gray-800 text-lg mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[
            { type: 'Added', amount: 10.00, date: '2023-10-25' },
            { type: 'Paid for Order', amount: -15.50, date: '2023-10-24' },
            { type: 'Cashback', amount: 1.55, date: '2023-10-24' },
          ].map((tx, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 flex items-center gap-4">
              <div className={`p-3 rounded-full ${tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <Banknote size={24} className={tx.amount > 0 ? 'text-green-600' : 'text-red-600'} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{tx.type}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <p className={`font-black text-lg ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
