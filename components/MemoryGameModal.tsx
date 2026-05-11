
import React, { useState, useEffect } from 'react';
import { BrainCircuit, X } from 'lucide-react';

interface MemoryGameModalProps {
    onClose: () => void;
    onWin: (points: number) => void;
}

const gameIcons = ['🍕', '🍔', '🍜', '🥗', '🍰', '☕', '🍗', '🍚'];
const gamePoints = 50;

export const MemoryGameModal: React.FC<MemoryGameModalProps> = ({ onClose, onWin }) => {
    const [cards, setCards] = useState<string[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        const shuffledCards = [...gameIcons, ...gameIcons].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
    }, []);

    useEffect(() => {
        if (flippedIndices.length === 2) {
            setIsChecking(true);
            const [firstIndex, secondIndex] = flippedIndices;
            if (cards[firstIndex] === cards[secondIndex]) {
                setMatchedPairs(prev => [...prev, cards[firstIndex]]);
                setFlippedIndices([]);
                setIsChecking(false);
            } else {
                setTimeout(() => {
                    setFlippedIndices([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [flippedIndices, cards]);

    useEffect(() => {
        if (matchedPairs.length === gameIcons.length) {
            setTimeout(() => {
                onWin(gamePoints);
                onClose();
            }, 500);
        }
    }, [matchedPairs, onWin, onClose]);

    const handleCardClick = (index: number) => {
        if (isChecking || flippedIndices.includes(index) || matchedPairs.includes(cards[index])) {
            return;
        }
        setFlippedIndices(prev => [...prev, index]);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-3xl font-black text-gray-800">Memory Match!</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                </div>
                <p className="text-gray-600 mb-6">Match all pairs to win {gamePoints} points!</p>

                <div className="grid grid-cols-4 gap-3">
                    {cards.map((icon, index) => {
                        const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(icon);
                        return (
                            <button
                                key={index}
                                onClick={() => handleCardClick(index)}
                                className={`w-full aspect-square rounded-lg flex items-center justify-center text-4xl transition-transform duration-300 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                            >
                                <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg">
                                    <BrainCircuit size={32} className="text-white"/>
                                </div>
                                <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-green-200 rounded-lg">
                                    {icon}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            <style>{`
                .transform-style-3d { transform-style: preserve-3d; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .backface-hidden { backface-visibility: hidden; }
            `}</style>
        </div>
    );
};
