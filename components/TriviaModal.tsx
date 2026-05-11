import React, { useState } from 'react';
import type { TriviaQuestion } from '../types';

interface TriviaModalProps {
  question: TriviaQuestion;
  onAnswer: (optionIndex: number) => void;
  onClose: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const TriviaModal: React.FC<TriviaModalProps> = ({ question, onAnswer, onClose, currentQuestionIndex, totalQuestions }) => {
  const [answered, setAnswered] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setAnswered(index);
    onAnswer(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-black text-gray-800 mb-2">Food Trivia!</h2>
        <p className="text-gray-600 mb-6">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
        
        <div className="bg-orange-50 rounded-2xl p-6 mb-6">
          <p className="text-lg font-bold text-gray-800">{question.question}</p>
        </div>

        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered !== null}
              className={`w-full py-4 rounded-xl font-bold text-gray-800 active:scale-95 transition-all
                ${answered !== null ? (idx === question.correct ? 'bg-green-200 border-2 border-green-500' : idx === answered ? 'bg-red-200 border-2 border-red-500' : 'bg-gray-100') : 'bg-gray-100 hover:bg-orange-100'}`}
            >
              {option}
            </button>
          ))}
        </div>

        <button onClick={onClose} className="w-full py-3 text-gray-600 font-bold">Exit Quiz</button>
      </div>
    </div>
  );
};
