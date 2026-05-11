
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { Order } from '../types';

interface CancelOrderModalProps {
  order: Order;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const CancelOrderModal: React.FC<CancelOrderModalProps> = ({ order, onConfirm, onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-6 animate-fade-in">
      <style>{`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out; }`}</style>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative">
        <button onClick={onDismiss} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
        
        <div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <AlertTriangle size={48} className="text-red-500" />
        </div>
        
        <h2 className="text-2xl font-black text-gray-800 mb-2">Cancel Order?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel order #{order.orderNumber}? This action cannot be undone.
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={onDismiss} 
            className="flex-1 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl active:scale-95 transition-transform"
          >
            No, Keep It
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 active:scale-95 transition-transform"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};