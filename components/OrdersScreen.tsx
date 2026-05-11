
import React from 'react';
import { Package, Award } from 'lucide-react';
import type { Order } from '../types';
import { myRestaurant } from '../constants/data';


interface OrdersScreenProps {
  orders: Order[];
  setTrackingOrder: (order: Order) => void;
  setShowOrderTracking: (show: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ orders, setTrackingOrder, setShowOrderTracking, setActiveTab }) => {
  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'preparing': return 'bg-yellow-100 text-yellow-700';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 shadow-md sticky top-0 z-10">
        <h2 className="text-2xl font-black text-gray-800">My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] px-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center"><Package size={64} className="text-orange-500" /></div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start ordering to see your order history</p>
            <button onClick={() => setActiveTab('home')} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl active:scale-95 transition-transform">Start Ordering</button>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-4">
          {orders.map(order => (
            <button
              key={order.id}
              onClick={() => { setTrackingOrder(order); setShowOrderTracking(true); }}
              className="w-full bg-white rounded-2xl shadow-md p-4 text-left active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-3 mb-3">
                 <div className="text-4xl">{myRestaurant.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{myRestaurant.name}</h3>
                  <p className="text-sm text-gray-600">{order.items.map(i => i.name).slice(0, 2).join(', ')}...</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(order.status)}`}>{order.status.replace('_', ' ').toUpperCase()}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Order #{order.orderNumber}</span>
                <span className={`font-black ${order.status === 'cancelled' ? 'text-gray-500 line-through' : 'text-orange-500'}`}>${order.totals.total}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(order.placedAt).toLocaleString()}</span>
                <span className={`flex items-center gap-1 font-bold ${order.status === 'cancelled' ? 'text-red-500' : 'text-green-600'}`}>
                  {order.status !== 'cancelled' && <><Award size={12} />+{order.pointsEarned} pts</>}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};