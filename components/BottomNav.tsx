
import React from 'react';
import { Home, Calendar, ShoppingCart, Package, User } from 'lucide-react';

interface BottomNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, cartCount }) => {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'reserve', icon: Calendar, label: 'Reserve' },
        { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
        { id: 'orders', icon: Package, label: 'Orders' },
        { id: 'profile', icon: User, label: 'Profile' }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 z-50 max-w-md mx-auto">
            <div className="flex items-center justify-around py-2">
                {navItems.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-16 h-16 justify-center relative ${
                            activeTab === tab.id ? 'text-orange-500' : 'text-gray-400'
                        }`}
                        aria-label={tab.label}
                        aria-current={activeTab === tab.id}
                    >
                        <div className="relative">
                            <tab.icon size={26} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                            {tab.badge && tab.badge > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {tab.badge}
                                </span>
                            )}
                        </div>
                        <span className={`text-xs font-bold transition-all duration-300 ${activeTab === tab.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>{tab.label}</span>
                         {activeTab === tab.id && (
                            <div className="absolute -top-1 w-8 h-1 bg-orange-500 rounded-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};