import React from 'react';
import { ChevronLeft, Award, Clock } from 'lucide-react';
import type { LoyaltyPointEntry } from '../../types';

interface LoyaltyPointsScreenProps {
  onClose: () => void;
  pointsHistory: LoyaltyPointEntry[];
  totalPoints: number;
}

export const LoyaltyPointsScreen: React.FC<LoyaltyPointsScreenProps> = ({ onClose, pointsHistory, totalPoints }) => {
  const now = new Date();

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black text-gray-800">Loyalty Points</h1>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center shadow-xl mb-6">
          <p className="opacity-80 mb-2">Available Points</p>
          <h2 className="text-5xl font-black">{totalPoints}</h2>
        </div>

        <h3 className="font-black text-gray-800 text-lg mb-4">Points History</h3>
        <div className="space-y-3">
          {pointsHistory.map((entry, idx) => {
            const isExpired = new Date(entry.expiresAt) < now;
            const earnedDate = new Date(entry.earnedAt).toLocaleDateString();
            const expiresDate = new Date(entry.expiresAt).toLocaleDateString();

            return (
              <div key={idx} className={`bg-white rounded-xl p-4 ${isExpired ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${entry.points > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Award size={24} className={entry.points > 0 ? 'text-green-600' : 'text-red-600'} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{entry.source}</p>
                    <p className="text-sm text-gray-500">Earned: {earnedDate}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock size={12} />
                      {isExpired ? `Expired on ${expiresDate}` : `Expires on ${expiresDate}`}
                    </p>
                  </div>
                  <p className={`font-black text-lg ${entry.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {entry.points > 0 ? `+${entry.points}` : entry.points}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
