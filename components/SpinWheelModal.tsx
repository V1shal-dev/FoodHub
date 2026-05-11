import React, { useState } from 'react';
import { spinWheelRewards } from '../constants/data';
import type { SpinWheelReward } from '../types';

interface SpinWheelModalProps {
  spinning: boolean;
  onSpin: (reward: SpinWheelReward) => void;
  onClose: () => void;
}

export const SpinWheelModal: React.FC<SpinWheelModalProps> = ({ spinning, onSpin, onClose }) => {
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (spinning) return;

    const winningSegmentIndex = Math.floor(Math.random() * spinWheelRewards.length);
    const winningRewardData = spinWheelRewards[winningSegmentIndex];
    
    const numSegments = spinWheelRewards.length;
    const segmentAngle = 360 / numSegments;
    
    // Calculate the angle to stop at the middle of the winning segment
    const stopAngle = (winningSegmentIndex * segmentAngle) + (segmentAngle / 2);

    // Add multiple full spins for a better visual effect
    const fullSpins = Math.floor(Math.random() * 4) + 5; // 5 to 8 full spins
    const finalRotation = (fullSpins * 360) + stopAngle;

    setRotation(rotation + finalRotation);
    onSpin(winningRewardData);
  };

  const numSegments = spinWheelRewards.length;
  const segmentAngle = 360 / numSegments;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden">
        <h2 className="text-3xl font-black text-gray-800 mb-2">Spin & Win!</h2>
        <p className="text-gray-600 mb-6">Try your luck to win amazing rewards</p>
        
        <div className="relative w-80 h-80 mx-auto mb-8">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-20" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }}>
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-gray-700"></div>
          </div>

          <div 
            className="absolute inset-0 rounded-full overflow-hidden transition-transform duration-[4000ms]"
            style={{ 
                transform: `rotate(-${rotation}deg)`,
                transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            <ul className="w-full h-full m-0 p-0 list-none rounded-full relative border-8 border-gray-200 shadow-inner">
                {spinWheelRewards.map((reward, i) => (
                    <li 
                        key={reward.id} 
                        className="absolute w-1/2 h-1/2 origin-bottom-right"
                        style={{
                            transform: `rotate(${i * segmentAngle}deg)`,
                            clipPath: `polygon(0% 0%, 100% 0%, 50% 100%)`,
                        }}
                    >
                       <div
                            className="absolute w-full h-full flex items-start justify-center"
                            style={{
                                backgroundColor: reward.color,
                                transform: 'translateX(-50%) rotate(90deg)',
                            }}
                        >
                            <span className="text-white font-black text-3xl" style={{
                                transform: `rotate(${(segmentAngle / 2) - 90}deg) translateY(30px)`,
                                textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                            }}>
                                {reward.label}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
          </div>
          
          <button
              onClick={handleSpin}
              disabled={spinning}
              className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full z-10 flex flex-col items-center justify-center shadow-2xl border-4 border-gray-300 active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
          >
              <span className="text-4xl font-black text-gray-800">SPIN</span>
          </button>
        </div>

        <button onClick={onClose} className="w-full py-3 text-gray-600 font-bold">Cancel</button>
      </div>
    </div>
  );
};