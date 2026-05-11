
import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { foodCategories, allFoodItems } from '../constants/data';
import type { FoodCategory } from '../types';

interface SearchScreenProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openCategoryView: (category: FoodCategory) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ searchQuery, setSearchQuery, openCategoryView }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const popularSearches = useMemo(() => ['Pizza', 'Burger', 'Biryani', 'Chinese', 'Desserts', 'Healthy'], []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const itemSuggestions = allFoodItems
            .filter(item => item.name.toLowerCase().includes(lowerCaseQuery))
            .map(item => item.name);
        const categorySuggestions = foodCategories
            .filter(cat => cat.name.toLowerCase().includes(lowerCaseQuery))
            .map(cat => cat.name);
        const popularSuggestions = popularSearches
            .filter(term => term.toLowerCase().includes(lowerCaseQuery));
        
        const combined = [...new Set([...popularSuggestions, ...categorySuggestions, ...itemSuggestions])];
        setSuggestions(combined.slice(0, 5));
    } else {
        setSuggestions([]);
    }
  }, [searchQuery, popularSearches]);


  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <h2 className="text-2xl font-black text-gray-800 mb-4">Search</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search restaurants, cuisines, dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-500 outline-none bg-white text-gray-800"
            autoFocus
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
           {suggestions.length > 0 && searchQuery && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg border z-20 overflow-hidden">
                    <ul>
                        {suggestions.map((s, i) => (
                            <li key={i} onClick={() => { setSearchQuery(s); setSuggestions([]); }} className="px-5 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 font-semibold flex items-center gap-3">
                                <Search size={16} className="text-gray-400" />
                                <span>{s}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-black text-gray-800 mb-3">Trending Searches</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {popularSearches.map(term => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full font-semibold active:scale-95 transition-transform"
            >
              {term}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-black text-gray-800 mb-3">All Categories</h3>
        <div className="grid grid-cols-3 gap-3">
          {foodCategories.map(category => (
            <button
              key={category.id}
              onClick={() => openCategoryView(category)}
              className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl shadow-md active:scale-95 transition-transform"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl`}>
                {category.icon}
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
