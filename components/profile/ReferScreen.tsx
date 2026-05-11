
import React from 'react';
import { ChevronLeft, Gift, Copy, Share2 } from 'lucide-react';
import type { User } from '../../types';

interface ReferScreenProps {
  onClose: () => void;
  user: User | null;
  showNotif: (msg: string, type?: 'success' | 'error') => void;
}

export const ReferScreen: React.FC<ReferScreenProps> = ({ onClose, user, showNotif }) => {
  const referralCode = user ? `${user.name.split(' ')[0].toUpperCase()}123` : 'FOODHUB123';
  
  const copyCode = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
        showNotif('Referral code copied!', 'success');
    }).catch(() => {
        showNotif('Failed to copy code.', 'error');
    });
  };

  const shareCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on FoodHub!',
        text: `Get $5 OFF on your first order on FoodHub with my referral code: ${referralCode}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      copyCode();
      showNotif('Share not supported, code copied instead!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black text-gray-800">Refer & Earn</h1>
        </div>
      </div>
      <div className="p-6 text-center">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-6">
            <Gift size={64} className="text-white"/>
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">Invite Friends, Get Rewards!</h2>
        <p className="text-gray-600 mb-8">Share your code with friends. They get $5 OFF on their first order, and you get 100 points!</p>

        <div className="mb-8">
            <p className="text-gray-500 mb-2">Your Referral Code</p>
            <div className="relative bg-orange-50 border-2 border-dashed border-orange-400 rounded-2xl p-4 flex items-center justify-center">
                <span className="text-3xl font-black text-orange-600 tracking-widest">{referralCode}</span>
                <button onClick={copyCode} className="absolute right-4 p-2 bg-white rounded-full shadow">
                    <Copy size={20} className="text-orange-600"/>
                </button>
            </div>
        </div>

        <button onClick={shareCode} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
            <Share2 size={20}/> Share Your Code
        </button>
      </div>
    </div>
  );
};