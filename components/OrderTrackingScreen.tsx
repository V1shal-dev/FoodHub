import React from 'react';
import { X, Repeat, CheckCircle, Timer, Truck, Star, Phone, MessageCircle, MapPin, AlertCircle, ShoppingBag, Utensils } from 'lucide-react';
import type { Order, CartItem } from '../types';
import { myRestaurant } from '../constants/data';


interface OrderTrackingScreenProps {
  order: Order;
  onClose: () => void;
  onReorder: (items: CartItem[]) => void;
  onCancelRequest: () => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({ order, onReorder, onClose, onCancelRequest }) => {
  const isCancellable = order.status === 'confirmed';

  const finalMessage = {
    delivered: { title: 'Delivered!', subtitle: 'Hope you enjoyed your meal!'},
    completed: { title: 'Order Completed!', subtitle: order.orderType === 'takeaway' ? 'Your order has been picked up.' : 'Hope you enjoyed your meal at our restaurant!'},
    ready_for_pickup: { title: 'Ready for Pickup!', subtitle: 'Your order is ready at the restaurant.'},
    served: { title: 'Served at Table!', subtitle: 'Enjoy your meal!'},
  };

  const isFinalState = ['delivered', 'completed', 'ready_for_pickup', 'served'].includes(order.status);
  const title = isFinalState ? finalMessage[order.status as keyof typeof finalMessage].title : 'Order Confirmed!';
  const subtitle = isFinalState ? finalMessage[order.status as keyof typeof finalMessage].subtitle : `Estimated arrival: ${order.estimatedTime}`;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className={`bg-gradient-to-r ${order.status === 'cancelled' ? 'from-gray-500 to-gray-600' : 'from-orange-500 to-red-500'} p-6 text-white sticky top-0 z-20`}>
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onClose} className="bg-white bg-opacity-20 p-2 rounded-full active:scale-90 transition-transform"><X size={24} /></button>
          <div className="flex-1">
            <h1 className="text-2xl font-black">{order.status === 'cancelled' ? 'Order Cancelled' : 'Track Order'}</h1>
            <p className="text-sm opacity-90">Order #{order.orderNumber}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-center mb-8">
            {order.status === 'cancelled' ? (
                 <div className={`w-28 h-28 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center`}><X size={64} className={`text-red-500`} /></div>
            ) : (
                <div className={`w-28 h-28 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center`}>
                    {order.orderType === 'takeaway' ? <ShoppingBag size={64} className="text-green-500" /> : order.orderType === 'dine-in' ? <Utensils size={64} className="text-green-500" /> : <Truck size={64} className={`text-green-500`} />}
                </div>
            )}
          <h2 className="text-3xl font-black text-gray-800 mb-2">
            {order.status === 'cancelled' ? 'Order Cancelled' : title}
          </h2>
          <p className="text-gray-600 text-lg">
            {order.status === 'cancelled' ? 'Your order has been successfully cancelled.' : subtitle}
          </p>
        </div>

        {order.deliveryPartner && order.orderType === 'delivery' && (
          <div className="bg-white rounded-3xl shadow-xl p-5 mb-6 border-2 border-orange-200">
            <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2"><Truck className="text-orange-500" size={20} />Delivery Partner</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg">{order.deliveryPartner.name.charAt(0)}</div>
              <div className="flex-1">
                <p className="font-black text-gray-800 text-lg">{order.deliveryPartner.name}</p>
                <div className="flex items-center gap-1 mt-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span className="text-sm font-bold text-gray-700">4.8</span></div>
              </div>
              <a href={`tel:${order.deliveryPartner.phone}`} className="bg-green-500 text-white p-3 rounded-full active:scale-90 transition-transform"><Phone size={20} /></a>
            </div>
          </div>
        )}

        {order.status !== 'cancelled' && (
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <h3 className="font-black text-gray-800 mb-5 text-lg">Order Status</h3>
            <div className="space-y-6">
              {order.statusSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center"><div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${step.completed ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg scale-110' : 'bg-gray-200'}`}>{step.completed ? <CheckCircle size={24} className="text-white" /> : <div className="w-5 h-5 bg-gray-400 rounded-full" />}</div>{idx < order.statusSteps.length - 1 && <div className={`w-1 flex-1 ${step.completed ? 'bg-green-500' : 'bg-gray-200'} transition-all`} />}</div>
                  <div className="flex-1 pb-4"><p className={`font-black text-lg ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</p>{step.time && <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><Timer size={14} />{step.time}</p>}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h3 className="font-black text-gray-800 mb-4 text-lg">Order Summary</h3>
          <div className="flex items-center gap-3 mb-4"><div className="text-4xl">{myRestaurant.image}</div><h4 className="font-bold text-gray-800">{myRestaurant.name}</h4></div>
          <div className="space-y-3">{order.items.map((item, idx) => (<div key={idx} className="flex items-center gap-3"><div className="text-3xl">{item.image}</div><div className="flex-1"><p className="font-bold text-gray-800">{item.name}</p><p className="text-xs text-gray-500">Qty: {item.quantity}</p></div><span className="font-black text-gray-700">${(item.totalPrice).toFixed(2)}</span></div>))}</div>
          <div className="border-t pt-4 mt-4 flex justify-between items-center"><span className="font-black text-gray-800 text-xl">Total Paid</span><span className={`font-black text-2xl ${order.status === 'cancelled' ? 'text-gray-500 line-through' : 'text-orange-500'}`}>${order.totals.total}</span></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <h3 className="font-black text-gray-800 mb-4 text-lg">{order.orderType === 'delivery' ? 'Delivery Address' : 'Restaurant Address'}</h3>
            <div className="flex items-start gap-4"><div className="bg-orange-100 p-3 rounded-full"><MapPin className="text-orange-500" size={24} /></div><div className="flex-1"><p className="font-bold text-gray-800 text-lg mb-1">{order.address.label}</p><p className="text-sm text-gray-600 leading-relaxed">{order.address.address}</p></div></div>
        </div>
        
        <div className="mb-4">
            {isCancellable && (
                 <button onClick={onCancelRequest} className="w-full py-4 font-black rounded-2xl text-center transition-all bg-red-100 text-red-600 active:scale-95 flex items-center justify-center gap-2">
                    <AlertCircle size={20} /> Cancel Order
                </button>
            )}
        </div>
        
        {['delivered', 'completed'].includes(order.status) && (
          <button onClick={() => onReorder(order.items)} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl"><Repeat size={20} />Reorder</button>
        )}
      </div>
    </div>
  );
};