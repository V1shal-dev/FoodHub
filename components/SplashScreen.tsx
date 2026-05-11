import React from 'react';

export const SplashScreen = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-white" style={{ width: Math.random() * 100 + 50, height: Math.random() * 100 + 50, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`, animationDelay: `${Math.random() * 5}s` }} />
            ))}
        </div>
        <style>{`@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } } @keyframes bounce-in { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }`}</style>
        <div className="text-center z-10">
            <div className="text-8xl mb-6" style={{ animation: 'bounce-in 1s ease-out' }}>🍔</div>
            <h1 className="text-6xl font-black text-white mb-3 drop-shadow-2xl">FoodHub</h1>
            <p className="text-white text-2xl font-bold opacity-90">Delicious food, delivered fast</p>
            <div className="mt-8 flex gap-2 justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
        </div>
    </div>
);
