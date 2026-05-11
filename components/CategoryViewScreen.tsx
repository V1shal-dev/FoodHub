import React from 'react';
import { ChevronLeft, Star, Plus } from 'lucide-react';
import type { FoodCategory, FoodItem } from '../types';

interface CategoryViewScreenProps {
  category: FoodCategory;
  items: FoodItem[];
  onClose: () => void;
  onSelect: (item: FoodItem) => void;
}

export const CategoryViewScreen: React.FC<CategoryViewScreenProps> = ({ category, items, onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto pb-6">
      <div className={`bg-gradient-to-r ${category.color} p-6 text-white sticky top-0 z-10 shadow-lg`}>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="bg-white bg-opacity-20 p-2 rounded-full active:scale-90 transition-transform"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-5xl">{category.icon}</span>
              <h1 className="text-3xl font-black">{category.name}</h1>
            </div>
            <p className="text-white opacity-90">{items.length} items available</p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="bg-white rounded-2xl shadow-md overflow-hidden active:scale-95 transition-transform"
          >
            <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center text-6xl`}>
              {item.image}
            </div>
            <div className="p-3">
              <div className="flex items-start gap-2 mb-2">
                {item.isVeg !== undefined && (
                  <div className={`w-4 h-4 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center mt-0.5 flex-shrink-0`} title={item.isVeg ? 'Veg' : 'Non-Veg'}>
                    <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                )}
                <h3 className="font-bold text-gray-800 text-sm line-clamp-2 text-left flex-1">{item.name}</h3>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-gray-700">{item.rating}</span>
                <span className="text-xs text-gray-500">({item.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-orange-500 font-black text-lg">${item.price}</span>
                </div>
                <div className="bg-orange-100 text-orange-600 p-1.5 rounded-lg">
                  <Plus size={16} />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
