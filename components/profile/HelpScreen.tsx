import React from 'react';
import { ChevronLeft, BookOpen, MessageCircle, Phone } from 'lucide-react';

interface HelpScreenProps {
  onClose: () => void;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black text-gray-800">Help & Support</h1>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2 mb-8">
            {['How to track my order?', 'How to cancel my order?', 'Payment issues', 'Delivery time queries'].map((faq, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg font-semibold text-gray-700">{faq}</div>
            ))}
        </div>
        
        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
         <div className="space-y-3">
            <button className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
                <div className="text-orange-500"><MessageCircle size={20} /></div>
                <span className="flex-1 text-left font-bold text-gray-800">Chat with us</span>
            </button>
             <button className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
                <div className="text-orange-500"><Phone size={20} /></div>
                <span className="flex-1 text-left font-bold text-gray-800">Call support</span>
            </button>
        </div>
      </div>
    </div>
  );
};
