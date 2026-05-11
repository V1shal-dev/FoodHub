import React, { useState, useMemo } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { FoodItem, CartItem } from '../types';
import { foodCategories, myRestaurant } from '../constants/data';

interface PreOrderScreenProps {
  onClose: () => void;
  onConfirm: (cart: CartItem[]) => void;
  menu: FoodItem[];
  existingCart: CartItem[];
}

export const PreOrderScreen: React.FC<PreOrderScreenProps> = ({ onClose, onConfirm, menu, existingCart }) => {
  const [cart, setCart] = useState<CartItem[]>(existingCart);

  const updateQuantity = (itemId: number, change: number) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(i => i.id === itemId);
      if (existingItem) {
        const newQuantity = existingItem.quantity + change;
        if (newQuantity <= 0) {
          return currentCart.filter(i => i.id !== itemId);
        }
        return currentCart.map(i => i.id === itemId ? { ...i, quantity: newQuantity, totalPrice: i.price * newQuantity } : i);
      } else if (change > 0) {
        const itemToAdd = menu.find(i => i.id === itemId);
        if (itemToAdd) {
          return [...currentCart, { ...itemToAdd, cartId: Date.now(), quantity: 1, totalPrice: itemToAdd.price, customizations: {}, specialInstructions: '', restaurantId: myRestaurant.id }];
        }
      }
      return currentCart;
    });
  };

  const getQuantity = (itemId: number) => cart.find(i => i.id === itemId)?.quantity || 0;

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.totalPrice, 0), [cart]);

  return (
    <div className="fixed inset-0 bg-gray-50 z-[60] flex flex-col">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-gray-800">Pre-order Your Meal</h1>
          <button onClick={onClose} className="p-2 -mr-2"><X size={24} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {foodCategories.filter(c => c.id !== 'all').map(category => (
          <div key={category.id}>
            <h2 className="text-xl font-bold text-gray-700 mb-3">{category.name}</h2>
            <div className="space-y-3">
              {menu.filter(item => item.category === category.id).map(item => (
                <div key={item.id} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm font-semibold text-orange-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getQuantity(item.id) > 0 ? (
                      <>
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg font-bold"><Minus size={16} className="mx-auto" /></button>
                        <span className="font-black text-lg w-8 text-center">{getQuantity(item.id)}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg font-bold"><Plus size={16} className="mx-auto" /></button>
                      </>
                    ) : (
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 bg-orange-500 text-white rounded-lg font-bold text-xl">+</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 border-t">
        <button onClick={() => onConfirm(cart)} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl shadow-lg flex justify-between items-center px-6">
            <span>Done ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
            <span>Total: ${total.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};