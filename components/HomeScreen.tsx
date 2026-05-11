
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, ChevronDown, Bell, Search, Mic, ChevronRight, Sparkles, Filter, Flame, Heart, Star, QrCode, Calendar, Play, BrainCircuit } from 'lucide-react';
import { foodCategories, myRestaurant, banners, comboDeals } from '../constants/data';
import type { FoodCategory, FoodItem, ComboDeal, HappyHourDeal } from '../types';

interface HomeScreenProps {
    openCategoryView: (category: FoodCategory) => void;
    setShowFilters: (show: boolean) => void;
    onSelectItem: (item: FoodItem) => void;
    favoriteItems: number[];
    toggleFavoriteItem: (id: number) => void;
    loyaltyPoints: number;
    onShowGame: (type: 'spin' | 'scratch' | 'trivia' | 'memory') => void;
    setShowNotifications: (show: boolean) => void;
    setShowQRScanner: (show: boolean) => void;
    bannerIndex: number;
    userLocation: string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    showNotif: (msg: string, type?: 'success' | 'error') => void;
    handleAddComboToCart: (combo: ComboDeal) => void;
    activeDeal: HappyHourDeal | null;
    filters: { dietary: string; sortBy: string; };
}

const FoodItemCard: React.FC<{ item: FoodItem; onSelect: (item: FoodItem) => void; isFavorite: boolean; toggleFavorite: (id: number) => void; delay: number; }> = ({ item, onSelect, isFavorite, toggleFavorite, delay }) => (
    <button onClick={() => onSelect(item)} className="w-full bg-white rounded-3xl shadow-xl overflow-hidden active:scale-98 transition-all hover:shadow-2xl" style={{ animation: `fadeInUp 0.5s ease-out ${delay}s both` }}>
        <div className="relative h-44 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center group">
            <div className="text-8xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110">{item.image}</div>
            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }} className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-lg active:scale-90 transition-transform">
                <Heart size={22} className={`transition-all ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'}`} />
            </button>
        </div>
        <div className="p-5">
            <h3 className="text-xl font-black text-gray-800 mb-1 text-left truncate">{item.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1 text-green-600"><Star size={14} className="fill-green-600" />{item.rating}</span>
                <span>•</span>
                <span>{item.time}</span>
                <span>•</span>
                <span>{item.calories} cal</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-orange-500">${item.price}</span>
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-2xl leading-none">+</div>
            </div>
        </div>
    </button>
);


export const HomeScreen: React.FC<HomeScreenProps> = ({ openCategoryView, setShowFilters, onSelectItem, favoriteItems, toggleFavoriteItem, loyaltyPoints, onShowGame, setShowNotifications, setShowQRScanner, bannerIndex, userLocation, searchQuery, setSearchQuery, showNotif, handleAddComboToCart, activeDeal, filters }) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const searchResultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            const recognition = recognitionRef.current;
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setSearchQuery(transcript);
                setIsListening(false);
                setTimeout(() => {
                    searchResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                    showNotif("Voice search permission was denied.", "error");
                } else {
                    showNotif("Voice search error. Please try again.", "error");
                }
                setIsListening(false);
            };
            
            recognition.onend = () => {
                setIsListening(false);
            };
        }
    }, [setSearchQuery, showNotif]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const popularSearches = useMemo(() => ['Pizza', 'Burger', 'Biryani', 'Salad', 'Noodles', 'Dessert'], []);
    
    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const itemSuggestions = myRestaurant.menu
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


    const handleVoiceSearch = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.start();
                    setIsListening(true);
                } catch(e) {
                    console.error("Could not start recognition", e);
                    showNotif("Voice search could not be started.", "error");
                    setIsListening(false);
                }
            } else {
                showNotif("Voice search is not supported by your browser.", "error");
            }
        }
    };
    
    const applyFiltersAndSort = (items: FoodItem[]) => {
        let result = [...items];
        
        // Filtering
        if (filters.dietary === 'veg') {
            result = result.filter(item => item.isVeg === true);
        } else if (filters.dietary === 'non-veg') {
            result = result.filter(item => item.isVeg === false);
        }

        // Sorting
        switch (filters.sortBy) {
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            // 'relevance' is default, no sort needed
        }
        return result;
    };

    const trendingItems = useMemo(() => applyFiltersAndSort(
        myRestaurant.menu.filter(item => item.rating >= 4.8)
    ), [filters]);

    const filteredMenu = useMemo(() => applyFiltersAndSort(
        myRestaurant.menu.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ), [searchQuery, filters]);


    return (
        <div className="pb-28 bg-gray-50">
            <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .pulsing-mic { animation: pulse 1.5s infinite; }
                @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
            `}</style>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-b-3xl shadow-lg relative z-20">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-white text-sm font-semibold mb-1">Deliver to</p>
                        <button className="flex items-center gap-2"><MapPin size={16} className="text-white" /><span className="text-white font-bold">{userLocation}</span><ChevronDown size={16} className="text-white" /></button>
                    </div>
                    <div className="flex items-center gap-2">
                         <button onClick={() => setShowQRScanner(true)} className="relative bg-white bg-opacity-20 p-3 rounded-full"><QrCode size={22} className="text-white" /></button>
                         <button onClick={() => setShowNotifications(true)} className="relative bg-white bg-opacity-20 p-3 rounded-full"><Bell size={22} className="text-white" /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
                    </div>
                </div>
                <div className="relative" ref={searchContainerRef}>
                    <input type="text" placeholder={isListening ? "Listening..." : "Search for dishes..."} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => { if(searchQuery) setSuggestions(suggestions)}} className="w-full pl-12 pr-12 py-4 rounded-2xl shadow-lg outline-none text-gray-800 bg-white" />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <button onClick={handleVoiceSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <Mic className={`text-orange-500 ${isListening ? 'pulsing-mic' : ''}`} size={20} />
                    </button>
                     {suggestions.length > 0 && searchQuery && (
                        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg border z-30 overflow-hidden">
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

            <div className="px-6 mt-6">
                <div className="relative h-52 bg-gray-800 rounded-2xl shadow-xl overflow-hidden group">
                    <video 
                        src="https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4" 
                        className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                     <div className="absolute bottom-5 left-5 text-white">
                        <h3 className="font-black text-3xl drop-shadow-lg">Taste of Summer</h3>
                        <p className="font-semibold drop-shadow-md">Discover our new seasonal menu!</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                 <div className="relative w-full overflow-hidden rounded-2xl shadow-xl mb-6">
                    <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${bannerIndex * 100}%)` }}>
                        {banners.map(banner => (
                            <div key={banner.id} className={`min-w-full h-40 bg-gradient-to-r ${banner.color} p-6 flex items-center justify-between`}>
                                <div><h3 className="text-3xl font-black text-white mb-1">{banner.title}</h3><p className="text-white text-lg font-semibold">{banner.subtitle}</p></div>
                                <div className="text-6xl">{banner.image}</div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">{banners.map((_, idx) => (<div key={idx} className={`h-2 rounded-full transition-all ${idx === bannerIndex ? 'w-6 bg-white' : 'w-2 bg-white bg-opacity-50'}`} />))}</div>
                </div>
                
                {activeDeal && (
                    <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 bg-gradient-to-r from-amber-400 to-yellow-500 p-5 flex items-center justify-between text-yellow-900">
                        <div>
                            <h3 className="font-black text-2xl">{activeDeal.name}</h3>
                            <p className="font-semibold">{activeDeal.startTime} - {activeDeal.endTime} Today</p>
                            <p className="font-bold mt-2 bg-white/50 rounded-full px-3 py-1 text-sm inline-block">{activeDeal.description}</p>
                        </div>
                        <Flame size={48} className="opacity-80" />
                    </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button onClick={() => onShowGame('memory')} className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl text-white p-5 flex flex-col items-center justify-center text-center active:scale-95 transition-transform h-40">
                        <BrainCircuit size={48} className="mb-2"/>
                        <h3 className="font-black text-xl">Memory Game</h3>
                        <p className="text-xs opacity-90 mt-1">Match pairs to win points!</p>
                    </button>
                     <button onClick={() => onShowGame('spin')} className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl shadow-xl text-white p-5 flex flex-col items-center justify-center text-center active:scale-95 transition-transform h-40">
                        <div className="text-5xl mb-2">🎡</div>
                        <h3 className="font-black text-xl">Daily Spin</h3>
                        <p className="text-xs opacity-90 mt-1">Win exciting prizes!</p>
                    </button>
                </div>
            </div>

            <div className="mb-6">
                 <div className="flex items-center justify-between mb-4 px-6">
                    <h2 className="text-2xl font-black text-gray-800">Must-Try Combos</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 px-6 -mb-4 hide-scrollbar" style={{ perspective: '1000px' }}>
                    {comboDeals.map((combo) => (
                        <div key={combo.id} className={`flex-shrink-0 w-64 h-80 bg-gradient-to-br ${combo.color} rounded-3xl shadow-xl p-5 flex flex-col justify-between text-white relative overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl`} style={{ transform: 'rotateY(-15deg) scale(0.95)', transformOrigin: 'center left' }}>
                            <div className="absolute -right-8 -top-8 text-8xl opacity-20 transform rotate-12">{combo.image}</div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black drop-shadow-lg">{combo.name}</h3>
                                <p className="text-sm opacity-90 font-semibold">{combo.itemsDescription}</p>
                            </div>
                            <div className="relative z-10">
                                <div className="mb-3">
                                    <span className="text-4xl font-black drop-shadow-lg">${combo.price}</span>
                                    <span className="ml-2 text-lg line-through opacity-80">${combo.originalPrice}</span>
                                </div>
                                <button onClick={() => handleAddComboToCart(combo)} className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl active:scale-95 transition-transform">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-4 px-6"><h2 className="text-2xl font-black text-gray-800">Categories</h2><button onClick={() => openCategoryView(foodCategories[0])} className="text-orange-500 font-bold flex items-center gap-1">View All<ChevronRight size={18} /></button></div>
                <div className="flex gap-4 overflow-x-auto pb-4 px-6 -mb-4 hide-scrollbar">
                    {foodCategories.slice(1).map((category) => (<button key={category.id} onClick={() => openCategoryView(category)} className="flex flex-col items-center gap-2 active:scale-95 transition-all flex-shrink-0 w-20"><div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl shadow-lg hover:shadow-xl transition-all hover:scale-110`}>{category.icon}</div><span className="text-sm font-bold text-gray-700 text-center leading-tight">{category.name}</span></button>))}
                </div>
            </div>

            <div className="px-6" ref={searchResultsRef}>
                <div className="flex items-center justify-between mb-4"><h2 className="text-2xl font-black text-gray-800"><Sparkles className="inline mr-2 text-orange-500" size={24} />{searchQuery ? 'Search Results' : 'Trending Now'}</h2><button onClick={() => setShowFilters(true)} className="flex items-center gap-1 text-orange-500 font-bold bg-orange-50 px-3 py-2 rounded-xl active:scale-95 transition-transform"><Filter size={16} />Filters</button></div>
                <div className="space-y-4">
                    {(searchQuery ? filteredMenu : trendingItems).map((item, idx) => (
                        <FoodItemCard key={item.id} item={item} onSelect={onSelectItem} isFavorite={favoriteItems.includes(item.id)} toggleFavorite={toggleFavoriteItem} delay={idx * 0.05} />
                    ))}
                     {searchQuery && filteredMenu.length === 0 && <p className="text-center text-gray-500 py-10">No results found for "{searchQuery}".</p>}
                </div>
            </div>
        </div>
    );
};