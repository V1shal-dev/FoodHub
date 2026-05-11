import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface AboutScreenProps {
  onClose: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black text-gray-800">About FoodHub</h1>
        </div>
      </div>
      <div className="p-6 text-center">
        <div className="text-8xl mb-6">🍔</div>
        <h2 className="text-4xl font-black text-gray-800">FoodHub</h2>
        <p className="text-gray-600 font-semibold mb-8">Version 1.0.0</p>
        
        <div className="text-gray-500">
            <p>Your favorite food, delivered fast to your door.</p>
            <p>&copy; {new Date().getFullYear()} FoodHub Inc. All rights reserved.</p>
        </div>
        
        <div className="mt-8 space-y-2">
            <p className="text-orange-500 font-semibold">Terms of Service</p>
            <p className="text-orange-500 font-semibold">Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};
