
import React from 'react';
import { X, Star } from 'lucide-react';

interface FiltersScreenProps {
  onClose: () => void;
  filters: { dietary: string; sortBy: string };
  setFilters: React.Dispatch<React.SetStateAction<{ dietary: string; sortBy: string }>>;
}

export const FiltersScreen: React.FC<FiltersScreenProps> = ({ onClose, filters, setFilters }) => {

  const handleClear = () => {
    setFilters({ dietary: 'all', sortBy: 'relevance' });
  };

  const sortOptions = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'rating', label: 'Rating' },
    { id: 'price-asc', label: 'Cost: Low to High' },
    { id: 'price-desc', label: 'Cost: High to Low' },
  ];
  
  const dietaryOptions = [
    { id: 'veg', label: 'Pure Veg', icon: '🥬' }, 
    { id: 'non-veg', label: 'Non-Veg', icon: '🍗' }
  ];


  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="bg-white bg-opacity-20 p-2 rounded-full active:scale-90 transition-transform" aria-label="Close filters"><X size={24} /></button>
            <h1 className="text-2xl font-black">Filters</h1>
          </div>
          <button onClick={handleClear} className="text-white font-bold">Clear All</button>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-28">
        <div>
          <h3 className="font-black text-gray-800 mb-3 text-lg">Dietary Preferences</h3>
          <div className="grid grid-cols-2 gap-2">
            {dietaryOptions.map(pref => (
              <button 
                key={pref.id} 
                onClick={() => setFilters(f => ({...f, dietary: f.dietary === pref.id ? 'all' : pref.id}))}
                className={`py-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform ${filters.dietary === pref.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-800 border-gray-200'}`}
              >
                <span>{pref.icon}</span><span>{pref.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black text-gray-800 mb-3 text-lg">Sort By</h3>
          <div className="space-y-2">
            {sortOptions.map(option => (
              <button 
                key={option.id}
                onClick={() => setFilters(f => ({ ...f, sortBy: option.id }))}
                className={`w-full text-left p-4 rounded-xl border-2 font-bold active:scale-98 transition-transform ${filters.sortBy === option.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-800 border-gray-200'}`}
                >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black text-gray-800 mb-3 text-lg">Delivery Time</h3>
          <div className="flex gap-2">
            {['Under 30 min', '30-45 min', '45+ min'].map(time => (
              <button key={time} className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-bold text-sm active:scale-95 transition-transform bg-white text-gray-800 focus:bg-orange-500 focus:text-white focus:border-orange-500">{time}</button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black text-gray-800 mb-3 text-lg">Rating</h3>
          <div className="flex gap-2">
            {['4.0+', '4.5+'].map(rating => (
              <button key={rating} className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform bg-white text-gray-800 focus:bg-orange-500 focus:text-white focus:border-orange-500">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />{rating}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t max-w-md mx-auto">
        <button onClick={onClose} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl active:scale-95 transition-transform">Apply Filters</button>
      </div>
    </div>
  );
};
