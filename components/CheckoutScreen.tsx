
import React from 'react';
import { ChevronLeft, MapPin, Plus, CreditCard, DollarSign, Award, Utensils, ShoppingBag, Tag, Check } from 'lucide-react';
import type { Address, Coupon } from '../types';
import { myRestaurant } from '../constants/data';

interface CheckoutScreenProps {
  totals: { total: string, subtotal: string, deliveryFee: string, tax: string, tip: string, discount: string };
  addresses: Address[];
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  loyaltyPoints: number;
  onPlaceOrder: () => void;
  onClose: () => void;
  orderType: string;
  tableInfo: { table: string, restaurant: string } | null;
  servingInstructions: string;
  setServingInstructions: (instructions: string) => void;
  dineInTable: string;
  setDineInTable: (table: string) => void;
  userCoupons: Coupon[];
  appliedCoupon: Coupon | null;
  setAppliedCoupon: (coupon: Coupon | null) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ totals, addresses, selectedAddress, setSelectedAddress, paymentMethod, setPaymentMethod, loyaltyPoints, onPlaceOrder, onClose, orderType, tableInfo, servingInstructions, setServingInstructions, dineInTable, setDineInTable, userCoupons, appliedCoupon, setAppliedCoupon }) => {
  const pointsEarned = Math.floor(parseFloat(totals.total));

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto pb-32">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onClose} className="bg-white bg-opacity-20 p-2 rounded-full active:scale-90 transition-transform" aria-label="Close checkout"><ChevronLeft size={24} /></button>
          <h1 className="text-2xl font-black">Checkout</h1>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {orderType === 'delivery' ? (
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="font-black text-gray-800 mb-3">Delivery Address</h3>
            {addresses.map(addr => (
              <button key={addr.id} onClick={() => setSelectedAddress(addr)} className={`w-full p-4 rounded-xl border-2 mb-2 text-left transition-all ${selectedAddress?.id === addr.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className={selectedAddress?.id === addr.id ? 'text-orange-500' : 'text-gray-400'} />
                  <div className="flex-1">
                    <div className="font-bold text-gray-800 mb-1">{addr.label}</div>
                    <div className="text-sm text-gray-600">{addr.address}</div>
                  </div>
                  {addr.isDefault && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Default</span>}
                </div>
              </button>
            ))}
            <button className="w-full mt-2 py-3 border-2 border-dashed border-orange-500 text-orange-500 font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"><Plus size={20} /> Add New Address</button>
          </div>
        ) : orderType === 'dine-in' ? (
            <div className="bg-white rounded-2xl shadow-md p-4">
                 <div className="flex items-start gap-3">
                    <Utensils size={20} className={'text-orange-500'} />
                    <div className="flex-1">
                      <h3 className="font-black text-gray-800 mb-2">Dine-in Details</h3>
                      <p className="text-sm text-gray-600 mb-2">Serving at <span className="font-bold">{tableInfo?.restaurant || myRestaurant.name}</span></p>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Table Number</label>
                        <input
                          type="text"
                          value={dineInTable}
                          onChange={(e) => setDineInTable(e.target.value)}
                          placeholder="Enter your table number"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none bg-white text-gray-800"
                          required
                        />
                      </div>
                       <p className="text-xs text-gray-500 mt-2">A waiter will be with you shortly to confirm your order.</p>
                    </div>
                  </div>
            </div>
        ) : ( // Takeaway
            <div className="bg-white rounded-2xl shadow-md p-4">
                 <div className="flex items-start gap-3">
                    <ShoppingBag size={20} className={'text-orange-500'} />
                    <div className="flex-1">
                      <h3 className="font-black text-gray-800 mb-1">Pickup Information</h3>
                      <p className="text-sm text-gray-600">You will be notified when your order is ready. Please show your Order ID at the counter for pickup.</p>
                    </div>
                  </div>
            </div>
        )}
        
        {orderType === 'dine-in' && (
            <div className="bg-white rounded-2xl shadow-md p-4">
                <h3 className="font-black text-gray-800 mb-3">Serving Instructions</h3>
                <p className="text-sm text-gray-600 mb-2">Let us know if you have any preferences for the staff.</p>
                <textarea
                    placeholder="e.g., Please serve the main course 15 minutes after the drinks."
                    value={servingInstructions}
                    onChange={(e) => setServingInstructions(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-orange-500 resize-none bg-white text-gray-800"
                    rows={3}
                />
            </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-black text-gray-800 mb-3">Apply Coupon</h3>
          {userCoupons.length > 0 ? (
            <div className="space-y-2">
              {userCoupons.map(coupon => (
                <button key={coupon.code} onClick={() => appliedCoupon?.code === coupon.code ? setAppliedCoupon(null) : setAppliedCoupon(coupon)} className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${appliedCoupon?.code === coupon.code ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                    <div className={appliedCoupon?.code === coupon.code ? 'text-orange-500' : 'text-gray-400'}><Tag size={20} /></div>
                    <div className="flex-1 text-left">
                        <div className="font-bold text-gray-800">{coupon.code}</div>
                        <div className="text-sm text-gray-600">{coupon.description}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${appliedCoupon?.code === coupon.code ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>{appliedCoupon?.code === coupon.code && <Check size={12} className="text-white"/>}</div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No coupons available. Win coupons from scratch cards!</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-black text-gray-800 mb-3">Payment Method</h3>
          <div className="space-y-2">
            {[
              { id: 'online', label: 'Online Payment', icon: <CreditCard size={20} />, subtitle: 'UPI, Cards, Wallets' },
              { id: 'cod', label: 'Pay at Counter/Delivery', icon: <DollarSign size={20} />, subtitle: 'Pay when you receive' },
              { id: 'points', label: 'Loyalty Points', icon: <Award size={20} />, subtitle: `Available: ${loyaltyPoints} pts` }
            ].map(method => (
              <button key={method.id} onClick={() => setPaymentMethod(method.id)} className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${paymentMethod === method.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                <div className={paymentMethod === method.id ? 'text-orange-500' : 'text-gray-400'}>{method.icon}</div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-800">{method.label}</div>
                  <div className="text-sm text-gray-600">{method.subtitle}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>{paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-black text-gray-800 mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-700 font-semibold">Item Total</span><span className="font-bold text-gray-800">${totals.subtotal}</span></div>
              {parseFloat(totals.discount) > 0 && <div className="flex justify-between text-green-600"><span className="font-semibold">Discount</span><span className="font-bold text-gray-800">- ${totals.discount}</span></div>}
              {orderType === 'delivery' && <div className="flex justify-between"><span className="text-gray-700 font-semibold">Delivery Fee</span><span className="font-bold text-gray-800">${totals.deliveryFee}</span></div>}
              <div className="flex justify-between"><span className="text-gray-700 font-semibold">Taxes</span><span className="font-bold text-gray-800">${totals.tax}</span></div>
              {parseFloat(totals.tip) > 0 && <div className="flex justify-between"><span className="text-gray-700 font-semibold">Tip</span><span className="font-bold text-gray-800">${totals.tip}</span></div>}
              <div className="border-t pt-2 mt-2 flex justify-between"><span className="font-black text-gray-800 text-lg">TO PAY</span><span className="font-black text-orange-500 text-2xl">${totals.total}</span></div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3">
          <Award className="text-green-600" size={24} />
          <div className="flex-1">
            <p className="font-bold text-green-800">You'll earn {pointsEarned} points!</p>
            <p className="text-sm text-green-700">Redeem on your next order</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t max-w-md mx-auto">
        <button onClick={onPlaceOrder} disabled={(orderType === 'delivery' && !selectedAddress) || (orderType === 'dine-in' && !dineInTable)} className={`w-full py-4 rounded-xl font-black shadow-lg flex items-center justify-between px-6 transition-all ${!((orderType === 'delivery' && !selectedAddress) || (orderType === 'dine-in' && !dineInTable)) ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
          <span>PLACE ORDER</span>
          <span className="text-xl">${totals.total}</span>
        </button>
      </div>
    </div>
  );
};
