
import React, { useState } from 'react';
import { Phone, User, Calendar } from 'lucide-react';
import type { User as UserType } from '../types';

interface AuthScreenProps {
  onLogin: (user: UserType) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [authStep, setAuthStep] = useState<'phone' | 'otp' | 'details'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStep('details');
  };
  
  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name, phone, dob });
  };
  
  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value) {
        (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !otp[index] && e.currentTarget.previousSibling) {
          (e.currentTarget.previousSibling as HTMLInputElement).focus();
      }
  };

  const renderContent = () => {
    switch (authStep) {
      case 'phone':
        return (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter your phone number
              </label>
              <div className="relative">
                <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, '');
                    setPhone(numericValue);
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition bg-white text-gray-800"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg active:scale-95 transition-transform"
            >
              Continue
            </button>
          </form>
        );
      case 'otp':
        return (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter OTP sent to {phone}
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((data, index) => (
                  <input 
                    key={index} 
                    type="text" 
                    maxLength={1} 
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-orange-500 outline-none transition bg-white text-gray-800" 
                    required 
                    value={data}
                    onChange={e => handleOtpChange(e.target, index)}
                    onKeyDown={e => handleOtpKeyDown(e, index)}
                    onFocus={e => e.target.select()}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg active:scale-95 transition-transform"
            >
              Verify & Continue
            </button>
            <div className="text-center">
              <button type="button" onClick={() => setAuthStep('phone')} className="text-orange-500 font-semibold">Change Number</button>
            </div>
          </form>
        );
      case 'details':
        const today = new Date().toISOString().split("T")[0];
        return (
          <form onSubmit={handleDetailsSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-center text-gray-800">Almost there!</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition bg-white text-gray-800" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
              <div className="relative">
                <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} max={today} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none transition bg-white text-gray-800" style={{ colorScheme: 'light' }} required />
              </div>
              <p className="text-xs text-gray-500 mt-1 px-2">Note: This cannot be changed later.</p>
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg active:scale-95 transition-transform"
            >
              Complete Signup
            </button>
          </form>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col justify-center p-6">
      <div className="text-center mb-8">
        <div className="text-7xl mb-4 animate-bounce">🍔</div>
        <h1 className="text-4xl font-black text-gray-800 mb-2">Welcome to FoodHub</h1>
        <p className="text-gray-600">Delicious food, delivered fast.</p>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
        {renderContent()}
      </div>
      <p className="text-center text-xs text-gray-500 mt-6">
        By continuing, you agree to our{' '}
        <a href="#" className="text-orange-500 font-semibold">Terms of Service</a> &{' '}
        <a href="#" className="text-orange-500 font-semibold">Privacy Policy</a>
      </p>
    </div>
  );
};
