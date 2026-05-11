
import React from 'react';
import type { ScratchCard } from '../types';

interface ScratchCardModalProps {
  scratchCardsState: ScratchCard[];
  onReveal: (card: ScratchCard) => void;
  onClose: () => void;
}

export const ScratchCardModal: React.FC<ScratchCardModalProps> = ({ scratchCardsState, onReveal, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-black text-gray-800 mb-2">Scratch & Win!</h2>
        <p className="text-gray-600 mb-6">Scratch any card to reveal your reward</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {scratchCardsState.map(card => (
            <button
              key={card.id}
              onClick={() => onReveal(card)}
              disabled={card.revealed}
              className={`aspect-square rounded-2xl font-black text-lg flex items-center justify-center active:scale-95 transition-all text-white shadow-lg ${card.revealed ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-purple-400 to-pink-500 cursor-pointer'}`}
            >
              {card.revealed ? card.reward : '🎫'}
            </button>
          ))}
        </div>

        <button onClick={onClose} className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">Close</button>
      </div>
    </div>
  );
};
