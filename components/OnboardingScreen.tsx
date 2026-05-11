
import React from 'react';

interface OnboardingScreenProps {
  setOnboardingStep: (step: number) => void;
  onboardingStep: number;
  setCurrentScreen: (screen: string) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ setOnboardingStep, onboardingStep, setCurrentScreen }) => {
  const onboardingSlides = [
    { icon: '🍕', title: 'Discover Restaurants', subtitle: 'Explore thousands of restaurants and cuisines near you', gradient: 'from-orange-400 to-red-400' },
    { icon: '🛒', title: 'Order Your Favorite Food', subtitle: 'Browse menus, customize your order, and track delivery in real-time', gradient: 'from-purple-400 to-pink-400' },
    { icon: '🚚', title: 'Fast & Safe Delivery', subtitle: 'Get your food delivered hot and fresh at your doorstep', gradient: 'from-blue-400 to-cyan-400' },
    { icon: '🎁', title: 'Earn Rewards', subtitle: 'Get cashback points on every order and unlock exclusive deals', gradient: 'from-green-400 to-emerald-400' }
  ];
  const currentSlide = onboardingSlides[onboardingStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col relative">
      <div className="absolute top-6 right-6 z-10">
        <button onClick={() => setCurrentScreen('auth')} className="py-2 px-4 text-gray-500 font-semibold rounded-lg bg-gray-200/50 hover:bg-gray-200 transition-colors">Skip</button>
      </div>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className={`w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br ${currentSlide.gradient} flex items-center justify-center text-8xl shadow-2xl animate-pulse`}>{currentSlide.icon}</div>
          <h2 className="text-4xl font-black text-gray-800 mb-4">{currentSlide.title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{currentSlide.subtitle}</p>
        </div>
      </div>
      <div className="px-6 pb-8">
        <div className="flex justify-center gap-2 mb-6">
          {onboardingSlides.map((_, idx) => (<div key={idx} className={`h-2 rounded-full transition-all duration-300 ${idx === onboardingStep ? 'w-8 bg-orange-500' : 'w-2 bg-gray-300'}`} />))}
        </div>
        <div className="flex gap-3">
          {onboardingStep > 0 && <button onClick={() => setOnboardingStep(onboardingStep - 1)} className="flex-1 py-4 rounded-2xl border-2 border-orange-500 text-orange-500 font-bold">Back</button>}
          <button onClick={() => onboardingStep < onboardingSlides.length - 1 ? setOnboardingStep(onboardingStep + 1) : setCurrentScreen('auth')} className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg active:scale-95 transition-transform">{onboardingStep < onboardingSlides.length - 1 ? 'Next' : 'Get Started'}</button>
        </div>
      </div>
    </div>
  );
};