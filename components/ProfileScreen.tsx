import React from 'react';
import { Wallet, Award, MapPin, Heart, Tag, Settings, HelpCircle, Info, LogOut, ChevronRight, Crown, Gift } from 'lucide-react';
import type { Order, Address, User } from '../types';

interface ProfileScreenProps {
  user: User | null;
  orders: Order[];
  favoriteItemsCount: number;
  loyaltyPoints: number;
  userTier: string;
  addresses: Address[];
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, orders, favoriteItemsCount, loyaltyPoints, userTier, addresses, onLogout, onNavigate }) => {
  const menuItems = [
    { id: 'wallet', icon: <Wallet size={20} />, label: 'My Wallet', badge: `$${(loyaltyPoints / 100).toFixed(2)}` },
    { id: 'loyalty', icon: <Award size={20} />, label: 'Loyalty Points', badge: loyaltyPoints.toString() },
    { id: 'addresses', icon: <MapPin size={20} />, label: 'Saved Addresses', badge: addresses.length.toString() },
    { id: 'favorites', icon: <Heart size={20} />, label: 'Favorite Dishes', badge: favoriteItemsCount.toString() },
    { id: 'coupons', icon: <Tag size={20} />, label: 'My Coupons', badge: '3 active' },
    { id: 'refer', icon: <Gift size={20} />, label: 'Refer & Earn' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    { id: 'help', icon: <HelpCircle size={20} />, label: 'Help & Support' },
    { id: 'about', icon: <Info size={20} />, label: 'About' }
  ];

  return (
    <div className="pb-28 bg-gray-50">
      <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-center">
        <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-orange-500 border-4 border-white/50">{user?.name.charAt(0)}</div>
        <h2 className="text-2xl font-black text-white mb-1">{user?.name || 'Guest User'}</h2>
        <p className="text-white opacity-90">{user?.phone}</p>
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white bg-opacity-20 rounded-xl p-3"><p className="text-3xl font-black text-white">{orders.length}</p><p className="text-white text-sm">Orders</p></div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3"><p className="text-3xl font-black text-white">{favoriteItemsCount}</p><p className="text-white text-sm">Favorites</p></div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3"><p className="text-3xl font-black text-white">{loyaltyPoints}</p><p className="text-white text-sm">Points</p></div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-3">
            <div><p className="text-sm opacity-90">Your Tier</p><h3 className="text-3xl font-black">{userTier}</h3></div><Crown size={48} />
          </div>
          <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2"><div className="bg-white rounded-full h-3" style={{ width: '70%' }}></div></div>
          <p className="text-sm">300 points to Platinum tier</p>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)} className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 active:scale-98 transition-transform">
              <div className="text-orange-500">{item.icon}</div>
              <span className="flex-1 text-left font-bold text-gray-800">{item.label}</span>
              {item.badge && <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">{item.badge}</span>}
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
          <button onClick={onLogout} className="w-full bg-red-50 text-red-600 rounded-xl shadow-md p-4 flex items-center gap-4 font-bold active:scale-98 transition-transform">
            <LogOut size={20} /><span className="flex-1 text-left">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
