
import React, { useState } from 'react';
import { ShoppingCart, Truck, Utensils, ShoppingBag, X, Plus, Minus, Clock, Calendar } from 'lucide-react';
import type { CartItem } from '../types';

interface CartScreenProps {
    cart: CartItem[];
    updateCartQuantity: (cartId: number, change: number) => void;
    removeFromCart: (cartId: number) => void;
    orderType: string;
    setOrderType: (type: string) => void;
    totals: { subtotal: string; tax: string; deliveryFee: string; tip: string; discount: string; total: string; };
    tipAmount: number;
    setTipAmount: (amount: number) => void;
    setShowCheckout: (show: boolean) => void;
    setActiveTab: (tab: string) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ cart, updateCartQuantity, removeFromCart, orderType, setOrderType, totals, tipAmount, setTipAmount, setShowCheckout, setActiveTab }) => {
    const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
    const [pickupTime, setPickupTime] = useState('12:00');

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 3);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
                <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <ShoppingCart size={64} className="text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Add some delicious food to get started!</p>
                    <button onClick={() => setActiveTab('home')} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl active:scale-95 transition-transform">
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-28 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 shadow-md sticky top-0 z-10">
                <h2 className="text-2xl font-black text-gray-800">Your Cart</h2>
                <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
            </div>

            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
                    <h3 className="font-black text-gray-800 mb-3">Order Type</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {[{ id: 'delivery', label: 'Delivery', icon: <Truck size={20} /> }, { id: 'dine-in', label: 'Dine-in', icon: <Utensils size={20} /> }, { id: 'takeaway', label: 'Takeaway', icon: <ShoppingBag size={20} /> }].map(type => (
                            <button key={type.id} onClick={() => setOrderType(type.id)} className={`p-3 rounded-xl font-bold flex flex-col items-center gap-1 transition-all ${orderType === type.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                {type.icon}<span className="text-xs">{type.label}</span>
                            </button>
                        ))}
                    </div>
                    {orderType === 'takeaway' && (
                        <div className="mt-4 border-t pt-4">
                            <h4 className="font-bold text-gray-700 mb-2">Select Pickup Time</h4>
                            <div className="flex gap-2">
                                <div className="relative w-full">
                                    <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} min={today.toISOString().split('T')[0]} max={maxDate.toISOString().split('T')[0]} className="w-full px-3 py-2 pl-10 rounded-lg border-2 border-gray-200 focus:border-orange-500 outline-none bg-white text-gray-800" style={{ colorScheme: 'light' }} />
                                    <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="relative w-full">
                                    <input type="time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="w-full px-3 py-2 pl-10 rounded-lg border-2 border-gray-200 focus:border-orange-500 outline-none bg-white text-gray-800" />
                                    <Clock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-3 mb-4">
                    {cart.map(item => (
                        <div key={item.cartId} className="bg-white rounded-2xl shadow-md p-4">
                            <div className="flex gap-3">
                                <div className="text-4xl">{item.image}</div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item.name}</h4>
                                            {item.customizations?.comboName && <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Combo Deal</span>}
                                            {item.price === 0 && <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">🎉 Birthday Treat</span>}
                                        </div>
                                        <button onClick={() => removeFromCart(item.cartId)} className="text-red-500 active:scale-90 transition-transform"><X size={20} /></button>
                                    </div>
                                    {item.addons && item.addons.length > 0 && (
                                        <div className="text-xs text-gray-500 pl-1 my-1">
                                            + {item.addons.map(a => a.name).join(', ')}
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updateCartQuantity(item.cartId, -1)} disabled={item.price === 0} className="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg font-bold active:scale-90 transition-transform disabled:opacity-50 flex-shrink-0"><Minus size={16} className="mx-auto" /></button>
                                            <span className="font-black text-lg w-8 text-center flex-shrink-0 text-gray-900">{item.quantity}</span>
                                            <button onClick={() => updateCartQuantity(item.cartId, 1)} disabled={item.price === 0} className="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg font-bold active:scale-90 transition-transform disabled:opacity-50 flex-shrink-0"><Plus size={16} className="mx-auto" /></button>
                                        </div>
                                        <span className="font-black text-orange-500 text-lg">{item.price === 0 ? 'FREE' : `$${item.totalPrice.toFixed(2)}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
                    <h3 className="font-black text-gray-800 mb-3">Bill Details</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-700 font-semibold">Item Total</span><span className="font-bold text-gray-800">${totals.subtotal}</span></div>
                        {parseFloat(totals.discount) > 0 && <div className="flex justify-between text-green-600"><span className="font-semibold">Discount</span><span className="font-bold">- ${totals.discount}</span></div>}
                        {orderType === 'delivery' && <div className="flex justify-between"><span className="text-gray-700 font-semibold">Delivery Fee</span><span className="font-bold text-gray-800">${totals.deliveryFee}</span></div>}
                        <div className="flex justify-between"><span className="text-gray-700 font-semibold">Taxes & Charges</span><span className="font-bold text-gray-800">${totals.tax}</span></div>
                        {tipAmount > 0 && <div className="flex justify-between"><span className="text-gray-700 font-semibold">Tip</span><span className="font-bold text-gray-800">${totals.tip}</span></div>}
                        <div className="border-t pt-2 mt-2 flex justify-between"><span className="font-black text-gray-800">TO PAY</span><span className="font-black text-orange-500 text-lg">${totals.total}</span></div>
                    </div>
                </div>

                {orderType === 'delivery' && (
                    <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
                        <h3 className="font-black text-gray-800 mb-3">Tip your delivery partner</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {[0, 2, 5, 10].map(amount => (
                                <button key={amount} onClick={() => setTipAmount(amount)} className={`py-2 rounded-lg font-bold transition-all ${tipAmount === amount ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{amount === 0 ? 'No Tip' : `$${amount}`}</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-20 left-0 right-0 p-6 bg-white border-t max-w-md mx-auto">
                <button onClick={() => setShowCheckout(true)} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-between px-6">
                    <span>Proceed to Checkout</span>
                    <span className="text-xl">${totals.total}</span>
                </button>
            </div>
        </div>
    );
};
