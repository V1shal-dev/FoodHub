
import React from 'react';
import { X, Gift } from 'lucide-react';

interface BirthdayModalProps {
    onClose: () => void;
    onClaim: () => void;
    userName: string;
}

export const BirthdayModal: React.FC<BirthdayModalProps> = ({ onClose, onClaim, userName }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-6 animate-fade-in">
             <style>{`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out; }`}</style>
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 z-20 hover:text-gray-600"><X size={24} /></button>
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-yellow-300 rounded-full opacity-50"></div>
                <div className="absolute -bottom-20 -left-12 w-48 h-48 bg-pink-300 rounded-full opacity-50"></div>

                <div className="relative z-10">
                    <div className="text-7xl mb-4 animate-bounce">🎂</div>
                    <h2 className="text-3xl font-black text-gray-800 mb-2">Happy Birthday, {userName}!</h2>
                    <p className="text-gray-600 mb-6">To celebrate your special day, we've got a treat for you!</p>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-red-100 border-2 border-dashed border-orange-300 rounded-2xl p-6 mb-6">
                        <Gift size={40} className="text-orange-500 mx-auto mb-3" />
                        <p className="text-xl font-bold text-orange-600">Get a FREE Mango Lassi</p>
                        <p className="text-gray-700">with your next order!</p>
                    </div>

                    <button onClick={onClaim} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl shadow-lg active:scale-95 transition-transform">
                      Awesome, Thanks!
                    </button>
                </div>
            </div>
        </div>
    );
};
