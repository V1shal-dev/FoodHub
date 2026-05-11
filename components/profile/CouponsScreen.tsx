
import React from 'react';
import { ChevronLeft, Tag } from 'lucide-react';
import type { Coupon } from '../../types';

interface CouponsScreenProps {
  onClose: () => void;
  userCoupons: Coupon[];
}

export const CouponsScreen: React.FC<CouponsScreenProps> = ({ onClose, userCoupons }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black text-gray-800">My Coupons</h1>
        </div>
      </div>
      <div className="p-6">
        <div className="relative mb-6">
          <input type="text" placeholder="Enter coupon code" className="w-full pl-4 pr-24 py-4 rounded-xl border-2 border-gray-200 outline-none focus:border-orange-500 bg-white text-gray-800" />
          <button className="absolute right-2 top-2 bottom-2 bg-orange-500 text-white font-bold px-4 rounded-lg">APPLY</button>
        </div>
        {userCoupons.length > 0 ? (
          <div className="space-y-4">
            {userCoupons.map((coupon, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md flex overflow-hidden">
                <div className="bg-orange-100 p-6 flex items-center justify-center">
                  <Tag size={32} className="text-orange-500" />
                </div>
                <div className="p-4 flex-1">
                  <p className="font-black text-orange-600 text-lg">{coupon.code}</p>
                  <p className="text-sm text-gray-700 mb-2">{coupon.description}</p>
                  {coupon.minOrderValue && <p className="text-xs text-gray-500">Min. order: ${coupon.minOrderValue}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-5xl mb-4">🎟️</p>
            <h3 className="text-xl font-bold text-gray-700">No Coupons Yet</h3>
            <p className="text-gray-500">Win coupons from games and promotions!</p>
          </div>
        )}
      </div>
    </div>
  );
};
