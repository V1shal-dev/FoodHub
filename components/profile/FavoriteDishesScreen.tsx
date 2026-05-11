import React from 'react';
import { ChevronLeft, Star } from 'lucide-react';
import type { FoodItem } from '../../types';

interface FavoriteDishesScreenProps {
  onClose: () => void;
  favoriteItems: FoodItem[];
  onSelectItem: (item: FoodItem) => void;
}

export const FavoriteDishesScreen: React.FC<FavoriteDishesScreenProps> = ({ onClose, favoriteItems, onSelectItem }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black text-gray-800">Favorite Dishes</h1>
        </div>
      </div>
      <div className="p-6">
        {favoriteItems.length > 0 ? (
            <div className="space-y-4">
            {favoriteItems.map(item => (
                <button key={item.id} onClick={() => { onSelectItem(item); onClose(); }} className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-md active:scale-98 transition-transform text-left">
                <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center text-4xl">{item.image}</div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                    <div className="flex items-center gap-1">
                    <Star size={14} className="text-green-500 fill-green-500" />
                    <span className="text-sm font-bold text-gray-700">{item.rating}</span>
                    <span className="text-sm text-gray-500">(${item.price})</span>
                    </div>
                </div>
                </button>
            ))}
            </div>
        ) : (
            <div className="text-center mt-20">
                <p className="text-5xl mb-4">💔</p>
                <h3 className="text-xl font-bold text-gray-700">No Favorites Yet</h3>
                <p className="text-gray-500">Tap the heart on any dish to save it here.</p>
            </div>
        )}
      </div>
    </div>
  );
};
