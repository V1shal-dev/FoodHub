import React from 'react';
import { ChevronLeft, Bell, Lock, Palette } from 'lucide-react';

interface SettingsScreenProps {
  onClose: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black text-gray-800">Settings</h1>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {[
            { icon: <Bell size={20} />, label: 'Notification Settings' },
            { icon: <Lock size={20} />, label: 'Password & Security' },
            { icon: <Palette size={20} />, label: 'Theme & Appearance' },
          ].map((item, idx) => (
            <button key={idx} className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 text-left">
              <div className="text-orange-500">{item.icon}</div>
              <span className="flex-1 font-bold text-gray-800">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
