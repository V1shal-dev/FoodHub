import React, { useState, useMemo } from 'react';
import { ChevronLeft, Users, Calendar, Clock, Plus, Minus, Flame, CreditCard, ShoppingBag, X } from 'lucide-react';
import type { FoodItem, CartItem } from '../types';
import { PreOrderScreen } from './PreOrderScreen';

interface ReservationScreenProps {
  onClose: () => void;
  onConfirm: (details: { guests: number; date: string; time: string }, preOrderedItems: CartItem[], paymentStatus: 'paid' | 'pending') => void;
  restaurantMenu: FoodItem[];
}

export const ReservationScreen: React.FC<ReservationScreenProps> = ({ onClose, onConfirm, restaurantMenu }) => {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:00');
  // FIX: Corrected the type for paymentOption state to allow both 'paid' and 'pending' values.
  const [paymentOption, setPaymentOption] = useState<'paid' | 'pending'>('pending');
  const [showPreOrder, setShowPreOrder] = useState(false);
  const [preOrderCart, setPreOrderCart] = useState<CartItem[]>([]);
  
  const today = new Date().toISOString().split('T')[0];
  
  const getHappyHourDeal = () => {
        const day = new Date().getDay(); // 0 = Sunday
        const deals = [
            { text: "Sunday Brunch!", deal: "15% OFF ALL DRINKS 🍳" },
            { text: "Curry Monday!", deal: "20% OFF CURRIES 🍛" },
            { text: "Tasty Tuesday!", deal: "BUY 2 GET 1 FREE 🌮" },
            { text: "Wok Wednesday!", deal: "25% OFF NOODLES 🍜" },
            { text: "Thirsty Thursday!", deal: "50% OFF MOCKTAILS 🍹" },
            { text: "Pizza Friday!", deal: "FLAT $5 OFF PIZZAS 🍕" },
            { text: "Burger Saturday!", deal: "FREE FRIES 🍔" },
        ];
        return deals[day];
    }
  const happyHour = getHappyHourDeal();

  const handleConfirm = () => {
    onConfirm({ guests, date, time }, preOrderCart, paymentOption);
  };
  
  const handlePreOrderConfirm = (cart: CartItem[]) => {
      setPreOrderCart(cart);
      setShowPreOrder(false);
  };

  const preOrderTotal = useMemo(() => preOrderCart.reduce((sum, item) => sum + item.totalPrice, 0), [preOrderCart]);

  return (
    <>
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-slide-up">
      <style>{`@keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } } .animate-slide-up { animation: slide-up 0.3s ease-out; }`}</style>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="bg-white bg-opacity-20 p-2 rounded-full active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black">Reserve a Table</h1>
        </div>
      </div>
      
      <div className="p-6 space-y-6 relative">
        <div className="bg-amber-100 border border-amber-300 rounded-xl p-4 flex items-center gap-3">
          <Flame className="text-amber-600" size={24} />
          <div className="flex-1">
            <p className="font-bold text-amber-800">Happy Hour Deal!</p>
            <p className="text-sm text-amber-700">{happyHour.deal} (5-7PM)</p>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 font-bold text-gray-800 mb-2"><Users size={20}/> Number of Guests</label>
          <div className="flex items-center gap-4 bg-gray-100 rounded-xl p-2">
            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-12 h-12 bg-white rounded-lg font-black text-orange-500"><Minus size={20} className="mx-auto" /></button>
            <span className="font-black text-3xl w-16 text-center">{guests}</span>
            <button onClick={() => setGuests(guests + 1)} className="w-12 h-12 bg-white rounded-lg font-black text-orange-500"><Plus size={20} className="mx-auto" /></button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 font-bold text-gray-800 mb-2"><Calendar size={20}/> Select Date</label>
          <div className="relative">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} min={today} className="w-full p-4 pl-12 text-lg rounded-xl border-2 bg-white border-gray-200 focus:border-orange-500 outline-none text-gray-800" style={{ colorScheme: 'light' }} />
            <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
            <label className="flex items-center gap-3 font-bold text-gray-800 mb-2"><Clock size={20}/> Select Time</label>
            <div className="grid grid-cols-3 gap-2">
                {['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map(t => (
                    <button key={t} onClick={() => setTime(t)} className={`py-3 rounded-lg font-bold transition-all ${time === t ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        {new Date(`1970-01-01T${t}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">Pre-order & Payment</h4>
            {preOrderCart.length > 0 && 
                <div className="mb-2 p-2 bg-white rounded-md">
                    {preOrderCart.map(i => <div key={i.cartId} className="text-sm text-gray-600 flex justify-between"><span>{i.quantity}x {i.name}</span><span>${i.totalPrice.toFixed(2)}</span></div>)}
                    <div className="font-bold flex justify-between mt-1 border-t pt-1"><span>Total</span><span>${preOrderTotal.toFixed(2)}</span></div>
                </div>
            }
            <button onClick={() => setShowPreOrder(true)} className="w-full py-3 border-2 border-dashed border-orange-500 text-orange-500 font-bold rounded-xl flex items-center justify-center gap-2 mb-3">
                <Plus size={20} /> {preOrderCart.length > 0 ? 'Edit Your Meal' : 'Pre-order Your Meal'}
            </button>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setPaymentOption('pending')} className={`py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${paymentOption === 'pending' ? 'bg-orange-500 text-white' : 'bg-white border'}`}><ShoppingBag size={16}/> Pay Later</button>
                <button onClick={() => setPaymentOption('paid')} className={`py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${paymentOption === 'paid' ? 'bg-orange-500 text-white' : 'bg-white border'}`}><CreditCard size={16}/> Pay Now</button>
            </div>
        </div>

      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t max-w-md mx-auto">
        <button onClick={handleConfirm} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl shadow-lg active:scale-95 transition-transform">
          Confirm Reservation
        </button>
      </div>
    </div>
    {showPreOrder && <PreOrderScreen menu={restaurantMenu} existingCart={preOrderCart} onConfirm={handlePreOrderConfirm} onClose={() => setShowPreOrder(false)} />}
    </>
  );
};