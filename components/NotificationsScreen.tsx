import React from 'react';
import { X } from 'lucide-react';

interface NotificationsScreenProps {
  onClose: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onClose }) => {
  const notifications = [
    { icon: '🎉', title: 'Welcome Bonus', message: 'Get 50% off on your first order!', time: '2 min ago' },
    { icon: '🍕', title: 'New Restaurant', message: 'Pizza Paradise now on FoodHub', time: '1 hour ago' },
    { icon: '🎁', title: 'Daily Reward', message: 'Claim your daily 10 points now!', time: '3 hours ago' },
    { icon: '⭐', title: 'Rate Your Order', message: 'How was your experience?', time: '5 hours ago' }
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="bg-white bg-opacity-20 p-2 rounded-full active:scale-90 transition-transform" aria-label="Close notifications"><X size={24} /></button>
          <h1 className="text-2xl font-black">Notifications</h1>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {notifications.map((notif, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md p-4 flex gap-4">
            <div className="text-4xl">{notif.icon}</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">{notif.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
              <p className="text-xs text-gray-400">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
